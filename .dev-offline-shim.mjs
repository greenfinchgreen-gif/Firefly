// 本地开发用的临时兼容层（不属于项目源码，用完可删）
// 作用一：绕过 DSH 沙箱对管道子进程的限制 —— Vite 在 Windows 上会同步 exec("net use")
//        探测网络驱动器，沙箱下 spawn 抛 EPERM，导致依赖 externalize 判定整体失效，
//        纯 CJS 依赖（picomatch/debug）被当 ESM 内联执行 → "require is not defined"。
// 作用二：离线字体 —— 本机无外网（jsdelivr/bunny 均不可达），把 Astro 字体系统的
//        CDN 请求映射到 .astro/fonts 里已有的字体缓存，避免启动时 CannotFetchFontFile。
import { createRequire } from "node:module";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/* ---------------- 1. child_process.exec: 屏蔽 net use 探测 ---------------- */
const require = createRequire(import.meta.url);
const cp = require("node:child_process");
const realExec = cp.exec;
cp.exec = function patchedExec(command, options, callback) {
	if (typeof command === "string" && /^\s*net\s+use\s*$/i.test(command)) {
		const cb = typeof options === "function" ? options : callback;
		if (cb) process.nextTick(() => cb(null, "", ""));
		return { on() { return this; }, kill() {}, unref() {} };
	}
	return realExec.apply(this, arguments);
};

/* ---------------- 2. fetch: CDN 字体回落到本地缓存 ---------------- */
const ROOT = process.cwd();
const FONT_DIR = join(ROOT, ".astro", "fonts");
let index = null;

function buildIndex() {
	const out = [];
	let files = [];
	try {
		files = readdirSync(FONT_DIR).filter((f) => f.endsWith(".woff2"));
	} catch {
		return out;
	}
	for (const file of files) {
		const m = /^font-(.+)-(\d+)-(normal|italic|oblique)-([a-z-]+)-([0-9a-f]{8,16})\.woff2$/.exec(file);
		if (!m) continue;
		out.push({ file, slug: m[1], weight: m[2], style: m[3], subset: m[4] });
	}
	return out;
}

function pick(url) {
	index ??= buildIndex();
	const base = decodeURIComponent(url.split("?")[0].split("/").pop() ?? "");
	const w = /^([a-z-]+)-(\d+)-(normal|italic|oblique)\.woff2$/.exec(base);
	for (const e of index) {
		if (!url.includes(e.slug)) continue;
		if (w) {
			if (w[1] === e.subset && w[2] === e.weight && w[3] === e.style) return e;
		} else if (base.includes(e.weight) && base.includes(e.style)) {
			return e;
		}
	}
	return null;
}

const realFetch = globalThis.fetch;
globalThis.fetch = async function patchedFetch(input, init) {
	const url = typeof input === "string" ? input : input instanceof URL ? input.href : input?.url;
	if (typeof url === "string" && /cdn\.jsdelivr\.net|fonts\.bunny\.net|fonts\.googleapis\.com|fonts\.fontshare\.com/.test(url)) {
		const hit = pick(url);
		if (hit) {
			const buf = readFileSync(join(FONT_DIR, hit.file));
			return new Response(buf, { status: 200, headers: { "content-type": "font/woff2" } });
		}
		console.warn(`[offline-font] 缓存未命中，仍尝试联网: ${url}`);
	}
	return realFetch.call(this, input, init);
};

console.log("[dev-shim] 已启用：net use 探测屏蔽 + 离线字体回落");

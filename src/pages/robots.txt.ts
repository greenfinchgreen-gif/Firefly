import type { APIRoute } from "astro";
import { url } from "@utils/url-utils";

export const prerender = true;

const robotsTxt = `
User-agent: *
Disallow: ${url("/_astro/")}
Disallow: ${url("/archive/?tag=")}
Disallow: ${url("/archive/?category=")}
Disallow: ${url("/archive/?uncategorized=")}

Sitemap: ${new URL(url("/sitemap-index.xml"), import.meta.env.SITE).href}
`.trim();

export const GET: APIRoute = () => {
	return new Response(robotsTxt, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Map old domains → new domain
    const redirects = {
      "nchagnet.pages.dev": "https://nchagnet.eu",
    };

    const targetBase = redirects[url.hostname];

    // If this Worker is hit on an unknown hostname
    if (!targetBase) {
      return new Response("Not configured for this domain", { status: 404 });
    }

    // Preserve path + query string
    const targetUrl = targetBase + url.pathname + url.search;

    return Response.redirect(targetUrl, 301);
  }
};

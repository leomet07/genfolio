# Genfolio

Genfolio is a no-code platform for generating developer resume pages.

## Our stack
- We use a [Svelte](https://svelte.dev) frontend to create a responsive and speedy website without the overhead of a virtual DOM.
- The frontend interfaces with an [Express.js](https://expressjs.com/) API on the backend to handle requests in an optimal manner.
- The [GitHub API](https://docs.github.com/en/developers) is queried to provide accurate information on a developer's achievements and contributions.

For our deployment at [https://genfolio.xyz/](https://genfolio.xyz/), we also use
- An [NGINX](https://nginx.org/) reverse proxy to manage TLS/SSL connection and encryption of requests,
- And [Cloudflare DNS](https://www.cloudflare.com/dns/) with encrypted proxying on the edge to further secure our traffic, and prevent DDoS attacks against our service.

This is a group submission for [TechOptimum](https://techoptimum.devpost.com/) by [David Chen](https://github.com/TheEgghead27), [Leonid Metlitsky](https://github.com/leomet07), [John Murphy](https://github.com/jmurphy5613), and [Richard Watkins](https://github.com/thegu5).  

## Quickstart
Apply a .env as per the [server environment configuration](server/README.md#Environment Variables). (optional) 
Run the `./redeploy.sh` script at the root of this repository.

To run development builds of the Genfolio services individually, refer to the specific README.md files within each directory. 

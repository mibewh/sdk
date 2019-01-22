// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---cache-dev-404-page-js": () => import("/Users/mwhitman/projects/sdk/gatsbyjs/sample/.cache/dev-404-page.js" /* webpackChunkName: "component---cache-dev-404-page-js" */),
  "component---src-pages-404-js": () => import("/Users/mwhitman/projects/sdk/gatsbyjs/sample/src/pages/404.js" /* webpackChunkName: "component---src-pages-404-js" */),
  "component---src-pages-index-js": () => import("/Users/mwhitman/projects/sdk/gatsbyjs/sample/src/pages/index.js" /* webpackChunkName: "component---src-pages-index-js" */),
  "component---src-pages-page-2-js": () => import("/Users/mwhitman/projects/sdk/gatsbyjs/sample/src/pages/page-2.js" /* webpackChunkName: "component---src-pages-page-2-js" */),
  "component---src-pages-search-page-js": () => import("/Users/mwhitman/projects/sdk/gatsbyjs/sample/src/pages/SearchPage.js" /* webpackChunkName: "component---src-pages-search-page-js" */)
}

exports.data = () => import(/* webpackChunkName: "pages-manifest" */ "/Users/mwhitman/projects/sdk/gatsbyjs/sample/.cache/data.json")


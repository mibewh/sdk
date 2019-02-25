import { createRouter as createDefaultRouter } from './defaultRouter';
import Router from 'vue-router';
import Gitana from 'gitana';

export function createRouter(ssrContext) {
  const defaultRouter = createDefaultRouter(ssrContext)

  var routes = defaultRouter.options.routes;

//   Gitana.connect({
//       "clientKey": "e34de2c1-f4f7-43a6-93c4-efa23d105fea",
//       "clientSecret": "IoLE0ldateSW2gdmOJO0bgiMEeBbMbkeCjSvhm98FbeUYyJwn1dLlzsNPVOwF+PgJ0WCvfF0JkO1yGwzTALu51vOHYHY48cehH3K/NOVOUI=",
//       "username": "dac1fbfe-1265-4881-954b-782f296076c2",
//       "password": "Oy/XF8OIBxH9QjfRYHC2G3ZTV9MSUvjA3yU+haVLBKhnzvaHeIHSMeiYh++y3mPr9PciFwaR+B6u0yWQTk/arKsxl+HlbuDl8Y7LmoaZ6us=",
//       "baseURL": "http://localhost:8080",
//       "application": "f72237d7737ec3e70e3d",
//       "baseCDNURL": "http://localhost:2999"
//     })

  return new Router({
    ...defaultRouter.options,
    routes: routes
  })
}
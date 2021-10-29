import Document from 'next/document'
import { track } from '../lib/cloudcms';

const makePreviewUrl = (url) => `/api/preview?url=${url}`

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    
    const originalRenderPage = ctx.renderPage
    
    ctx.renderPage = () => {
      const page = originalRenderPage({
        // useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // useful for wrapping in a per-page basis
        enhanceComponent: (Component) => {
          return Component
        },
      })

      track(process.env.repositoryId, process.env.branchId, makePreviewUrl(ctx.req.url), page.html);

      return page;
    }
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }
}

export default MyDocument
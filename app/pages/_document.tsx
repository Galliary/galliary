import {
  Document,
  Html,
  DocumentHead,
  Main,
  BlitzScript /*DocumentContext*/,
} from 'blitz'
import { GlobalPageMeta } from 'app/meta/GlobalPageMeta'

class MyDocument extends Document {
  // Only uncomment if you need to customize this behaviour
  // static async getInitialProps(ctx: DocumentContext) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return {...initialProps}
  // }

  render() {
    return (
      <Html lang="en">
        <GlobalPageMeta />
        <DocumentHead />
        <body>
          <Main />
          <BlitzScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

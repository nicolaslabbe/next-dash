import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

import globalStylesheet from '../static/styles/global.scss'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const {html, head, errorHtml, chunks} = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }

  render () {
    return (
     <html>
       <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
         <style dangerouslySetInnerHTML={{ __html: globalStylesheet }} />
       </Head>
       <body className="custom_class">
         {this.props.customValue}
         <Main />
         <NextScript />
       </body>
     </html>
    )
  }
}
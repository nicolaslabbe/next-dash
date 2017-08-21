import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

// import _documentStyles from './Styles/_document.scss'
import globalStylesheet from '../static/styles/global.scss'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const {html, head, errorHtml, chunks} = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }

  render () {
    // <style dangerouslySetInnerHTML={{ __html: _documentStyles }} />
    return (
     <html>
       <Head>
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
import Document, { Html, Head, Main, NextScript } from 'next/document';

class CustomDocument extends Document {
  static getInitialProps({ renderPage }) {
    const page = renderPage();

    return { ...page };
  }

  constructor(props) {
    super(props);
    const { __NEXT_DATA__, ids } = props;
    if (ids) {
      __NEXT_DATA__.ids = ids;
    }
  }

  render() {
    return (
      <Html lang='en'>
        <Head />
        <body>
          {/* Google Tag Manager */}
          <noscript>
            <iframe
              src='https://www.googletagmanager.com/ns.html?id=GTM-K49S7R2'
              height='0'
              width='0'
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
          {/* Google Tag Manager */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;

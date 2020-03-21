import Head from 'next/head';

const Meta = props => (
  <Head>
    <title>{props.title}</title>
    <meta name='description' content={props.desc} />
    <meta name='keywords' content={props.keywords} />
    <link
      rel='stylesheet'
      href='https://fonts.googleapis.com/css?family=Raleway:400,600&display=swap'
    />
    <link
      rel='stylesheet'
      href='https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css'
    />
    <link
      href='https://unpkg.com/leaflet-geosearch@latest/assets/css/leaflet.css'
      rel='stylesheet'
    />
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K49S7R2');`
      }}
    />
  </Head>
);

export default Meta;

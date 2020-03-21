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
  </Head>
);

export default Meta;

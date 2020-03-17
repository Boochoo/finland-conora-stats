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
  </Head>
);

export default Meta;

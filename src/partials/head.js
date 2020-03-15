import Head from 'next/head';

const Meta = props => (
  <Head>
    <title>{props.title}</title>
    <meta name='description' content={props.desc} />
    <meta name='keywords' content={props.keywords} />
  </Head>
);

export default Meta;

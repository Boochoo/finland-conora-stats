const sitemap = require('nextjs-sitemap-generator');
const webpack = require('webpack');
const withFonts = require('nextjs-fonts');

sitemap({
  baseUrl: 'https://finlandcoronastats.com',
  pagesDirectory: __dirname + '/src/pages',
  targetDirectory: 'public/',
});

module.exports = withFonts({
  exportPathMap: () => {
    return {
      '/': { page: '/' },
      '/world': { page: '/world' },
      // '/country': { page: '/[country]' }
    };
  },
  devIndicators: {
    autoPrerender: false,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style\/css.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      });
    }
    return config;
  },
  prerenderPages: false,
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    FINNISH_CORONA_DATA: `https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaData/v2`,
    COVID19_API: `https://covid19.mathdro.id/api`,
    COVID19_DAILY_API: `https://covid19.mathdro.id/api/daily`,
    COVID19_COUNTRIES_API: `https://covid19.mathdro.id/api/countries/`,
    OIRETUTKA_API: `https://data.oiretutka.fi/city_level_general_results.json`,
  },
});

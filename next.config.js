const sitemap = require('nextjs-sitemap-generator');
const webpack = require('webpack');
const withFonts = require('nextjs-fonts');

sitemap({
  baseUrl: 'https://finlandcoronastats.com',
  pagesDirectory: __dirname + '/src/pages',
  targetDirectory: 'static/'
});

module.exports = withFonts({
  exportPathMap: () => {
    return {
      '/': { page: '/' },
      '/world': { page: '/world' },
      '/country': { page: '/country' }
    };
  },
  devIndicators: {
    autoPrerender: false
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
        ...(typeof origExternals[0] === 'function' ? [] : origExternals)
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader'
      });
    }
    return config;
  }
  // cssModules: true,
  // experimental: { css: true }
});

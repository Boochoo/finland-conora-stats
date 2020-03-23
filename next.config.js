const webpack = require('webpack');
const withFonts = require('nextjs-fonts');

module.exports = withFonts({
  exportPathMap: function() {
    return {
      '/': { page: '/Index' },
      '/world': { page: '/World' }
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
  },
  cssModules: true,
  experimental: { css: true }
});

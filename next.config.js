module.exports = {
  exportPathMap: function() {
    return {
      '/': { page: '/' }
    };
  }
};

/* const webpack = require('webpack');

module.exports = {
  webpack: config => {
    const origins = config.entry;

    config.entry = async () => {
      const entries = await origins();

      const keys = Object.keys(entries);
      keys.forEach(key => {
        if (key.includes('/__generated__/')) {
          delete entries[key];
        }
      });

      return entries;
    };

    return config;
  }
}; */

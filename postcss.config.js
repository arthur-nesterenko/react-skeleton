'use strict';

const plugins = [
  require('postcss-flexbugs-fixes'),
  require('autoprefixer')({
    browsers: [
      '>1%',
      'last 4 versions',
      'Firefox ESR',
      'not ie < 9', // React doesn't support IE8 anyway
    ],
    flexbox: 'no-2009',
  }),
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(require('postcss-csso')({ comments: false }));
}

module.exports = { plugins };

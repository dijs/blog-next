module.exports = {
  staticFileGlobs: [
    'build/static/css/**.css',
    'build/static/js/**.js',
    'build/**/**.html',
    'build/favicon.png'
  ],
  stripPrefix: 'build/',
  // 3mb
  maximumFileSizeToCacheInBytes: 3145728,
  runtimeCaching: [
    {
      urlPattern: '/post/(.*)',
      handler: 'networkFirst'
    },
    {
      urlPattern: /^https:\/\/fonts.googleapis.com\/css/,
      handler: 'networkFirst'
    },
    {
      urlPattern: /^https:\/\/fonts.gstatic.com\/s\//,
      handler: 'networkFirst'
    }
  ]
};

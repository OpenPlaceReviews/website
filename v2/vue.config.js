module.exports = {
  pages: {
    'index': {
      entry: './src/pages/home/main.js',
      template: 'public/index.html',
      title: 'Home',
      chunks: [ 'chunk-vendors', 'chunk-common', 'index' ]
    },
    'queue': {
      entry: './src/pages/queue' +
      '/main.js',
      template: 'public/index.html',
      title: 'Queue',
      chunks: [ 'chunk-vendors', 'chunk-common', 'queue' ]
    },
    'blocks': {
      entry: './src/pages/blocks' +
      '/main.js',
      template: 'public/index.html',
      title: 'Blocks',
      chunks: [ 'chunk-vendors', 'chunk-common', 'blocks' ]
    }
  }
}

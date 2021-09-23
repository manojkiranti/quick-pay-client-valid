module.exports = {
    productionSourceMap: false,
    chainWebpack(config) {
        // it can improve the speed of the first screen, it is recommended to turn on preload
        // it can improve the speed of the first screen, it is recommended to turn on preload
        config.plugin('preload').tap(() => [
          {
            rel: 'preload',
            // to ignore runtime.js
            // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
            fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
            include: 'initial'
          }
        ])
    
     
    
  
      }
  };
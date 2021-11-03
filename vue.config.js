module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import \'~normalize.css\'; @import \'@/assets/scss/style.scss\';'
      }
    }
  },
  // lintOnSave: false
}

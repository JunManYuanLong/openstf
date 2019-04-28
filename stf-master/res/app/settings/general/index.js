require('./general.css')

module.exports = angular.module('stf.settings.general', [
  require('./language').name,
  require('./local').name
])
  .run(['$templateCache', function($templateCache) {
    $templateCache.put(
      'settings/general/general.pug'
      , require('./general.pug')
    )
  }])
  .controller('GeneralCtrl', require('./general-controller'))

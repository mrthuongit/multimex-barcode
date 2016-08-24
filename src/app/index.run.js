(function() {
  'use strict';

  angular
    .module('barcode')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();

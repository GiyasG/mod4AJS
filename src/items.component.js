(function () {
  'use strict';

  angular.module('MenuApp')
  .component('items', {
    templateUrl: 'src/template/items.template.html',
    bindings: {
      items: '<'
    }
  });
})();

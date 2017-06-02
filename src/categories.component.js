(function () {
  'use strict';

  angular.module('MenuApp')
  .component('categories', {
    templateUrl: 'src/template/categories.template.html',
    bindings: {
      items: '<'
        }
  });

})();

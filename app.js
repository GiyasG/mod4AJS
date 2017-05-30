(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', foundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function foundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
    var list = this;
    list.isEmpty = function() {
    return list.found != undefined && list.found.length === 0;
    }
  }


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrow = this;

  narrow.narrowIt = function() {
    if (narrow.searchTerm === "") {
      narrow.items = [];
      return;
    }

    var promise = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);

    promise.then(function(foundItems) {
      narrow.items = foundItems;
//      console.log(narrow.items);
    })
    .catch(function(error) {
      console.log("Something's wrong", error);
    });
    };

    narrow.removeItem = function(index) {
    narrow.items.splice(index, 1);
    };
    }


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {

    var allitems = result.data.menu_items;

//    console.log(allitems," ",allitems.length);
    var foundItems = [];

    for (var i = 0; i < allitems.length; i++) {
      console.log(allitems[i]);
      console.log(searchTerm);
      if (searchTerm != undefined && allitems[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) {
        foundItems.push(allitems[i]);
      }
    }

    return foundItems;
  });
  };

}
})();

//console.log(boughtitems);

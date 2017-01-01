'use strict';
angular.
module('app').
component('hotelList', {
  templateUrl: 'app/layout/hotel-list/hotel-list.html',
  controller: ['$http', '$scope', 'hotelService',
  function mainCtrl($http, $scope, hotelService) {

    var divs = $('#titleLg, #titleMd');
    $(window).on('scroll', function () {
      var st = $(this).scrollTop();
      divs.css({ 'opacity' : (1 - st/250) });
    });



    // attach last hotels view data from storage to scope
    var lastHotels = localStorage.getItem("lastHotels");
    if (lastHotels) {
      $scope.lastHotels = JSON.parse(lastHotels);
    }

    // get hotel list and attach to scope
    hotelService.getHotels(function(hotels) {
      if (hotels) {
        $scope.hotels = hotels;
        var storageHotelList = localStorage.getItem("storageHotelList");
        if (!storageHotelList) {
          localStorage.setItem("storageHotelList", JSON.stringify(hotels));
        }
      }
      else {
        alert('Faild to get hotels');
      }
    })

    // get brand list and attach to scope
    hotelService.getBrands(function(brands) {
      if (brands) {
        $scope.brands = brands.data;
      }
    })

    // remove seletcted hotel (UI ONLY)
    $scope.removeHotel = function(index) {
      var result = confirm("Are you sure you want to delete?");
      if (result) {
        $scope.hotels.splice(index,1);
      }
    }

  }]
});

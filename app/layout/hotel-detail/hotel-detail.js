'use strict';
angular.
module('app').
component('hotelDetail', {
	templateUrl: 'app/layout/hotel-detail/hotel-detail.html',
	controller: ['$routeParams','$rootScope', '$scope', '$location', 'hotelService',
	function hotelCtrl($routeParams, $rootScope, $scope, $location, hotelService) {

		// get hotel data and attach to scope
		hotelService.queryById($routeParams.hotelId, function(hotel){
			if(hotel) {
				$scope.hotelData = hotel;
				updateLastViewd(hotel);
			}
			else {
				alert('Failed to get hotel');
			}
		});

		// update last viewed hotel table list with time and date
		function updateLastViewd(hotel) {
			hotel.lastViewd = Date.now();
			console.log(hotel);
			var lastHotels = localStorage.getItem("lastHotels");
			if (lastHotels) {
				lastHotels = JSON.parse(lastHotels);
				var replaced = false;
				for (var i=0; i < lastHotels.length; i++){
					if(lastHotels[i]._id == hotel._id) {
						lastHotels.splice(i,1);
						lastHotels.unshift(hotel);
						replaced = true;
						break;
					}
				}

				if (!replaced){
					lastHotels.splice(4,1);
					lastHotels.unshift(hotel);
				}
			}
			else {
				lastHotels = [hotel];
			}
			localStorage.setItem("lastHotels", JSON.stringify(lastHotels));
		}

		// save changes made to localStorage
		$scope.saveChanges = function(hotelDetail) {
			var storageHotelList = localStorage.getItem("storageHotelList");
			if (storageHotelList) {
				var hotels = JSON.parse(localStorage.storageHotelList);
				for(var i = 0; i < hotels.length; i++) {
					if (hotels[i]._id == hotelDetail._id) {
						hotels[i] = hotelDetail;
						localStorage.setItem("storageHotelList", JSON.stringify(hotels));
						break;
					}
				}
				alert('Changes have been saved to localStorage');
			}
		}

		// delete hotel from detail page
		$scope.deleteHotel = function(path,id) {
			var result = confirm("Are you sure you want to delete?");
			if (result) {
				hotelService.getHotels(function(hotels) {
					for(var i = 0; i < hotels.length; i++) {
						if(hotels[i]._id == id) {
							hotels.splice(i,1);
						}
					}
				})
				$location.path( path );
			}
		}

	}]
});

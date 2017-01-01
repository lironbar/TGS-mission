angular.module('app')
.service('hotelService', ['$http', function($http) {
	var self = this;
	var hotelList;

	function getHotelsFromFile(cb){
		$http.get('app/data/hotels.json').then(
			function(response){
				// get saved from local storage
				// iterate over hotelsList and replace by id
				hotelList = response.data;
				console.log(hotelList);
				cb(hotelList);
			},
			function (response){
				cb(false);
			}
		);
	}

	self.getHotels = function(cb, editedList) {
		if (hotelList){
			cb(hotelList);
			return;
		}
		getHotelsFromFile(cb);
	};

	self.getBrands = function(cb) {
		$http.get('app/data/brands.json').then(
			function (res) {
				cb(res);
			},
			function (res) {
				cb(res);
			}
		);
	};

	self.queryById = function(id, cb){
		self.getHotels(function(hotels){
			if(hotels){
				for(var i = 0; i < hotelList.length; i++) {
					if(hotels[i]._id == id) {
						cb(hotels[i]);
						return;
					}
				}
			}else{
				cb(false);
			}
		});
	};

}]);

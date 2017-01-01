angular.
	module('app').
		config(['$locationProvider', '$routeProvider',
			function config($locationProvider, $routeProvider) {
				$locationProvider.hashPrefix('!');

				$routeProvider.
				when ('/hotels', {
					template: '<hotel-list></hotel-list>'
				}).
				when ('/hotels/:hotelId', {
					template: '<hotel-detail></hotel-detail>'
				}).
				otherwise({redirectTo: '/hotels'});
			}
		]);

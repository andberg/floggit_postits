'use strict';

/**
 * @ngdoc directive
 * @name floggitPostitsApp.directive:fpSelectCreateWhiteboard
 * @description
 * # fpSelectCreateWhiteboard
 */
angular.module('floggitPostitsApp')
	.directive('fpSelectCreateWhiteboard', function () {
		return {
			templateUrl: 'views/createselectwhiteboard.html',
			restrict: 'E',
			controller: function ($scope, $http, $route, $location, currentWhiteboard) {

				$scope.allWhiteboards = [];

				$http({
					method: 'GET',
					url: 'http://localhost:14782/fp-whiteboards'
				}).then(function (data) {
					$scope.allWhiteboards = data.data;
					console.log($scope.allWhiteboards);
				});

				$scope.createNewWhiteboard = function (newWhiteboard) {
					var whiteboard = {
						name: newWhiteboard
					};
					$http({
						method: 'POST',
						url: 'http://localhost:14782/fp-whiteboards',
						data: whiteboard
					}).success(function () {
						$http({
							method: 'GET',
							url: 'http://localhost:14782/fp-whiteboards'
						}).then(function (data) {
							$scope.allWhiteboards = data.data;
							console.log($scope.allWhiteboards);
						});
					});
				};

				$scope.choosenWhiteboard = function (boardName) {
					console.log(boardName);
					currentWhiteboard.setName(boardName);
					$location.path('/whiteboard');
				};
			}
		};
	});
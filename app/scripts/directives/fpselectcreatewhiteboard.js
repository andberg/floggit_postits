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
			controller: function ($scope, $http, $route, $location, currentWhiteboard, dataStorage) {

				$scope.allWhiteboards = [];

				var getAllWhiteboards = function () {
					dataStorage.getAllWhiteboards().then(function (data) {
						console.log(data);
						$scope.allWhiteboards = data;
					});
				};
				getAllWhiteboards();

				$scope.createNewWhiteboard = function (newWhiteboard) {
					var whiteboard = {
						name: newWhiteboard
					};
					dataStorage.createWhiteboard(whiteboard).then(function () {
						getAllWhiteboards();
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
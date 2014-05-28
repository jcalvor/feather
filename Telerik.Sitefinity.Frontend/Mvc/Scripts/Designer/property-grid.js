﻿(function () {
    var designerModule = angular.module('designer');

    //basic controller for the advanced designer view
    designerModule.controller('PropertyGridCtrl', ['$scope', 'propertyService', 'dialogFeedbackService',
        function ($scope, propertyService, dialogFeedbackService) {

            var onGetPropertiesSuccess = function (data) {
                if (data.Items)
                    $scope.Items = data.Items;
                $scope.Feedback.ShowLoadingIndicator = false;
            };

            var onGetError = function (data, status, headers, config) {
                $scope.Feedback.ShowError = true;
                if (data)
                    $scope.Feedback.ErrorMessage = data.Detail;

                $scope.Feedback.ShowLoadingIndicator = false;
            }

            $scope.$on('saveButtonPressed', function (event, e) {
                propertyService.set($scope.Items);
            });

            propertyService.get().then(onGetPropertiesSuccess, onGetError);

            $scope.Feedback = dialogFeedbackService;
            $scope.Feedback.ShowLoadingIndicator = true;

            $scope.DrillDownPropertyHierarchy = function (propertyPath, propertyName) {
                $scope.propertyPath = propertyPath;
                $scope.propertyName = propertyName;
            };
        }]);

    //filters property hierarchy
    designerModule.filter('propertyHierarchy', function () {

        return function (inputArray, propertyName, propertyPath) {
            var currentLevel;
            if (propertyPath)
                currentLevel = propertyPath.split('/').length - 1;

            var levelFilter = function (property) {
                var level = property.PropertyPath.split('/').length - 2;
                if (propertyName == null || propertyName.length == 0 || propertyName == 'Home') {
                    return level <= 0;
                } else {
                    if (property.PropertyPath.indexOf(propertyPath) >= 0) {
                        return currentLevel == level;
                    } else {
                        return false;
                    }
                }
            };

            var proxyFilter = function (property) {
                return !property.IsProxy;
            }

            var result = inputArray;
            if (inputArray && inputArray[0].IsProxy)
                result = inputArray.filter(proxyFilter);
            else if (inputArray)
                result = inputArray.filter(levelFilter);

            return result;
        };

    });

})();
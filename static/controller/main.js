var app = angular.module("myApp", []);

app.controller("myCtrl", function($scope) {
      $scope.collapse = function () {
        $scope.visible = false;
        $scope.visible = $scope.visible = true;
      }

      $scope.collapse2 = function () {
        $scope.visible = true;
        $scope.visible = $scope.visible = false;
      }
});

var app = angular.module("myApp", ['toastr',  '720kb.datepicker']);

app.controller("myCtrl",  ['$scope', '$http', 'toastr',  function($scope, $http, toastr) {
      $scope.collapse = function () {
        $scope.visible = false;
        $scope.visible = $scope.visible = true;
      }

      $scope.collapse2 = function () {
        $scope.visible = true;
        $scope.visible = $scope.visible = false;
      }

      $scope.collapse3 = function () {
        $scope.visible = true;
        $scope.visible = $scope.visible = false;
      }

      var refresh = function() {
        $http.get('/itemList').then(function(response) {
          console.log("I got the data I requested");
          $scope.items = response.data;
          //$scope.item = "";
        });
      };

      refresh()

      $scope.addItem = function() {
        console.log($scope.item);
        $http.post('/itemList', $scope.item).then(function(response) {
          console.log(response);
          refresh();
          $scope.item.date = "";
          $scope.item.description = "";
          toastr.success('Item added successfully');
        });
      }

      $scope.remove = function(id) {
          console.log(id);
          $http.delete('/itemList/' + id).then(function(response) {
            refresh();
            toastr.error('Item deleted successfully');
          });
      };

      $scope.confirm = function (id){
        var id = id
        $scope.visible2 = false;
        $scope.visible2 = $scope.visible2 = true;
        $scope.test = id
      }

      $scope.confirm2 = function (){
        $scope.visible2 = true;
        $scope.visible2 = $scope.visible2 = false;
      }

      $scope.edit = function(id) {
        console.log(id);
        $http.get('/itemList/' + id).then(function(response) {
          $scope.item = response.data;
        });
      };

      $scope.update = function() {
          console.log($scope.item._id);
          $http.put('/itemList/' + $scope.item._id, $scope.item).then(function(response) {
            refresh();
            $scope.item.date = "";
            $scope.item.description = "";
            toastr.success('Item updated successfully');
          })
        };

}]);

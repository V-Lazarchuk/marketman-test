'use strict';

angular.module('userManagement')
    .component('userDetails', {
        templateUrl: 'components/user-details/user-details.component.html',
        controller: ['$scope', '$routeParams', 'Users', '$location', UserDetailsController]
    });

function UserDetailsController($scope, $routeParams, Users, $location) {
    /*Props*/
    $scope.mode = 'display';

    /*Methods*/
    $scope.changeMode = (mode) => {
        $scope.mode = mode;
    };

    $scope.goBack = () => {
        $location.path('/users');
    };

    $scope.changeUser = () => {
        Users.saveUser($scope.user);
        $scope.changeMode('display');
    };

    $scope.deleteUser = () => {
        Users.deleteUser($scope.user.login.uuid);
        $scope.goBack();
    };

    /*Init Actions*/
    Users.getUser($routeParams.userId).then(user => {
        $scope.user = user;
        $scope.$apply();
    });
}

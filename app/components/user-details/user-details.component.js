'use strict';

angular.module('userManagement')
    .component('userDetails', {
        templateUrl: 'components/user-details/user-details.component.html',
        controller: UserDetailsController
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
        var name = $scope.user.fullname.split(' ');
        $scope.user.name.first = name[0];
        $scope.user.name.last = name[1];
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
        $scope.user.fullname = user.name.first + ' ' + user.name.last;
        $scope.$apply();
    });
}

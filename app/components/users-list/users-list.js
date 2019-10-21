'use strict';

angular.module('userManagement')
    .component('usersList', {
        templateUrl: 'components/users-list/users-list.html',
        controller: ['Users', '$scope', UsersListController]
    });

function UsersListController(Users, $scope) {
    Users.getUsers().then((res) => {
        $scope.users = res;
        $scope.$apply();
    });

}

'use strict';

angular.module('userManagement')
    .component('usersList', {
        templateUrl: 'components/users-list/users-list.component.html',
        controller: ['Users', '$scope', UsersListController]
    });

function UsersListController(Users, $scope) {
    $scope.title = 'Users List';

    Users.getUsers().then(users => {
        $scope.users = users;
        $scope.$apply();
    })
}

'use strict';

angular.module('userManagement')
    .component('usersList', {
        templateUrl: 'components/users-list/users-list.component.html',
        controller: ['Users', '$scope', '$location', UsersListController]
    });

function UsersListController(Users, $scope, $location) {
    /*Props*/
    $scope.title = 'Users List';
    $scope.order = '';

    /*Methods*/
    $scope.getUsers = () => {
        Users.getUsers().then(users => {
            $scope.users = users;
            $scope.$apply();
        });
    };

    $scope.deleteUser = (userId, $event) => {
        $event.stopPropagation();
        Users.deleteUser(userId);
        $scope.getUsers();
    };

    $scope.goToUser = (userId) => {
        $location.path('users/' + userId);
    };

    $scope.addOrder = (condition) => {
         if ($scope.order === condition) {
             $scope.order = '-' + condition;
         } else {
            $scope.order = condition;
         }
    };

    /*Init Actions*/
    $scope.getUsers();
    $scope.$on('pageChanged', $scope.getUsers);

    $scope.width = () => document.documentElement.offsetWidth;
}

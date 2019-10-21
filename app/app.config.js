'use strict';

angular.module('userManagement')
    .config(['$routeProvider',
        function config($routeProvider) {
            $routeProvider
                .when('/users', {
                    template: '<users-list></users-list>'
                })
                .when('/users/:userId', {
                    template: '<user-details></user-details>'
                })
                .otherwise('/users')
        }
    ]);

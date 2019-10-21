'use strict';

angular.module('userManagement')
    .factory('Users', ['$http', function ($http) {
        var baseUrl = 'https://randomuser.me/api/';
        var seed;
        var users = [];
        var pageNum = 1;

        var methods = {
            getCurrentPage: getCurrentPage,
            setCurrentPage: setCurrentPage,
            getUsers: getUsers
        };

        function getCurrentPage() {
            return pageNum;
        }

        function setCurrentPage(num) {
            pageNum = num;
        }

        function getUsers() {
            return new Promise(resolve => {
                if (!users || users.length === 0) {
                    $http.get(baseUrl, {
                        params: {
                            page: pageNum,
                            results: 20,
                            seed: seed ? seed : ''
                        }
                    }).then(response => {
                        users = response.data.results;
                        resolve(users);
                    });
                } else {
                    console.log('users');
                    resolve(users);
                }
            })
        }
        return methods;
    }]);

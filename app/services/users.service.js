'use strict';

angular.module('userManagement')
    .factory('Users', ['$http', function ($http) {
        var baseUrl = 'https://randomuser.me/api/';
        var seed = localStorage.getItem('seed') ? localStorage.getItem('seed') : '';
        var users = null;
        var pageNum = localStorage.getItem('page') ? localStorage.getItem('page') : 1;

        function getCurrentPage() {
            return +pageNum;
        }

        function setCurrentPage(num) {
            pageNum = num;
            localStorage.setItem('page', num);
        }

        function clearUsers() {
            users = null;
        }

        function getUsers() {
            return new Promise(resolve => {
                if (!users) {
                    $http.get(baseUrl, {
                        params: {
                            page: getCurrentPage(),
                            results: 20,
                            seed: seed ? seed : ''
                        }
                    }).then(response => {
                        users = response.data.results;
                        seed = response.data.info.seed;
                        localStorage.setItem('seed', seed);
                        resolve(users);
                    });
                } else {
                    resolve(users);
                }
            });
        }

        function getUser(uuid) {
            return new Promise(resolve => {
                if (users) {
                    resolve(findUserInArray(uuid));
                } else {
                    getUsers().then(() => {
                        resolve(findUserInArray(uuid));
                    });
                }
            });
        }

        function saveUser(user) {
            var index = users.findIndex(item => item.login.uuid === user.login.uuid);
            users.splice(index, 1, user);
        }

        function findUserInArray(uuid) {
            return users.find(user => user.login.uuid === uuid);
        }

        function deleteUser(userId) {
            users = users.filter(user => user.login.uuid !== userId);
        }

        return {getCurrentPage, setCurrentPage, getUsers, getUser, deleteUser, clearUsers, saveUser};
    }]);

'use strict';

angular.module('userManagement')
    .factory('Users', ['$http', function ($http) {
        var baseUrl = 'https://randomuser.me/api/';
        var seed = localStorage.getItem('seed') ? localStorage.getItem('seed') : '';
        var users = {};
        var pageNum = localStorage.getItem('page') ? localStorage.getItem('page') : 1;

        function getCurrentPage() {
            return +pageNum;
        }

        function setCurrentPage(num) {
            pageNum = num;
            localStorage.setItem('page', num);
        }

        function getUsers() {
            return new Promise(resolve => {
                if (!users[pageNum]) {
                    $http.get(baseUrl, {
                        params: {
                            page: getCurrentPage(),
                            results: 20,
                            seed: seed ? seed : ''
                        }
                    }).then(response => {
                        users[pageNum] = response.data.results;
                        seed = response.data.info.seed;
                        localStorage.setItem('seed', seed);
                        resolve(users[pageNum]);
                    });
                } else {
                    resolve(users[pageNum]);
                }
            });
        }

        function getUser(uuid) {
            return new Promise(resolve => {
                if (users[pageNum]) {
                    resolve(findUserInArray(uuid));
                } else {
                    getUsers().then(() => {
                        resolve(findUserInArray(uuid));
                    });
                }
            });
        }

        function saveUser(user) {
            var index = users[pageNum].findIndex(item => item.login.uuid === user.login.uuid);
            users[pageNum].splice(index, 1, user);
        }

        function findUserInArray(uuid) {
            return users[pageNum].find(user => user.login.uuid === uuid);
        }

        function deleteUser(userId) {
            users[pageNum] = users[pageNum].filter(user => user.login.uuid !== userId);
        }

        return {getCurrentPage, setCurrentPage, getUsers, getUser, deleteUser, saveUser};
    }]);

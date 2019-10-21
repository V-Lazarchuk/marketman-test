'use strict';

angular.module('userManagement')
    .component('pagination', {
        templateUrl: 'components/pagination/pagination.component.html',
        controller: ['Users', '$scope', PaginationComponentController]
    });

function PaginationComponentController(Users, $scope) {

}

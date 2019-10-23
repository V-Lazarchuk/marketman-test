'use strict';

angular.module('userManagement')
    .component('pagination', {
        templateUrl: 'components/pagination/pagination.component.html',
        controller: PaginationComponentController
    });

function PaginationComponentController(Users, $scope, $rootScope) {
    /*Props*/
    $scope.pages = new Array(5);

    /*Methods*/
    $scope.changePage = (num) => {
        Users.setCurrentPage(num);
        $scope.activePage = num;
        $rootScope.$broadcast('pageChanged');
    };

    $scope.goToNextPage = () => {
        if ($scope.activePage + 1 <= $scope.pages.length) {
            $scope.changePage($scope.activePage + 1);
        }
    };

    $scope.goToPreviousPage = () => {
        if ($scope.activePage - 1 > 0) {
            $scope.changePage($scope.activePage - 1);
        }
    };

    /*Init Actions*/
    $scope.activePage = Users.getCurrentPage();
}

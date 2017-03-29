'use strict';

(() => {
    angular.module('app')
        .controller('participant-controller', participant_controller);

    function participant_controller($scope, $location) {

    	$scope.view_profile = () => {
            $location.path("/profile").replace();
        }
        
        $scope.view_user = () => {
            $location.path("/user").replace();
        }

        $scope.logout = () => {
            $location.path("/").replace();
        }
        
        $scope.back_to_home = () => {
            $location.path("/game-event").replace();
        }
    }
})();
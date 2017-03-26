'use strict';

(() => {
    angular.module('app')
        .controller('login-register-controller', login_register_controller);

    function login_register_controller($scope, $location) {
        
        $scope.login = () => {
        		$("#modal1").modal('close');
        		
            $location.path("/game-event").replace();
        }
    }
})();

function RegisterController(AuthService, $state){
    var ctrl = this;
    ctrl.$onInit = function () {
        ctrl.error = null;
        ctrl.user = {
            email: '',
            password: ''
        };
    };
    ctrl.createUser = function (event){
        console.log('EVENT',event)
        return AuthService
            .register(event.user)//has to be a promise
            .then(function(user){
                $state.go('app');
            }, function (reason){
                ctrl.error = reason.message;
            });
    }
}

angular 
    .module('components.auth')
    .controller('RegisterController', RegisterController);
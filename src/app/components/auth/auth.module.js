angular
  .module('components.auth', [
    'ui.router', 'ngParse'
  ])
  .config(function(ParseProvider){
    ParseProvider.initialize('SLzpE2ZpGUUg639VmFpcJ8jQsUh0hMDg13HNHijg', 'jkCkNdqGUocvXjH64Y7FJCcSabcQPyt4gzP6u2BF');
  
  ParseProvider.serverURL ='https://parseapi.back4app.com/';
  
  })
  .run(function ($transitions, $state, AuthService){
    $transitions.onStart({
      to: function (state){
        return !!(state.data && state.data.requiredAuth);
      }
    }, function() {
      return AuthService
      .requireAuthentication()
      .catch(function(){
        return $state.target('auth.login')
      })
   })
    $transitions.onStart({
      to: 'auth.*'
    }, function() {
      if(AuthService.isAuthenticated()){
        return $state.target('app');
      }
    })
  }) 


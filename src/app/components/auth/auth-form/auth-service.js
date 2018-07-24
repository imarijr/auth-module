function AuthService(Parse)
{
    var auth = new Parse.User();
    var authData = null;

    function storeAuthData(response){
        
        authData = response
       
        return authData
    }     
    function onSignIn(){
        
       // authData = user
        //return auth.$requireSignIn();
    }
    function clearAuth() {
        authData = null;
    }
    
       
    this.register = function(user){
        auth
            .set("username", user.email)

        auth
            .set("email", user.email)    
            
        auth
            .set("password",user.password)           
   
    
    return auth.signUp(null)
        .then(storeAuthData)        
        .catch(function(error){
            console.log(error)
        })
    }
                      
                  
    this.login = function(user){
        return Parse.User.logIn(user.email, user.password)
        .then(storeAuthData)
    } 
    

    this.requireAuthentication = function(){
        
        return Promise.resolve(auth.authenticated())  
            .then(onSignIn)
    }
    this.isAuthenticated = function () {
        return !!authData;
    }
    this.getUser = function(){
        if(authData){
            return authData;
        }
    }
    this.logout = function () {
       
        return Parse.User.logOut()
               .then(clearAuth)

    }
            
 }
              
        
                        
            
   

angular
    .module('components.auth')
    .service('AuthService', AuthService)
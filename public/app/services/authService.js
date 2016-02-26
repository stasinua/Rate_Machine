angular.module('authService', [])

// auth factory to login and get information
// inject $http for communicating with the API
// inject $q to return promise objects
// inject AuthToken to manage tokens
.factory('Auth', function($http,$q,AuthToken){
  var authFactory = {};

  authFactory.register = function(username,password){
    return $http.post('http://smktesting.herokuapp.com/api/register/', {
      username: username,
      password: password
    })
    .success(function(data){
      AuthToken.setToken(data.token);
      return data;
    });
  };

  authFactory.login = function(username, password){
    return $http.post('http://smktesting.herokuapp.com/api/login/', {
      username: username,
      password: password
    })
    .success(function(data){
      AuthToken.setToken(data.token);
      return data;
    });
  };

  authFactory.logout = function(){
    AuthToken.setToken();
  };

  authFactory.isLoggedIn = function(){
    if(AuthToken.getToken()){
      return true;
    }
    else {
      return false;
    }
  };

  authFactory.getUser = function(){
    if(AuthToken.getToken()){
      return $http.get('/api/me', {cache: true});
    }
    else {
      return $q.reject({message: 'User has no token'});
    }
  };
  return authFactory;
})

// factory for handling tokens
// inject $window to store token client-side
.factory('AuthToken', function($window){
  var authTokenFactory = {};

  // get the token out of local storage
  authTokenFactory.getToken = function(){
    return $window.localStorage.getItem('token');
  };

  // function to set token or clear token
  // if a token is passed, set the token
  // if there is no token, clear it from local storage
  authTokenFactory.setToken = function(token){
    if(token){
      $window.localStorage.setItem('token', token);
    }
    else {
      $window.localStorage.removeItem('token');
      console.log("токен не установлен");
    }
  };

  return authTokenFactory;
})

//application configuration to integrate token into requests
.factory('AuthInterceptor', function($q,$location,AuthToken){
  var interceptorFactory = {};

  interceptorFactory.request = function(config){
    var token = AuthToken.getToken();
    if (token) {
      config.headers['Authorization'] = token;

    }
    return config;
  };

  interceptorFactory.responseError = function(response){
    if (response.status == 403) {
      AuthToken.setToken();
      $location.path('/login');
    }
    return $q.reject(response);
  };

  return interceptorFactory;
});

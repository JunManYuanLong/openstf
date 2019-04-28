/* --------
module.exports = function SignInCtrl($scope, $http) {

  $scope.error = null

  $scope.submit = function() {
    var data = {
      name: $scope.signin.username.$modelValue
      , email: $scope.signin.email.$modelValue
    }
    $scope.invalid = false
    $http.post('/auth/api/v1/mock', data)
      .success(function(response) {
        $scope.error = null
        location.replace(response.redirect)
      })
      .error(function(response) {
        switch (response.error) {
          case 'ValidationError':
            $scope.error = {
              $invalid: true
            }
            break
          case 'InvalidCredentialsError':
            $scope.error = {
              $incorrect: true
            }
            break
          default:
            $scope.error = {
              $server: true
            }
            break
        }
      })
  }
}
*/
module.exports = function SignInCtrl($scope, $http) {

  $scope.error = null

  $scope.submit = function() {
    var name =  $scope.signin.username.$modelValue;
    var password = $scope.signin.password.$modelValue;
    var mail="abc@126.com";

      var canLogin = false;
      var data = {
        name: $scope.signin.username.$modelValue
        , email: mail
        , password: $scope.signin.password.$modelValue
      }
      console.log(data)
      $http.post('/auth/api/v1/mock', data)
        .success(function(response) {
          console.log(response.isLogin)
          if(response.isLogin==true){
            canLogin = true;
            mail=response.email;
            //
            if(canLogin==true){
              var data = {
                name: $scope.signin.username.$modelValue
                , email: mail
                , password: $scope.signin.password.$modelValue
              }
              $http.post('/auth/api/v1/mock', data)
                .success(function(response) {
                  console.log(mail);
                  location.replace(response.redirect)
                })
                .error(function(response) {
                })
            }
            //
          }
          else{
            alert("账号或密码错误，请联系系统管理员");
          }
        })
        .error(function(response) {
          alert("账号或密码错误，请联系系统管理员");
        })
    }
}

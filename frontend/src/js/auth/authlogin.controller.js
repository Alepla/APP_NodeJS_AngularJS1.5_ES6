class AuthLogInCtrl {
    constructor(User, $state, Toastr) {
      'ngInject';
  
      this._User = User;
      this._$state = $state;
      this.showButton = true;
  
      this.title = $state.current.title;
      this.authType = $state.current.name.replace('app.', '');
  
      this.nvalidForm = function(){
        Toastr.showToastr(
          'error',
          'Rellena todos los campos del formulario'
        );
      }  
  
      this.submitSignIn = function() {
        var formData = {
          email: this.signIn.inputMail,
          password: this.signIn.inputPassword
        };
  
        this._User.attemptAuth(this.authType, formData).then(
          (res) => {
            Toastr.showToastr('success','Successfully Logged In');
            this._$state.go('app.home');
          },
          (err) => {
            this.errors = err.data.errors;
            Toastr.showToastr('error','Error trying to login');
            console.log(this.errors);
          }
        )
      }
    }
  }
  
  export default AuthLogInCtrl;
  
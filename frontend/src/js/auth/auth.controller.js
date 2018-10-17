class AuthCtrl {
	constructor($state,Toastr,User) {
		'ngInject';

		this.title = $state.current.title;
		this.authType = $state.current.name.replace('app.', '');

		this.nvalidSubmit = function(){
            Toastr.showToastr(
				'error',
				'Rellena todos los campos del formulario correctamente'
			);
		};
		this.authSubmit = function(){
			this.disabledForm = true;
			if(this.authType === 'register'){
				User.attemptAuth(this.authType,this.authForm).then(
					(res) => {
						Toastr.showToastr('success','Successfully Logged In');
						$state.go('app.home');
					},
					(err) => {
						this.disabledForm = false;
						if(err.data){
							Toastr.showToastr('error',err.data);
						}else{
							Toastr.showToastr('error','Error');
						}
					}
				)
				//console.log(this.authForm.username + " " + this.authForm.email + " " + this.authForm.password + " " + this.authForm.rpassword)
			}else if(this.authType === 'login'){
				User.attemptAuth(this.authType,this.authForm).then(
					(res) => {
						Toastr.showToastr('success','Successfully Logged In');
						$state.go('app.home');
					},
					(err) => {
						this.disabledForm = false;
						Toastr.showToastr('error',err.data.errors);
					}
				);
			}else{
				Toastr.showToastr(
					'error',
					'Error'
				);
			}
            
        }
	}
  
}

export default AuthCtrl;

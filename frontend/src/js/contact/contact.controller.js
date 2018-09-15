class ContactCtrl {
    constructor($scope, Contact, Toastr) {
		  'ngInject';
		  
		$scope.infoSelect = ["No puedo pagar","No puedo crear un proyecto","No me deja registrarme","Problemas con la contraseña"];
		$scope.showSubject = false;
		 
		$scope.nvalidContact = function(){
			Toastr.showToastr(
				'error',
				'Rellena todos los campos del formulario'
			);
		}

		$scope.messageContact = function(){
			var data = {
				name: $scope.contact.inputName,
				from: 'crowcode@gmail.com',
				type: 'user',
				subject: $scope.contact.inputSubject,
				to: $scope.contact.inputMail,
				text: $scope.contact.inputMessage
			};
			Contact.sendEmail(data).then(function(response){
				if(response){
					Toastr.showToastr(
						'success',
						'Correo enviado correctamente'
					);
				}else{
					Toastr.showToastr(
						'error',
						'Error al enviar el correo'
					);
				}
			});

			var data = {
				name: $scope.contact.inputName,
				from: 'crowcode@gmail.com',
				type: 'admin',
				subject: $scope.contact.inputSubject,
				to: 'daniortizgar@gmail.com',
				text: $scope.contact.inputMessage
			};
			Contact.sendEmail(data).then(function(response){
				/*if(response){
					console.log("Mensaje enviado correctamente")
				}else{
					console.log("Error al enviar el mensaje")
				}*/
			});
		}
    }
}

export default ContactCtrl;
  
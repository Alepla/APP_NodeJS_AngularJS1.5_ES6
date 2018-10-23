class contactFormCtrl {
    constructor(Contact, Toastr,$timeout,$state) {
        'ngInject';
        
      this.infoSelect = ["No puedo pagar","No puedo crear un proyecto","No me deja registrarme","Problemas con la contraseña"];
      this.showSubject = false;
      this.showButton = true;
      console.log("adsad");
       
      this.nvalidContact = function(){
          Toastr.showToastr(
              'error',
              'Rellena todos los campos del formulario'
          );
      }

      this.messageContact = function(){
          this.showButton = false;
          var data = {
              name: this.contact.inputName,
              from: 'crowcode@gmail.com',
              type: 'user',
              subject: this.contact.inputSubject,
              to: this.contact.inputMail,
              text: this.contact.inputMessage
          };
          Contact.sendEmail(data).then(function(response){
              if(response){
                  Toastr.showToastr(
                      'success',
                      'Correo enviado correctamente'
                  );
                  $timeout( function(){
                      $state.go('app.home');
                  }, 4000 );
              }else{
                  this.showButton = true;
                  Toastr.showToastr(
                      'error',
                      'Error al enviar el correo'
                  );
              }
          });
        }
    }
}

let contactForm = {
    controller: contactFormCtrl,
    templateUrl: 'contact/contactForm.html'
};

export default contactForm;
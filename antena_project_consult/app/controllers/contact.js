import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    sendMessage: function(){
      var self = this;
      var name = this.get('name') || '';
      var phone = this.get('phone') || '';
      var email = this.get('email') || '';
      var message = this.get('message') || '';

      var emailRe = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

      if(name.length < 3){
        this.set('nameError', true);
        return false;
      }else{
        this.set('nameError', false);
      }

      if(!emailRe.test(email)){
        this.set('emailError', true);
        return false;
      }else{
        this.set('emailError', false);
      }

      var phoneNumbers = phone.match(/\d/g) || '';
      if(phoneNumbers.length < 10 || phoneNumbers.length > 15){
        this.set('phoneError', true);
        return false;
      }else{
        this.set('phoneError', false);
      }

      if(message.length < 10){
        this.set('messageError', true);
        return false;
      }else{
        this.set('messageError', false);
      }

      var mailMessage = "De la: " + name + "    " +
          "Email: " + email + "    " +
          "Telefon: " + phone + "    " +
          "Mesaj: " + "    " + message.replace(/<(?:.|\n)*?>/gm, '');

      Ember.$.ajax({
        type: 'POST',
        url: 'https://mandrillapp.com/api/1.0/messages/send.json',
        data: {
        'key': 'EkkOnBJIVFN6H4BB4t3Ngg',
        'message': {
          'from_email': 'form@atena-project.ro',
          'to': [
              {
              'email': 'paul.prodan@yahoo.com',
              'type': 'to'
            }
        ],
        "auto_html": true,
        'subject': 'Mesaj de la ' + name.slice(0, 20),
        'html': mailMessage
        }
    }
  }).done(function() {
        self.set('name', '');
        self.set('email', '');
        self.set('phone', '');
        self.set('message', '');
        self.set('sendMail', true);
        self.set('sendMailError', false);
      })
     .fail(function(){
          self.set('sendMailError', true);
        });
    }
  }
});

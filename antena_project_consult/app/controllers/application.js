import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    setRoLanguage: function(){
      console.log(this.app);
      Ember.set(this.app, 'locale', 'ro');
    },
    setDeLanguage: function(){
      Ember.set(this.app, 'locale', 'de');
    },
    setEnLanguage: function(){
      Ember.set(this.app, 'locale', 'en');
    }
  }
});

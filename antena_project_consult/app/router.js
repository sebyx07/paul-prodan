import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route('home', {path: ''});
  this.route('services', function() {
    this.route('electric');
    this.route('auto');
    this.route('others');
  });
  this.route('contact');
});

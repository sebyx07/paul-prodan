export function initialize(container, application) {
  application.inject('controller', 'app', 'application:main');
}

export default {
  name: 'locale',
  initialize: initialize
};

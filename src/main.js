import _ from 'underscore';
import {Events} from 'backbone';

(function() {
  /**
   * Set global variables for the app
   */
  let setGlobalVariables = () => {
    window.App = {};
    App.events = _.clone(Events);
  };

  /**
   * Run after DOM is ready
   */
  let init = () => {
    console.log('check init');
    setGlobalVariables();
  };

  window.addEventListener('load', init);
})();

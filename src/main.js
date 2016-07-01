import _ from 'underscore';
import {Events} from 'backbone';
import Deck from './collections/Deck';
import GameStates from './models/GameStates';
import NewGameButton from './views/NewGameButton';
import HandContainer from './views/HandContainer';
import OptionsContainer from './views/OptionsContainer';

(function() {
  /**
   * Set global variables for the App
   */
  let setGlobalVariables = () => {
    window.App = {};
    App.events = _.clone(Events);
  };

  /**
   * Run after DOM is ready
   */
  let init = () => {
    setGlobalVariables();

    var collectionDeck = new Deck();
    var modelGameStates = new GameStates();

    new NewGameButton({el: '#newgame', model: modelGameStates});
    new HandContainer({el: '#hand-container', collection: collectionDeck, model: modelGameStates});
    new OptionsContainer({el: '#options-container', model: modelGameStates})
  };

  window.addEventListener('load', init);
})();

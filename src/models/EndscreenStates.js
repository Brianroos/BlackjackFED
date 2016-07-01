import {Model} from 'backbone';

/**
 * Model for states and functions for the endscreen view
 *
 * @constructor
 */
const EndscreenStates = Model.extend({
  defaults: {
    'dealerTotal': 0,
    'playerTotal': 0,
    'infoMessage': ''
  },

  /**
   * Show the modal with the final results
   *
   * @param dealerResult
   * @param playerResult
   * @param divDealer
   * @param divPlayer
   */
  showResults: function(dealerResult, playerResult, divDealer, divPlayer) {
    this.set({'dealerTotal': dealerResult});
    this.set({'playerTotal': playerResult});

    divDealer.innerHTML = dealerResult;
    divPlayer.innerHTML = playerResult;
  },

  /**
   * Generate an information message on the basis of the results
   * And give coins if the right result
   *
   * @param divMessage
   * @param gameStates
   */
  generateMessage: function(divMessage, gameStates) {
    let newBudget = 0;

    if(this.get('dealerTotal') == this.get('playerTotal')) {
      this.set({'infoMessage': 'Its a Draw!'});

      newBudget = gameStates.get('playerCoins') + 10;
      gameStates.set({'playerCoins': newBudget});
    }
    else if(this.get('playerTotal') <= 21) {
      if(this.get('playerTotal') > this.get('dealerTotal') || this.get('dealerTotal') > 21) {
        this.set({'infoMessage': 'U heeft gewonnen! U won 10 munten!'});

        newBudget = gameStates.get('playerCoins') + 20;
        gameStates.set({'playerCoins': newBudget});
      } else {
        this.set({'infoMessage': 'U heeft verloren.. U verloor 10 munten.'});
      }
    } else {
      this.set({'infoMessage': 'U heeft verloren.. U verloor 10 munten.'});
    }

    divMessage.innerHTML = this.get('infoMessage');
  }
});

export default EndscreenStates;

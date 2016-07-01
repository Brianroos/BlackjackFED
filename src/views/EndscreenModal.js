import {View} from 'backbone';

let gameStatesModel;

/**
 * Object representing the EndscreenModal element
 *
 * @constructor
 */
const EndscreenModal = View.extend({
  events: {
    'click #newhand': 'newHandHandler'
  },

  initialize: function(attributes) {
    this.$el.removeClass('hide');
    this.options = attributes;

    gameStatesModel = this.options.gamestatesmodel;
    let dealerResult = this.options.dealerTotal;
    let playerResult = this.options.playerTotal;

    let divDealer = this.$el.find('.dealer-result .score')[0];
    let divPlayer = this.$el.find('.player-result .score')[0];
    let divMessage = this.$el.find('.message')[0];

    this.model.showResults(dealerResult, playerResult, divDealer, divPlayer);
    this.model.generateMessage(divMessage, gameStatesModel);
  },

  /**
   * Click handler for the child newhand the $el
   *
   * @param e
   */
  newHandHandler: function(e) {
    e.preventDefault();
    this.$el.addClass('hide');

    // Reset the values of the model attributes back to default
    gameStatesModel.set({'gameStarted': true});
    gameStatesModel.set({'mainDeck': []});
    gameStatesModel.set({'playerDeck': []});
    gameStatesModel.set({'dealerDeck': []});
  }
});

export default EndscreenModal;

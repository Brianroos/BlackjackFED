import {View} from 'backbone';

/**
 * Object representing the OptionsContainer element
 *
 * @constructor
 */
const OptionsContainer = View.extend({
  events: {
    'click a#drawcard': 'drawCardHandler',
    'click a#stopgame': 'stopGameHandler'
  },

  initialize: function() {
    this.$el.addClass('hide');
    this.model.on('change:gameStarted', this.showContainer, this);
  },

  /**
   * Show the container if the game is started
   */
  showContainer: function() {
    if(this.model.get('gameStarted') == true) {
      this.$el.removeClass('hide');
    } else {
      this.$el.addClass('hide');
    }
  },

  /**
   * Click handler for the child drawcard of the $el
   *
   * @param e
   */
  drawCardHandler: function(e) {
    e.preventDefault();
    let playerHand = this.$el.parent().find('#player-hand');
    this.model.getNewCard('player', playerHand);
  },

  /**
   * Click handler for the child stopgame of the $el
   *
   * @param e
   */
  stopGameHandler: function(e) {
    e.preventDefault();
    let dealerHand = this.$el.parent().find('#dealer-hand');
    this.model.stopCurrentGame(dealerHand);
  }
});

export default OptionsContainer;

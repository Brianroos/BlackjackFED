import {View} from 'backbone';

/**
 * Object representing the HandContainer element
 *
 * @constructor
 */
const HandContainer = View.extend({
  initialize: function() {
    this.$el.addClass('hide');
    this.model.on('change:gameStarted', this.loadNewDeck, this);
  },

  /**
   * Show the container if the game is started and load the cards through the collection (Deck)
   */
  loadNewDeck: function() {
    this.$el.removeClass('hide');

    if(this.model.get('gameStarted') == true) {
      let newBudget = this.model.get('playerCoins') - 10;

      // Check for no budget
      if(newBudget <= 0) {
        this.model.set({'gameStarted': false});
        this.model.showMessage(this.$el);
      } else {
        this.model.set({'playerCoins': newBudget});

        this.collection.fetch({
          success: (collection, response) => this.loadNewDeckSuccessHandler(collection, response),
          error: (collection, response) => this.loadNewDeckErrorHandler(collection, response)
        });
      }
    }
  },

  /**
   * Shuffle the deck and give both players their starterhands if the data is loaded
   *
   * @param collection
   * @param response
   */
  loadNewDeckSuccessHandler: function(collection, response) {
    let budgetContainer = this.$el.parent().find('#budget-container');
    let dealerHand = this.$el.find('#dealer-hand');
    let playerHand = this.$el.find('#player-hand');

    this.model.shuffleDeck(response, budgetContainer);
    this.model.giveStarterHands(dealerHand, playerHand);
  },

  /**
   * Show an error in the console if the data couldn't load
   *
   * @param collection
   * @param response
   */
  loadNewDeckErrorHandler: function(collection, response) {
    console.log('Loading data failed');
  },
});

export default HandContainer;

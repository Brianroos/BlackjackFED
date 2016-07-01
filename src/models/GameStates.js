import _ from 'underscore';
import {Model} from 'backbone';
import EndscreenStates from '../models/EndscreenStates';
import EndscreenModal from '../views/EndscreenModal';

/**
 * Model for states and functions for the game itself
 *
 * @constructor
 */
const GameStates = Model.extend({
  defaults: {
    'gameStarted': false,
    'playerCoins': 100,
    'mainDeck': [],
    'playerDeck': [],
    'dealerDeck': []
  },

  /**
   * Show an error message to the player if there are no more coins
   *
   * @param handContainer
   */
  showMessage: function(handContainer) {
    handContainer[0].innerHTML = '<p>Helaas zijn al uw munten op..'+
      '<br><span>(Hint, vernieuw uw pagina!)</span></p>';
  },

  /**
   * Shuffle the array (Deck) and set it to the mainDeck attribute, also update the budget
   * (Using the Fisher-Yates shuffle)
   *
   * @param mainDeck
   * @param budgetContainer
   */
  shuffleDeck: function(mainDeck, budgetContainer) {
    let shuffledDeck = _.shuffle(mainDeck);
    this.set({'mainDeck': shuffledDeck});

    budgetContainer[0].innerHTML = '<p>Munten: <b>'+ this.get('playerCoins') +'</b></p>';
  },

  /**
   * Give both players their starters hands
   *
   * @param dealerHand
   * @param playerHand
   */
  giveStarterHands: function(dealerHand, playerHand) {
    let thisModel = this;
    let mainDeck = thisModel.get('mainDeck');

    dealerHand[0].innerHTML = '';
    playerHand[0].innerHTML = '';

    _.some(mainDeck, function(card, i) {
      let cardElement;
      let shifted = mainDeck.shift();

      if(i != 3) {
        cardElement = '<div class="card">'+
          '<img data-value="'+ shifted.value +
          '" src="'+ shifted.image +'"></div>';
      } else {
        cardElement = '<div class="card">'+
          '<img data-value="'+ shifted.value +
          '" src="https://s32.postimg.org/uxk2bhptx/Cardback.png"></div>';
      }

      // Even & odd
      if(i%2 == 0) {
        thisModel.set({'playerDeck': thisModel.get('playerDeck').concat(shifted)});
        playerHand.append(cardElement);
      } else {
        thisModel.set({'dealerDeck': thisModel.get('dealerDeck').concat(shifted)});
        dealerHand.append(cardElement);
      }

      if(i == 3) {
        thisModel.checkCurrentHandsValues(thisModel.get('dealerDeck'), thisModel.get('playerDeck'));
        return true;
      }
    });
  },

  /**
   * Get the first card from the mainDeck and give to the selected player/hand
   *
   * @param player
   * @param hand
   */
  getNewCard: function(player, hand) {
    let mainDeck = this.get('mainDeck');
    let cardElement;
    let shifted = mainDeck.shift();

    if(player == 'player') {
      this.set({'playerDeck': this.get('playerDeck').concat(shifted)});
    }
    else if(player == 'dealer') {
      this.set({'dealerDeck': this.get('dealerDeck').concat(shifted)});
    }

    cardElement = '<div class="card">'+
      '<img data-value="'+ shifted.value +
      '" src="'+ shifted.image +'"></div>';
    hand.append(cardElement);

    this.checkCurrentHandsValues(this.get('dealerDeck'), this.get('playerDeck'));
  },

  /**
   * Stop the current game and give cards to the dealer till the value in his hand is equal or higher than 16
   *
   * @param hand
   */
  stopCurrentGame: function(hand) {
    let thisModel = this;
    let mainDeck = thisModel.get('mainDeck');

    let startTotals = thisModel.checkCurrentHandsValues(thisModel.get('dealerDeck'), thisModel.get('playerDeck'));
    let dealerCurrent = parseInt(startTotals.slice(0, 2));
    let playerCurrent = parseInt(startTotals.slice(-2));

    if(dealerCurrent < 16) {
      _.some(mainDeck, function(card, i) {
        thisModel.getNewCard('dealer', hand);
        let currentTotals = thisModel.checkCurrentHandsValues(thisModel.get('dealerDeck'), thisModel.get('playerDeck'));
        dealerCurrent = parseInt(currentTotals.slice(0, 2));

        if(dealerCurrent >= 16) {
          return true;
        }
      });
    }

    // Stop the game and show the endscreen
    thisModel.set({'gameStarted': false});

    var modelEndscreenStates = new EndscreenStates();
    new EndscreenModal({el: '#endscreen-modal', model: modelEndscreenStates, gamestatesmodel: thisModel, dealerTotal: dealerCurrent, playerTotal: playerCurrent});
  },

  /**
   * Check the current total of both hands
   *
   * @param dealerArray
   * @param playerArray
   */
  checkCurrentHandsValues: function(dealerArray, playerArray) {
    let thisModel = this;
    let dTotal = 0;
    let pTotal = 0;
    let dCountA = 0;
    let pCountA = 0;

    // For each card in the dealer's hand
    _.each(dealerArray, function(card, i) {
      dTotal += parseInt(card.value);

      // Check for ACE
      if(card.value == 11) {
        dCountA++;
      }
      // Check for busted, but ACE in hand
      if(dTotal > 21 && dCountA != 0) {
        dTotal -= 10;
        dCountA--;
      }
    });

    // For each card in the player's hand
    _.each(playerArray, function(card, i) {
      pTotal += parseInt(card.value);

      // Check for ACE
      if(card.value == 11) {
        pCountA++;
      }
      // Check for busted, but ACE in hand
      if(pTotal > 21 && pCountA != 0) {
        pTotal -= 10;
        pCountA--;
      }
    });

    // Check for blackjack
    if(dealerArray.length == 2 && dTotal == 21 || playerArray.length == 2 && pTotal == 21) {
      this.set({'gameStarted': false});

      var modelEndscreenStates = new EndscreenStates();
      new EndscreenModal({el: '#endscreen-modal', model: modelEndscreenStates, gamestatesmodel: thisModel, dealerTotal: dTotal, playerTotal: pTotal});
    }

    // Check for more than 21 (Busted)
    if(pTotal > 21 && pCountA == 0) {
      this.set({'gameStarted': false});

      var modelEndscreenStates = new EndscreenStates();
      new EndscreenModal({el: '#endscreen-modal', model: modelEndscreenStates, gamestatesmodel: thisModel, dealerTotal: dTotal, playerTotal: pTotal});
    }

    // Optional return to get both values
    return dTotal + ' ' + pTotal;
  }
});

export default GameStates;

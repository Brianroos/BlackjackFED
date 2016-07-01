import Button from './Button';

/**
 * Object representing the NewGame button
 *
 * @constructor
 */
const NewGameButton = Button.extend({
  /**
   * Click handler for the $el
   *
   * @param e
   */
  clickHandler: function(e) {
    e.preventDefault();
    this.model.set({'gameStarted': true});
    this.$el.parent().addClass('hide');
  }
});

export default NewGameButton;

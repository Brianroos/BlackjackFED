import {View} from 'backbone';

/**
 * Object representing a button
 *
 * @constructor
 */
const Button = View.extend({
  events: {
    'click': 'clickHandler'
  }
});

export default Button;

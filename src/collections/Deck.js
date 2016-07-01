import {Collection} from 'backbone';
import Card from '../models/Card';

/**
 * Collection for the Deck endpoint
 *
 * @constructor
 */
const Deck = Collection.extend({
  model: Card,
  url: 'https://stud.hosted.hr.nl/0895143/BlackjackFED/'
});

export default Deck;

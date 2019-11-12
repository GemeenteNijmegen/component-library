import './scss/main.scss';

// These scripts don't need to be exposed (they need to be run once)
import './js/alerts';
import './js/buttonHorizontalCollapse';
import './js/cards';
import './js/checkbox';
import './js/datePicker';
import './js/lightbox';
import './js/navbar';
import './js/popover';

// These scripts will be exposed in the 'nijmegen' namespace
import Carousel from './js/modules/carousel';
import Pagination from './js/modules/pagination';

export { Carousel, Pagination };

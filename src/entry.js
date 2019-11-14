// Include the scss so it will be transformed to css
import './scss/main.scss';

// These scripts don't need to be exposed (they will initialize themselves)
import './js/alerts';
import './js/buttonHorizontalCollapse';
import './js/cards';
import './js/checkbox';
import './js/datePicker';
import './js/lightbox';
import './js/navbar';
import './js/popover';
import './js/responsiveTable';
import './js/select';
import './js/stepper';
import './js/switch';
import './js/tabs';
import './js/timePicker';
import './js/tooltips';

// These scripts will be exposed in the 'nijmegen' namespace
import Carousel from './js/modules/carousel';
import Pagination from './js/modules/pagination';

export { Carousel, Pagination };

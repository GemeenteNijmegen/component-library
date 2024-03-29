// Include the scss so it will be transformed to css
import './scss/main.scss';

// Promise polyfill for IE11
import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch';

// URL polyfill for IE
import 'url-polyfill';

// These scripts don't need to be exposed (they will initialize themselves)
import './js/alerts';
import './js/buttonHorizontalCollapse';
import './js/cards';
import './js/datePicker';
import './js/lightbox';
import './js/mdbTextareaFix';
import './js/navbar';
import './js/popover';
import './js/responsiveTable';
import './js/select';
import './js/sidenav';
import './js/skipLinks';
import './js/stepper';
import './js/switch';
import './js/tabs';
import './js/timePicker';
import './js/tooltips';

// These scripts will be exposed in the 'nijmegen' namespace
import Autocomplete from './js/modules/autocomplete';
import Carousel from './js/modules/carousel';
import Facets from './js/modules/facets';
import FacetsAdvanced from './js/modules/facetsAdvanced';
import Pagination from './js/modules/pagination';
import Pandosearch from './js/modules/pandosearch';
import SearchResults from './js/modules/searchResults';

export { Autocomplete, Carousel, Facets, FacetsAdvanced, Pagination, Pandosearch, SearchResults };

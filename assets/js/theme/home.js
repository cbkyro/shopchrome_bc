import PageManager from './page-manager';
import showMoreProducts from './halothemes/showMoreProducts';
import initInstagramFeed from './halothemes/instagram-feed';

export default class Home extends PageManager {
   loaded(next) {

      // HaloThemes functions
      showMoreProducts();
      initInstagramFeed();
   }
}

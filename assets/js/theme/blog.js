import PageManager from './page-manager';
import sidebarToggleMobile from './halothemes/sidebarToggleMobile';

export default class Blog extends PageManager {
    loaded() {
        sidebarToggleMobile();
    }
}


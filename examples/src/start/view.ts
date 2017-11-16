//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject } from 'aurelia-framework';
import { RouterConfiguration, Router } from "aurelia-router";

@autoinject()
export class ApiView {
  constructor() { }

  router;
  configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;
    config.map([
      {
        route: ['', 'prereq'],
        moduleId: './prereq',
        title: 'Required Knowledge',
        nav: true,
        auth: false,
        name: 'prereq'
      }, {
        route: 'install',
        moduleId: './install',
        title: 'Installation',
        nav: true,
        auth: false,
        name: 'install'
      }, {
        route: 'usage',
        moduleId: './usage',
        title: 'Usage',
        nav: true,
        auth: false,
        name: 'usage'
      }, {
        route: 'example',
        moduleId: './example',
        title: 'Example',
        nav: true,
        auth: false,
        name: 'example'
      }
    ]);
  }
}

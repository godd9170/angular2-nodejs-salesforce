import { Component } from '@angular/core';
import { Http } from '@angular/http';


@Component({
  selector: 'app',
  template: `
    <h1>Welcome to your Angular2 + Webpack + ES6 Playground</h1>
    <md-grid-list
      cols="3"
      rowHeight="300px"
      gutterSize="2em">
      <md-grid-tile
          *ngFor="let event of events">
          <event [category]="event.category"></event>
      </md-grid-tile>
    </md-grid-list>
  `
})

export default class App {
  static get parameters() {
    return [[Http]];
  }

  constructor(http) {
    this._http = http;
  }

  ngOnInit() {
      this.getEvents()
      .subscribe(x => this.events = x);
  }

  getEvents() {
      const url = 'http://beta.json-generator.com/api/json/get/4JMx2Zk-X';
      return this._http.get(url)
          .map(x => x.json());
  }
};

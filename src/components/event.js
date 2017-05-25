import { Component, Input } from '@angular/core';

@Component({
  selector: 'event',
  template: `
    <md-card class="example-card">
    <md-card-header>
      <div md-card-avatar class="example-header-image"></div>
      <md-card-title>Shiba Inu</md-card-title>
      <md-card-subtitle>Dog Breed</md-card-subtitle>
    </md-card-header>
    <img md-card-image src="https://unsplash.it/200/300">
    <md-card-content>
      <p>
        {{ category }}
      </p>
    </md-card-content>
    <md-card-actions>
      <button md-button>LIKE</button>
      <button md-button>SHARE</button>
    </md-card-actions>
  </md-card>`,
  //styleUrls: ['./components/event.css'],
  inputs: ['category'],
})
export class Event {
  constructor() {}
}

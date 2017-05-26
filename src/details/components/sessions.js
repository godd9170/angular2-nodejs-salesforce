import { Component } from '@angular/core';


@Component({
  selector: 'sessions',
  template: require('./sessions.html'),
  styles: [require('./sessions.css')],
  inputs: ['sessions'],
})

export default class SessionsComponent {
  constructor() {}
};
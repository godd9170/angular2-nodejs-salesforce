import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Welcome to your Angular2 + Webpack + ES6 Playground</h1>
    <h2>Have yourself {{ what }}</h2>
    <button (click)="sayHi()">Say Hi</button>
  `
})
export default class App {
  constructor() {
    this.what = "a good time!";
  }

  sayHi() {
    alert('Hi');
  }
};

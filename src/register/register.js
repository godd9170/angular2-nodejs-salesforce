import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'register',
  template: require('./register.html'),
  styles: [require('./register.css')]
})

export default class RegisterComponent {
  static get parameters() {
    return [[ActivatedRoute], [Http]];
  }
  
  constructor(route, http) {
    this._route = route;
    this._http = http;
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.id = params['id']; //get the event id
      
      this.getEventDetails() //get the details for the event
      .subscribe(x => {
          this.details = x;
          this.start = moment(x['conference360__start__c']).format('ddd, hA');
          this.end = moment(x['conference360__end__c']).format('ddd, hA')
      });
    });
  }

  getEventDetails() {
    const url = `http://localhost:3000/api/events/${this.id}`;
    return this._http.get(url)
        .map(x => x.json());
  }
};
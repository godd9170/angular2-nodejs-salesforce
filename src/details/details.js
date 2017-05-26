import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import moment from 'moment'; //date util

@Component({
  selector: 'event-details',
  template: require('./details.html'),
  styles: [require('./details.css')]
})

export default class DetailsComponent {
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
          console.log('MOMENT: ', moment);
          this.start = moment(x['conference360__start__c']).format('ddd, hA');
          this.end = moment(x['conference360__end__c']).format('ddd, hA')
      });
    });
  }


  getEventDetails() {
    const url = `/api/events/${this.id}`;
    return this._http.get(url)
        .map(x => x.json());
  }
};
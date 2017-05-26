import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'register',
  template: require('./register.html'),
  styles: [require('./register.css')]
})

export default class RegisterComponent {
  static get parameters() {
    return [[ActivatedRoute], [Http], [FormBuilder]];
  }
  
  constructor(route, http, formbuilder) {
    this._route = route;
    this._http = http;
    this._formbuilder = formbuilder;

    this.registerForm = this._formbuilder.group({
      first: ["", Validators.required],
      last: ["", Validators.required],
      email: ["", Validators.required],
      company: ["", Validators.required],
      website: ["", Validators.required],
      phone: ["", Validators.required]
    });
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.id = params['id']; //get the event id
      this.getEventDetails() //get the details for the event
      .subscribe(x => {
          this.details = x;
      });
    });
  }

  registerUser(event) {
    console.log(this.registerForm.value);
    const url = `http://localhost:3000/api/events/${this.id}/register`;
    this._http.post(url, this.registerForm.value)
      .map( (resp) => {
        console.log('rESP: ', resp);
      });
  }

  getEventDetails() {
    const url = `/api/events/${this.id}`; //http://localhost:3000
    return this._http.get(url)
        .map(x => x.json());
  }
};
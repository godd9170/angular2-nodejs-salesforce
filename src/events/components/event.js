import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import Dialog from '../../dialog/dialog';
import moment from 'moment'; //date util

@Component({
  selector: 'event',
  template: require('./event.html'),
  styles: [require('./event.css')],
  inputs: ['event'],
})
export default class Event {
  static get parameters() {
    return [[Router], [MdDialog]];
  }

  constructor(router, mddialog) {
    this._router = router;
    this._mddialog = mddialog; 
  }

  openDialog() {
    let dialogRef = this._mddialog.open(Dialog);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }

  ngOnInit() {
    this.eventDate = !!this.event['conference360__start__c'] ? moment(this.event['conference360__start__c']).format('ddd, hA') : null;
  }

  gotoDetail() {
    this._router.navigate(['/detail', this.event.id]);
  }

  gotoRegister() {
    this._router.navigate(['/register', this.event.id]);
  }
}
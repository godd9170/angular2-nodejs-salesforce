import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';


@Component({
  selector: 'dialog',
  template: require('./dialog.html')
})
export default class Dialog {
  static get parameters() {
    return [[MdDialogRef]];
  }
  constructor(dialogRef) {
    this._dialogRef = dialogRef;
  }
}
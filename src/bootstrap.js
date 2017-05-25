import 'reflect-metadata';
import 'zone.js';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { enableProdMode } from '@angular/core';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule, MdButtonModule, MdCardModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Components

import { Event } from './components/event';


import App from './app';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCardModule
  ],
  declarations: [
    App,
    Event
  ],
  bootstrap: [ App ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);

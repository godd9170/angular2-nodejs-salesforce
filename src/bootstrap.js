import 'reflect-metadata';
import 'zone.js';
import { enableProdMode } from '@angular/core';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import { MaterialModule, MdButtonModule, MdCardModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

if (process.env.NODE_ENV == 'production') {
  enableProdMode();
}

//Components
import DetailsComponent from './details/details';
import RegisterComponent from './register/register';
import SessionsComponent from './details/components/sessions';
import EventsComponent from './events/events';
import Dialog from './dialog/dialog';
import Event from './events/components/event';
import App from './app';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCardModule,
    RouterModule.forRoot([
      { path: '', component: EventsComponent},
      { path: 'detail/:id', component: DetailsComponent},
      { path: 'register/:id', component: RegisterComponent}
    ])
  ],
  declarations: [
    App,
    Event,
    Dialog,
    EventsComponent,
    DetailsComponent,
    SessionsComponent,
    RegisterComponent
  ],
  entryComponents: [
    Dialog
  ],
  bootstrap: [ App ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);

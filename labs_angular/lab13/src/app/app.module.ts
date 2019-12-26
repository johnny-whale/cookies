import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkerComponent } from './worker/worker.component';
import { NamePipe } from './pipes/name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WorkerComponent,
    NamePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

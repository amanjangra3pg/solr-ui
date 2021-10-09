import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ResultCardComponent } from './result-card/result-card.component';
import { HttpService } from './services/http-service';
import { SolrService } from './services/solr-service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResultCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [SolrService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }

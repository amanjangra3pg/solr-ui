import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HighlightPipe } from './pipes/HighlightPipe';
import { ResultCardComponent } from './result-card/result-card.component';
import { HttpService } from './services/http-service';
import { SolrService } from './services/solr-service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResultCardComponent,
    HighlightPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [SolrService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountriesListComponent } from './countries-list/countries-list.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';

import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    AppComponent,
    CountriesListComponent,
    CountryDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    MatDividerModule,
    MatButtonModule,
 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

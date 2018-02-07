import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SignupComponent } from './user/signup/signup.component';
import { SigninComponent } from './user/signin/signin.component';
import { CompareComponent } from './compare/compare.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './user/auth.service';
import { CompareService } from './compare/compare.service';
import { CompareInputComponent } from './compare/compare-input/compare-input.component';
import { CompareResultsComponent } from './compare/compare-results/compare-results.component';
import {SaleEntryComponent} from './sale/saleEntry.component';
import {InventoryEntry} from './sale/inventoryEntry.component';
import {DataService} from './service/data.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    CompareComponent,
    CompareInputComponent,
    CompareResultsComponent,
    SaleEntryComponent,
    InventoryEntry
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [AuthService, CompareService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

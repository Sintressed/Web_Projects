import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { FileSelectDirective } from 'ng2-file-upload';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MerchComponent } from './merch/merch.component';
import { TourComponent } from './tour/tour.component';
import { ListenComponent } from './listen/listen.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CartComponent } from './cart/cart.component';
import { EditComponent } from './edit/edit.component';
import { TaskService } from './task.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MerchComponent,
    TourComponent,
    ListenComponent,
    NotfoundComponent,
    CartComponent,
    EditComponent,
    FileSelectDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [TaskService,],
  bootstrap: [AppComponent]
})
export class AppModule { }

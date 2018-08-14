import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MerchComponent } from './merch/merch.component';
import { TourComponent } from './tour/tour.component';
import { ListenComponent } from './listen/listen.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'merch', component: MerchComponent, pathMatch: 'full'},
  {path: 'tour', component: TourComponent, pathMatch: 'full'},
  {path: 'listen', component: ListenComponent, pathMatch: 'full'},
  {path: 'edit', component: EditComponent, pathMatch: 'full'},
  {path: '**', component: NotfoundComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShiftsComponent } from './components/shifts/shifts.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'booking/:id', component: ShiftsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes: Routes = [
  {path:'',redirectTo:'home-page',pathMatch:'full'},
  {component:HomePageComponent,path:'home-page'},
  {component:UserProfileComponent,path:'user-profile/:userId'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

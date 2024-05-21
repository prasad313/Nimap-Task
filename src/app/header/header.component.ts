import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title:String="DEMO APP";

  menuType:string='home';

  constructor(private routerObj : Router){
    this.routerObj.events.subscribe((val:any)=>{  //check current path
    
      if(val.url)
      {
        // if(localStorage.getItem('seller') && val.url.includes('seller'))
         if(val.url.includes('home-page'))
         {

               this.menuType='home';  
         }
         else
         {        
          this.menuType='porfile';
         }
      }
     })
   
  }

  ngOnInit(): void {

    
    
  }


}

import { Component,DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'my-app';
  ismenurequired=false;
  constructor(private router:Router){

  }
  ngDoCheck(): void {
    let currenturl = this.router.url;
    if(currenturl=='/login' || currenturl=='/registar'){
      this.ismenurequired=false;
    }else{
      this.ismenurequired=true;
    }

  }
}

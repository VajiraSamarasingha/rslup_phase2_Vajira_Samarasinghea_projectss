import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private builder:FormBuilder, private service:AuthService, private router:Router,
    private toastr:ToastrService){
      sessionStorage.clear();
  }

  userdata:any;

  loginform = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });

  proceedlogin() { 
    
    this.service.Getbycode(this.loginform.value.username).subscribe(res => {
      this.userdata = res;
      console.log(this.userdata);
      if(this.userdata.password === this.loginform.value.password){
        if(this.userdata.isactive){
          sessionStorage.setItem('username',this.userdata.id);
          sessionStorage.setItem('role',this.userdata.role);
          this.router.navigate(['']);
        }else{
          this.toastr.warning('Please Contact Admin','Inactive user.')
        }
      }else{
        this.toastr.warning('Invalid Credentials.')
      }
    });
  }
}

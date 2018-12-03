import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { PnotifyService } from '../../services/pnotify.service';
declare var $:any;
var self : any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  pnotify = undefined;
  message: string;
  constructor(private router: Router, private auth: AuthService, pnotifyService: PnotifyService) { 
    this.pnotify = pnotifyService.getPNotify();
  }
  ngOnInit() {
    self=this;
  }
  login(){
    this.auth.login(this.user).then((user) => {
      var data = user.json();
      if(data.errorCode>0 && data.status === 'fail')
      {
        this.message = data.message;
        $('#error').removeClass('d-none');
      }
      else
      {
        if(data.data.active == 0 && data.data.role == 0 || data.data.active == 0 && data.data.role == 4)
        {
          localStorage.setItem('token', user.json().data.token);
          const token = localStorage.getItem('token');
          this.auth.ensureAuthenticatedwhenlogin(token).then((userlogin)=>{
            if(user.json().errorCode==0 && data.status === 'connected')
            {
              this.router.navigate(['/home']);
              self.pnotify.success({
                text:"Đăng nhập thành công !",
                delay: 2000
              })
            }
            else
            {
              self.pnotify.error({
                text: "Bạn không the vào hệ thống này!.",
                delay:1000
              });
            }
          })
         
        }
        else if(data.data.role != 0)
        {
          self.pnotify.error({
            text: "Bạn không có quyền vào hệ thống này!.",
            delay:1000
          });
        }
        else
        {
          self.pnotify.error({
            text: "Tài khoản tạm thời không khả dụng.",
            delay:1000
          });
        }
      }

    })
    .catch((err) => {
      console.log(err);
    });
  }


}

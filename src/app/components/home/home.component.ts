import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { PnotifyService } from '../../services/pnotify.service';
declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users:any =[];
  pnotify = undefined;
  constructor(private router: Router,private auth: AuthService, pnotifyService: PnotifyService) { 
    this.pnotify = pnotifyService.getPNotify();
  }
  logout()
  {
    this.router.navigateByUrl('/login');
  }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token == '' || token == null ) 
    {
      this.logout();
    }else{
    if (token ) {
      this.auth.ensureAuthenticated(token).then((user) => {
        if (user.json().status === 'connected') {
          this.users = user.json().data
        }
        else
        {
          this.pnotify.error({
            text: "Phiên làm việc hết hạn.Vui lòng đăng nhập lại!.",
            delay:1000
          });
         this.logout(); 
        }
      })
      .catch((err) => {
      });
    }
  }
  $.getScript("assets/js/front.js");
  }

}

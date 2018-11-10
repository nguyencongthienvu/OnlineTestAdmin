import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PnotifyService } from '../../services/pnotify.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  token:any;
  pnotify = undefined;
  constructor(private auth: AuthService,private Router:Router, pnotifyService: PnotifyService) {
    this.pnotify = pnotifyService.getPNotify();
   }
   logout()
  {
    this.Router.navigateByUrl('/login');
  }
  ngOnInit() {
    
  }
  backhome()
  {
    const token = localStorage.getItem('token');
    if(token == '' || token == null ) 
    {
      this.logout();
    }else{
    if (token ) {
      this.auth.ensureAuthenticated(token).then((user) => {
        if (user.json().status === 'connected') {
          this.Router.navigate(['/home']);  
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
        console.log(err);
      });
    }
  }
    
  }

}

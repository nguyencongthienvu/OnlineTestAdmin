import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  Profile: any =[];
  constructor(private auth: AuthService) {
    this.getData();
   }

  ngOnInit() {
  }

  public getData() {
    const token = localStorage.getItem('token');
    if(token != '' || token != null ) 
    {
    if (token ) {
      this.auth.Profile(token).then((profiledata) => {
        if (profiledata.json().status === 'successfully') {
          this.Profile = profiledata.json().data[0];
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
  }

}

import { Component,OnInit} from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string;
  isUserLogged=false;
   constructor(private authService: AuthenticationService) {
    this.title = 'Outreach Feedback Management System';
    
  }


   ngOnInit() {
     this.isloggin();
   }
   isloggin(){
     this.isUserLogged=this.authService.isLoggedIn();
   }
}

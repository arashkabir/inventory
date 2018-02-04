import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './user/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated = false;
  userName="";
  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.authService.authStatusChanged.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;
        if (authenticated) {
          this.router.navigate(['/compare']);
          if(this.authService.getAuthenticatedUser())
              this.userName=this.authService.getAuthenticatedUser().getUsername();
        } else {
          this.router.navigate(['/']);
        }
      }
    );
    this.authService.initAuth();
  }

  onLogout() {
    this.authService.logout();
  }
}

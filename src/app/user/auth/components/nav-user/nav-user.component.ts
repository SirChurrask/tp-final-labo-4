import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../service/user.service';
import { ProfileButtonComponent } from "../profile-button/profile-button.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-user',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ProfileButtonComponent],
  templateUrl: './nav-user.component.html',
  styleUrl: './nav-user.component.css'
})
export class NavUserComponent implements OnInit{
  logged : boolean = false;
  router = inject(Router);
  db = inject(UserService);

  ngOnInit(): void {
    this.db.currentData.subscribe(
      value => { this.logged = value}
    )
  }

  toProfile(){
    this.router.navigate(['/profile'])
  }

  logoutFunc(){
    this.db.logOut();
  }
}

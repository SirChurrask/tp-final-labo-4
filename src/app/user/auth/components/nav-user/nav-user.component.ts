import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-nav-user',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './nav-user.component.html',
  styleUrl: './nav-user.component.css'
})
export class NavUserComponent implements OnInit{
  logged : boolean = false;
  db = inject(UserService);

  ngOnInit(): void {
    this.db.currentData.subscribe(
      value => { this.logged = value}
    )
  }

  logoutFunc(){
    this.db.logOut();
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AvatarComponent } from "../avatar-change/avatar-change.component";
import { UserService } from '../../../auth/service/user.service';
import { Router } from '@angular/router';
import { ProfileService } from '../../service/profile.service';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [MatIconModule, AvatarComponent],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.css'
})
export class ProfileFormComponent implements OnInit{

  router = inject(Router);
  db = inject(UserService);
  logged: boolean = false;


  ngOnInit(){

    this.db.currentData.subscribe(
      value => {
        this.logged = value;
        if(!this.logged){
          this.router.navigate(['/login'])
        }
      }
    )
  }

  

  
}

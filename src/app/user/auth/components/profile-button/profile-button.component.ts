import { Component, inject, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ProfileService } from '../../../profile/service/profile.service';

@Component({
  selector: 'app-profile-button',
  standalone: true,
  imports: [],
  templateUrl: './profile-button.component.html',
  styleUrl: './profile-button.component.css'
})
export class ProfileButtonComponent implements OnInit{

  imageSource: string = "";

  sanitizer = inject(DomSanitizer);
  ps = inject(ProfileService);

  ngOnInit () {
    this.ps.currentdata.subscribe(
      value => {
        this.imageSource = value;
      }
    )
    this.ps.getAvatar();
  }
}

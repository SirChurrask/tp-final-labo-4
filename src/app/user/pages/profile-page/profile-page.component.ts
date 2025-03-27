import { Component } from '@angular/core';
import { TitleComponent } from "../../../shared/components/title/title.component";
import { ProfileFormComponent } from "../../profile/components/profile-form/profile-form.component";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [TitleComponent, ProfileFormComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {

}

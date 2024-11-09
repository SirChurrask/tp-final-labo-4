import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavUserComponent } from './user/components/nav-user/nav-user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NavUserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mh_item_test';
}

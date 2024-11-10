import { Component } from '@angular/core';
import { ReactiveFormsModule , FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  

}

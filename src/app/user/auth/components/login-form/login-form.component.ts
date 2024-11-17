import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit{

  fb = inject(FormBuilder);
  form : FormGroup;
  submitted : boolean = false;
  userLogged : boolean = false;
  wrongUorP : boolean = false;
  router = inject(Router);
  db = inject(UserService);

  ngOnInit(): void {
    if(this.db.getLogged()){
      this.router.navigate(['/']);
    }
  }

  constructor(){
    this.form = this.fb.group({
      username: new FormControl('',[Validators.required,Validators.minLength(5)]),
      password: new FormControl('',[Validators.minLength(5),Validators.required]),
    })
  }

  onSubmit(){
    this.submitted = true;
    if(this.form.invalid){
      console.log("Invalid form");
      return;
    }else{
      this.db.login(this.form.getRawValue()).subscribe({
        next: (data) => {
          if(!data){ this.wrongUorP = true; }
        },
        error: (err: Error) => {console.log(err)}
      }) 
    }
  }
}

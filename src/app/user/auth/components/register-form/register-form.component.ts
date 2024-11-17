import { AfterViewInit, Component, ViewChild , ElementRef, inject} from '@angular/core';
import { ReactiveFormsModule , FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { User } from '../../../interfaces/user';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  service = inject(UserService);
  form: FormGroup;
  router = inject(Router);

  ngOnInit(): void {
    if(this.service.getLogged()){
      this.router.navigate(['/']);
    }
  }

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      username: new FormControl('',[Validators.required,Validators.minLength(5)]),
      password: new FormControl('',[Validators.minLength(5),Validators.required]),
    })
  }

  submitted : boolean = false;
  userNotAvailable : boolean = false;
  notAvailableTextContent : String = "zzz";
  userRegistered : boolean = false;

  onSubmit(){
    this.submitted = true;
    if(this.form.invalid){
      console.log("Invalid form");
      return;
    }
    this.service.getUserAvilable(this.form.get("username")?.value).subscribe({
      next: (data) => {
        if(data.length){
          this.userNotAvailable = true;
          if(this.userNotAvailable){
            this.changeDiv();
          }
        }else{
          this.service.postUser(this.form.value).subscribe({
            next: (data) => {
              this.userRegistered = true;
            },
            error: (err: Error) => { console.log(err) }
          })
        }
      },
      error: (err: Error) => {console.log(err)}
    })
  }

  changeDiv(){
    this.notAvailableTextContent = "Username " + this.form.get("username")?.value + " not available";
  }
}

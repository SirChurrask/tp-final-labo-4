import { AfterViewInit, Component, ViewChild , ElementRef, inject} from '@angular/core';
import { ReactiveFormsModule , FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { DOCUMENT } from '../../../../../node_modules/@angular/common/index';
import { User } from '../../interfaces/user';

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

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      username: new FormControl('',[Validators.required,Validators.minLength(5)]),
      password: new FormControl('',[Validators.minLength(5),Validators.required]),
    })
    this.service.getAllUser().subscribe(
      {
        next: (users : User[]) => {
          console.log(users);
        },
        error: (err: Error) => {
          console.log(err.message)
        }
      }
    )
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
    /*this.service.getUserAvilable(this.form.get("username")?.value)
    .then( data => {
      if(data != undefined){
        this.userNotAvailable = data;
        if(this.userNotAvailable){
          this.changeDiv();
        }else{
          console.log(this.form.value)
          this.service.postUser(this.form.value)
          .then(data => console.log(data))
          .then(() => { this.userRegistered = true } )
        }
      }
    })*/
  }

  changeDiv(){
    this.notAvailableTextContent = "Username " + this.form.get("username")?.value + " not available";
  }

}

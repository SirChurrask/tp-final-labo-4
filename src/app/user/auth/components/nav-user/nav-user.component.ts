import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../service/user.service';
import { ProfileButtonComponent } from "../profile-button/profile-button.component";
import { Router } from '@angular/router';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ProfileFormComponent } from "../../../profile/components/profile-form/profile-form.component";
import { ProfileService } from '../../../profile/service/profile.service';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-nav-user',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ProfileButtonComponent,MatButtonModule, MatDialogModule],
  templateUrl: './nav-user.component.html',
  styleUrl: './nav-user.component.css'
})
export class NavUserComponent implements OnInit{
  logged : boolean = false;
  router = inject(Router);
  readonly dialog = inject(MatDialog);
  db = inject(UserService);
  ps = inject(ProfileService);
  

  ngOnInit(): void {
    this.ps.currentdata.subscribe(
      value => { 
        this.dialog.closeAll();
      }
    )
    this.db.currentData.subscribe(
      value => { this.logged = value}
    )
  }

  toProfile(){
    // this.router.navigate(['/profile'])
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logoutFunc(){
    this.db.logOut();
  }

  
}

@Component({
  standalone: true,
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
  imports: [MatDialogModule, MatButtonModule, ProfileFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './dialog-content-example-dialogt.css',
})
export class DialogContentExampleDialog {}

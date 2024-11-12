import { Component, inject, OnInit } from '@angular/core';
import { Armor } from '../../../armor/interface/armor';
import { Weapon } from '../../../weapon/interface/weapon';
import { WeaponComponent } from '../../../weapon/component/weapon/weapon.component';
import { ArmorSetsComponent } from '../../../armor/armor_sets/armor-sets/armor-sets.component';
import { UserService } from '../../services/user.service';
import { PendingService } from '../../../shared/service/pending.service';
import { AcquiredService } from '../../../shared/service/acquired.service';
import { WeaponsService } from '../../../weapon/service/weapons.service';
import { WantedItem } from '../../../shared/interface/wanted-item';
import { ArmorService } from '../../../armor/service/armor.service';
import { Router } from '@angular/router';
import { ListaPendientesCardComponent } from '../lista-pendientes-card/lista-pendientes-card.component';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-pendientes',
  standalone: true,
  imports: [ListaPendientesCardComponent,CommonModule],
  templateUrl: './lista-pendientes.component.html',
  styleUrl: './lista-pendientes.component.css'
})
export class ListaPendientesComponent implements OnInit {

  pendientesArmor: Array<Armor> = [];
  pendientesWeapon: Array<Weapon> = [];
  data: WantedItem[] = [];
  logged: boolean = false;
  db = inject(UserService);
  ps = inject(PendingService);
  as = inject(AcquiredService);
  weaponservice = inject(WeaponsService);
  Armorservice = inject(ArmorService);
  router = inject(Router);


  order(){
    for (let element of this.data) {
      if (element.type == 'weapon'){
        this.pendientesWeapon.push(this.weaponservice.getWeaponbyId(element.id));
      }
      if (element.type == 'armor'){
        this.pendientesArmor.push(this.Armorservice.getArmorById(element.id));
      }
    }
  }

  orderByType(){
    let w : boolean | Observable<Weapon[]> = this.weaponservice.getWeapons();
    if(typeof w == 'boolean'){
      this.order();
    }else{
      w.subscribe({
        next: () =>{
          this.order();
        },
        error: (err: Error) => {console.log(err)}
      })
    }

    let a : boolean | Observable<Armor[]> = this.Armorservice.getArmors();
    if(typeof w == 'boolean'){
      this.order();
    }else{
      w.subscribe({
        next: () =>{
          this.order();
        },
        error: (err: Error) => {console.log(err)}
      })
    }
  }

  ngOnInit(){

    this.db.currentData.subscribe(
      value => {
        this.logged = value;
        if(!this.logged){
          this.router.navigate(['/login'])
        }
      }
    )
    this.ps.getPending();
    this.as.getAcquired();

    this.ps.currentData.subscribe(
      value => {
        if(value != undefined){
          this.data = value;
          this.orderByType();
        }
      }
    )
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { Armor } from '../../../armor/interface/armor';
import { materiales, Weapon } from '../../../weapon/interface/weapon';
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
import { Material } from '../../../shared/interface/material';

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
  userPending: WantedItem[] = [];

  getMaterialesItem(id: string, type: string): Material[] {
    var rst : Material[] = []
    for (let element of this.data){
      if (type == element.type && id == element.id){
        rst = element.materiales;
      }
    }
    return rst;
  }

  updateMaterial(item: WantedItem){
    // let i = this.userPending.indexOf(this.userPending.filter(x => x.id == item.id)[0]);
    // this.userPending[i] = item;
    this.ps.updatePending(this.userPending);
  }

  deletePending(item: WantedItem){
    this.ps.deletePending(item);
  }

  orderArmor(){
    this.pendientesArmor = [];
    for (let element of this.data) {
      if (element.type == 'armor'){
        this.pendientesArmor.push(this.Armorservice.getArmorById(element.id));
      }
    }
  }

  orderWeapon(){
    this.pendientesWeapon = [];
    for (let element of this.data){
      if (element.type == 'weapon'){
        this.pendientesWeapon.push(this.weaponservice.getWeaponbyId(element.id));
      }
    }
  }

  orderByType(){
    this.pendientesArmor = [];
    this.pendientesWeapon = [];
    let w : boolean | Observable<Weapon[]> = this.weaponservice.getWeapons();
    if(typeof w == 'boolean'){
      this.orderWeapon();
    }else{
      w.subscribe({
        next: () =>{
          this.orderWeapon();
        },
        error: (err: Error) => {console.log(err)}
      })
    }

    let a : boolean | Observable<Armor[]> = this.Armorservice.getArmors();
    if(typeof a == 'boolean'){
      this.orderArmor();
    }else{
      a.subscribe({
        next: () =>{
          this.orderArmor();
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
    this.ps.getPending().subscribe({
      next: (data) => {
        this.userPending = data.pending
      },
      error: (err: Error) => console.log(err)
    });
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

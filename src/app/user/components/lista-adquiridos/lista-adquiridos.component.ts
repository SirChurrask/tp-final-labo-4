import { Component, OnInit, inject } from '@angular/core';
import { Armor } from '../../../armor/interface/armor';
import { Weapon } from '../../../weapon/interface/weapon';
import { AcquiredItem } from '../../../shared/interface/acquired-item';
import { UserService } from '../../services/user.service';
import { PendingService } from '../../../shared/service/pending.service';
import { AcquiredService } from '../../../shared/service/acquired.service';
import { WeaponsService } from '../../../weapon/service/weapons.service';
import { ArmorService } from '../../../armor/service/armor.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ListaAdquiridosCardComponent } from '../lista-adquiridos-card/lista-adquiridos-card.component';

@Component({
  selector: 'app-lista-adquiridos',
  standalone: true,
  imports: [ListaAdquiridosCardComponent],
  templateUrl: './lista-adquiridos.component.html',
  styleUrl: './lista-adquiridos.component.css'
})
export class ListaAdquiridosComponent implements OnInit{

  adquiridosArmor: Array<Armor> = [];
  adquiridosWeapon: Array<Weapon> = [];
  data: AcquiredItem[] = [];
  logged: boolean = false;
  db = inject(UserService);
  ps = inject(PendingService);
  as = inject(AcquiredService);
  weaponservice = inject(WeaponsService);
  Armorservice = inject(ArmorService);
  router = inject(Router);


  orderArmor(){
    for (let element of this.data) {
      if (element.type == 'armor'){
        this.adquiridosArmor.push(this.Armorservice.getArmorById(element.id));
      }
    }
  }

  orderWeapon(){
    for (let element of this.data){
      if (element.type == 'weapon'){
        this.adquiridosWeapon.push(this.weaponservice.getWeaponbyId(element.id));
      }
    }
  }

  orderByType(){
    this.adquiridosArmor = [];
    this.adquiridosWeapon = [];
    //wepon
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
    //armor
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
    this.ps.getPending();
    this.as.getAcquired();

    this.as.currentdata.subscribe(
      value => {
        if(value != undefined){
          this.data = value;
          this.orderByType();
        }
      }
    )
  }
}

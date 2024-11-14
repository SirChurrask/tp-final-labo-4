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
import { User } from '../../interfaces/user';

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

  adquiridosArmorf: Array<Armor> = [];
  adquiridosWeaponf: Array<Weapon> = [];

  data: AcquiredItem[] = [];
  logged: boolean = false;
  db = inject(UserService);
  ps = inject(PendingService);
  as = inject(AcquiredService);
  weaponservice = inject(WeaponsService);
  Armorservice = inject(ArmorService);
  router = inject(Router);

  filterType : string[] = [];

  filterElement : string[] = [];



  toggleFilterType(type: string){

    if(this.filterType.includes(type)){
      this.filterType = this.filterType.filter( x => x != type);
    }else{
      this.filterType.push(type);
    }
    this.activeFilter();
    this.changeButtonBC();

  }

  changeButtonBC(){
    let buttons : any = document.getElementsByClassName("filterButton");
    for(let i = 0;i < buttons.length;i++){
      let aux = buttons[i];
      if(this.filterElement.includes(aux.name) || this.filterType.includes(aux.name))
        aux.style.background = '#414a66';
      else{
        aux.style.background = '#323232';
      }
    }
  }

  toggleFilterElement(element: string){
    if(this.filterElement.includes(element)){
      this.filterElement = this.filterElement.filter( x => x != element);
    }else{
      this.filterElement.push(element);
    }
    this.activeFilter();
    this.changeButtonBC();
  }

  activeFilter(){

    if(this.filterType.length){
      this.adquiridosWeaponf = this.adquiridosWeapon.filter(x => this.filterType.includes(x.type));
      this.adquiridosArmorf = this.adquiridosArmor.filter(x => this.filterType.includes(x.type));
    }else{
      this.adquiridosWeaponf = this.adquiridosWeapon;
      this.adquiridosArmorf = this.adquiridosArmor;
    }
    if(this.filterElement.length){
     this.adquiridosWeaponf = this.adquiridosWeaponf.filter(x => x.elements.map( element => element.type).some( ele => this.filterElement.includes(ele)));
    };
    
  }


  orderArmor(){
    this.adquiridosArmor = [];
    for (let element of this.data) {
      if (element.type == 'armor'){
        this.adquiridosArmor.push(this.Armorservice.getArmorById(element.id));
      }
    }
    this.activeFilter()
  }

  orderWeapon(){
    this.adquiridosWeapon = [];
    for (let element of this.data){
      if (element.type == 'weapon'){
        this.adquiridosWeapon.push(this.weaponservice.getWeaponbyId(element.id));
      }
    }
    this.activeFilter()
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

  remove(item : AcquiredItem){
    this.as.deleteAcquired(item).subscribe({
      next: () => {
        this.orderByType()
      },
      error: (err: Error) => {console.log(err)}
     })
    
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

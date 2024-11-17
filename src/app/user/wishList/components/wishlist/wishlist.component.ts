import { Component, inject, OnInit } from '@angular/core';
import { Armor } from '../../../../armor/interface/armor';
import { Weapon } from '../../../../weapon/interface/weapon';
import { WeaponsService } from '../../../../weapon/service/weapons.service';
import { ArmorService } from '../../../../armor/service/armor.service';
import { Router } from '@angular/router';
import { WishlistCardComponent } from '../wishlist-card/wishlist-card.component';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { Material } from '../../../../shared/interface/material';
import { SearchComponent } from '../../../../shared/components/search/search.component';
import { FilterComponent } from '../../../../shared/components/filter/filter.component';
import { UserService } from '../../../auth/service/user.service';
import { PendingService } from '../../service/pending.service';
import { AcquiredService } from '../../../adquiredList/service/acquired.service';
import { WantedItem } from '../../../interfaces/wanted-item';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [WishlistCardComponent,CommonModule,SearchComponent,FilterComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {

  pendientesArmor: Array<Armor> = [];
  pendientesWeapon: Array<Weapon> = [];
  pendientesArmorf: Array<Armor> = [];
  pendientesWeaponf: Array<Weapon> = [];
  data: WantedItem[] = [];
  logged: boolean = false;
  db = inject(UserService);
  ps = inject(PendingService);
  as = inject(AcquiredService);
  weaponservice = inject(WeaponsService);
  Armorservice = inject(ArmorService);
  router = inject(Router);
  userPending: WantedItem[] = [];

  
  filterType : string[] = [];

  filterElement : string[] = [];

  search : string = "";

  loading:boolean = true;
  loadingWeapon:boolean = true;
  loadingArmor:boolean = true;

  nombres(): string[]{
    return [...this.pendientesArmorf.map(x => x.name),...this.pendientesWeaponf.map(x => x.name)];
  }

  comprobation(){
    return this.data.filter(x => x.type == 'weapon').length != this.pendientesWeapon.length || this.data.filter(x => x.type == 'armor').length != this.pendientesArmor.length;
  }

  acquiredNumber(str: string){
    return  this.data.filter(x => x.type == str);
  }
  
  activeFilterSearch(str: string){
    this.search = str;
    this.activeFilter()
  }

  activeFilterType(str: string[]){
    this.filterType = str;
    this.activeFilter()
  }

  activeFilterElement(str: string[]){
    this.filterElement = str;
    this.activeFilter()
  }

  activeFilter(){

    this.pendientesWeaponf = this.pendientesWeapon;
    this.pendientesArmorf = this.pendientesArmor;

    if(this.filterType.length){
      this.pendientesWeaponf = this.pendientesWeaponf.filter(x => this.filterType.includes(x.type));
      this.pendientesArmorf = this.pendientesArmorf.filter(x => this.filterType.includes(x.type));
    }else{
      this.pendientesWeaponf = this.pendientesWeaponf;
      this.pendientesArmorf = this.pendientesArmorf;
    }
    if(this.filterElement.length){
     this.pendientesWeaponf = this.pendientesWeaponf.filter(x => x.elements.map( element => element.type).some( ele => this.filterElement.includes(ele)));
    };

    if(this.search.length){
      this.pendientesWeaponf = this.pendientesWeaponf.filter(x=>x.name.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()))
      this.pendientesArmorf = this.pendientesArmorf.filter(x=>x.name.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()))
    }
    
  }

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
    this.ps.updatePending(this.userPending).subscribe({
      next: ()=> {},
      error: (err: Error) => {console.log(err)}
    })
  }

  deletePending(item: WantedItem){
    this.ps.deletePending(item);
    
  }

  findIndexItem(id:string,type:string){
    return this.userPending.map(x=> {return x.type+x.id}).indexOf(type+id);
  }

  orderArmor(){
    this.pendientesArmor = [];
    for (let element of this.data) {
      if (element.type == 'armor'){
        this.pendientesArmor.push(this.Armorservice.getArmorById(element.id));
      }
    }
    this.activeFilter();
  }

  orderWeapon(){
    this.pendientesWeapon = [];
    for (let element of this.data){
      if (element.type == 'weapon'){
        this.pendientesWeapon.push(this.weaponservice.getWeaponbyId(element.id));
      }
    }
    this.activeFilter();
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
    this.activeFilter();
  }

  addToAcquired(item: WantedItem){

    this.ps.deletePending(item);
    this.as.putAcquired(item);
  }

  ngOnInit(){

    this.as.currentLoading.subscribe(
      value => {
        this.loading = value;
      }
    );

    this.weaponservice.currentLoading.subscribe(
      value => {
        this.loadingWeapon = value;
      }
    );

    this.Armorservice.currentLoading.subscribe(
      value => {
        this.loadingArmor = value;
      }
    );

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
          this.userPending = value;
          this.orderByType();
          this.activeFilter();
        }
      }
    )

  }
}

import { Component, OnInit, inject } from '@angular/core';
import { Armor } from '../../../../armor/interface/armor';
import { Weapon } from '../../../../weapon/interface/weapon';
import { AcquiredItem } from '../../../interfaces/acquired-item';
import { WeaponsService } from '../../../../weapon/service/weapons.service';
import { ArmorService } from '../../../../armor/service/armor.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FilterComponent } from '../../../../shared/components/filter/filter.component';
import { SearchComponent } from '../../../../shared/components/search/search.component';
import { AcquiredListCardComponent } from '../acquired-list-card/acquired-list-card.component';
import { UserService } from '../../../auth/service/user.service';
import { AcquiredService } from '../../service/acquired.service';
import { PendingService } from '../../../wishList/service/pending.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-acquired-list',
  standalone: true,
  imports: [AcquiredListCardComponent,FilterComponent,SearchComponent,CommonModule],
  templateUrl: './acquired-list.component.html',
  styleUrl: './acquired-list.component.css'
})

export class AcquiredListComponent implements OnInit{

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

  search : string = "";

  loading:boolean = true;
  loadingWeapon:boolean = true;
  loadingArmor:boolean = true;

  nombres(): string[]{
    return [...this.adquiridosArmorf.map(x => x.name),...this.adquiridosWeaponf.map(x => x.name)];
  }

  comprobation(){
    return this.data.filter(x => x.type == 'weapon').length != this.adquiridosWeapon.length || this.data.filter(x => x.type == 'armor').length != this.adquiridosArmor.length;
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

    this.adquiridosArmorf = this.adquiridosArmor;
    this.adquiridosWeaponf = this.adquiridosWeapon;

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

    if(this.search.length){
      this.adquiridosWeaponf = this.adquiridosWeaponf.filter(x=>x.name.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()))
      this.adquiridosArmorf = this.adquiridosArmorf.filter(x=>x.name.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()))
    }
    
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
    this.ps.getPending();
    this.as.getAcquired();

    this.as.currentdata.subscribe({
        next: (value) => { 
          if(value != undefined){
            this.data = value;
            this.orderByType();
            console.log(this.data);
          }
        },
        error: (err: Error) => {console.log(err)}
      })
  }
}

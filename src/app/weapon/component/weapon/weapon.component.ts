import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { WeaponsService } from '../../service/weapons.service';
import { Weapon } from '../../interface/weapon';
import { ListaPendientesComponent } from '../../../user/components/lista-pendientes/lista-pendientes.component';
import { WeaponCardComponent } from '../weapon-card/weapon-card.component';
import { UserService } from '../../../user/services/user.service';
import { WantedItem } from '../../../shared/interface/wanted-item';
import { PendingService } from '../../../shared/service/pending.service';

@Component({
  selector: 'app-weapon',
  standalone: true,
  imports: [WeaponCardComponent],
  templateUrl: './weapon.component.html',
  styleUrl: './weapon.component.css'
})
export class WeaponComponent implements OnInit{
  WeapnService = inject(WeaponsService);
  db = inject(UserService);
  ps = inject(PendingService);

  logged : boolean = false;

  allweapons: Array<Weapon> = [];

  showImage: boolean = false;

  cargarWeapons(){
    this.WeapnService.getWeapons().subscribe(
      {
        next: (weapons: Weapon[]) => {
        this.allweapons = weapons;
        },
        error: (err: Error) =>{
          console.log(err.message);
        }
      }
    )
  }

  mostrarimagen(){
    if(!this.showImage){
      this.showImage = true;
    }
    else{
      this.showImage = false;
    }
  }

  /*@Output() guardWeapon = new EventEmitter<Weapon>();

  enviarWeapon(enviar: Weapon){
    alert("Arma enviada a Pendientes");
    //console.log(enviar);
    this.guardWeapon.emit(enviar);
  } */

  //filtro

  filterweapons: Array<Weapon> = [];

  filterActive: boolean = false;

  filterSnS: boolean = false; //1
  filterGS: boolean = false; //2
  filterDB: boolean = false; //3
  filterLS: boolean = false; //4
  filterH: boolean = false; //5
  filterHH: boolean = false; //6
  filterL: boolean = false; //7
  filterGL: boolean = false; //8
  filterSA: boolean = false; //9
  filterCB: boolean = false; //10
  filterIG: boolean = false; //11
  filterB: boolean = false; //12
  filterLB: boolean = false; //13
  filterHB: boolean = false; //14

  activeFilter(){
    if (!this.filterSnS && !this.filterGS && !this.filterDB && !this.filterLS && !this.filterH && !this.filterHH && !this.filterL && !this.filterGL && !this.filterSA && !this.filterCB && !this.filterIG && !this.filterB && !this.filterLB && !this.filterHB){
      this.filterweapons = [];
      this.filterActive = false;
    }
    else{
      this.filterActive = true;
    }
  }

  addFilteredWeapons(weapontype: string){
    var i: number = 0;
    while(i < this.allweapons.length){
      if(this.allweapons[i].type === weapontype){
        this.filterweapons.push(this.allweapons[i]);
      }
      i++;
    }
  }

  removeFilteredWeapons(weapontype: string){
    this.filterweapons =  this.filterweapons.filter (a => !(a.type === weapontype));
    //reemplazar todo lo de abajo con esto
  }

  toggleFilter(weapon: number){
    switch (weapon){
      case 1:
        if (this.filterSnS){
          this.removeFilteredWeapons("sword-and-shield");
          this.filterSnS = false;
        }
        else{
          this.addFilteredWeapons("sword-and-shield");
          this.filterSnS = true;
        }
        break;
      case 2:
        if (this.filterGL){
          this.removeFilteredWeapons("great-sword");
          this.filterGL = false;
        }
        else{
          this.addFilteredWeapons("great-sword");
          this.filterGL = true;
        }
        break;
      case 3:
        if (this.filterDB){
          this.removeFilteredWeapons("dual-blades");
          this.filterDB = false;
        }
        else{
          this.addFilteredWeapons("dual-blades");
          this.filterDB = true;
        }
        break;
      case 4:
        if (this.filterLS){
          this.removeFilteredWeapons("long-sword");
          this.filterLS = false;
        }
        else{
          this.addFilteredWeapons("long-sword");
          this.filterLS = true;
        }
        break;
      case 5:
        if (this.filterH){
          this.removeFilteredWeapons("hammer");
          this.filterH = false;
        }
        else{
          this.addFilteredWeapons("hammer");
          this.filterH = true;
        }
        break;
      case 6:
        if (this.filterHH){
          this.removeFilteredWeapons("hunting-horn");
          this.filterHH = false;
        }
        else{
          this.addFilteredWeapons("hunting-horn")
          this.filterHH = true;
        }
        break;
      case 7:
        if (this.filterL){
          this.removeFilteredWeapons("lance");
          this.filterL = false;
        }
        else{
          this.addFilteredWeapons("lance");
          this.filterL = true;
        }
        break;
      case 8:
        if (this.filterGL){
          this.removeFilteredWeapons("gunlance");
          this.filterGL = false;
        }
        else{
          this.addFilteredWeapons("gunlance");
          this.filterGL = true;
        }
        break;
      case 9:
        if (this.filterSA){
          this.removeFilteredWeapons("switch-axe");
          this.filterSA = false;
        }
        else{
          this.addFilteredWeapons("switch-axe");
          this.filterSA = true;
        }
        break;
      case 10:
        if (this.filterCB){
          this.removeFilteredWeapons("charge-blade");
          this.filterCB = false;
        }
        else{
          this.addFilteredWeapons("charge-blade");
          this.filterCB = true;
        }
        break;
      case 11:
        if (this.filterIG){
          this.removeFilteredWeapons("insect-glaive");
          this.filterIG = false;
        }
        else{
          this.addFilteredWeapons("insect-glaive");
          this.filterIG = true;
        }
        break;
      case 12:
        if (this.filterB){
          this.removeFilteredWeapons("bow");
          this.filterB = false;
        }
        else{
          this.addFilteredWeapons("bow");
          this.filterB = true;
        }
        break;
      case 13:
        if (this.filterLB){
          this.removeFilteredWeapons("light-bowgun");
          this.filterLB = false;
        }
        else{
          this.addFilteredWeapons("light-bowgun");
          this.filterLB = true;
        }
        break;
      case 14:
        if (this.filterHB){
          this.removeFilteredWeapons("heavy-bowgun");
          this.filterHB = false;
        }
        else{
          this.addFilteredWeapons("heavy-bowgun");
          this.filterHB = true;
        }
        break;
    }
    this.activeFilter();
  }

  /*
  rarity: number | null = null;

  filterPerRarity(){
    if (this.rarity){
      this.filterweapons = this.filterweapons.filter( a => a.rarity === this.rarity);
    }
  }
  */

  addPending(item : WantedItem){
    this.ps.putPending(item);
  }


  ngOnInit(){
    this.cargarWeapons();
    this.db.currentData.subscribe(
      value => { this.logged = value}
    )
    this.ps.getPending();
  }
}

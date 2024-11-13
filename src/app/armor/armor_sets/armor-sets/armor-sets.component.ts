import { Router } from '@angular/router';
import { Armor } from '../../interface/armor';
import { ArmorService } from './../../service/armor.service';
import { Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import { UserService } from '../../../user/services/user.service';
import { PendingService } from '../../../shared/service/pending.service';
import { AcquiredService } from '../../../shared/service/acquired.service';
import { WantedItem } from '../../../shared/interface/wanted-item';
import { AcquiredItem } from '../../../shared/interface/acquired-item';
import { ArmorCardComponent } from '../armor-card/armor-card.component';

@Component({
  selector: 'app-armor-sets',
  standalone: true,
  imports: [ArmorCardComponent],
  templateUrl: './armor-sets.component.html',
  styleUrl: './armor-sets.component.css'
})
export class ArmorSetsComponent implements OnInit{

  armorService = inject(ArmorService)
  db = inject(UserService);
  ps = inject(PendingService);
  as = inject(AcquiredService);

  logged : boolean = false;
  armorList: Armor[] = [];

  routes = inject(Router);

  /*listarArmor(){
    this.armorService.getArmor().subscribe({
      next: (arrmor: Armor[]) => {
        this.armorList = arrmor;
      },
      error: (err: Error) => {
        console.log(err.message);
      },
      })
  }*/

  armadurasFiltradas: Array<Armor> = [];

  filtroActivo: boolean = false;

  filtroHead: boolean = false;
  filtroChest: boolean = false;
  filtroGloves: boolean = false;
  filtroWaist: boolean = false;
  filtroLegs: boolean = false;

  activeFilter(){
    if(!this.filtroHead && !this.filtroChest && !this.filtroGloves && !this.filtroWaist && !this.filtroLegs){
      this.armadurasFiltradas = [];
      this.filtroActivo = false;
    }
    else{
      this.filtroActivo = true;
    }
  }

  addFilteredArmor(armortype: string){
    var i: number = 0;
    while(i < this.armorList.length){
      if(this.armorList[i].type === armortype){
        this.armadurasFiltradas.push(this.armorList[i]);
      }
      i++;
    }
  }

  toggleFilter(armor: number){
    switch (armor){
      case 1:
        if (this.filtroHead){
          this.armadurasFiltradas = this.armadurasFiltradas.filter(a => !(a.type === "head"));
          this.filtroHead = false;
        }
        else{
          this.addFilteredArmor("head");
          this.filtroHead = true;
        }
        break;
      case 2:
        if (this.filtroChest){
          this.armadurasFiltradas = this.armadurasFiltradas.filter(a => !(a.type === "chest"));
          this.filtroChest = false;
        }
        else{
          this.addFilteredArmor("chest");
          this.filtroChest = true;
        }
        break;
      case 3:
        if (this.filtroGloves){
          this.armadurasFiltradas = this.armadurasFiltradas.filter(a => !(a.type === "gloves"));
          this.filtroGloves = false;
        }
        else{
          this.addFilteredArmor("gloves");
          this.filtroGloves = true;
        }
        break;
      case 4:
        if (this.filtroWaist){
          this.armadurasFiltradas = this.armadurasFiltradas.filter(a => !(a.type === "waist"));
          this.filtroWaist = false;
        }
        else{
          this.addFilteredArmor("waist");
          this.filtroWaist = true;
        }
        break;
      case 5:
        if (this.filtroLegs){
          this.armadurasFiltradas = this.armadurasFiltradas.filter(a => !(a.type === "legs"));
          this.filtroLegs = false;
        }
        else{
          this.addFilteredArmor("legs");
          this.filtroLegs = true;
        }
        break;
      case 0: //caso para reiniciar filtros extra
        this.armadurasFiltradas = [];
        if(this.filtroHead){
          this.addFilteredArmor("head");
        }
        if(this.filtroChest){
          this.addFilteredArmor("chest");
        }
        if(this.filtroGloves){
          this.addFilteredArmor("gloves");
        }
        if(this.filtroWaist){
          this.addFilteredArmor("waist");
        }
        if(this.filtroLegs){
          this.addFilteredArmor("legs");
        }
        break;
    }
    this.activeFilter();
  }

  addPending(item : WantedItem){
    this.ps.putPending(item);
  }

  addAcquired(item: AcquiredItem){
    this.as.putAcquired(item);
  }

  ngOnInit(): void {
    this.armorService.currentData.subscribe(
      value => {this.armorList = value}
    )
    this.db.currentData.subscribe(
      value => { this.logged = value}
    )
    this.ps.getPending();
    this.as.getAcquired();
    this.armorService.getArmors();
  }

}

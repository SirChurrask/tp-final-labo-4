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

  

  armadurasFiltradas: Array<Armor> = [];

  typeFilter: string[] = [];

  toggleFilterType(type: string){
    if(this.typeFilter.includes(type)){
      this.typeFilter = this.typeFilter.filter( x => x != type);
    }else{
      this.typeFilter.push(type);
    }
    this.activeFilter();
    this.changeButtonBC();
  }

  changeButtonBC(){
    let buttons : any = document.getElementsByClassName("filterButton");
    for(let i = 0;i < buttons.length;i++){
      let aux = buttons[i];
      if(this.typeFilter.includes(aux.name))
        aux.style.background = '#414a66';
      else{
        aux.style.background = '#323232';
      }
    }
  }

  activeFilter(){

    if(this.typeFilter.length){
      this.armadurasFiltradas = this.armorService.getArmorValue().filter(x => this.typeFilter.includes(x.type));
    }else{
      this.armadurasFiltradas = this.armorService.getArmorValue();
    }
  }

  
  addPending(item : WantedItem){
    this.ps.putPending(item);
  }

  addAcquired(item: AcquiredItem){
    this.as.putAcquired(item);
  }

  ngOnInit(): void {
    this.armorService.currentData.subscribe(
      value => {
        this.armorList = value;
        this.armadurasFiltradas = value;
      }
    )
    this.db.currentData.subscribe(
      value => { this.logged = value}
    )
    this.ps.getPending();
    this.as.getAcquired();
    this.armorService.getArmors();
  }

}

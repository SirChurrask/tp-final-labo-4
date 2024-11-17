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
import { FilterComponent } from '../../../shared/components/filter/filter.component';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../../shared/components/search/search.component';

@Component({
  selector: 'app-armor-sets',
  standalone: true,
  imports: [ArmorCardComponent,FilterComponent,CommonModule,SearchComponent],
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

  search:string = "";

  nombres(){
    return this.armadurasFiltradas.map(x => x.name)
  }

  activeFilterSearch(str: string){
    this.search = str;
    this.activeFilter();
  }

  activeFilter(array: string[] = []){
    this.typeFilter = array;
    if(this.typeFilter.length){
      this.armadurasFiltradas = this.armorService.getArmorValue().filter(x => this.typeFilter.includes(x.type));
    }else{
      this.armadurasFiltradas = this.armorService.getArmorValue();
    }
    if(this.search.length){
      this.armadurasFiltradas = this.armadurasFiltradas.filter(x => x.name.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()));
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
        this.activeFilter();
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

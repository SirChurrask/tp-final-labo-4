import { Router } from '@angular/router';
import { Armor } from '../../interface/armor';
import { ArmorService } from '../../service/armor.service';
import { Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import { AcquiredItem } from '../../../user/interfaces/acquired-item';
import { ArmorCardComponent } from '../armor-card/armor-card.component';
import { FilterComponent } from '../../../shared/components/filter/filter.component';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { FoundComponent } from '../../../shared/components/found/found.component';
import { UserService } from '../../../user/auth/service/user.service';
import { AcquiredService } from '../../../user/adquiredList/service/acquired.service';
import { PendingService } from '../../../user/wishList/service/pending.service';
import { WantedItem } from '../../../user/interfaces/wanted-item';

@Component({
  selector: 'app-armor-list',
  standalone: true,
  imports: [ArmorCardComponent,FilterComponent,CommonModule,SearchComponent,FoundComponent],
  templateUrl: './armor-list.component.html',
  styleUrl: './armor-list.component.css'
})
export class ArmorListComponent implements OnInit{

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

  loading:boolean = true;

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
    this.armorService.currentLoading.subscribe(
      value => {
        this.loading = value;
      }
    );
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

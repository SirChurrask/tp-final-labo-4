import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { WeaponsService } from '../../service/weapons.service';
import { Weapon } from '../../interface/weapon';
import { ListaPendientesComponent } from '../../../user/components/lista-pendientes/lista-pendientes.component';
import { WeaponCardComponent } from '../weapon-card/weapon-card.component';
import { UserService } from '../../../user/services/user.service';
import { WantedItem } from '../../../shared/interface/wanted-item';
import { PendingService } from '../../../shared/service/pending.service';
import { AcquiredService } from '../../../shared/service/acquired.service';
import { AcquiredItem } from '../../../shared/interface/acquired-item';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from '../../../shared/components/filter/filter.component';
import { SearchComponent } from '../../../shared/components/search/search.component';

@Component({
  selector: 'app-weapon',
  standalone: true,
  imports: [WeaponCardComponent,CommonModule,FormsModule,FilterComponent,SearchComponent],
  templateUrl: './weapon.component.html',
  styleUrl: './weapon.component.css'
})
export class WeaponComponent implements OnInit{
  WeapnService = inject(WeaponsService);
  db = inject(UserService);
  ps = inject(PendingService);
  as = inject(AcquiredService);

  logged : boolean = false;

  showImage: boolean = false;

  filterweapons: Array<Weapon> = [];

  filterType: string[] = [];

  filterElement: string[] = [];

  cargando: boolean = true;

  search:string = '';

  nombres(): string[]{
    return this.filterweapons.map(x => x.name);
  }

  activeFilterSearch(str : string){
    this.search = str;
    this.activeFilter();
  }

  activeFilterType(array:string[]){
    this.filterType = array;
    this.activeFilter();
  }

  activeFilterElement(array:string[]){
    this.filterElement = array;
    this.activeFilter();
  }

  activeFilter(){
    if(this.filterType.length){
      this.filterweapons = this.WeapnService.getWeaponsValue().filter(x => this.filterType.includes(x.type));
    }else{
      this.filterweapons = this.WeapnService.getWeaponsValue();
    }
    if(this.filterElement.length){
     this.filterweapons = this.filterweapons.filter(x => x.elements.map( element => element.type).some( ele => this.filterElement.includes(ele)));
    };
    if(this.search.length)
      this.filterweapons = this.filterweapons.filter(x=>x.name.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()))
  }
  

  addPending(item : WantedItem){
    this.ps.putPending(item);
  }

  addAcquired(item: AcquiredItem){
    this.as.putAcquired(item);
  }


  ngOnInit(){
    
    this.WeapnService.currentData.subscribe(
      value => {
        this.filterweapons = value;
        this.activeFilter();
        this.cargando = false;
      }
    )
    this.db.currentData.subscribe(
      value => { this.logged = value}
    )
    this.ps.getPending();
    this.as.getAcquired();
    this.WeapnService.getWeapons();
    this.filterweapons = this.WeapnService.getWeaponsValue();
  }
}

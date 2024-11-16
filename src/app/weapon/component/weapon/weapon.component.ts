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

@Component({
  selector: 'app-weapon',
  standalone: true,
  imports: [WeaponCardComponent,CommonModule,FormsModule],
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

  searchW:string = '';

  toggleFilterType(type: string){
    this.cargando = true;
    if(this.filterType.includes(type)){
      this.filterType = this.filterType.filter( x => x != type);
    }else{
      this.filterType.push(type);
    }
    this.activeFilter();
    this.changeButtonBC();
    this.cargando = false;
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
    this.cargando = true;
    if(this.filterElement.includes(element)){
      this.filterElement = this.filterElement.filter( x => x != element);
    }else{
      this.filterElement.push(element);
    }
    this.activeFilter();
    this.changeButtonBC();
    this.cargando = false;
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
    if(this.searchW.length)
      this.filterweapons = this.filterweapons.filter(x=>x.name.toLocaleLowerCase().includes(this.searchW.toLocaleLowerCase()))
    
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

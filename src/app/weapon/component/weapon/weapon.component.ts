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

@Component({
  selector: 'app-weapon',
  standalone: true,
  imports: [WeaponCardComponent,CommonModule],
  templateUrl: './weapon.component.html',
  styleUrl: './weapon.component.css'
})
export class WeaponComponent implements OnInit{
  WeapnService = inject(WeaponsService);
  db = inject(UserService);
  ps = inject(PendingService);
  as = inject(AcquiredService);

  logged : boolean = false;

  allweapons: Array<Weapon> = [];

  showImage: boolean = false;

  filterweapons: Array<Weapon> = [];

  filterType: string[] = []

  cargando: boolean = true;

  toggleFilterType(type: string){
    this.cargando = true;
    if(this.filterType.includes(type)){
      this.filterType = this.filterType.filter( x => x != type);
    }else{
      this.filterType.push(type);
    }
    if(this.filterType.length){
      this.activeFilter();
    }else{
      this.filterweapons = this.allweapons;
    }
    this.cargando = false;
    console.log(this.filterweapons)
  }

  activeFilter(){
    
    this.filterweapons = this.allweapons.filter(x => this.filterType.includes(x.type));
    
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
        this.allweapons = value;
        this.filterweapons = value;
        this.cargando = false;
      }
    )
    this.db.currentData.subscribe(
      value => { this.logged = value}
    )
    
    this.ps.getPending();
    this.as.getAcquired();
    this.WeapnService.getWeapons();
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { ArmorService } from '../../service/armor.service';
import { Armor } from '../../interface/armor';
import { ArmorSet } from '../../interface/armor-set';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArmorCardComponent } from "../armor-card/armor-card.component";
import { UserService } from '../../../user/auth/service/user.service';
import { WantedItem } from '../../../user/interfaces/wanted-item';
import { AcquiredItem } from '../../../user/interfaces/acquired-item';
import { PendingService } from '../../../user/wishList/service/pending.service';
import { AcquiredService } from '../../../user/adquiredList/service/acquired.service';
import { ObjectType } from 'typescript';

@Component({
  selector: 'app-armor-set-details',
  standalone: true,
  imports: [CommonModule, ArmorCardComponent],
  templateUrl: './armor-set-details.component.html',
  styleUrl: './armor-set-details.component.css'
})
export class ArmorSetDetailsComponent implements OnInit{

  object: {[key: number]: string} = {2: 'foo', 1: 'bar'}

  constructor(private route: ActivatedRoute) {}

  logged : boolean = false;

  db = inject(UserService);
  ps = inject(PendingService);
  as = inject(AcquiredService);
  armrService = inject(ArmorService);

  armorSet: ArmorSet = {
    id: 0,
    rank: '',
    name: '',
    pieces: [],
    bonus: null,
  };

  loading:boolean = true;

  getDefense(){
    return this.armorSet?.pieces.map( (piece: Armor) => piece.defense.base).reduce( (x, z) => x + z);
  }

  getDefenseMax(){
    return this.armorSet?.pieces.map( (piece: Armor) => piece.defense.max).reduce( (x, z) => x + z);
  }

  getString(str:string){
    return `mhw-${str}-damage_s.png`
  }

  getResistence(): {[key: string]: number}{
    return this.armorSet.pieces.map( (piece: Armor) => piece.resistances).reduce( (x, z) => {
      return {
        fire : x.fire + z.fire,
        water : x.water +z.water,
        dragon : x.dragon +z.dragon,
        ice: x.ice +z.ice,
        thunder: x.thunder +z.thunder
      };
  });
  }

  addPending(item : WantedItem){
    this.ps.putPending(item);
  }

  addAcquired(item: AcquiredItem){
    this.as.putAcquired(item);
  }

  cargarArmorSet(id: string | null){
    this.armrService.getArmorSetByID(id).subscribe({
      next: (arrmor: ArmorSet) => {
        this.armorSet = arrmor;
      },
      error: (err: Error) => {
        console.log(err.message);
      },
    })
  }

  ngOnInit(){
    this.armrService.currentLoading.subscribe(
      value => {
        this.loading = value;
      }
    );
    this.db.currentData.subscribe(
      value => { this.logged = value}
    )
    const armorID = this.route.snapshot.paramMap.get('id');
    this.cargarArmorSet(armorID);
  }
}

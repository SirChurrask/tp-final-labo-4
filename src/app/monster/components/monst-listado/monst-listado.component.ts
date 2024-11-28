import { Monster, resistance, weakness, location, aligment, recovery, protection, skill, reward, condition } from '../../interface/monster';
import { Item } from "../../../item/interface/item"
import { Component, inject, OnInit } from '@angular/core';
import { MonsterService } from '../../service/monster.service';
import { MonsterCardComponent } from "../monster-card/monster-card.component";
import { FilterComponent } from '../../../shared/components/filter/filter.component';
import { SearchComponent } from "../../../shared/components/search/search.component";
import { CommonModule } from '@angular/common';
import { FoundComponent } from '../../../shared/components/found/found.component';
import { LoadingComponent } from "../../../shared/components/loading/loading.component";


@Component({
  selector: 'app-monst-listado',
  standalone: true,
  imports: [MonsterCardComponent, FilterComponent, SearchComponent, CommonModule, FoundComponent, LoadingComponent],
  templateUrl: './monst-listado.component.html',
  styleUrl: './monst-listado.component.css'
})
export class MonstListadoComponent implements OnInit{

  MonsterServ = inject(MonsterService);

  AllBois: Array<Monster> = [];

  filterType: string[] = [];

  search:string = '';

  loading:boolean = false;

  nombres(){
    return this.AllBois.map(x => x.name)
  }

  activeFilterSearch(str:string){
    this.search = str;
    this.activeFilter();
  }

  activeFilterType(str:string[]){
    this.filterType = str;
    this.activeFilter();
  }

  activeFilter(){
    if(this.filterType.length){
      this.AllBois = this.MonsterServ.getMonstersValue().filter(x => this.filterType.includes(x.type));
    }else{
      this.AllBois = this.MonsterServ.getMonstersValue();
    }
    if(this.search.length){
      this.AllBois = this.AllBois.filter(x => x.name.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()));
    }
  }
  
  ngOnInit(){
    this.MonsterServ.currentLoading.subscribe(
      value => {
        this.loading = value;
      }
    );
    this.MonsterServ.currentData.subscribe(
      value => {
        this.AllBois = value;
        this.activeFilter()
      }
    );
    this.MonsterServ.getMonsters();
    
  }
}

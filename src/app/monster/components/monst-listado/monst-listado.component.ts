import { Monster, resistance, weakness, location, aligment, recovery, protection, skill, reward, condition } from '../../interface/monster';
import { Item } from "../../../item/interface/item"
import { Component, inject, OnInit } from '@angular/core';
import { MonsterService } from '../../service/monster.service';
import { MonsterCardComponent } from "../monster-card/monster-card.component";


@Component({
  selector: 'app-monst-listado',
  standalone: true,
  imports: [MonsterCardComponent],
  templateUrl: './monst-listado.component.html',
  styleUrl: './monst-listado.component.css'
})
export class MonstListadoComponent implements OnInit{

  MonsterServ = inject(MonsterService);

  AllBois: Array<Monster> = [];

  filterType: string[] = [];

  toggleFilterType(type: string){

    if(this.filterType.includes(type)){
      this.filterType = this.filterType.filter( x => x != type);
    }else{
      this.filterType.push(type);
    }
    this.activeFilter();
    this.changeButtonBC();
  }


  changeButtonBC(){
    let buttons : any = document.getElementsByClassName("filterButton");
    for(let i = 0;i < buttons.length;i++){
      let aux = buttons[i];
      if(this.filterType.includes(aux.name))
        aux.style.background = '#414a66';
      else{
        aux.style.background = '#323232';
      }
    }
  }

  activeFilter(){
    if(this.filterType.length){
      this.AllBois = this.MonsterServ.getMonstersValue().filter(x => this.filterType.includes(x.type));
    }else{
      this.AllBois = this.MonsterServ.getMonstersValue();
    }
  }
  
  ngOnInit(){
    this.MonsterServ.currentData.subscribe(
      value => {
        this.AllBois = value;
        this.activeFilter()
      }
    );
    this.MonsterServ.getMonsters();
    
  }


}

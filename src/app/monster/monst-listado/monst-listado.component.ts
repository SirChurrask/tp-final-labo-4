import { Monster, resistance, weakness, location, aligment, recovery, protection, skill, reward, condition } from './../interface/monster';
import { Item } from "../../item/interface/item"
import { Component, inject, OnInit } from '@angular/core';
import { MonsterService } from '../service/monster.service';


@Component({
  selector: 'app-monst-listado',
  standalone: true,
  imports: [],
  templateUrl: './monst-listado.component.html',
  styleUrl: './monst-listado.component.css'
})
export class MonstListadoComponent implements OnInit{

  AllBois: Array<Monster> = [
    /*{
    id: 14,
    type: 'chico',
    species: 'chobi',
    elements: ['piedra',],
    name: 'testobicho',
    description: 'bicho que se usa para testear esta basura',
    ailments: [{
      id: 1,
      name: 'chipi-chipi',
      description: 'hace que un michi baile',
      recovery: {
        actions: ['spam r1'],
        items: [{
          id: 69,
          name: "testItem",
          description: "testea cosas",
          rarity: 0,
          carryLimit: 0,
          value: 0
        },]
      },
      protection: {
        skills: [{
          id: 76,
          name: 'issue',
          description: 'an issue of the skill of programin'
        },],
        items: [{
          id: 16,
          name: "testItem2",
          description: "testea cosas varias veces",
          rarity: 3,
          carryLimit: 2,
          value: 1
        }]
      }
    }],
    locations: [{
      id: 3,
      zoneCount: 11,
      name: 'luro al fondo'
    }],
    resistances: [{
      element: 'cosa fisica',
      condition: 'ok, ahora puede ser null esto. no era el problema'
    },],
    weaknesses: [{
      element: 'cosa danzable',
      stars: 3,
      condition: 'same que la condicion de antes'
    },],
    rewards: [{
      id: 62,
      item: {
        id: 19,
        name: "testItem3",
        description: "testea cosas algunas veces",
        rarity: 2,
        carryLimit: 2,
        value: 1
      },
      condition: [{
        type: 'mision',
        rank: 'bajo',
        quantity: 2,
        chance: 96,
        subtype: 'cosa'
      },]
    }]
  },*/
];

  MonsterServ = inject(MonsterService);

  listarMons(){
    this.MonsterServ.getMonsters().subscribe(
    {
      next: (TestMonsters: Monster[]) => {
        this.AllBois = TestMonsters;
      },
      error: (err: Error) => {
        console.log(err.message);
      }
    })
  }

  listado_Monsta_id(id: number){

      this.MonsterServ.getMonstersbyid(id).subscribe(
        {
          next: (Monstr: Monster) => {
            this.AllBois.push(Monstr);
          },
          error: (err: Error) => {
            console.log(err.message);
          }
        })
    }

  ngOnInit(){
    /*this.listado_Monsta_id(13);*/
    this.listarMons();
  }


}

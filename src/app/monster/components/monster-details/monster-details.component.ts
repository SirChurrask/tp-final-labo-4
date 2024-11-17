import { Component, inject, OnInit } from '@angular/core';
import { MonsterService } from '../../service/monster.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ViewEncapsulation} from '@angular/core';
import { Monster } from '../../interface/monster';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-monster-details',
  standalone: true,
  imports: [CommonModule,MatTooltipModule,MatButtonModule],
  templateUrl: './monster-details.component.html',
  styleUrl: './monster-details.component.css'
})
export class MonsterDetailsComponent implements OnInit{
  ar = inject(ActivatedRoute);
  ms = inject(MonsterService);

  id : null | number = -1;

  monster : Monster = {
    id: 0,
    type: '',
    species: '',
    elements: [],
    name: '',
    description: '',
    ailments: [],
    locations: [],
    resistances: [],
    weaknesses: [],
    rewards: []
  };

  loading:boolean = true;

  ngOnInit(): void {
    this.ms.currentLoading.subscribe(
      value => {
        this.loading = value;
      }
    );
    this.ar.paramMap.subscribe((params: { get: (arg0: string) => string | null; }) => {
      this.id = Number(params.get('id')),
      this.ms.getMonstersbyid(Number(this.id)).subscribe({
        next: (data) => {
          this.monster = data;
          console.log(this.monster)
        },
        error: (err: Error) => {console.log(err)}
      })
    })
  }
}

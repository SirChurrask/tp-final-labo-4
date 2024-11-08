import { Armor } from '../../interface/armor';
import { ArmorService } from './../../service/armor.service';
import { Component, EventEmitter, inject, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-armor-sets',
  standalone: true,
  imports: [],
  templateUrl: './armor-sets.component.html',
  styleUrl: './armor-sets.component.css'
})
export class ArmorSetsComponent implements OnInit{

  armorService = inject(ArmorService)

  armorList: Armor[] = []

  listarArmor(){
    this.armorService.getArmor().subscribe({
      next: (arrmor: Armor[]) => {
        this.armorList = arrmor;
      },
      error: (err: Error) => {
        console.log(err.message);
      },
      })
  }

  @Output() guardArmor = new EventEmitter<Armor>();

  enviarArmor(enviar: Armor){
    //console.log(enviar);
    this.guardArmor.emit(enviar);
  }

  ngOnInit(): void {
    this.listarArmor();
  }

}

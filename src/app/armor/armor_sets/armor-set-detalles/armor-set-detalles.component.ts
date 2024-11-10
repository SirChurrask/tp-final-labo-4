import { Component, OnInit, inject } from '@angular/core';
import { ArmorService } from '../../service/armor.service';
import { ArmorSet } from '../../interface/armor-set';

@Component({
  selector: 'app-armor-set-detalles',
  standalone: true,
  imports: [],
  templateUrl: './armor-set-detalles.component.html',
  styleUrl: './armor-set-detalles.component.css'
})
export class ArmorSetDetallesComponent implements OnInit{

  armrService = inject(ArmorService);

  armorSet: ArmorSet | null = null;

  cargarArmorSet(id: number){
    this.armrService.getArmorSetByID(id).subscribe({
      next: (arrmor: ArmorSet) => {
        this.armorSet = arrmor;
      },
      error: (err: Error) => {
        console.log(err.message);
      },
    })
  }

  ngOnInit(): void {

  }
}

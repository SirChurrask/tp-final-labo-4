import { Component, OnInit, inject } from '@angular/core';
import { ArmorService } from '../../service/armor.service';
import { ArmorSet } from '../../interface/armor-set';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-armor-set-detalles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './armor-set-detalles.component.html',
  styleUrl: './armor-set-detalles.component.css'
})
export class ArmorSetDetallesComponent implements OnInit{

  constructor(private route: ActivatedRoute) {}

  armrService = inject(ArmorService);

  armorSet: ArmorSet | null = null;

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
    const armorID = this.route.snapshot.paramMap.get('id');
    this.cargarArmorSet(armorID);
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { ArmorService } from '../../service/armor.service';
import { ArmorSet } from '../../interface/armor-set';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-armor-set-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './armor-set-details.component.html',
  styleUrl: './armor-set-details.component.css'
})
export class ArmorSetDetailsComponent implements OnInit{

  constructor(private route: ActivatedRoute) {}

  armrService = inject(ArmorService);

  armorSet: ArmorSet | null = null;

  loading:boolean = true;

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
    const armorID = this.route.snapshot.paramMap.get('id');
    this.cargarArmorSet(armorID);
  }
}

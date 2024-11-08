import { Component, Input, input } from '@angular/core';
import { Armor } from '../../../armor/interface/armor';
import { Weapon } from '../../../weapon/interface/weapon';
import { WeaponComponent } from '../../../weapon/component/weapon/weapon.component';
import { ArmorSetsComponent } from '../../../armor/armor_sets/armor-sets/armor-sets.component';

@Component({
  selector: 'app-lista-pendientes',
  standalone: true,
  imports: [WeaponComponent, ArmorSetsComponent],
  templateUrl: './lista-pendientes.component.html',
  styleUrl: './lista-pendientes.component.css'
})
export class ListaPendientesComponent {

  pendientesArmor: Array<Armor> = [];

  pendientesWeapon: Array<Weapon> = [];

  agregarWeapon(eventW: Weapon){
    this.pendientesWeapon.push(eventW);
  }

  agregarArmor(eventA: Armor){
    this.pendientesArmor.push(eventA);
  }

}

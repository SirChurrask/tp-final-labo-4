import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ItemListadoComponent } from './item/item-listado/item-listado.component';
import { MonstListadoComponent } from './monster/monst-listado/monst-listado.component';
import { ArmorSetsComponent } from './armor/armor_sets/armor-sets/armor-sets.component';
import { WeaponPipe } from './weapon/page/weapon.pipe';
import { WeaponComponent } from './weapon/component/weapon/weapon.component';
import { ListaPendientesComponent } from './user/components/lista-pendientes/lista-pendientes.component';

import { ArmorSetDetallesComponent } from './armor/armor_sets/armor-set-detalles/armor-set-detalles.component';

import { LoginFormComponent } from './user/components/login-form/login-form.component';
import { RegisterFormComponent } from './user/components/register-form/register-form.component';


export const routes: Routes = [
  {
    path: 'Items', component: ItemListadoComponent
  },
  {
    path: 'Monsters', component: MonstListadoComponent
  },
  {
    path: 'Armors', component: ArmorSetsComponent
  },
  {
    path: 'Weapons', component: WeaponComponent
  },
  {
    path: 'Pendientes', component: ListaPendientesComponent
  },
  {
    path: 'Armors/:id', component: ArmorSetDetallesComponent
  },
  {
    path: 'login', component: LoginFormComponent
  },
  {
    path: 'register', component: RegisterFormComponent
  }

];

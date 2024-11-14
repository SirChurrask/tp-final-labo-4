import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { MonstListadoComponent } from './monster/components/monst-listado/monst-listado.component';
import { ArmorSetsComponent } from './armor/armor_sets/armor-sets/armor-sets.component';
import { WeaponPipe } from './weapon/page/weapon.pipe';
import { WeaponComponent } from './weapon/component/weapon/weapon.component';
import { ListaPendientesComponent } from './user/components/lista-pendientes/lista-pendientes.component';

import { ArmorSetDetallesComponent } from './armor/armor_sets/armor-set-detalles/armor-set-detalles.component';

import { LoginFormComponent } from './user/components/login-form/login-form.component';
import { RegisterFormComponent } from './user/components/register-form/register-form.component';
import { ListaAdquiridosComponent } from './user/components/lista-adquiridos/lista-adquiridos.component';
import { ItemListadoComponent } from './item/components/item-listado/item-listado.component';
import { MonsterPageComponent } from './monster/components/monster-page/monster-page.component';


export const routes: Routes = [
  {
    path: 'Items', component: ItemListadoComponent
  },
  {
    path: 'Monsters', component: MonstListadoComponent
  },
  {
    path: 'Monsters/:id', component: MonsterPageComponent
  },
  {
    path: 'Armors', component: ArmorSetsComponent
  },
  {
    path: 'Weapons', component: WeaponComponent
  },
  {
    path: 'pending', component: ListaPendientesComponent
  },
  {
    path: 'acquired', component: ListaAdquiridosComponent
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

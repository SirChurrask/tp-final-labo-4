import { Routes } from '@angular/router';
import { LoginFormComponent } from './user/auth/components/login-form/login-form.component';
import { RegisterFormComponent } from './user/auth/components/register-form/register-form.component';
import { AcquiredListComponent } from './user/adquiredList/components/acquired-list/acquired-list.component';
import { HomeComponent } from './home/component/home/home.component';
import { ItemPageComponent } from './item/page/item-page/item-page.component';
import { ArmorListPageComponent } from './armor/pages/armor-list-page/armor-list-page.component';
import { WeaponListPageComponent } from './weapon/pages/weapon-list-page/weapon-list-page.component';
import { MonsterListPageComponent } from './monster/pages/monster-list-page/monster-list-page.component';
import { MonsterPageComponent } from './monster/pages/monster-page/monster-page.component';
import { WishlistPageComponent } from './user/pages/wishlist-page/wishlist-page.component';
import { ArmorSetPageComponent } from './armor/pages/armor-set-page/armor-set-page.component';


export const routes: Routes = [
  {
    path: 'Items', component: ItemPageComponent
  },
  {
    path: 'Monsters', component: MonsterListPageComponent
  },
  {
    path: 'Monsters/:id', component: MonsterPageComponent
  },
  {
    path: 'Armors', component: ArmorListPageComponent
  },
  {
    path: 'Weapons', component: WeaponListPageComponent
  },
  {
    path: 'pending', component: WishlistPageComponent
  },
  {
    path: 'acquired', component: AcquiredListComponent
  },
  {
    path: 'Armors/:id', component: ArmorSetPageComponent
  },
  {
    path: 'login', component: LoginFormComponent
  },
  {
    path: 'register', component: RegisterFormComponent
  },
  {
    path: '', component: HomeComponent
  }

];

import { Component } from '@angular/core';
import { WishlistComponent } from "../../wishList/components/wishlist/wishlist.component";
import { TitleComponent } from "../../../shared/components/title/title.component";

@Component({
  selector: 'app-wishlist-page',
  standalone: true,
  imports: [WishlistComponent, TitleComponent],
  templateUrl: './wishlist-page.component.html',
  styleUrl: './wishlist-page.component.css'
})
export class WishlistPageComponent {

}

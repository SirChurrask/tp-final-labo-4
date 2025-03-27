import { Component, inject, OnInit } from '@angular/core';
import { stockimages } from '../../../../../assets/stockimages';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../service/profile.service';

@Component({
  selector: 'app-stock-images',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-images.component.html',
  styleUrl: './stock-images.component.css'
})
export class StockImagesComponent{
  stockimages = stockimages;

  ps = inject(ProfileService)

  changeAvatar(str:string){
    this.ps.putAvatar(str);
  }
} 

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Output() activeFilterEvent = new EventEmitter();
  @Input() options: string[] = [];
  @Input() placeH: string = 'Search';

  search :string = "";

  activeFilter(){
    this.activeFilterEvent.emit(this.search);
  }

  clear(){
    this.search = "";
    this.activeFilter();
  }
}

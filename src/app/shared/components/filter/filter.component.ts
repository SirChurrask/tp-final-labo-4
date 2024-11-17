import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  @Input() arrayFilter: any[] = [];
  @Input() arrayOptions: any[] = [];
  @Output() activeFilterEvent = new EventEmitter();

  toggleFilter(item: string){
    if(this.arrayFilter.includes(item)){
      this.arrayFilter = this.arrayFilter.filter( x => x != item);
    }else{
      this.arrayFilter.push(item);
    }
    this.activeFilter();
    this.changeButtonBC();
  }

  activeFilter(){
    this.activeFilterEvent.emit(this.arrayFilter);
  }
  
  changeButtonBC(){
    let buttons : any = document.getElementsByClassName("filterButton");
    for(let i = 0;i < buttons.length;i++){
      let aux = buttons[i];
      if(this.arrayOptions.includes(aux.name)){
        if(this.arrayFilter.includes(aux.name))
          aux.style.background = '#414a66';
        else{
          aux.style.background = '#323232';
        }
      }
    }
  }
}

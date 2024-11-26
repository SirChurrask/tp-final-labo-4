import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavUserComponent } from './user/auth/components/nav-user/nav-user.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NavUserComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'MonsterHunterHandler';

  router = inject(Router);

  showTopButton : boolean = false;
  showBottomButton: boolean = false;


  navChange() {
    let x = document.getElementById("arriba");
    if(x){
      if (x.className === "topnav") {
        x.className += " responsive";
      } else {
        x.className = "topnav";
      }
    }
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.showTopButton = window.scrollY > 350;
    this.showBottomButton = ((window.document.body.scrollHeight - window.innerHeight) - window.scrollY) > 350 && this.showTopButton;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToBottom() {
    window.scrollTo(0, (window.document.body.scrollHeight - window.innerHeight));
  }


  changeButtonBC(){
          let buttons : any = document.getElementsByClassName("navButton");
          for(let i = 0;i < buttons.length;i++){
            let aux : HTMLButtonElement = buttons[i];
            if(this.router.url.includes(aux.name) && !this.router.url.match(/\d/)){

              aux.style.background =  '#374141';
              aux.disabled = false;
              aux.style.cursor = 'default';
              aux.onmouseover = () => {}
              aux.onmouseleave = () => {}
            }else{
              aux.disabled = true;
              aux.style.background = '#252929';
              aux.style.cursor = 'pointer';
              aux.onmouseover = () => {aux.style.background = '#303535'}
              aux.onmouseleave = () => {aux.style.background = '#252929'}
            }
          }
  }

  ngOnInit(): void {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event: NavigationEnd) => {
      console.log("change")
      this.changeButtonBC();
    });
  }
}

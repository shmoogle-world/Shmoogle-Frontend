import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-nav',
  templateUrl: './hamburger-nav.component.html',
  styleUrls: ['./hamburger-nav.component.css']
})
export class HamburgerNavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public blog(): void{
    window.location.href = 'http://shmoogle.world/blog/sample-page/'
  }
}

import { Component, OnInit, Renderer, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { WordpressService } from '../../Services/wordpress.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-testblog',
  templateUrl:'./testblog.component.html',
  styleUrls: ['./testblog.component.css']
})
export class TestblogComponent implements OnInit {

  @ViewChild('mainsection') section : ElementRef;

  url:string = '';
  posts;

  constructor(private wp:WordpressService) {
    this.posts = this.wp.getPage(this.url);
  }

  ngOnInit() {
    console.log(this.posts);

  }

}

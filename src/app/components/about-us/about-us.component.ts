import { Component, OnInit } from '@angular/core';
import { ResultsServiceService } from '../../Services/results-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor(private resultservice: ResultsServiceService, public navservice: Router) { }

  ngOnInit() {
  }

  /**
   * Goes back
   */
  public GoBack(): void {
    this.resultservice.aboutUs = false;
  }

  public returnHome(): void {
    //this.resultservice.landing = true;
    this.navservice.navigateByUrl('/');
  }

}

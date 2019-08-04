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

    public blog(): void {
        window.location.href = 'http://shmoogle.world/blog/sample-page/';
    }

    public whatIs(): void {
        window.location.href = 'http://shmoogle.world/blog/what-is-shmoogle/';
    }

    public goodFor(): void {
        window.location.href = 'http://shmoogle.world/blog/what-is-shmoogle#whatisitgoodfor';
    }
}

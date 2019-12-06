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

    public whatIs(): void {
        window.location.href = 'https://shmoogle.world/blog/what-is-shmoogle/';
    }

    public goodFor(): void {
        window.location.href = 'https://shmoogle.world/blog/what-is-it-good-for/';
    }

    public howWork(): void {
        window.location.href = 'https://shmoogle.world/blog/how-does-it-work/';
    }

    public shmoogleStory(): void {
        window.location.href = 'https://shmoogle.world/blog/the-shmoogle-story/';
    }

    public aboutUs(): void {
        window.location.href = 'https://shmoogle.world/blog/about-us/';
    }
}

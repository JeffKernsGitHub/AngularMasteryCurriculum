import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hello-jeffy',
  imports: [],
  templateUrl: './hello-jeffy.html',
  styleUrl: './hello-jeffy.scss',
})
export class HelloJeffy implements OnInit {
  ngOnInit(): void {
    console.log('ngOnInit called');
  }
}

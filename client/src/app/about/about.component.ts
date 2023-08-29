import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutpageComponent implements OnInit {

  images = [
    {path:"assets/images/food1.jpg"},
    {path:"assets/images/food2.jpg"},
    {path:"assets/images/food3.jpg"},
    {path:"assets/images/food4.jpg"},
    {path:"assets/images/food5.jpg"},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

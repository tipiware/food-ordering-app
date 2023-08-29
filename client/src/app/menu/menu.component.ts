import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

export interface MenuItem {
  name: string,
  price: number
}


var Menu: MenuItem[] = [];

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuInfo = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'price'];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    Menu = [];
    this.http.get<string []>("http://localhost:8080/getFoods").subscribe({
      next: (foods: any[]) =>{
        foods.forEach((element: any) => {
          Menu.push(element);
          this.menuInfo.data = Menu;
        });
      }
    })
  }

}

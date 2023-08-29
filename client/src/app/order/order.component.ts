import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {
  cookieService: CookieService;
  router: Router;
  quantity = 1;
  currentOrder : Order = new Order();
  extra_cheese = false;
  pepperoni = false;
  extra_pepperoni = false;
  sausage = false;
  extra_sausage = false;
  bacon = false;
  extra_bacon = false;
  pizzaSize=-1;
  basePrice = 8;
  priceIncrement = 4;
  costPerTopping = 0.75;
  orderCost = 0;
  order = "";
  orderTotal = 0;
  costPerPizza = 0;
  foods: FoodItem[] = [];
  foodItem: FoodItem = new FoodItem('Food list',0,0);

  constructor(cookieService: CookieService, router: Router, http: HttpClient) {
    this.cookieService = cookieService;
    this.router = router;
    this.foods.push(this.foodItem);
    http.get<string []>("http://localhost:8080/getFoods").subscribe({
      next: (foods: any[]) =>{
        foods.forEach((element: any) => {
          this.foods.push(element);
        });
      }
    });
    if(cookieService.check('order')) {
      this.currentOrder = Object.assign(new Order, JSON.parse(cookieService.get('order')));
      this.orderTotal = this.currentOrder.getOrderTotal();
    }
   }

  ngOnInit(): void {
  }

  foodItemChange() {
    this.clearForm();
  }

  pizzaSizeChange() {
    this.calculateCost();
  }

  pepperoniChange() {
    this.calculateCost();
    this.extra_pepperoni = false;
  }

  sausageChange() {
    this.calculateCost();
    this.extra_sausage = false;
  }

  baconChange() {
    this.calculateCost();
    this.extra_bacon = false;
  }

  extraCheeseChange() {
    this.calculateCost();
  } 

  extraPepperoniChange() {
    this.calculateCost();
  }

  extraSausageChange() {
    this.calculateCost();
  }

  extraBaconChange() {
    this.calculateCost();
  }

  quantityChange() {
    this.calculateCost();
  }

  clearForm() {
    this.extra_cheese = false;
    this.pepperoni = false;
    this.extra_pepperoni = false;
    this.sausage = false;
    this.extra_sausage = false;
    this.bacon = false;
    this.extra_bacon = false;
    this.pizzaSize=-1;
    this.orderCost = 0;
    this.costPerPizza - 0;
    this.order = "";
    this.quantity = 1;
  }

  addToOrder() {
    this.calculateCost();
    this.currentOrder.addOrderItem(this.order,this.orderCost, this.quantity);
    this.orderTotal = this.currentOrder.getOrderTotal();
    this.clearForm();
  }


  createOrderString () {
    if(this.foodItem.id == 0) {
    this.order = "";
    this.order += this.pizzaSize;
    this.order += this.extra_cheese ? 1 : 0;
    this.order += this.pepperoni ? this.extra_pepperoni ? 2 : 1 : 0;
    this.order += this.sausage ? this.extra_sausage ? 2 : 1 : 0;
    this.order += this.bacon ? this.extra_bacon ? 2 : 1 : 0;
    } else {
      this.order = this.foodItem.name;
    }
  }

  calculateCost() {
    this.createOrderString();
    if(this.foodItem.id == 0) {
      this.orderCost = this.basePrice + (this.priceIncrement * this.pizzaSize);
      for(var i = 1; i < this.order.length; i++) {
        this.orderCost += this.costPerTopping * parseInt(this.order.charAt(i));
      }
      this.costPerPizza = this.orderCost;
    } else {
      this.orderCost = this.foodItem.price;
    }
    this.orderCost = this.orderCost * this.quantity;
  }

  splitOrderString(order: string) {
    if(order.match(/[^0-9]+/g)) {
      return [order];
    } else {
      var itemsString = order.split("");
      var items = [];
      var size = itemsString[0];
      var cheese = itemsString[1];
      var pepperoni = itemsString[2];
      var sausage = itemsString[3];
      var bacon = itemsString[4];
      items.push((size == "3" ? "Extra Large": size == "2" ? "Large" : size == "1" ? "Medium" : "Small") + " Pizza");
      items.push(cheese == "0" ? "Cheese" : "Extra Cheese");
      if (pepperoni != "0") {
        items.push(pepperoni == "1" ? "Pepperoni" : "Extra Pepperoni");
      }
      if (sausage != "0") {
        items.push(sausage == "1" ? "Sausage" : "Extra Sausage");
      }
      if (bacon != "0") {
        items.push(bacon == "1" ? "Bacon" : "Extra Bacon");
      }
    }
    return items;
  }

  checkout() {
    var date = new Date();
    date.setHours(date.getHours()+1);
    if(this.cookieService.check('order')) {
      this.cookieService.delete('order');
    }
    this.cookieService.set('order',JSON.stringify(this.currentOrder),date);
    this.router.navigate(['delivery']);
  }
}

export class FoodItem {
  name:string;
  id:number;
  price:number;
  constructor(name:string, id:number, price:number){
    this.name = name;
    this.id = id;
    this.price = price;
  }
}

export class Order {
  orderItems: string[] = [];
  orderTotal = 0;
  delivery = false;
  time : number = Date.now();
  constructor(
  ){ }

  getOrderSize() {
    return this.orderItems.length;
  }

  addOrderItem(item: string, cost: number, quantity: number) {
    if (this.orderItems.length < 20){
      for(var i=0;i < quantity;i++){
        this.orderItems.push(item);
      }
      this.orderTotal += cost;
    } else {
      alert("Order Size Cannot Exceed 20 Items");
    }
  }

  getOrderItems() {
    return this.orderItems;
  }

  getOrderTotal() {
    return this.orderTotal;
  }
}


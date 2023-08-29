import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Order } from '../order/order.component';
import { Router } from '@angular/router';
import { RetrievalInformation } from '../delivery-pickup/delivery-pickup.component';
import { _isNumberValue } from '@angular/cdk/coercion';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})


export class ConfirmationComponent implements OnInit {
  currentOrder : Order;
  cusInfo : RetrievalInformation;
  router!: Router;
  cookieService!: CookieService;
  price = 0;

  constructor(private http: HttpClient, cookieService:CookieService, router: Router) {
    this.cookieService = cookieService;
    if (!cookieService.check('order')) {
      this.router.navigate(['order']);
    }
    if (!cookieService.check('retrievalinfo')) {
      this.router.navigate(['delivery']);
    }

    this.currentOrder = Object.assign(new Order, JSON.parse(cookieService.get('order')));
    this.cusInfo = Object.assign(new Order, JSON.parse(cookieService.get('retrievalinfo')));

    var time = new Date();
    time.setMinutes(time.getMinutes() + this.cusInfo.retrievalTime);
    this.time = time.toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric'});

    var div;
    var add;
    if (this.cusInfo.address == "") {
      div = "PICKUP"
      add = "PICKUP"
    }
    else {
      div = "DELIVERY"
      add = this.cusInfo.address.toString() + ", " + this.cusInfo.state.toString() + ", " + this.cusInfo.zip.toString()
    }
    var oi : any = [];
    for (var i= 0; i < this.currentOrder.orderItems.length; i++) {
      oi.push(this.splitOrderString(this.currentOrder.orderItems[i]).map(x=>x).join(" "));
    }
    
    this.DATA.push({
      "price" : this.currentOrder.orderTotal,
      "currentStatus" : "ACTIVE",
      "pickupDeliveryFlag" : div,
      "firstName" : this.cusInfo.firstName,
      "lastName" : this.cusInfo.lastName,
      "address" : add,
      "emailAddress" : "email",
      "phoneNumber" : this.cusInfo.phone.split('-').join(''),
      "orderDesc" : this.currentOrder.getOrderItems().toString(),
    })
    console.log(this.DATA[0]);
    this.price = this.currentOrder.getOrderTotal();
  }

  orderInfo = new MatTableDataSource();
  orderColumns: string[] = ['NAME', 'PRICE', 'actions'];
  orderItems: any = []
  message : string = "";
  clicked = false;
  time : string;

  DATA : any = [];

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
      items.push((size == "3" ? "Extra Large": size == "2" ? "Large" : size == "1" ? "Medium" : "Small") + " Pizza:");
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

  async submitOrder() {
    this.DATA.forEach((element: any) => {
      const body = element as any;
      const headers = new HttpHeaders().append('Content-Type', 'application/json');
      this.http.post("http://localhost:8080/submitOrder", body, {headers: headers}).subscribe();
    });
    this.restart();
  }

  confirm() {
    if(confirm("Send this order?")){
      this.submitOrder();
      if(this.cusInfo.address != "") {
        this.message = "Thank you for ordering! Your order is on the way. Expect it at around " + this.time;
      }
      if(this.cusInfo.address == "") {
        this.message = "Thank you for ordering! Your order will be availiable for pickup at around " + this.time;
      }
      this.clicked = true;
    }
  }

  restart() {
    this.cookieService.delete('retrievalinfo');
    this.cookieService.delete('order');
  }

  ngOnInit(): void {
    var i = -1;
    for (var i= 0; i < this.currentOrder.orderItems.length; i++) {
      this.orderItems.push("\n" + this.splitOrderString(this.currentOrder.orderItems[i]).map(x=>x).join(" "));
    }
    this.orderItems.push('\n')
  }

}

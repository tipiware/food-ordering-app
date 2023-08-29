import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-employees-dialog',
  templateUrl: './employees-dialog.component.html',
  styleUrls: ['./employees-dialog.component.css']
})
export class EmployeesDialogComponent implements OnInit {
  pepperoni = false;
  extra_pepperoni = false;
  sausage = false;
  extra_sausage = false;
  bacon = false;
  extra_bacon = false;
  extra_cheese = false;
  small = "Small ";
  medium = "Medium ";
  large = "Large ";
  extra_large = "Extra Large ";
  size: string = "";
  itemNumber = 0;
  orderNumber = 1;
  newOrderDesc = "";




  constructor(public dialogRef: MatDialogRef<EmployeesDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  orderText() {
    var output = this.size;
    if (this.extra_cheese) {
      output += "Extra Cheese Pizza ";
    }
    else {
      output += "Cheese Pizza "
    }
    if (this.pepperoni && !this.extra_pepperoni) {
      output += "Pepperoni ";
    }
    if (this.extra_pepperoni) {
      output += "Extra Pepperoni ";
    }
    if (this.sausage && !this.extra_sausage) {
      output += "Sausage ";
    }
    if (this.extra_sausage) {
      output += "Extra Sausage ";
    }
    if (this.bacon && !this.extra_bacon) {
      output += "Bacon ";
    }
    if (this.extra_bacon) {
      output += "Extra Bacon ";
    }
    return output;
  }

  orderDesc() {
    var output = "";
    if (this.size == "Small ") {
      output += "0";
    }
    if (this.size == "Medium ") {
      output += "1";
    }
    if (this.size == "Large ") {
      output += "2";
    }
    if (this.size == "Extra Large ") {
      output += "3";
    }
    if (this.extra_cheese) {
      output += "1";
    }
    else if (!this.extra_cheese) {
      output += "0";
    }
    if (this.pepperoni && !this.extra_pepperoni) {
      output += "1";
    }
    if (this.extra_pepperoni) {
      output += "2";
    }
    if (!this.pepperoni && !this.extra_pepperoni) {
      output += "0";
    }
    if (this.sausage && !this.extra_sausage) {
      output += "1";
    }
    if (this.extra_sausage) {
      output += "2";
    }
    if (!this.sausage && !this.extra_sausage) {
      output += "0";
    }
    if (this.bacon && !this.extra_bacon) {
      output += "1";
    }
    if (this.extra_bacon) {
      output += "2";
    }
    if (!this.bacon && !this.extra_bacon) {
      output += "0";
    }
    return output;
  }

  splitOrderString(order: string) {
    //Jeremee Trepp's method slightly modified
    var itemsString = order.slice(this.itemNumber, order.length);
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
    return items.map(x=>x).join(" ");
 }

  save(data : string) {
    this.itemNumber += 5;
    this.newOrderDesc += this.orderDesc();
    if (this.itemNumber >= data.length) {
      this.dialogRef.close(this.newOrderDesc + "|" + this.calculate(this.newOrderDesc));
    }
    else {
      this.newOrderDesc += data.slice(this.itemNumber, data.length);
      this.dialogRef.close(this.newOrderDesc + "|" + this.calculate(this.newOrderDesc));
    }
  }

  calculate(order: string) {
    var itemsString = order;
    var size = itemsString[0];
    var cheese = itemsString[1];
    var pepperoni = itemsString[2];
    var sausage = itemsString[3];
    var bacon = itemsString[4];
    var cost = 0;
    while (itemsString.length != 0) {
      cost += (size == "3" ? 20: size == "2" ? 16 : size == "1" ? 12 : 8);
      if (cheese != "0") {
        cost += 0.75;
      }
      if (pepperoni != "0") {
        if (pepperoni == "1") {
          cost += 0.75
        }
        else {
          cost += 1.5
        }
      }
      if (sausage != "0") {
        if (sausage == "1") {
          cost += 0.75
        }
        else {
          cost += 1.5
        }
      }
      if (bacon != "0") {
        if (bacon == "1") {
          cost += 0.75
        }
        else {
          cost += 1.5
        }
      }
      itemsString = itemsString.slice(5, itemsString.length);
      size = itemsString[0];
      cheese = itemsString[1];
      pepperoni = itemsString[2];
      sausage = itemsString[3];
      bacon = itemsString[4];
    }
    return cost;
  }

  next(data : string) {
    this.orderNumber += 1;
    if (this.size != "") {
      this.newOrderDesc += this.orderDesc();
    }
    else {
      this.newOrderDesc += data.slice(this.itemNumber, this.itemNumber + 5); 
    }
    this.itemNumber += 5;
    this.undo();
  }

  undo(){
    this.pepperoni = false;
    this.extra_pepperoni = false;
    this.sausage = false;
    this.extra_sausage = false;
    this.bacon = false;
    this.extra_bacon = false;
    this.extra_cheese = false;
    this.size = "";
  }

  abort() {
    this.dialogRef.close();
  }
}

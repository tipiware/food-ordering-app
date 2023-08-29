import { MatStepper } from '@angular/material/stepper';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Order } from '../order/order.component';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

/**
 * @title Stepper overview
 */
@Component({
  selector: 'app-delivery-pickup',
  templateUrl: './delivery-pickup.component.html',
  styleUrls: ['./delivery-pickup.component.css']
})

export class DeliveryPickupComponent implements OnInit {
  options = {
    hour: 'numeric', minute: 'numeric'
  };

  currentOrder : Order;
  customerInfo: RetrievalInformation = new RetrievalInformation();

  nameForm: FormGroup;

  orderTotal = 0;
  pickupSlideVal: number = 25;
  delivSlideVal: number = 25;
  step2Label = "Complete order information";

  delivery: boolean = false;
  step2Complete: boolean = false;
  secondFormGroup: FormGroup;
  deliveryTime: string = "";

  thirdFormGroup: FormGroup;

  cookieService: CookieService;
  router: Router;

  constructor(private _formBuilder: FormBuilder, cookieService:CookieService, router: Router) {
    this.cookieService = cookieService;
    this.router = router;

    // If there isn't an order cookie, navigate the user to the order page
    if (!cookieService.check('order')) {
      this.router.navigate(['order']);
    }

    // Get info from order cookie
    this.currentOrder = Object.assign(new Order, JSON.parse(cookieService.get('order')));
    this.orderTotal = this.currentOrder.getOrderTotal();

    // Set up form groups

    this.nameForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      retType: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      address: ['', Validators.required],
      zip: ['', Validators.pattern("^[0-9]{5}$")],
      state: ['', Validators.pattern("^[a-zA-Z]{2,}$")],
      phone: ['', Validators.pattern("^[0-9]{3,4}-?[0-9]{3}-?[0-9]{4}$")]
    });

    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    
    this.deliverySlider(this.delivSlideVal);
  }

  ngOnInit() {

  }

  formatLabel(value: number) {
    var out: string = "";

    if (value >= 60) {
      out +=  Math.floor(value / 60) + "h ";
      value %= 60;
    }

    if (value > 0) {
      out += value + "m";
    }
    
    return out;
  }

  // Submit type of retrieval method
  typeSubmit() {
    if (!this.nameForm.valid) {
      return;
    }

    this.delivery = this.nameForm.get("retType")!.value === 'delivery';
    this.currentOrder.delivery = this.delivery;

    this.customerInfo.firstName = this.nameForm.get("firstName")!.value;
    this.customerInfo.lastName = this.nameForm.get("lastName")!.value;
    //console.log(this.delivery);
  }

  // Submit for pickup
  pickupSubmit() {
    this.customerInfo.retrievalTime = this.pickupSlideVal;
    //console.log(this.pickupSlideVal);
  }

  // Submit for delivery
  addrSubmit(stepper: MatStepper) {
    this.step2Complete = this.secondFormGroup.valid;
    if (this.step2Complete) {
      this.customerInfo.address = this.secondFormGroup.get('address')!.value;
      this.customerInfo.zip = this.secondFormGroup.get('zip')!.value;
      this.customerInfo.state = this.secondFormGroup.get('state')!.value;
      this.customerInfo.phone = this.secondFormGroup.get('phone')!.value;
      this.customerInfo.retrievalTime = this.delivSlideVal;
      stepper.next();
    }
  }

  checkout() {
    if(this.cookieService.check('retrievalinfo')) {
      this.cookieService.delete('retrievalinfo');
    }
    this.cookieService.set('retrievalinfo',JSON.stringify(this.customerInfo));
    
  }

  deliverySlider(time: any) {
    if (time == null) {
      return;
    }
    this.delivSlideVal = time;
    this.deliveryTime = new Intl.DateTimeFormat("en-US", this.options).format(new Date(Date.now() + time * 60000));
  }

  pickupSlider(time: any) {
    if (time == null) {
      return;
    }
    this.pickupSlideVal = time;
    this.deliveryTime = new Intl.DateTimeFormat("en-US", this.options).format(new Date(Date.now() + time * 60000));
  }

  splitOrderString(order: string) {
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
    return items;
  }
}

export class RetrievalInformation {

  firstName: String = "";
  lastName: String = "";
  address: String = "";
  zip: String = "";
  state: String = "";
  phone: String = "";
  retrievalTime: number = 20;

  constructor() { 

  }
}
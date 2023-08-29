import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  adminFormGroup: FormGroup;

  constructor(private http: HttpClient, private _formBuilder: FormBuilder) {
    this.adminFormGroup = this._formBuilder.group({
      name: ['', Validators.pattern("^[a-zA-Z0-9 ]+$")],
      price: ['', Validators.pattern("^\\$?[0-9]+(\\.[0-9]{2})?$")],
    });

   }

  ngOnInit(): void {
  }

  submitForm() {

    let price = parseFloat(this.adminFormGroup.get("price")!.value.replace("$",""));

    let data = 
      {
        "name": this.adminFormGroup.get("name")!.value,
        "price": price
      };
    
    console.log(data);

    const body = data;
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    this.http.post("http://localhost:8080/createItem", body, {headers: headers}).subscribe();

  }

}

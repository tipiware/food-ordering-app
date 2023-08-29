import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeesDialogComponent } from '../employees-dialog/employees-dialog.component';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})


export class EmployeesComponent implements OnInit {
  
  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort !: MatSort;

  CUST_DATA = [] as any;
  ORDER_ITEMS = [] as any;
  status : string = "ACTIVE";
  message : string = "Welcome to the Employee Dashboard. Press either the 'Active Orders' button or the 'Finished Orders' button to begin. "
  orderInfo = new MatTableDataSource();
  orderColumns: string[] = ['orderId', 'customerName', 'address', 'phoneNumber', 'foodName', 'pickupDeliveryFlag', 'price', 'status', 'actions'];

  constructor(private http: HttpClient, public dialog: MatDialog) {}
  
  searchOrders = (value: string) => {
    this.orderInfo.filter = value.trim().toLowerCase();
    this.message = "No data found."
  }

  findOrderInfoData(id: number) {
    const element = this.orderInfo.data as any;
    for (var i = 0; i < element.length; i++) {
      if (id == element[i].orderId){
        return element[i];
        break;
      }
    }
  }

  async removeOrder(id: number) {
      const body = this.findOrderInfoData(id) as any;
      const headers = new HttpHeaders().append('Content-Type', 'application/json');
      if(confirm("Delete this order:\n"  + " " + body.foodName + "\nWARNING: This removes from database. ")){
        this.http.post("http://localhost:8080/removeOrder", body, {headers: headers}).subscribe();
        await new Promise(t => setTimeout(t, 300));
        this.buildTable(this.status);
      }
  }

  async finishOrder(id: number) {
    const body = this.findOrderInfoData(id) as any;
    const headers = new HttpHeaders().append('Content-Type', 'application/json')
    if(confirm("Finish this order: " + body.foodName)){
      this.http.post("http://localhost:8080/finishOrder", body, {headers: headers}).subscribe();
      await new Promise(t => setTimeout(t, 300));
      this.buildTable(this.status);
    }
  }

  buildTable(status: string) {
    this.status = status;
    this.orderInfo.data = [];

    var foo : string;
    var orderDesc : string;
    var customerName : string;
    var add : string;
    var phone : string;

    this.http.post<string []>("http://localhost:8080/getOrders", null).subscribe({
      next: (orders: any[]) =>{
        orders.forEach((element: any) => {
          if (element.status == status){
            this.CUST_DATA.forEach((cusElement : any) => {
              if (element.customerId == cusElement.customerId){
                phone = cusElement.phoneNumber;
                customerName = cusElement.firstName + " " + cusElement.lastName;
                add = cusElement.address;
              }
            });

            this.ORDER_ITEMS.forEach((ordElement : any) => {
              if (element.orderId == ordElement.orderId){
                orderDesc = ordElement.orderDesc
                foo = ordElement.orderDesc;
              }
            });

            var food : string = "";
            var fooSplit = foo.split(",");
            for (var i = 0; i < fooSplit.length; i++) {
              food += this.splitOrderString(fooSplit[i]);
              food += "\n";
            }

            var displayElement = 
            {
              "orderId" : element.orderId,
              "orderItemsId" : element.orderItemsId,
              "orderDesc" : orderDesc,
              "customerId" : element.customerId,
              "customerName" : customerName,
              "address" : add,
              "phoneNumber" : phone,
              "foodName" : food.replace(/,/g, " "),
              "price" : element.price,
              "status" : element.status,
              "pickupDeliveryFlag" : element.pickupDeliveryFlag,
            }
            this.orderInfo.data.push(displayElement);
            this.orderInfo.filter = "";
            foo = "";
          }
        });
      }
    })
  }

  splitOrderString(order: string) {
    console.log(order);
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

  editOrder(id: number): void {
    const element = this.findOrderInfoData(id) as any;
    const dialogRef = this.dialog.open(EmployeesDialogComponent, {
      width: '550px',
      data: {
        id: element.orderDesc
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      var postData = result.split("|");
      var orderItem = {
        "orderId":element.orderId,
        "orderDesc": postData[0],
        "price": postData[1]
      };

      if (result != null) {
        const headers = new HttpHeaders().append('Content-Type', 'application/json')
        if(confirm("Commit changes? ")){
          this.http.post("http://localhost:8080/editOrder", orderItem, {headers: headers}).subscribe();
          this.http.post("http://localhost:8080/updatePrice", orderItem, {headers: headers}).subscribe();
          location.reload();
        }
      }
    });
  }

  ngOnInit(): void {
    this.orderInfo.paginator = this.paginator;
    this.orderInfo.sort = this.sort;
    this.http.post<string []>("http://localhost:8080/getCustomers", null).subscribe({
      next: (cus: any[]) =>{
        cus.forEach((element: any) => {
          this.CUST_DATA.push(element);
        });
      }
    })
    this.http.post<string []>("http://localhost:8080/getOrderItems", null).subscribe({
      next: (cus: any[]) =>{
        cus.forEach((element: any) => {
          this.ORDER_ITEMS.push(element);
        });
      }
    })

    //this.buildTable("ACTIVE");
  }
}

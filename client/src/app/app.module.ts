import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutpageComponent } from './about/about.component';
import { MenuComponent } from './menu/menu.component';
import { DeliveryPickupComponent } from './delivery-pickup/delivery-pickup.component';
import { EmployeesComponent } from './employees/employees.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { OrderComponent } from './order/order.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule} from '@angular/material/table';
import { MatDividerModule} from '@angular/material/divider';
import { MatListModule} from '@angular/material/list';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule} from '@angular/material/grid-list'
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

import { MatCard, MatCardModule } from '@angular/material/card';
import { AdminComponent } from './admin/admin.component';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {CookieService} from 'ngx-cookie-service';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { EmployeesDialogComponent } from './employees-dialog/employees-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    MenuComponent,
    DeliveryPickupComponent,
    EmployeesComponent,
    ConfirmationComponent,
    OrderComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    EmployeesDialogComponent,
    AboutpageComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', redirectTo: '/homepage', pathMatch: 'full'},
      {path: 'homepage', component: HomepageComponent},
      {path: 'confirmation', component: ConfirmationComponent},
      {path: 'delivery', component: DeliveryPickupComponent},
      {path: 'employees', component: EmployeesComponent},
      {path: 'menu', component: MenuComponent},
      {path: 'order', component: OrderComponent},
      {path: 'admin', component: AdminComponent},
      {path: 'about', component: AboutpageComponent},
      { path: '**', component: PageNotFoundComponent },
    ]),

    NoopAnimationsModule, 
    MatButtonModule, 
    MatTableModule,
    MatDividerModule,
    MatSliderModule,
    MatToolbarModule, 
    MatCheckboxModule,
    MatRadioModule,
    MatCardModule,
    MatListModule, 
    MatFormFieldModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatStepperModule, 
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IvyCarouselModule,
    MatExpansionModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDialogModule,
    MatSelectModule,
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    MatToolbarModule,
    HttpClientModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatCardModule,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

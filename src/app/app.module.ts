
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './form-container/modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { AppComponent } from './app.component';
import { FormContainerComponent } from './form-container/form-container.component';

import { ContactFormComponent } from './form-container/contact-form/contact-form.component';
import { AddressFormComponent } from './form-container/address-form/address-form.component';
import { PersonalFormComponent } from './form-container/personal-form/personal-form.component';
import { StepperComponent } from './form-container/stepper/stepper.component';

import { FormService } from './form-container/form-service/form.service';


@NgModule({
  declarations: [
    AppComponent,
    FormContainerComponent,
    AddressFormComponent,
    ContactFormComponent,
    PersonalFormComponent,
    StepperComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [FormService],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }

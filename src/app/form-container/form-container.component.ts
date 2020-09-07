import { ModalComponent } from './modal/modal.component';
import { FormService } from './form-service/form.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription, observable } from 'rxjs';
import { Member } from './models/member.interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit, OnDestroy {


  /**
   * formgroup
   */
  form: FormGroup;

  /**
   *  subscription for subscribe and unsubscribe the observables
   */
  private subscribeManager$: Subscription;

  /**
   * list of the members
   */
  membersList: [];

  /**
   * member data
   */
  member: Member;

  /**
   * boolean for stepper
   */
  isPersonal: boolean;
  isAddress: boolean;
  isContact: boolean;



  constructor(private fb: FormBuilder, private formService: FormService, private modal: MatDialog) {
    this.form = this.fb.group({
      personal: this.fb.group({
        title: [''],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]]
      }),
      address: this.fb.group({
        country: ['', [Validators.required]],
        city: [''],
        street: ['']
      }),
      contact: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.minLength(10), Validators.pattern('^[0-9_-]{10,12}')]],
        optin: ['']
      })
    });

    this.isPersonal = true;
    this.isAddress = false;
    this.isContact = false;

    this.subscribeManager$ = new Subscription();

  }

  ngOnInit(): void {

    this.formService.getMembers().subscribe(members => this.membersList = members);
    this.onGetBooleanValues();

  }

  /**
   *  form submission
   */
  onSubmit(): void {

    this.member = {
      title: this.form.get('personal').value.title,
      firstName: this.form.get('personal').value.firstName,
      lastName: this.form.get('personal').value.lastName,
      street: this.form.get('address').value.street,
      city: this.form.get('address').value.city,
      country: this.form.get('address').value.country,
      email: this.form.get('contact').value.email,
      phone: this.form.get('contact').value.phone
    };

    this.subscribeManager$.add(this.formService.addNewMember(this.member).subscribe(iMember => {
      this.isContact = false;
      this.isPersonal = true;
    }));

    this.form.reset();

  }

  /**
   *  next button visiblity
   */
  onBtnNext(): void {
    if (!this.isAddress && !this.isContact) {
      this.isPersonal = false;
      this.isAddress = true;
    }
    else if (!this.isPersonal && !this.isContact) {
      this.isAddress = false;
      this.isContact = true;
    }
    this.onGetBooleanValues();
  }

  /**
   * previous button visibility
   */
  onBtnPrevious(): void {
    if (this.isAddress && !this.isPersonal) {
      this.isPersonal = true;
      this.isAddress = false;
    }
    else if (this.isContact && !this.isAddress) {
      this.isAddress = true;
      this.isContact = false;
    }
    this.onGetBooleanValues();
  }

  onGetBooleanValues(): void {
    this.formService.isPersonal$.next(this.isPersonal);
    this.formService.isAddress$.next(this.isAddress);
    this.formService.isContact$.next(this.isContact);
  }

  /**
   * open modal dialog box
   */
  openModal(): void {

    this.modal.open(ModalComponent, {
      data: {
        title: this.form.get('personal').value.title,
        firstName: this.form.get('personal').value.firstName,
        lastName: this.form.get('personal').value.lastName,
        street: this.form.get('address').value.street,
        city: this.form.get('address').value.city,
        country: this.form.get('address').value.country,
        email: this.form.get('contact').value.email,
        phone: this.form.get('contact').value.phone
      }
    });

  }



  /**
   * to unsubscribe the subscription
   */
  ngOnDestroy(): void {
    this.subscribeManager$.unsubscribe();
  }

}

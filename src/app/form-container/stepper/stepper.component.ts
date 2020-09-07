import { FormService } from './../form-service/form.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnDestroy {

  /**
   * boolean for stepper
   */
  isPersonal: boolean;
  isAddress: boolean;
  isContact: boolean;


  /**
   *  subscription for subscribe and unsubscribe the observables
   */
  private subscribeManager$: Subscription;

  constructor(private formService: FormService) {
    this.subscribeManager$ = new Subscription();

    this.subscribeManager$.add(this.formService.isPersonal$.subscribe(iValue => this.isPersonal = iValue));

    this.subscribeManager$.add(this.formService.isAddress$.subscribe(iValue => this.isAddress = iValue));

    this.subscribeManager$.add(this.formService.isContact$.subscribe(iValue => this.isContact = iValue));
  }

  /**
   * to unsubscribe the subscription
   */
  ngOnDestroy(): void {
    this.subscribeManager$.unsubscribe();
  }

}

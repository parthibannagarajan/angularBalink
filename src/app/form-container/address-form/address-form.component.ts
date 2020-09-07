import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

  @Input()
  parent: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  onRequired(name: string): boolean {
    return (
      this.parent.get(`address.${name}`).hasError('required') &&
      this.parent.get(`address.${name}`).touched
    );
  }

}

import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PersonalFormComponent implements OnInit {

  @Input()
  parent: FormGroup;

  @Input()
  titles: [];

  constructor() { }

  ngOnInit(): void {
  }


  onRequired(name: string): boolean {
    return (
      this.parent.get(`personal.${name}`).hasError('required') &&
      this.parent.get(`personal.${name}`).touched
    );
  }

}

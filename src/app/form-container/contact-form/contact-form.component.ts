import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  @Input()
  parent: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  onRequired(name: string): boolean {
    return (
      this.parent.get(`contact.${name}`).hasError('required') &&
      this.parent.get(`contact.${name}`).touched
    );
  }



}

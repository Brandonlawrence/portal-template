import { Component, OnInit, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
  selector: 'intput-errors',
  templateUrl: './intput-errors.component.html',
  styleUrls: ['./intput-errors.component.scss']
})
export class IntputErrorsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  private static readonly errorMessages = {
    'required': () => 'Please fill out this field',
    'minlength': (params) => 'The min number of characters is ' + params.requiredLength,
    'maxlength': (params) => 'The max allowed number of characters is ' + params.requiredLength,
    'pattern': (params) => 'The required pattern is: ' + params.requiredPattern,
    'years': (params) => params.message,
    'countryCity': (params) => params.message,
    'uniqueName': (params) => params.message,
    'telephoneNumbers': (params) => params.message,
    'telephoneNumber': (params) => params.errorMessages,
    'websiteValidator': () => 'Please enter a valid URL',
    'appImageFileValidator': () => 'Please provide valid png/jpg/jpeg/gif image file',
    'appExpiredDateValidator': () => 'Please fill valid current or future date',
    'whiteSpaceValidator': () => 'Please fill valid value',
    'domainValidator': () => 'Please enter a valid domain',
    'phoneNumberValidator': (params) => params.message
  };

  @Input()
  private control: AbstractControlDirective | AbstractControl;

  shouldShowErrors(): boolean {
    return this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched);
  }

  listOfErrors(): string[] {
    return Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field]));
  }

  private getMessage(type: string, params: any) {
    return IntputErrorsComponent.errorMessages[type](params);
  }

}

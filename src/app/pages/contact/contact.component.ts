import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @Input() showContact: boolean;
  @Output() closeContact: EventEmitter<boolean> = new EventEmitter();

  public contactForm = this.fb.group({
    infoSelect: ["", Validators.required],
    email: ["", Validators.required],
    phone: ["", Validators.required],
    message: ["", Validators.required]    
  });

  constructor(public fb: FormBuilder) {}

  sendEmail(event) {
    console.log(this.contactForm.value);
  }

  ngOnInit() {
  }

  closePopup() {
    console.log('click pop');
    this.closeContact.emit(false);
  }

}

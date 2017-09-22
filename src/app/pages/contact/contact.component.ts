import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @Input() showContact: boolean;
  @Output() closeContact: EventEmitter<boolean> = new EventEmitter();
  public sending: boolean = false;
  public sent: boolean = false;

  public contactForm = this.fb.group({
    infoSelect: ["", Validators.required],
    email: ["", Validators.required],
    phone: ["", Validators.required],
    message: ["", Validators.required]    
  });

  constructor(
    public fb: FormBuilder,
    private dataService: DataService
  ) {}

  sendEmail(event) {
    this.sending = true;
    this.dataService.sendMail(this.contactForm.value).subscribe(res => {
      if (res.status === 200) {
        this.sending = false;
        this.sent = true;
      }

      setTimeout(() => {
        this.closePopup();
      }, 1000);
  });
  }

  ngOnInit() {
  }

  closePopup() {
    console.log('click pop');
    this.closeContact.emit(false);
  }

}

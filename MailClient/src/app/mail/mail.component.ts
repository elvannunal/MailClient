import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {EmailService} from "../Service/email.service";

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class EmailFormComponent {
  emailForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private emailService: EmailService) {
    this.emailForm = this.formBuilder.group({
      to: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  sendEmail() {
    if (this.emailForm.valid) {
      const emailData = this.emailForm.value;
      this.emailService.sendEmail(emailData).subscribe(
        response => {
          alert('E-posta gönderildi: ');
          debugger
          this.emailForm.reset();
        },
        error => {
          console.error('E-posta gönderme hatası: ', error);
        }
      );
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { phoneValidator } from '../shared/url.validator';
import { NgIf } from '@angular/common';
import { CustomFullNameComponent } from '../custom-full-name/custom-full-name.component';

// Интерфейс формы 
type RequiredFields = 'fullName' | 'phone' | 'email' | 'agreement';
type OptionalFields = 'comment';
export type FeedbackFormData = 
  { [K in RequiredFields]: K extends 'agreement' ? boolean : string } & 
  { [K in OptionalFields]?: string };

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule,  NgIf, CustomFullNameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Feedback form';

  feedbackForm!: FormGroup;

  public showSuccessModal: boolean = false;

  constructor () {}

  public  ngOnInit(): void {
    this.initForm();
  }
 
  private initForm(): void {
     this.feedbackForm = new FormGroup({
      fullName: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(256)
      ]),
      phone: new FormControl('', [
        Validators.required,
        phoneValidator // Используем кастомный валидатор
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(256)
      ]),
      comment: new FormControl('', Validators.maxLength(256)),
      agreement: new FormControl({value: false, disabled: true})
    });

    this.setupAgreementControl();
  }


  private setupAgreementControl(): void {
    const requiredFields = ['fullName', 'phone', 'email'];

    requiredFields.forEach(field => {
      this.feedbackForm.get(field)?.statusChanges.subscribe(() => {
        this.updateAgreementState();
      });
    });
  }
  
  private updateAgreementState(): void {
    const requiredValid =
    this.feedbackForm.get('fullName')?.valid && 
        this.feedbackForm.get('phone')?.valid && 
        this.feedbackForm.get('email')?.valid;

    const agreement = this.feedbackForm.get('agreement');
      if (requiredValid && agreement?.disabled) {
        agreement.enable();
      } else if (!requiredValid && agreement?.enabled) {
        agreement.disable();
        agreement.setValue(false);
      }
    };

 public onSubmit(): void {
  if (this.feedbackForm.valid && this.feedbackForm.value.agreement) {
    console.log('Форма отправлена', this.feedbackForm.value);
    this.showSuccessModal = true;

    this.feedbackForm.reset();

    this.feedbackForm.get('agreement')?.disable();
  } else {
    this.markAllIsTouched();
  }
 }
 
 private markAllIsTouched(): void{
  Object.values(this.feedbackForm.controls).forEach(control => {
      control.markAsTouched();
    });
 }

 public closeModal(): void {
    this.showSuccessModal = false;
  }

}

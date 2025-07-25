import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule} from '@angular/forms';
import { phoneValidator } from '../shared/url.validator';
import { NgIf } from '@angular/common';
import { CustomFullNameComponent } from '../custom-full-name/custom-full-name.component';
import { FeedbackForm } from '../shared/types';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule,  NgIf, CustomFullNameComponent, MatButtonModule, MatIconModule, MatDividerModule, MatCheckboxModule, MatInputModule, MatFormFieldModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ]
})
export class AppComponent implements OnInit {
  title = 'Feedback form';

  feedbackForm!: FormGroup<FeedbackForm>;

  showSuccessModal: boolean = false;

  ngOnInit(): void {
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

  protected onSubmit(): void {
  if (this.feedbackForm.valid && this.feedbackForm.value.agreement) {
    console.log('Форма отправлена', this.feedbackForm.value);
    this.showSuccessModal = true;

    this.feedbackForm.reset();

    this.feedbackForm.clearValidators();

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

  closeModal(): void {
    this.showSuccessModal = false;
  }

}

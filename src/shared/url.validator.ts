import { AbstractControl, ValidationErrors } from '@angular/forms';

function isNumberOrString(value: any): value is number | string {
  return typeof value === 'number' || typeof value === 'string';
}

export function phoneValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  
  if (!isNumberOrString(value)) {
    return { phoneInvalid: 'Некорректный тип данных' };
  }
  
  const strValue = value.toString();
  
  return /^\d+$/.test(strValue) 
    ? null 
    : { phoneInvalid: 'Только цифры разрешены' };
}
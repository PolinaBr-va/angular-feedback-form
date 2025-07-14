import { AbstractControl, ValidationErrors } from '@angular/forms';
import {isNumberOrString} from '../shared/guards'

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



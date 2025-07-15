import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'app-custom-full-name',
  imports: [MatInputModule],
  templateUrl: './custom-full-name.component.html',
  styleUrl: './custom-full-name.component.css',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomFullNameComponent),
    multi: true
  }]
})
export class CustomFullNameComponent implements ControlValueAccessor{
  value: string = '';
  disabled = false;
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  onInput(event: Event): void {
  
    const input = event.target as HTMLInputElement | null;
    
    if (input) {
      const newValue = input.value;
      this.onChange(newValue);  
    }
  }

  writeValue(value: string): void {
    this.value = value || '';
  }
  
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}



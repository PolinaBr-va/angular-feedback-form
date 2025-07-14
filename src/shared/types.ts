import { FormControl } from "@angular/forms";

export interface FeedbackForm {
  /**
   * Наименование
   */
  fullName: FormControl<string | null> ;
  /**
   * Номер телефона
   */
  phone: FormControl<string | null>;
  /**
   * Адрес электронной почты
   */
  email: FormControl<string | null>;

  comment: FormControl<string | null>;

 agreement: FormControl<boolean | null>;
}
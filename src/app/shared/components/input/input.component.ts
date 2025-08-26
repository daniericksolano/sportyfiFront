import { Component, forwardRef, Input, OnInit, Optional, SkipSelf } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormGroup, FormGroupDirective, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ErrosMessageService } from '../../services/erros-message/erros-message.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-input',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  /*viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],*/
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent  implements OnInit {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() nameInput: string = '';
  @Input() id: string = '';
  @Input() class: string = '';
  @Input() submitted: boolean = false;
  formInvalid?: boolean = false;
  errorsMessage: string[] = []
  form!: FormGroup<any>;
  value: string = '';
  disabled = false;
  // Default constructor

  constructor(@Optional() @SkipSelf() private controlContainer: ControlContainer,
      private errosMessageService: ErrosMessageService) {
  }
  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
    this.formInvalid = this.form?.invalid;
  }

  getErrorMessage(errorType: string): string {
    if (!errorType) return '';
    return this.errosMessageService.getErrorMessage(errorType);
  }
  errorsMessageArray(): string[] {
    if(this.form && this.form.get(this.nameInput)?.errors) {
      return Object.keys(this.form.get(this.nameInput)?.errors || {});
    }
    return [];
  }
  
}

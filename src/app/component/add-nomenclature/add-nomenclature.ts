import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-nomenclature',
  standalone: false,
  templateUrl: './add-nomenclature.html',
  styleUrl: './add-nomenclature.css'
})
export class AddNomenclature {

  
  form: FormGroup;
  currentStep = 1;
  
  constructor(
    private dialogRef: MatDialogRef<AddNomenclature>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      code: ['', Validators.required , Validators.minLength(10),Validators.maxLength(10)],
      suffix: ['', Validators.required , Validators.maxLength(1)],
      statisticalIndicator: [''],
      startDate: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      endDate: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      national: [false],
      declarable: [false],
    });
  }

  nextStep() {
    if (this.currentStep === 1) {
      const step1Controls = ['code', 'suffix', 'startDate', 'endDate'];
      const step1Valid = step1Controls.every(control => 
        this.form.get(control)?.valid
      );
      
      if (step1Valid && this.currentStep < 3) {
        this.currentStep++;
      } else {
        step1Controls.forEach(control => {
          this.form.get(control)?.markAsTouched();
        });
      }
    } else if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      this.dialogRef.close(this.form.value);
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onReset() {
    this.form.reset();
    this.currentStep = 1;
  }

  isStepValid(step: number): boolean {
    switch (step) {
      case 1:
        return ['code', 'suffix', 'startDate', 'endDate'].every(control => 
          this.form.get(control)?.valid
        );
      case 2:
        return true; 
      case 3:
        return true; 
      default:
        return false;
    }
  }

  isStepCompleted(step: number): boolean {
    return this.currentStep > step && this.isStepValid(step);
  }

  hasError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(control && control.invalid && control.touched);
  }
    
}

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

  
  step1Form: FormGroup;
  step2Form: FormGroup;
  step3Form: FormGroup;
  currentStep = 1;
  
  constructor(
    private dialogRef: MatDialogRef<AddNomenclature>,
    private fb: FormBuilder
  ) {
    this.step1Form = this.fb.group({
      code: ['', [Validators.required ,Validators.minLength(10),Validators.maxLength(10)]],
      suffix: ['', [Validators.required , Validators.maxLength(2)]],
      statisticalIndicator: [''],
      startDate: ['',Validators.required],
      endDate: ['',Validators.required],
      national: [false],
      declarable: [false],
    });
    this.step2Form = this.fb.group({ 

      description: ['', Validators.required],
      
      dateDebut: ['',Validators.required],
      dateFin: ['',Validators.required],
      status: [1] ,


      contenuNote :[''],
      dateDebutNote :[''],
      dateFinNote :[''],


    });
    this.step3Form = this.fb.group({
      relatedCodes: [1],
      
    });
  }

  nextStep() {
    let formValid = false
  if (this.currentStep ===1){
    formValid = this.step1Form.valid;
  }else if (this.currentStep === 2) {
    formValid = this.step2Form.valid; 
  }else {
    formValid = this.step3Form.valid;   
  }

  if(formValid  && this.currentStep < 3) {
      this.currentStep++;
    }

}

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
VlaidateStep2() : boolean{

  const descValid = 
    !!this.step2Form.get('description')?.valid&&
    !!this.step2Form.get('dateDebut')?.valid&&
    !!this.step2Form.get('dateFin')?.valid;
    

   const noteVal = this.step2Form.get('contenuNote')?.value;
  const noteValid = !noteVal ||
    (!!this.step2Form.get('dateDebutNote')?.valid &&
     !!this.step2Form.get('dateFinNote')?.valid);

  return !!descValid && noteValid;

  
}
  onSubmit() {
    if (this.step1Form.valid && this.VlaidateStep2()&& this.step3Form.valid) {
        
      
      const formatDate = (date: any): string | null => {
      return date ? new Date(date).toISOString().split("T")[0] : null;
    };
     
      const taricData = {
      codeNomenclature: this.step1Form.value.code.toString(),
      dateDebutValid:formatDate( this.step1Form.value.startDate),
      dateFinValid: formatDate(this.step1Form.value.endDate),
      
      suffixDto: {
              codeSuffix: this.step1Form.value.suffix.toString(), 
              national: this.step1Form.value.national,
              declarable: this.step1Form.value.declarable,

      },
      descriptions: [{
        description: this.step2Form.value.description,
        dateDebutValid: formatDate(this.step2Form.value.dateDebut),
        dateFinValid: formatDate(this.step2Form.value.dateFin),

      }],

      notes: this.step2Form.value.contenuNote ? [{
        contenu: this.step2Form.value.contenuNote,
        dateDebutValid:formatDate( this.step2Form.value.dateDebutNote),
        dateFinValid: formatDate(this.step2Form.value.dateFinNote)
      }] : []
    };
        console.log("Données à envoyer :", taricData);


    this.dialogRef.close(taricData);

  } 

  }
    onClose() {
    this.dialogRef.close();
  }

  onReset() {
    this.step1Form.reset();
    this.step2Form.reset();
    this.step3Form.reset();
    this.currentStep = 1;
  }

  isStepValid(step: number): boolean {
    switch (step) {
      case 1:
        return ['code', 'suffix', 'startDate', 'endDate'].every(control => 
          this.step1Form.get(control)?.valid
        );
      case 2:
        return this.VlaidateStep2()  ; 
      case 3:
        return true; 
      default:
        return false;
    }
  }

  isStepCompleted(step: number): boolean {
    return this.currentStep > step && this.isStepValid(step);
  }

  hasError(controlName: string, formGroup :FormGroup): boolean {
    const control = formGroup.get(controlName);
    return !!(control && control.invalid && control.touched);
  }
    
}

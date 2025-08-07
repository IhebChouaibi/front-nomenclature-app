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
  
  
  constructor( private dialogRef : MatDialogRef<AddNomenclature> , 
    @Inject(MAT_DIALOG_DATA) public data :any,
  private fb: FormBuilder ){
       this.form = this.fb.group({
      
      code: [data?.code || '', Validators.required],
      suffix: [data?.suffix || '', Validators.required],
      statisticalIndicator: [data?.statisticalIndicator || ''],
      startDate: [data?.startDate || '', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      endDate: [data?.endDate || '', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      national: [data?.national || false],
      declarable: [data?.declarable || false],
      
      detail1: [''],
      detail2: [''],
      
      socialLink1: [''],
      socialLink2: ['']
    });
    }

    
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-text-field',
 standalone:false,
  templateUrl: './text-field.html',
  styleUrl: './text-field.css'
})
export class TextField {
@Input() label : string = '';
@Input() type : string = 'text';
@Input() placeholder : string = '';
@Input() value : string = '';
@Input() error : string = '';



@Output() valueChange = new EventEmitter<string>();
showPassword :boolean = false ; 
onInputChange (event :Event ){
  const newValue = (event.target as HTMLInputElement).value;
  this.value = newValue ; 
  this.valueChange.emit(newValue);
}

togglePassword(){
  this.showPassword = !this.showPassword;
}
}

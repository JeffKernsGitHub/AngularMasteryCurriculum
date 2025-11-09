import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiServicesComponent } from './di-services.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DiServicesComponent
  ],
  exports: [DiServicesComponent]
})
export class DiServicesModule { }

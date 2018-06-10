import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubmitComplaintPage } from './submit-complaint';

@NgModule({
  declarations: [
    SubmitComplaintPage,
  ],
  imports: [
    IonicPageModule.forChild(SubmitComplaintPage),
  ],
})
export class SubmitComplaintPageModule {}

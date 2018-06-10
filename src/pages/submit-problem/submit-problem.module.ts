import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubmitProblemPage } from './submit-problem';

@NgModule({
  declarations: [
    SubmitProblemPage,
  ],
  imports: [
    IonicPageModule.forChild(SubmitProblemPage),
  ],
})
export class SubmitProblemPageModule {}

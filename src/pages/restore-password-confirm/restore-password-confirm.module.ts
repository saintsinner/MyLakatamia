import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestorePasswordConfirmPage } from './restore-password-confirm';

@NgModule({
  declarations: [
    RestorePasswordConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(RestorePasswordConfirmPage),
  ],
})
export class RestorePasswordConfirmPageModule {}

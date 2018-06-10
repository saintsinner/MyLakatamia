import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestorePasswordPage } from './restore-password';

@NgModule({
  declarations: [
    RestorePasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(RestorePasswordPage),
  ],
})
export class RestorePasswordPageModule {}

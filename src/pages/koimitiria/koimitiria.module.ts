import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KoimitiriaPage } from './koimitiria';

@NgModule({
  declarations: [
    KoimitiriaPage,
  ],
  imports: [
    IonicPageModule.forChild(KoimitiriaPage),
  ],
})
export class KoimitiriaPageModule {}

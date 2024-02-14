import { Routes } from '@angular/router';
import { ModelSelectorComponent } from './model-selector/model-selector.component';
import { ConfigSelectorComponent } from './config-selector/config-selector.component';
import { SummaryComponent } from './summary/summary.component';
import { inject } from '@angular/core';
import { ModelService } from './model.service';
import { ConfigService } from './config.service';

export const routes: Routes = [
  { path: '', redirectTo: 'model-selection', pathMatch: 'full' },
  { path: 'model-selection', component: ModelSelectorComponent },
  {
    path: 'select-configuration',
    component: ConfigSelectorComponent,
    canActivate: [() => inject(ModelService).modelCodeSubject$.value.length > 0]
  },
  {
    path: 'summary',
    component: SummaryComponent,
    canActivate: [() => inject(ConfigService).configId > 0]
  },
  { path: '**', redirectTo: 'model-selection' }
];

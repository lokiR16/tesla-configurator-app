import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModelViewerComponent } from './model-viewer/model-viewer.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { ModelService } from './model.service';
import { ConfigService } from './config.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ModelViewerComponent,
    MatTabsModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  activeRoute = 0;
  readonly routes = [
    '/model-selection',
    '/select-configuration',
    '/summary',
  ];

  constructor(
    private _modelService: ModelService,
    private _configService: ConfigService,
  ) { }

  isDisabled(route: string): boolean {
    switch (route) {
      case '/select-configuration':
        return this._modelService.modelCodeSubject$.value === '';
      case '/summary':
        return this._configService.configId === 0;
      default:
        return false;
    }
  }
}

import { Component } from '@angular/core';
import { ModelService } from '../model.service';
import { CommonModule } from '@angular/common';
import { TeslaLogoSvgComponent } from '../svg/tesla-logo-svg.component';

@Component({
  selector: 'app-model-viewer',
  standalone: true,
  imports: [
    CommonModule,
    TeslaLogoSvgComponent,
  ],
  templateUrl: './model-viewer.component.html',
  styleUrl: './model-viewer.component.scss'
})
export class ModelViewerComponent {
  readonly ENDPOINT = 'https://interstate21.com/tesla-app/images';

  constructor(private _modelService: ModelService) { }

  getUrl(modelCode: string, colorCode: string): string {
    return `${this.ENDPOINT}/${modelCode}/${colorCode}.jpg`;
  }

  get isModelSelected(): boolean {
    return this.modelCode !== '';
  }

  get src(): string {
    return this.getUrl(this.modelCode, this.colorCode);
  }

  get alt(): string {
    return `Tesla model ${this.modelCode} in ${this.colorCode}`;
  }

  get modelCode(): string {
    return this._modelService.modelCodeSubject$.value;
  }

  get colorCode(): string {
    return this._modelService.colorCode;
  }
}

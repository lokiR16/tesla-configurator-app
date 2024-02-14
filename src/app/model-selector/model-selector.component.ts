import { Component } from '@angular/core';
import { ModelConfig } from '../../types/model';
import { ModelService } from '../model.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColorType } from '../../types/color';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-model-selector',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './model-selector.component.html',
  styleUrl: './model-selector.component.scss'
})
export class ModelSelectorComponent {
  modelCodeData: string ;
  

  constructor(private modelConfigService: ModelService) {
    this.modelCodeData = this.modelConfigService.modelCodeSubject$.value;
  }

  get models(): ModelConfig[] {
    return this.modelConfigService.models
  }

  get colors(): ColorType[] {
    return this.modelConfigService.colors;
  }

  get modelCode(): string {
    return this.modelCodeData;
  }

  set modelCode(value: string) {
    this.modelCodeData = value;
    this.modelConfigService.modelCodeSubject$.next(value);
  }

  get colorCode(): string {
    return this.modelConfigService.colorCode;
  }

  set colorCode(value: string) {
    this.modelConfigService.colorCode = value;
  }
} 

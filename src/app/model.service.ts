import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModelConfig } from '../types/model';
import { ColorType} from '../types/color';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  models: ModelConfig[] = [];
  modelCodeSubject$ = new BehaviorSubject('');
  colorCode = '';

  constructor(http: HttpClient) {
    http.get<ModelConfig[]>('/models').subscribe(
      models => this.models = models
    );

    // Reset color on model change
    this.modelCodeSubject$.subscribe(
      (modelCode: string) => {
        if (modelCode)
          this.colorCode = this.colors[0].code;
      }
    );
  }

  get model(): ModelConfig {
    const modelCode = this.modelCodeSubject$.value;
    const model = this.models.find(model => model.code === modelCode);

    if (model) return model;
    throw Error(`Tesla model ${modelCode} not found`);
  }

  get color(): ColorType{
    const color = this.colors.find(color => color.code === this.colorCode);

    if (color) return color;
    throw Error(`Color ${this.colorCode} not found`);
  }

  get colors(): ColorType[] {
    return this.model.colors;
  }
}

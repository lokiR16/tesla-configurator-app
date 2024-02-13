import { Component } from '@angular/core';
import { ModelService } from '../model.service';
import { ConfigService } from '../config.service';
import { Config } from '../../types/config';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ColorType } from '../../types/color';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  readonly OPTION_PRICE = 1000;
  modelDescription: string;
  configDetail: Config;
  color: ColorType;
  towHitch: boolean;
  yoke: boolean;

  constructor(
    modelService: ModelService,
    optionService: ConfigService,
  ) {
    this.modelDescription = modelService.model.description;
    this.configDetail= optionService.config!;
    this.color = modelService.color;
    this.towHitch = optionService.towHitch;
    this.yoke = optionService.yoke;
  }

  get totalCost(): number {
    let cost = this.configDetail.price;

    cost += this.color.price;
    if (this.towHitch) cost += this.OPTION_PRICE;
    if (this.yoke) cost += this.OPTION_PRICE;

    return cost;
  }
}

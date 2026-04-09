import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FloorModel {
  id: string;
  name: string;
  description: string;
  jsonPath: string;
  preview?: string;
}

@Component({
  selector: 'app-floor-plan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floor-plan.component.html',
  styleUrls: ['./floor-plan.component.scss']
})
export class FloorPlanComponent {
  models: FloorModel[] = [
    {
      id: 'alfa',
      name: 'Apartamento Alfa — Planta Completa',
      description: 'Planta baixa completa do apartamento com todos os ambientes modelados em 3D.',
      jsonPath: 'floor/models/alfa/home.json',
    },
    {
      id: 'alfa-sala',
      name: 'Sala — Alfa',
      description: 'Modelo detalhado da sala de estar com móveis e iluminação.',
      jsonPath: 'floor/models/alfa_sala/SALA-ALFA-01/home.json',
    },
    {
      id: 'alfa-cozinha',
      name: 'Cozinha — Alfa',
      description: 'Modelo da cozinha com armários, eletrodomésticos e bancadas.',
      jsonPath: 'floor/models/alfa_cozinha/COZINHA-ALFA-01/home.json',
    },
    {
      id: '3-gemeos',
      name: 'Apartamento 3 Gêmeos',
      description: 'Modelo alternativo de planta com configuração de ambiente integrado.',
      jsonPath: 'floor/models/3-gemeos/home.json',
    },
  ];

  selectedModel: FloorModel | null = null;

  selectModel(model: FloorModel) {
    this.selectedModel = model;
  }

  clearModel() {
    this.selectedModel = null;
  }
}

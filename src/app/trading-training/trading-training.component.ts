import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import de CommonModule
import { FormsModule } from '@angular/forms';   // Import de FormsModule pour ngModel
import { Router, RouterModule } from '@angular/router';  // Import du Router

@Component({
  selector: 'app-trading-training',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],  // Ajouter RouterModule ici
  templateUrl: './trading-training.component.html',
  styleUrls: ['./trading-training.component.scss']  // Corrige le nom de la propriété (styleUrls au lieu de styleUrl)
})
export class TradingTrainingComponent {
 
  tickers = {
    "MTLR": { LotSize: 1.0, PriceStep: 0.01, StepCost: 0.01 },
    "VTBR": { LotSize: 1.0, PriceStep: 0.01, StepCost: 0.01 },
    "WUSH": { LotSize: 1.0, PriceStep: 0.01, StepCost: 0.01 },
    "APTK": { LotSize: 10.0, PriceStep: 0.002, StepCost: 0.02 },
    "ELMT": { LotSize: 1000.0, PriceStep: 2e-05, StepCost: 0.02 },
    "ETLN": { LotSize: 1.0, PriceStep: 0.02, StepCost: 0.02 },
    "ASTR": { LotSize: 1.0, PriceStep: 0.05, StepCost: 0.05 },
    "STSB": { LotSize: 1000.0, PriceStep: 0.005, StepCost: 5.0 },
    "TGKB": { LotSize: 1000000.0, PriceStep: 5e-06, StepCost: 5.0 },
    "TNSE": { LotSize: 1.0, PriceStep: 5.0, StepCost: 5.0 },
    "TUZA": { LotSize: 10.0, PriceStep: 0.5, StepCost: 5.0 },
    "VRSB": { LotSize: 10.0, PriceStep: 0.5, StepCost: 5.0 },
    "YRSBP": { LotSize: 10.0, PriceStep: 0.5, StepCost: 5.0 },
    "ZILL": { LotSize: 1.0, PriceStep: 5.0, StepCost: 5.0 },
    "DZRDP": { LotSize: 1.0, PriceStep: 10.0, StepCost: 10.0 },
    "IGSTP": { LotSize: 1.0, PriceStep: 10.0, StepCost: 10.0 },
    "KCHE": { LotSize: 10000.0, PriceStep: 0.001, StepCost: 10.0 },
    "KROT": { LotSize: 10.0, PriceStep: 1.0, StepCost: 10.0 },
    "KROTP": { LotSize: 10.0, PriceStep: 1.0, StepCost: 10.0 },
    "LNZL": { LotSize: 1.0, PriceStep: 10.0, StepCost: 10.0 },
    "MISB": { LotSize: 100.0, PriceStep: 0.1, StepCost: 10.0 },
    "MISBP": { LotSize: 100.0, PriceStep: 0.1, StepCost: 10.0 },
    "MRSB": { LotSize: 10000.0, PriceStep: 0.001, StepCost: 10.0 },
    "NNSB": { LotSize: 1.0, PriceStep: 10.0, StepCost: 10.0 },
    "RKKE": { LotSize: 1.0, PriceStep: 10.0, StepCost: 10.0 },
    "SARE": { LotSize: 10000.0, PriceStep: 0.001, StepCost: 10.0 },
    "TORSP": { LotSize: 10000.0, PriceStep: 0.001, StepCost: 10.0 },
    "UNKL": { LotSize: 1.0, PriceStep: 10.0, StepCost: 10.0 },
    "YKEN": { LotSize: 10000.0, PriceStep: 0.001, StepCost: 10.0 },
    "YKENP": { LotSize: 10000.0, PriceStep: 0.001, StepCost: 10.0 },
    "ZVEZ": { LotSize: 1000.0, PriceStep: 0.01, StepCost: 10.0 },
    "IGST": { LotSize: 1.0, PriceStep: 20.0, StepCost: 20.0 },
    "KRKNP": { LotSize: 1.0, PriceStep: 20.0, StepCost: 20.0 },
    "OMZZP": { LotSize: 1.0, PriceStep: 20.0, StepCost: 20.0 },
    "TASBP": { LotSize: 10000.0, PriceStep: 0.002, StepCost: 20.0 },
    "TORS": { LotSize: 10000.0, PriceStep: 0.002, StepCost: 20.0 },
    "VGSB": { LotSize: 1000.0, PriceStep: 0.02, StepCost: 20.0 },
    "VGSBP": { LotSize: 1000.0, PriceStep: 0.02, StepCost: 20.0 },
    "VSMO": { LotSize: 1.0, PriceStep: 20.0, StepCost: 20.0 },
    "VSYDP": { LotSize: 1.0, PriceStep: 20.0, StepCost: 20.0 },
    "YRSB": { LotSize: 10.0, PriceStep: 2.0, StepCost: 20.0 },
    "CHKZ": { LotSize: 1.0, PriceStep: 50.0, StepCost: 50.0 },
    "KCHEP": { LotSize: 10000.0, PriceStep: 0.005, StepCost: 50.0 }
};


  situations = ["A+", "A", "B", "C"];
  situationProbabilities = {
    "A+": 0.05,
    "A": 0.20,
    "B": 0.70,
    "C": 0.05
  };
  risks = [10, 20, 30, 50, 100, 150, 200];
  currentTicker: string = '';
  currentSituation: string = '';
  currentRisk: number = 0;
  drawdown: number = 0;
  statistics: any = {};
  feedback: string = '';
  positionSizeInput: number = 0;

  constructor() {
    // Initialiser les statistiques
    for (const ticker in this.tickers) {
      this.statistics[ticker] = { correct: 0, incorrect: 0 };
    }
  }

  setDrawdown(): void {
    if (this.drawdown) {
      this.startNewRound();
    }
  }

  startNewRound(): void {
    this.currentTicker = this.getRandomTicker();
    this.currentSituation = this.getRandomSituation();
    this.currentRisk = this.getRandomRisk(this.currentTicker);
  }

  getRandomTicker(): string {
    const tickerKeys = Object.keys(this.tickers);
    return tickerKeys[Math.floor(Math.random() * tickerKeys.length)];
  }

  getRandomSituation(): string {
    const randomValue = Math.random();
    let cumulativeProbability = 0;
    for (const situation of this.situations) {
      cumulativeProbability += this.situationProbabilities[situation];
      if (randomValue < cumulativeProbability) {
        return situation;
      }
    }
    return "B";
  }

  getRandomRisk(ticker: string): number {
    if (["MTLR", "AFKS", "MOEX", "WUSH", "APTK"].includes(ticker)) {
      return this.risks[Math.floor(Math.random() * 4) + 3]; // 50, 100, 150, 200
    } else if (["RNFT", "SGZH", "MVID"].includes(ticker)) {
      return 5;
    } else {
      return this.risks[Math.floor(Math.random() * 3)]; // 10, 20, 30
    }
  }

  checkPriceStep(selectedStep: number): void {
    const correctStep = this.tickers[this.currentTicker].StepCost;
    if (selectedStep === correctStep) {
      this.feedback = 'Correct ! Maintenant, entrez la taille de la position.';
      this.statistics[this.currentTicker].correct++;
    } else {
      this.feedback = 'Incorrect ! Essayez encore.';
      this.statistics[this.currentTicker].incorrect++;
    }
  }

  checkPosition(): void {
    const expectedPositionSize = this.calculatePositionSize();
    if (this.positionSizeInput === expectedPositionSize) {
      this.feedback = 'Taille de position correcte !';
      this.startNewRound();
    } else {
      this.feedback = `Taille de position incorrecte. Attendu : ${expectedPositionSize}`;
    }
  }

  calculatePositionSize(): number {
    const stepCost = this.tickers[this.currentTicker].StepCost;
    const baseSize = this.drawdown / stepCost / this.currentRisk / 20;
    switch (this.currentSituation) {
      case "A+":
        return Math.round(baseSize * 6.6);
      case "A":
        return Math.round(baseSize * 4);
      case "B":
        return Math.round(baseSize * 2);
      case "C":
        return Math.round(baseSize);
      default:
        return 0;
    }
  }
 
  
}

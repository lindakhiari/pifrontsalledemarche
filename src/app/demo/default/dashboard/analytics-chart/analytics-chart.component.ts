import { Component, ViewChild, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import {
  NgApexchartsModule,
  ChartComponent,
  ApexChart,
  ApexAxisChartSeries,
  ApexPlotOptions,
  ApexXAxis,
  ApexYAxis,
  ApexStroke,
  ApexGrid,
  ApexTooltip
} from 'ng-apexcharts';
import { PredictionService } from 'src/app/prediction.service';
import { PredictionResponse, StockData } from 'src/app/fichierts/PredictionResponse';
import { Observable } from 'rxjs';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  colors: string[];
  stroke: ApexStroke;
  grid: ApexGrid;
  yaxis: ApexYAxis;
  tooltip: ApexTooltip;
  title?: {
    text: string;
    align: string;
    margin: number;
    style: {
      fontSize: string;
      fontWeight: string;
      color: string;
    };
  };
  legend?: {
    position: string;
    horizontalAlign: string;
    labels: {
      colors: string[];
    };
  };
};

@Component({
  selector: 'app-analytics-chart',
  standalone: true,
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './analytics-chart.component.html',
  styleUrls: ['./analytics-chart.component.scss']
})
export class AnalyticsChartComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  chartOptions!: Partial<ChartOptions>;

  // Stock data (valeurs de prédiction)
  predictionData!: PredictionResponse;

  constructor(private predictionService: PredictionService) {}

  ngOnInit() {
    this.predictionService.getPredictions().subscribe((data: PredictionResponse) => {
      this.predictionData = data;
      this.initializeChart();
    });
  }
  initializeChart() {
    // Transformation des données de prédiction en format attendu par ApexCharts
    const closeValues: number[] = [];
    const highValues: number[] = [];
    const lowValues: number[] = [];
    const categories: string[] = [];  // Les symboles des actions pour l'axe X
    
    for (let key in this.predictionData) {
      const stockData: StockData = this.predictionData[key];
      categories.push(key);  // On ajoute le symbole de l'action pour l'axe X
      closeValues.push(stockData.Close);  // Valeur Close pour la série Close
      highValues.push(stockData.High);    // Valeur High pour la série High
      lowValues.push(stockData.Low);      // Valeur Low pour la série Low
    }

    this.chartOptions = {
      chart: {
        type: 'line',  // Type de graphique ligne
        height: 500,
        width: '100%',
        toolbar: {
          show: true
        },
        background: '#0a0a23'  // Arrière-plan bleu foncé
      },
      plotOptions: {
        line: {
          // Retirer la propriété 'curve' ici si elle n'est pas supportée
        }
      },
      // Nouvelle dégradation de bleu pour les séries
      colors: ['#0a0a23', '#2a3b6d', '#4e79b0'],  // Dégradé de bleu foncé, bleu clair, bleu électrique
      series: [
        {
          name: 'Close',
          data: closeValues
        },
        {
          name: 'High',
          data: highValues
        },
        {
          name: 'Low',
          data: lowValues
        }
      ],
      xaxis: {
        categories: categories,  // Les symboles des actions comme catégories de l'axe X
        labels: {
          rotate: -45,  // Incliner légèrement les étiquettes des symboles
          style: {
            colors: ['#FFD700'],  // Couleur dorée pour les étiquettes de l'axe X
            fontSize: '13px'
          }
        },
        axisBorder: {
          show: true,
          color: '#FFD700'  // Couleur dorée pour la bordure de l'axe X
        },
        axisTicks: {
          show: true,
          color: '#FFD700'  // Couleur dorée pour les ticks de l'axe X
        }
      },
      yaxis: {
        show: false,  // Masquer l'axe des Y pour ne pas afficher les lignes horizontales
      },
      tooltip: {
        theme: 'dark',  // Thème sombre pour le tooltip
        shared: true,  // Afficher les valeurs de toutes les séries lorsque la souris survole un point
        x: {
          show: true  // Afficher le tooltip pour l'axe X (les symboles)
        },
        y: {
          formatter: (val) => `${val.toFixed(2)}`  // Format des valeurs affichées dans le tooltip
        }
      },
      grid: {
        show: true,  // Activer la grille
        borderColor: '#000000',  // Couleur noire pour la bordure de la grille
        strokeDashArray: 4,
        row: {
          colors: ['#0a0a23', '#1a1a40'],  // Alternance de couleurs de lignes pour la grille (bleu foncé)
          opacity: 0.5
        }
      },
      title: {
        text: 'Tendances du Marché',  // Titre du graphique
        align: 'center',
        margin: 10,
        style: {
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#FFD700'  // Couleur dorée pour le titre
        }
      },
      legend: {
        position: 'top',  // Position de la légende
        horizontalAlign: 'center',
        labels: {
          colors: ['#FFD700']  // Couleur dorée pour les labels de la légende
        }
      }
    };
  }

  
  }
  


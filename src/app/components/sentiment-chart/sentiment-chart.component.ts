import { Component } from '@angular/core';
import { SentimentChartService } from 'src/app/services/sentiment-chart.service';
import Chart from 'chart.js/auto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sentiment-chart',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './sentiment-chart.component.html',
  styleUrls: ['./sentiment-chart.component.scss']
})
export class SentimentChartComponent {
  chart: any;
  sentimentMessage: string = ''; // Message dynamique à afficher
  applicationStatus: string = ''; // Nouveau message pour l'état de l'application
  sentimentClass: string = ''; // Classe CSS dynamique

  constructor(private sentimentChartService: SentimentChartService) {}

  ngOnInit(): void {
    this.loadSentimentChart();
  }

  loadSentimentChart(): void {
    this.sentimentChartService.getSentimentPercentage().subscribe(data => {
      const labels = ['Positive', 'Negative'];
      const percentages = [data.positive, data.negative];

      // Déterminer le message à afficher
      if (data.negative > data.positive) {
        this.sentimentMessage = 'L’application ne fonctionne pas bien : la majorité des utilisateurs sont insatisfaits.';
        this.applicationStatus = 'Application non performante';
        this.sentimentClass = 'negative-sentiment'; // Classe pour sentiment négatif
      } else if (data.positive > data.negative) {
        this.sentimentMessage = 'L’application fonctionne bien : la majorité des utilisateurs sont satisfaits.';
        this.applicationStatus = 'Application performante';
        this.sentimentClass = 'positive-sentiment'; // Classe pour sentiment positif
      } else {
        this.sentimentMessage = 'L’opinion des utilisateurs est partagée de manière égale.';
        this.applicationStatus = 'Équilibrée';
        this.sentimentClass = 'neutral-sentiment'; // Classe pour sentiment neutre
      }

      // Charger ou mettre à jour le graphique
      if (this.chart) {
        this.chart.destroy();
      }

      // Création du dégradé doré pour les couleurs du graphique
      const ctx = document.getElementById('sentimentChartCanvas') as HTMLCanvasElement;
      const gradientPositive = ctx.getContext('2d')!.createLinearGradient(0, 0, 0, 400);
      gradientPositive.addColorStop(0, '#FFD700'); // Or
      gradientPositive.addColorStop(1, '#FFCC00'); // Or clair

      const gradientNegative = ctx.getContext('2d')!.createLinearGradient(0, 0, 0, 400);
      gradientNegative.addColorStop(0, '#8B4513'); // Marron foncé
      gradientNegative.addColorStop(1, '#D2691E'); // Chocolat

      this.chart = new Chart('sentimentChartCanvas', {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            data: percentages,
            backgroundColor: [gradientPositive, gradientNegative], // Utilisation des dégradés
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            }
          }
        }
      });
    });
  }
}

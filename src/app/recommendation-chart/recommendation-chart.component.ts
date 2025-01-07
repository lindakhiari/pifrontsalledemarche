import { Component, OnInit } from '@angular/core';
import { RecommandationService } from '../services/recommandation-service.service'; // Correct importation
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-recommendation-chart',
  templateUrl: './recommendation-chart.component.html',
  styleUrls: ['./recommendation-chart.component.scss'], 
  standalone:true 
})
export class RecommendationChartComponent implements OnInit {

  chart: any;

  constructor(private recommandationService: RecommandationService) {}

  ngOnInit(): void {
    this.loadChart();
  }

  loadChart(): void {
    this.recommandationService.getRecommandations().subscribe(data => {
      // Générer les labels uniques basés sur les événements et formations
      const labels = data.map(item => `${item.formation} - ${item.evenement}`);

      // Extraire les symboles uniques
      const symbols = [...new Set(data.map(item => item.symbol))];

      // Générer les datasets
      const datasets = symbols.map(symbol => {
        const symbolData = data.filter(item => item.symbol === symbol);

        // Associer les performances aux labels correspondants
        const performanceValues = labels.map(label => {
          const [formation, evenement] = label.split(' - ');
          const item = symbolData.find(d => d.formation === formation && d.evenement === evenement);
          return item ? item.performance : 0;
        });

        return {
          label: symbol,
          data: performanceValues,
          backgroundColor: this.getRandomColor(),
          borderColor: this.getRandomColor(),
          borderWidth: 1
        };
      });

      // Détruire le graphique existant s'il existe
      if (this.chart) {
        this.chart.destroy();
      }

      // Créer un graphique
      this.chart = new Chart('chartCanvas', {
        type: 'bar',
        data: {
          labels: labels,
          datasets: datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              ticks: {
                display: false, // Désactive l'affichage des valeurs sur l'axe des abscisses

                autoSkip: false,
                maxRotation: 45,
                minRotation: 0,
                callback: function (value) {
                  const label = this.getLabelForValue(value as number);
                  return label.length > 20 ? label.substring(0, 20) + '...' : label;
                }
              },
              title: {
                display: true,
                text: 'Formations et Événements',
                font: {
                  size: 14
                }
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Performance',
                font: {
                  size: 14
                }
              }
            }
          }
        }
      });
    });
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgApexchartsModule, ApexChart, ChartComponent, ApexDataLabels, ApexAxisChartSeries, ApexStroke, ApexXAxis, ApexYAxis, ApexTheme, ApexGrid, ApexOptions } from 'ng-apexcharts';
import * as bootstrap from 'bootstrap';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from '../theme/shared/shared.module';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  colors: string[];
  stroke: ApexStroke;
  grid: ApexGrid;
  theme: ApexTheme;
};

@Component({
  selector: 'app-marche',
  templateUrl: './marche.component.html',
  imports: [SharedModule, NgApexchartsModule],
  standalone: true,
  styleUrls: ['./marche.component.scss']
})
export class MarcheComponent implements OnInit {
refreshData() {
throw new Error('Method not implemented.');
}
showRecommendation() {
throw new Error('Method not implemented.');
}
  @ViewChild('chart') chart!: ChartComponent;
  chartOptions: Partial<ApexOptions>;
  enterprises: any[] = [];
  filteredEnterprises: any[] = [];
  selectedEnterprise: any = {};
  activePeriod = 'month';
  investmentAmount: number = 0;
  recommendedEnterprise: string = '';
  analysisType: string = 'revenue';
  isLoading = false;
  recommendationChart: Partial<ChartOptions> = {};
  modalElement!: HTMLElement;
  modalInstance!: bootstrap.Modal;
  recommendationExplanation: string = '';
  comparaison: any = {}; // To store the chart data
growth: any =0;
volatility : any =0;
avg : any =0;
  // New properties to resolve template errors
  score: number = 0;
  highestValue: number = 0;
  lowestValue: number = 0;
  predictedNextValue: number = 0;
  predictionData: any = {};
  predictionChart: Partial<ChartOptions> = {};

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchEnterprises();
  }

  // Open and close investment modal methods (already defined)
  invest() {
    if (this.investmentAmount > 0) {
      console.log(`Invested $${this.investmentAmount} in ${this.selectedEnterprise.name}`);
      this.investmentAmount = 0;
    } else {
      alert('Please enter a valid investment amount!');
    }
  }

  selectEnterprise(enterprise: any) {
    this.selectedEnterprise = enterprise;
  }

  openInvestmentModal() {
    this.modalElement = document.getElementById('investmentModal')!;
    this.modalInstance = new bootstrap.Modal(this.modalElement);
    this.modalInstance.show();
  }

  closeInvestmentModal() {
    this.modalInstance.hide();
  }

  fetchEnterprises() {
    this.http.get<any[]>('http://localhost:8089/ProjetSalleDeMarche/api/actifs').subscribe(
      (data) => {
        this.enterprises = data;
        this.filteredEnterprises = [...this.enterprises];
        if (this.enterprises.length > 0) {
          this.selectedEnterprise = this.enterprises[0];
          this.updateChartData();
        }
      },
      (error) => console.error("Error fetching enterprises:", error)
    );
  }

  updateChartData() {
    if (!this.selectedEnterprise || !this.selectedEnterprise.historique) {
      console.warn("No historique data available for the selected enterprise.");
      return;
    }

    const validData = this.selectedEnterprise.historique.filter(
      (h) => h.periode && h.valeur && !isNaN(parseFloat(h.valeur))
    );

    if (validData.length === 0) {
      console.warn("No valid data available for the chart.");
      this.chartOptions = {
        series: [],
        chart: {
          type: 'line',
          height: 350
        },
        title: {
          text: 'No Data Available',
          align: 'center'
        },
        xaxis: {
          categories: [],
          title: { text: 'Date' }
        },
        yaxis: {
          title: { text: 'Value' }
        },
        grid: { show: true }
      };
      return;
    }

    const labels = validData.map((h) => new Date(h.periode).toLocaleDateString());
    const data = validData.map((h) => parseFloat(h.valeur));

    this.chartOptions = {
      series: [
        {
          name: 'Value Over Time',
          data: data
        }
      ],
      chart: {
        type: 'line',
        height: 350
      },
      xaxis: {
        categories: labels,
        title: { text: 'Date' }
      },
      title: {
        text: `${this.selectedEnterprise.nomActif} - Historical Data`,
        align: 'center'
      },
      tooltip: {
        shared: true,
        intersect: false
      },
      yaxis: {
        title: { text: 'Value' }
      },
      grid: { show: true }
    };
  }

  recommendInvestment() {
    if (this.enterprises.length === 0) return;
  
    const scores = this.enterprises.map((enterprise) => {
      const historicalValues = enterprise.historique.map((h) => parseFloat(h.valeur));
      if (historicalValues.length === 0) return { enterprise, score: 0 };
  
      const initial: number = historicalValues[0];
      const final: number = historicalValues[historicalValues.length - 1];
      const periods: number = historicalValues.length;
  
      const growthRate: number = ((final / initial) ** (1 / periods)) - 1;
  this.growth=growthRate;
      const avgValue: number = historicalValues.reduce((sum, v) => sum + v, 0) / historicalValues.length;
  this.avg=avgValue;
      const volatility: number = Math.sqrt(
        historicalValues.map((v) => (v - avgValue) ** 2).reduce((a, b) => a + b, 0) / historicalValues.length
      );
  this.volatility=volatility;
      const predictedValue: number[] = this.predictFuturePerformance(historicalValues); // Get an array of predicted values
      const score: number = growthRate * 0.5 - volatility * 0.3 + (predictedValue[0] / avgValue) * 0.2; // Use the first predicted value
  
      return { enterprise, score};
    });
  
    scores.sort((a, b) => b.score - a.score);
  
    const bestEnterprise = scores[0].enterprise;
    this.recommendedEnterprise = bestEnterprise.nomActif;
    this.highestValue = Math.max(...bestEnterprise.historique.map((h: any) => parseFloat(h.valeur)));
    this.lowestValue = Math.min(...bestEnterprise.historique.map((h: any) => parseFloat(h.valeur)));
     // Use the first predicted value for the modal display
     const predictedValues = this.predictFuturePerformance(bestEnterprise.historique.map((h: any) => parseFloat(h.valeur)));
     this.predictedNextValue = predictedValues[0]; // Set predictedNextValue to the first predicted value
   
     
    this.recommendationExplanation = `The recommended enterprise, ${this.recommendedEnterprise}, 
    has demonstrated strong potential based on its historical performance. 
    It reached a highest value of ${this.highestValue.toFixed(2)}, a lowest value of 
   ${this.lowestValue.toFixed(2)}, and is predicted to reach a value of 
    ${ this.predictedNextValue.toFixed(2)} in the next period.`;
    this.recommendationChart = {
      series: [
        {
          name: bestEnterprise.nomActif,
          data: bestEnterprise.historique.map((h: any) => parseFloat(h.valeur))
        }
      ],
      chart: {
        type: 'line',
        height: 350
      },
      xaxis: {
        categories: bestEnterprise.historique.map((h: any) => new Date(h.periode).toLocaleDateString())
      },
      yaxis: {
        title: { text: 'Value' }
      },
      colors: ['#00E396']
    };
  
    // Update properties for modal display
    this.score = scores[0].score;
   
   // Prepare data for the comparison chart (historical vs predicted)
    this.predictionData = {
      series: [
        {
          name: 'Historical Values',
          data: bestEnterprise.historique.map((h: any) => parseFloat(h.valeur)) // Historical data
        },
        {
          name: 'Predicted Values',
          data: predictedValues // Predicted data (next 5 values)
        }
      ],
      chart: {
        type: 'line',
        height: 350
      },
      xaxis: {
        categories: bestEnterprise.historique.map((h: any) => new Date(h.periode).toLocaleDateString()).concat(
          Array.from({ length: 5 }, (_, i) => `Predicted ${i + 1}`)
        ) // Extend categories with predictions
      },
      yaxis: {
        title: { text: 'Value' }
      },
      colors: ['#00E396', '#FF5733'], // Different colors for historical and predicted data
      grid: { show: true }
    };
  
    // Display modal with recommendation
    const modalElement = document.getElementById('recommendationModal')!;
    this.modalInstance = new bootstrap.Modal(modalElement);
    this.modalInstance.show();
  }
  
  predictFuturePerformance(historicalValues: number[]): number[] {
    if (historicalValues.length < 2) return [historicalValues[historicalValues.length - 1]];
  
    const n = historicalValues.length;
    const x = Array.from({ length: n }, (_, i) => i + 1);  // X values: 1, 2, 3, ...
    const y = historicalValues;
  
    const xSum = x.reduce((a, b) => a + b, 0);
    const ySum = y.reduce((a, b) => a + b, 0);
    const xySum = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const xSquaredSum = x.reduce((sum, xi) => sum + xi ** 2, 0);
  
    const slope = (n * xySum - xSum * ySum) / (n * xSquaredSum - xSum ** 2);
    const intercept = (ySum - slope * xSum) / n;
  
    const predictedValues: number[] = [];
    for (let i = n; i < n + 5; i++) {  // Predict the next 5 values
      const predictedValue = slope * (i + 1) + intercept;
      predictedValues.push(predictedValue);
    }
  
    return predictedValues;
  }
  
  
  
  
  highlightRecommendation() {
    this.cdr.detectChanges();
  }

  onSearch(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredEnterprises = this.enterprises.filter((ent) =>
      ent.nomActif.toLowerCase().includes(query)
    );
  }

  onSelectEnterprise() {
    this.selectedEnterprise = this.enterprises.find(
      (ent) => ent.nomActif === this.selectedEnterprise.nomActif
    );
  
    if (this.selectedEnterprise && this.selectedEnterprise.historique) {
      this.updateChartData();
    }
  }

  selectEnterpriseFromTable(enterprise: any) {
    this.selectedEnterprise = enterprise;
    this.onSelectEnterprise();
  }
}

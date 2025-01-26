// angular import
import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

// third party
import {
  NgApexchartsModule,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexAxisChartSeries,
  ApexStroke,
  ApexXAxis,
  ApexYAxis,
  ApexTheme,
  ApexGrid
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  xaxis: ApexXAxis;
  colors: string[];
  stroke: ApexStroke;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  theme: ApexTheme;
};

@Component({
  selector: 'app-monthly-bar-chart',
  standalone: true,
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './monthly-bar-chart.component.html',
  styleUrl: './monthly-bar-chart.component.scss'
})
export class MonthlyBarChartComponent implements OnInit {
  @Input() predictions: { Prediction: number; Date: string }[] = [];
  @ViewChild('chart') chart!: ChartComponent;
  chartOptions!: Partial<ChartOptions>;

  ngOnInit() {
    this.initializeChart([]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['predictions'] && this.predictions.length > 0) {
      this.updateChart(this.predictions);
      document.querySelector('.chart-income.month')?.classList.add('active');
      document.querySelector('.chart-income.week')?.classList.remove('active');
    }
  }

  initializeChart(data: { x: string; y: number }[]) {
    this.chartOptions = {
      chart: {
        height: 450,
        type: 'area',
        toolbar: {
          show: false,
        },
        background: 'transparent',
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#1677ff'],
      series: [
        {
          name: 'Predictions',
          data: data,
        },
      ],
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      xaxis: {
        categories: data.map((d) => d.x),
        labels: {
          style: {
            colors: ['#8c8c8c'],
          },
        },
        axisBorder: {
          show: true,
          color: '#f0f0f0',
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: ['#8c8c8c'],
          },
        },
      },
      grid: {
        strokeDashArray: 0,
        borderColor: '#f5f5f5',
      },
      theme: {
        mode: 'light',
      },
    };
  }

  updateChart(predictions: { Prediction: number; Date: string }[]) {
    const formattedData = predictions.map((p) => ({
      x: new Date(p.Date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      y: p.Prediction,
    }));

    this.chartOptions.series = [
      {
        name: 'Predictions',
        data: formattedData.map((item) => item.y),
      },
    ];

    this.chartOptions.xaxis = {
      categories: formattedData.map((item) => item.x),
      labels: {
        style: {
          colors: ['#8c8c8c'],
        },
      },
    };
  }

  toggleActive(value: string) {
    const formattedPredictions = this.predictions.map((p) => ({
      x: new Date(p.Date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      y: p.Prediction,
    }));

    const data =
      value === 'month'
        ? formattedPredictions.filter((_, index) => index % 30 === 0) // Example: Monthly data
        : formattedPredictions.slice(-7); // Example: Last 7 days

    this.chartOptions.series = [
      {
        name: 'Predictions',
        data: data.map((d) => d.y),
      },
    ];

    const xaxis = {
      categories: data.map((d) => d.x),
    };

    this.chartOptions = { ...this.chartOptions, xaxis };

    if (value === 'month') {
      document.querySelector('.chart-income.month')?.classList.add('active');
      document.querySelector('.chart-income.week')?.classList.remove('active');
    } else {
      document.querySelector('.chart-income.week')?.classList.add('active');
      document.querySelector('.chart-income.month')?.classList.remove('active');
    }
  }
}
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import Chart from 'chart.js/auto';
@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css',
})
export class PieChartComponent {
  public chart: any;
  @Input() labels: any;
  @Input() ChartId: any;
  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    const colorArray = this.labels.map((item: any) => item.color);

    console.log(this.ChartId, 'ChartId');
    // this.chart = new Chart('MyChart', {
    this.chart = new Chart(this.ChartId, {
      type: 'pie',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Dataset',
            data: [30, 40, 30],
            backgroundColor: colorArray,
          },
        ],
      },
      options: {
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true,
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.dataset.label || '';
                const dataLabel = context.label || '';
                return `${label}: ${dataLabel}`;
              },
            },
          },
        },
      },
    });
  }
}

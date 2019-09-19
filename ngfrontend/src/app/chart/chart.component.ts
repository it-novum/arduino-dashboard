import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Chart} from 'chart.js';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() data: any;
  @Input() label: string;

  chartId: string;
  chart: any;
  _lastUpdate: number;

  constructor(private cdRef: ChangeDetectorRef) {
    this.chartId = (Math.random() * 10).toString();
  }

  //ngOnChanges(changes: SimpleChanges) {
  //  console.log('on change');
  //}

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.createChart();
    this.cdRef.detectChanges();
  }

  // Update chart data if timestamp changes
  @Input()
  set lastUpdate(lastUpdate: number) {
    this._lastUpdate = lastUpdate;

    if (typeof this.chart === "undefined") {
      return;
    }

    var label = new Date(this._lastUpdate).toLocaleString();

    if (this.chart.data.labels.length != 30) {
      this.chart.data.labels.push(label);
      this.chart.data.datasets[0].data.push(this.data);
    } else {
      this.chart.data.labels.shift(); //Remove first time data
      this.chart.data.labels.push(label);

      this.chart.data.datasets[0].data.shift();
      this.chart.data.datasets[0].data.push(this.data);
    }
    this.chart.update(0);
  }

  createChart() {
    this.chart = new Chart('chart-' + this.chartId, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: this.label,
            backgroundColor: "rgba(29,201,183, 0.2)",
            borderColor: 'rgba(29,201,183, 1)',
            pointBackgroundColor: 'rgba(29,201,183, 0.1)',
            pointBorderColor: 'rgba(0, 0, 0, 0)',
            pointBorderWidth: 1,
            borderWidth: 1,
            pointRadius: 3,
            pointHoverRadius: 4,

            data: [],
            fill: true,
            lineTension: 0.3,
          }
        ]
      },

      // Configuration options go here
      options: {
        tooltips: {
          enabled: false
        },
        scales: {
          yAxes: [{
            display: true,
            ticks: {
              suggestedMin: 0,
              suggestedMax: 50,
              beginAtZero: true
            }
          }]
        }
      }

    });

  }

}

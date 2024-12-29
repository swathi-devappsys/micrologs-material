import {AfterViewInit, Component} from '@angular/core';
declare var google: any;
@Component({
  selector: 'app-piechart',
  imports: [],
  templateUrl: './piechart.component.html',
  styleUrl: './piechart.component.css'
})
export class PiechartComponent implements AfterViewInit {
  ngAfterViewInit() {
    if (typeof google !== 'undefined') {
      google.charts.load('current', { packages: ['corechart'] });
      google.charts.setOnLoadCallback(this.drawChart);
    } else {
      console.error('Google Charts library failed to load.');
    }
  }

  drawChart() {
    const data = google.visualization.arrayToDataTable([
      ['Fruit', 'Quantity'],
      ['Apples', 45],
      ['Bananas', 26],
      ['Cherries', 12],
      ['Grapes', 17]
    ]);

    const options = {
      title: 'Fruits Distribution',
      is3D: true,
      backgroundColor: '#f8f9fa',
      chartArea: { width: '90%', height: '80%' }
    };

    const chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
  }
}

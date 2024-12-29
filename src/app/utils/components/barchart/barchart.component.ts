import {Component, HostListener} from '@angular/core';
declare var google: any;
@Component({
  selector: 'app-barchart',
  imports: [],
  templateUrl: './barchart.component.html',
  styleUrl: './barchart.component.css'
})
export class BarchartComponent {
  ngAfterViewInit() {
    if (typeof google !== 'undefined') {
      google.charts.load('current', { packages: ['corechart', 'bar'] });
      google.charts.setOnLoadCallback(() => this.drawChart());
    } else {
      console.error('Google Charts library failed to load.');
    }
  }

  @HostListener('window:resize', [])
  onResize() {
    this.drawChart();
  }

  drawChart() {
    // Use the id to access the container directly
    const chartContainer = document.getElementById('barchart');

    if (!chartContainer) {
      console.error('Chart container is not available.');
      return;
    }

    const data = google.visualization.arrayToDataTable([
      ['Month', 'Sales'],
      ['January', 1000],
      ['February', 1170],
      ['March', 660],
      ['April', 1030]
    ]);

    const options = {
      title: 'Monthly Sales',
      chartArea: { width: '90%', height: '80%' },
      backgroundColor: '#f8f9fa',
      hAxis: {
        title: 'Month'
      },
      vAxis: {
        title: 'Sales'
      }
    };

    const chart = new google.visualization.BarChart(chartContainer);
    chart.draw(data, options);
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {StockChart} from "angular-highcharts";
import {Subscription} from "rxjs";
import {ChartFactory} from "../../../factory/chart-factory";
import {
  convertDataForCandlestickChart,
  convertDataForCandlestickChartAddValue,
  convertDataForLineChart
} from "../../../helpers/converters";

@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.scss'],
})
export class Chart1Component implements OnInit, OnDestroy {
  public chart!: StockChart;
  public data!: any;
  public activeButton = 'line';
  private subscription!: Subscription;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.getData()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public showLineChart() {
    this.chart = ChartFactory.createChart(convertDataForLineChart, {
      type: "line",
      typeChart: 'simpleChart'
    }, this.data);
  }

  public showCandlestickChart() {
    this.chart = ChartFactory.createChart(convertDataForCandlestickChart, {
      type: "candlestick",
      typeChart: 'simpleChart'
    }, this.data);
  }

  public showCandlestickAndValueChart() {
    this.chart = ChartFactory.createChart(convertDataForCandlestickChartAddValue, {
      type: "candlestick",
      typeChart: 'simpleAndValue'
    }, this.data);
  }


  private getData() {
    this.subscription = this.apiService.get("api-v3/forex/history").subscribe((res: any) => {
      this.data = res;
      this.showLineChart();
    })
  }
}

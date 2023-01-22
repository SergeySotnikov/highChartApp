import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {StockChart} from "angular-highcharts";

@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.scss'],
})
export class Chart1Component implements OnInit {
  public forexLineChart!: StockChart;
  public forexCandlestickChart!: StockChart;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.getData()
  }

  private getData() {
    this.apiService.get("api-v3/forex/history").subscribe((res: any) => {
      const dataLineChart = this.convertDataForLineChart(Object.values(res.response))
      const dataCandlestickChart = this.convertDataForCandlestickChart(Object.values(res.response))

      this.forexLineChart = new StockChart({
        rangeSelector: {
          selected: 1
        },
        title: {
          text: `${res.info.symbol} Line Daily Chart`
        },
        series: [{
          tooltip: {
            valueDecimals: 4
          },
          type: "line",
          name: `${res.info.symbol}`,
          data: dataLineChart
        }]
      })
      this.forexCandlestickChart = new StockChart({
        rangeSelector: {
          selected: 1
        },
        title: {
          text: `${res.info.symbol} Candlestick Daily Chart`
        },
        series: [{
          tooltip: {
            valueDecimals: 4
          },
          type: "candlestick",
          name: `${res.info.symbol}`,
          data: dataCandlestickChart
        }]
      })
    })
  }

  private convertDataForLineChart(arr: any[]): Array<any> {
    const data: Array<any> = [];
    arr.forEach((item: any) => {
      data.push([new Date(item.tm).getTime(), Number(item.c)]);
    });
    return data;
  }

  private convertDataForCandlestickChart(arr: any[]) {
    const data: Array<any> = [];
    arr.forEach((item: any) => {
      data.push([new Date(item.tm).getTime(), Number(item.o), Number(item.h), Number(item.l), Number(item.c)]);
    });
    return data;
  }

}

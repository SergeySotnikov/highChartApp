import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {StockChart} from "angular-highcharts";

@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.scss'],
})
export class Chart1Component implements OnInit {
  ohlc: any[] = [];
  volume: any[] = [];
  dataLineChart: any[] = [];
  dataCandlestickChart: any[] = [];
  public forexLineChart!: StockChart;
  public forexCandlestickChart!: StockChart;
  public forexCandlestickChartAndValue!: StockChart;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.getData()
  }

  private getData() {
    this.apiService.get("api-v3/forex/history").subscribe((res: any) => {
      this.dataLineChart = this.convertDataForLineChart(Object.values(res.response));
      this.dataCandlestickChart = this.convertDataForCandlestickChart(Object.values(res.response));
      this.convertDataForCandlestickChartAddValue(this.dataCandlestickChart)

      this.forexLineChart = new StockChart({
        chart: {
          height: 600
        },
        rangeSelector: {
          selected: 2
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
          data: this.dataLineChart
        }]
      })

      this.forexCandlestickChart = new StockChart({
        chart: {
          height: 600
        },
        rangeSelector: {
          selected: 2
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
          data: this.dataCandlestickChart
        }]
      })


      this.forexCandlestickChartAndValue = new StockChart({
        chart: {
          height: 600
        },
        rangeSelector: {
          selected: 2
        },
        title: {
          text: `${res.info.symbol} Candlestick and Value Daily Chart`
        },
        yAxis: [{
          labels: {
            align: 'right',
            x: -3
          },
          title: {
            text: 'OHLC'
          },
          height: '80%',
          lineWidth: 2,
          resize: {
            enabled: true
          }
        }, {
          labels: {
            align: 'right',
            x: -3
          },
          title: {
            text: 'Volume'
          },
          top: '80%',
          height: '20%',
          offset: 0,
          lineWidth: 2,
          resize: {
            enabled: true
          }
        }],
        tooltip: {
          split: true
        },
        series: [{
          type: 'candlestick',
          name: `${res.info.symbol}`,
          data: this.ohlc,
          // dataGrouping: {
          //   units: groupingUnits
          // }
        }, {
          type: 'column',
          name: 'Volume',
          data: this.volume,
          yAxis: 1,
          // dataGrouping: {
          //   units: groupingUnits
          // }
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
      data.push([new Date(item.tm).getTime(), Number(item.o), Number(item.h), Number(item.l), Number(item.c), Number(item.v)]);
    });
    return data;
  }

  private convertDataForCandlestickChartAddValue(data: any) {
    for (let i = 0; i < data.length; i++) {
      this.ohlc.push([
        data[i][0], // the date
        data[i][1], // open
        data[i][2], // high
        data[i][3], // low
        data[i][4] // close
      ]);

      this.volume.push([
        data[i][0], // the date
        data[i][5] // the volume
      ]);
    }
  }

}
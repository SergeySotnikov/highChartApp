import {StockChart} from "angular-highcharts";
import {commonChartOptions} from "../components/charts/chart1/const/constant";

export class ChartFactory {
  static createChart(convertDataFn: Function, options: any, serverResponse: any): StockChart {
    const {response, info} = serverResponse;
    const data = convertDataFn(Object.values(response));
    const title = `${info.symbol} Daily Chart`;

    let chartOptions: any = {
      ...commonChartOptions,
      title: {
        text: title
      },
    };

    switch (options.typeChart) {
      case 'simpleChart':
        chartOptions = {
          ...chartOptions,
          series: [{
            type: options.type,
            data: data,
            name: `${info.symbol}`,
          }],
        }
        break;

      case 'simpleAndValue':
        chartOptions = {
          ...chartOptions,
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
            name: `${info.symbol}`,
            data: data.ohlc,
          }, {
            type: 'column',
            name: 'Volume',
            data: data.volume,
            yAxis: 1,
          }]
        }
        break;

      default:
        chartOptions = {
          title: {
            text: `Chart not found`
          },
        }
    }
    
    return new StockChart(chartOptions);
  }
}

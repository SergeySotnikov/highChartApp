export const convertDataForLineChart = (arr: any[]) => arr.map(({tm, c}) => [new Date(tm).getTime(), Number(c)]);

export const convertDataForCandlestickChart = (arr: any[]) => arr.map(({
                                                                         tm,
                                                                         o,
                                                                         h,
                                                                         l,
                                                                         c
                                                                       }) => [new Date(tm).getTime(), Number(o), Number(h), Number(l), Number(c)]);

export const convertDataForCandlestickChartAddValue = (data: any[]) => {
  return {
    ohlc: data.map(({tm, o, h, l, c}) => [new Date(tm).getTime(), Number(o), Number(h), Number(l), Number(c)]),
    volume: data.map(({tm, v}) => [new Date(tm).getTime(), Number(v)])
  };
};

export const convertDataForLineChart = (arr: any[]) => arr.map(({tm, c}) => [new Date(tm).getTime(), Number(c)]);

export const convertDataForCandlestickChart = (arr: any[]) => arr.map(({
                                                                         tm,
                                                                         o,
                                                                         h,
                                                                         l,
                                                                         c,
                                                                         v
                                                                       }) => [new Date(tm).getTime(), Number(o), Number(h), Number(l), Number(c), Number(v)]);

export const convertDataForCandlestickChartAddValue = (data: any[]) => {
  return {
    ohlc: data.map(([t, o, h, l, c]) => [t, o, h, l, c]),
    volume: data.map(([t, v]) => [t, v])
  };
};

import { useMemo, useState } from 'react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { BarChart as BarChartEcharts, BarSeriesOption } from 'echarts/charts';
import {
  GridComponent,
  GridComponentOption,
  TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GridComponent, TooltipComponent, BarChartEcharts, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<
  GridComponentOption | BarSeriesOption
>;

interface BarChartProps {
  data: any;
  widthChart: number | string;
  heightChart: number | string;
}
const BarChart = ({ data, widthChart, heightChart }: BarChartProps) => {
  const [width, setWidth] = useState<any>(0);
  const [height, setHeight] = useState<any>(0);
  const option: EChartsOption = useMemo<any>(() => {
    return {
      tooltip: {
        trigger: 'item',
      },
      grid: {
        top: '30px',
        left: '0',
        right: '10px',
        bottom: '0px',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: data?.map((item: any) => item?.name),
        axisTick: {
          alignWithLabel: true,
        },
      },
      yAxis: {
        type: 'value',
        allowDecimals: false,
        minInterval: 1,
      },
      series: [
        {
          name: '',
          data: data,
          type: 'bar',
        },
      ],
    };
  }, [data]);

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      notMerge={true}
      lazyUpdate={true}
      style={{
        width,
        height,
      }}
      onChartReady={() => {
        setWidth(widthChart);
        setHeight(heightChart);
      }}
    />
  );
};

export default BarChart;

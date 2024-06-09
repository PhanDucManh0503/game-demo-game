import React, { useEffect, useMemo, useRef } from 'react';
import { PieChart } from 'echarts/charts';
import { LegendComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);

interface DoughnutChartProps {
  data: any;
  width: number | string;
  height: number | string;
}
const DoughnutChart = ({ data, width, height }: DoughnutChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const option = useMemo(() => {
    return {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: 'center',
        right: '20%',
        orient: 'vertical',
      },
      series: [
        {
          name: '인건비 비율',
          type: 'pie',
          radius: ['55%', '70%'],
          center: ['25%', '50%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 17,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: data,
        },
      ],
    };
  }, [data]);

  useEffect(() => {
    let myChart: any;
    if (chartRef.current) {
      myChart = echarts.init(chartRef.current);
      myChart.setOption(option);

      window.addEventListener('resize', myChart.resize);
    }

    return () => {
      if (myChart.current) {
        window.removeEventListener('resize', myChart.resize);
      }
    };
  }, [chartRef, option]);

  return (
    <div
      ref={chartRef}
      style={{
        width: width,
        height: height,
      }}
    ></div>
  );
};

export default DoughnutChart;

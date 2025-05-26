import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer
]);

const DetailHorizontalBar = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    chartInstance.current = echarts.init(chartDom);
    
    // 初始化图表
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['Profit', 'Expenses', 'Income']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'value'
        }
      ],
      yAxis: [
        {
          type: 'category',
          axisTick: {
            show: false
          },
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      ],
      series: [
        {
          name: 'Profit',
          type: 'bar',
          label: {
            show: true,
            position: 'inside'
          },
          emphasis: {
            focus: 'series'
          },
          data: [200, 170, 240, 244, 200, 220, 210]
        },
        {
          name: 'Income',
          type: 'bar',
          stack: 'Total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [320, 302, 341, 374, 390, 450, 420]
        },
        {
          name: 'Expenses',
          type: 'bar',
          stack: 'Total',
          label: {
            show: true,
            position: 'left'
          },
          emphasis: {
            focus: 'series'
          },
          data: [-120, -132, -101, -134, -190, -230, -210]
        }
      ]
    };
    
    chartInstance.current.setOption(option);

    // 添加防抖的resize监听
    let resizeTimer;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        try {
          chartInstance.current?.resize();
        } catch (error) {
          console.error('Resize error:', error);
        }
      }, 100);
    });
    resizeObserver.observe(chartDom);

    return () => {
      clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      chartInstance.current?.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default DetailHorizontalBar;

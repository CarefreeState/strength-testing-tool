import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import QueryPagination from '@/components/QueryPagination'

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer
]);

const QueryHorizontalBar = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    chartInstance.current = echarts.init(chartDom);
    const labelRight = {
      position: 'right'
    };
    // 初始化图表
    const option = {
      title: {
        text: 'Bar Chart with Negative ValueEE',
        top: 20,  // 增加标题与顶部的距离
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        top: 100,  // 增加顶部间距
        bottom: 30,
        left: '10%',  // 增加左侧间距
        right: '10%'  // 增加右侧间距
      },
      xAxis: {
        type: 'value',
        position: 'top',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
      },
      yAxis: {
        type: 'category',
        axisLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        data: [
          'ten',
          'ten',
          'ten',
          'ten',
          'ten',
          'ten',
          'ten',
          'ten',
          'ten',
          'ten',
          'ten',
          'ten',
          'ten',
          'ten',
          'ten',
          'nine',
          'eight',
          'sevensevensevensevensevensevensevenseven',
          'six',
          '阵容：E 1, 2, 3, 4, 5 进修：O阵容：E 1, 2, 3, 4, 5 进修：O',
          'four',
          'three',
          'two',
          'one'
        ]
      },
      series: [
        {
          name: 'Cost',
          type: 'bar',
          stack: 'Total',
          label: {
            show: true,
            formatter: '{b}'
          },
          data: [
            2,
            8,
            { value: 91, label: labelRight },
            { value: 9, label: labelRight },
            { value: 9, label: labelRight },
            { value: 9, label: labelRight },
            { value: 9, label: labelRight },
            { value: 9, label: labelRight },
            { value: 9, label: labelRight },
            { value: 9, label: labelRight },
            { value: 9, label: labelRight },
            { value: 9, label: labelRight },
            { value: 9, label: labelRight },
            { value: 9, label: labelRight },
            { value: 9, label: labelRight },
            { value: 9, label: labelRight },
            { value: 10, label: labelRight },
            { value: 13, label: labelRight },
            { value: 17, label: labelRight },
            { value: 20, label: labelRight },
            { value: 36, label: labelRight },
            44,
            { value: 47, label: labelRight }
          ]
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

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={chartRef} style={{ width: '100%', height: '95%' }} />
      <div style={{ 
        width: '100%', 
        height: '5%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <QueryPagination />
      </div>
    </div>
    
  );
};

export default QueryHorizontalBar;

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import QueryPagination from '@/components/Pagination/QueryPagination'
import SearchButton from '@/components/Button/SearchButton'

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer
]);

const QueryHorizontalBar = ({setLoading}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    chartInstance.current = echarts.init(chartDom);
    const labelRight = { position: 'right' };
    const labelInside = { position: 'inside' };

    // 生成15条测试数据
    const yAxisData = Array.from({length: 15}, (_, i) => `测试项目${i+1}`);
    const dataValues = Array.from({length: 15}, () => Math.floor(Math.random() * 100));

    const generateData = () => {
      const maxValue = Math.max(...dataValues);
      console.log(maxValue)
      return dataValues.map((value) => ({
        value,
        label: value < maxValue * 0.5 ? labelRight : labelInside
      }));
    };

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
        data: yAxisData
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
          itemStyle: {
            color: '#2D59C6' // 设置柱子颜色为主题色
          },
          data: generateData()
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
    <div style={{ flex: 1, minWidth: '750px', minHeight: '750px', position: 'relative', width: '100%', height: '100%' }}>
      <div ref={chartRef} style={{ width: '100%', height: '95%' }} />
      <div style={{ 
        width: '100%', 
        height: '5%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px'
      }}>
        <SearchButton onClick={() => setLoading(true)} />
        <QueryPagination />
      </div>
    </div>
    
  );
};

export default QueryHorizontalBar;

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import OkButton from '@/components/Button/OkButton';
import CollapseItems from '@/components/Collapse/CollapseItems'

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

    // 生成15条测试数据
    const yAxisData = Array.from({length: 5}, (_, i) => `测试项目${i+1}`);
    const dataValues = Array.from({length: 5}, () => Math.floor(Math.random() * 100));

    const generateData = () => {
      return dataValues.map((value) => ({
        value
      }));
    };
    
    // 初始化图表
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['指标1', '指标2'],
        selected: {
          '指标1': true,
          '指标2': false,
        } 
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        },
        max: 120,  // 关键修改：设置x轴最大值为100
        min: 0     // 可选：设置x轴最小值为0
      },
      yAxis: {
        type: 'category',
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        },
        axisLine: { show: true },
        axisLabel: { 
          show: true,
          formatter: function(value, index) {
            // 通过索引获取对应的数值
            return `${value}`;
          }
        },
        axisTick: { show: false },
        data: yAxisData
      },
      series: [
        {
          name: '指标1',
          type: 'bar',
          label: {
            show: true,
            position: 'right',
            formatter: '{c}'
          },
          emphasis: {
            focus: 'series'
          },
          itemStyle: {
            color: '#2D59C6'
          },
          data: generateData()
        },
        {
          name: '指标2',
          type: 'bar',
          label: {
            show: true,
            position: 'right',
            formatter: '{c}'
          },
          emphasis: {
            focus: 'series'
          },
          itemStyle: {
            color: '#76E0D6'
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
    <>
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        flex: '0 0 auto'  // 关键修改：固定高度
      }}>  
        <CollapseItems style={{ flex: 1, minWidth: '500px'}} items={[
          {
            active: false,
            label: '详情',
            cardinality: 0.5,
            descriptions: [
              {name: '是否启动', content: 'Content 1'},
              {name: 'Name 2', content: 'Content 2'},
              {name: 'Name 3', content: 'Content 3'},
              {name: 'Name 4', content: 'Content 4'},
              {name: 'Name 5', content: 'Content 5'},
              {name: 'Name 6', content: 'Content 6'},
            ]
          }
        ]}/>
      </div>
      <div style={{ flex: 1, minWidth: '500px', minHeight: '250px' }}><div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '0%',
          zIndex: 10,
          transform: 'scale(calc(min(100vw, 100vh) / 1500))',
          transformOrigin: 'top right',
          transition: 'all 0.3s ease'
        }}>
          <OkButton />
        </div>
      </div></div>
    </>
    
  );
};

export default DetailHorizontalBar;

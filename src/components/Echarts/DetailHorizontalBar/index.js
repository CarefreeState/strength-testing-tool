import React, { useState, useEffect, useRef } from 'react';
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

const getSelected = (active, map) => {
  const ret = {}
  for (const key of Object.keys(map)) {
    ret[key] = key === active
  }
  return ret
}

const getSeries = (map) => {
  const ret = []
  for (const [key, value] of Object.entries(map)) {
    ret.push({
      name: key,
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
        color: value.color
      },
      data: value.values
    })
  }
  return ret
}

const DetailHorizontalBar = ({names, max, switchMetrics, data, del}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // 这个作为 reload 的标志，防止其他组件的影响
  const [refresh, setRefresh] = useState(0)
  const reload = () => {
    setRefresh(refresh + 1)
  }

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
        data: Object.keys(data.data),
        selected: getSelected(data.active, data.data)
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
        max: Math.ceil(max * 1.5),
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
        data: names
      },
      series: getSeries(data.data)
    };
    
    chartInstance.current.on('legendselectchanged', (e) => {
      switchMetrics(e)
      reload()
    })
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
  }, [refresh, max]);

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
            descriptions: data.details
          }
        ]}/>
      </div>
      <div style={{ flex: 1, minWidth: '500px', minHeight: '250px' }}><div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
        <div style={{
          position: 'absolute',
          top: '0%',
          right: '0%',
          zIndex: 10,
          transform: 'scale(calc(min(100vw, 100vh) / 1500))',
          transformOrigin: 'top right',
          transition: 'all 0.3s ease'
        }}>
          <OkButton del={del}/>
        </div>
      </div></div>
    </>
    
  );
};

export default DetailHorizontalBar;

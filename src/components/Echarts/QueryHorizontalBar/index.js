import React, { useState, useEffect, useRef } from 'react';
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

const generateData = (lines, max) => {
  const labelRight = { position: 'right' };
  const ret = []
  for (const line of lines) {
    ret.unshift({
      ...line,
      label: line.value <= max * 0.5 && labelRight
    })
  }
  return ret
};

const generateName = (lines) => {
  const ret = []
  for (const line of lines) {
    ret.unshift(line.name)
  }
  return ret
}

// [{name, value}]
const QueryHorizontalBar = ({max, title, lines, click, submit, changePage, current, total, pageSize}) => {
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
    

    // 生成15条测试数据
    const yAxisData = generateName(lines)
    const dataValues = generateData(lines, max)

    const option = {
      title: {
        text: title,
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
        right: '10%',  // 增加右侧间距
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        position: 'top',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        },
        max: max
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
            return `${dataValues[index].value}`;
          }
        },
        axisTick: { show: false },
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
          data: dataValues
        }
      ]
    };
    
    chartInstance.current.setOption(option);
    chartInstance.current.on('click', click);

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
  }, [refresh]);

  return (
    <div style={{ flex: 1, minWidth: '1500px', minHeight: '750px', position: 'relative', width: '100%', height: '100%' }}>
      <div ref={chartRef} style={{ width: '100%', height: '95%' }} />
      <div style={{ 
        width: '100%', 
        height: '5%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px'
      }}>
        {/* 如果输出条件（包括排序、指标）与原来不一样，需要刷新分页参数 */}
        <SearchButton 
          onClick={async () => {
            await submit()
            reload()
          }} 
          buttonTheme={{
            defaultBg: '#26CDD5',
            defaultBorderColor: '#26CDD5',
            defaultColor: '#ffffff',
            defaultHoverBg: '#76E0D6',
            defaultHoverBorderColor: '#76E0D6',
            defaultHoverColor: '#ffffff',
          }}      
        />
        <QueryPagination current={current} total={total}  pageSize={pageSize} changePage={(current, pageSize) => {
          changePage(current, pageSize)
          reload()
        }} />
      </div>
    </div>
    
  );
};

export default QueryHorizontalBar;

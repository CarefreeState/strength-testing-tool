import * as echarts from 'echarts';
import { useEffect, useState } from 'react';

const LoadingAnimation = () => {
  useEffect(() => {
    const chartDom = document.createElement('div');
    chartDom.style.width = '100px';
    chartDom.style.height = '100px';
    document.getElementById('loading-container').appendChild(chartDom);
    
    const myChart = echarts.init(chartDom);
    const styles = ['#294F92', '#4272AA', '#1EA5AD', '#7BBCB9'];
    const ys = [-40, -15, -25, -45];
    const heights = [52, 30, 30, 60];

    function getPoints(i) {
      const height = heights[i];
      const y = ys[i];
      const width = 12;
      const taper = 4;

      if (i === 2) {
        return [
          [0, y],
          [width, y - taper],
          [width, y + height + taper],
          [0, y + height]
        ];
      } else {
        return [
          [0, y - taper],
          [width, y],
          [width, y + height],
          [0, y + height + taper]
        ];
      }
    }

    const option = {
      graphic: {
        elements: [
          {
            type: 'group',
            left: 'center',
            top: 'center',
            children: new Array(4).fill(0).map((val, i) => ({
              type: 'polygon',
              x: i * 20,
              shape: { points: getPoints(i) },
              style: { fill: styles[i] },
              keyframeAnimation: {
                duration: 1000,
                delay: i * 200,
                loop: true,
                keyframes: [
                  { percent: 0.5, scaleY: 0.3, easing: 'cubicIn' },
                  { percent: 1, scaleY: 1, easing: 'cubicOut' }
                ]
              }
            }))
          }
        ]
      }
    };

    myChart.setOption(option);
    return () => {
      myChart.dispose();
      chartDom.remove();
    };
  }, []);

  return (
    <div 
      id="loading-container" 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      }}
    >
      <div style={{ marginTop: '20px', color: '#294F92', fontSize: '16px' }}>加载中...</div>
    </div>
  );
};

export default LoadingAnimation
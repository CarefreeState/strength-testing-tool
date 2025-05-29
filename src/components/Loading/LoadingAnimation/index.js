import * as echarts from 'echarts';
import { useEffect } from 'react';

const LoadingAnimation = () => {
  useEffect(() => {
    const chartDom = document.createElement('div');
    chartDom.style.width = '100px';
    chartDom.style.height = '100px';
    document.getElementById('loading-container').appendChild(chartDom);
    
    const myChart = echarts.init(chartDom);
    const styles = ['#2D59C6', '#318EDE', '#26CDD5', '#76E0D6'];
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
                duration: 1000,  // 总周期1秒
                delay: i * 200,
                loop: true,
                keyframes: [
                  { percent: 0, scaleY: 1, easing: 'linear' },  // 起始状态
                  { percent: 0.1, scaleY: 1, easing: 'linear' }, // 最高点定格0.1秒
                  { percent: 0.4, scaleY: 0.3, easing: 'cubicIn' },  // 压缩阶段
                  { percent: 0.7, scaleY: 0.3, easing: 'linear' },   // 保持压缩状态
                  { percent: 0.9, scaleY: 1, easing: 'cubicOut' },    // 恢复阶段
                  { percent: 1, scaleY: 1, easing: 'linear' }        // 回到最高点
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
      <div style={{ marginTop: '20px', fontSize: '16px' }}>
        <span style={{
          background: 'linear-gradient(90deg, #2D59C6, #318EDE, #26CDD5, #76E0D6, #26CDD5, #318EDE, #2D59C6, #318EDE, #26CDD5, #76E0D6, #26CDD5, #318EDE, #2D59C6, #318EDE, #26CDD5, #76E0D6, #26CDD5, #318EDE, #2D59C6, #318EDE, #26CDD5, #76E0D6, #26CDD5, #318EDE, #2D59C6, #318EDE, #26CDD5, #76E0D6, #26CDD5, #318EDE, #2D59C6, #318EDE, #26CDD5, #76E0D6, #26CDD5, #318EDE, #2D59C6, #318EDE, #26CDD5, #76E0D6, #26CDD5, #318EDE, #2D59C6, #318EDE, #26CDD5, #76E0D6, #26CDD5, #318EDE)',
          backgroundSize: '400% 100%',
          animation: 'gradientFlow 1s cubic-bezier(0.4, 0, 0.2, 1) infinite',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          display: 'inline-block'
        }}>
          加载中...
        </span>
      </div>
      <style>
        {`
          @keyframes gradientFlow {
            0% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingAnimation
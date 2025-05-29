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
      <div style={{ marginTop: '20px', fontSize: '16px', color: '#2D59C6' }}>
        <span style={{ animation: 'colorChange 0.8s 0s infinite' }}>加</span>
        <span style={{ animation: 'colorChange 0.8s 0.16s infinite' }}>载</span>
        <span style={{ animation: 'colorChange 0.8s 0.32s infinite' }}>中</span>
        <span style={{ animation: 'colorChange 0.8s 0.48s infinite' }}>.</span>
        <span style={{ animation: 'colorChange 0.8s 0.64s infinite' }}>.</span>
        <span style={{ animation: 'colorChange 0.8s 0.8s infinite' }}>.</span>
      </div>
      <style>
        {`
          @keyframes colorChange {
            0% { color: #2D59C6; }
            5.88% { color: #318EDE; }
            11.76% { color: #26CDD5; }
            17.65% { color: #76E0D6; }
            23.53% { color: #26CDD5; }
            29.41% { color: #318EDE; }
            35.29% { color: #2D59C6; }
            41.18% { color: #318EDE; }
            47.06% { color: #26CDD5; }
            52.94% { color: #76E0D6; }
            58.82% { color: #26CDD5; }
            64.71% { color: #318EDE; }
            70.59% { color: #2D59C6; }
            76.47% { color: #318EDE; }
            82.35% { color: #26CDD5; }
            88.24% { color: #76E0D6; }
            84.21% { color: #26CDD5; }
            94.12% { color: #318EDE; }
            100% { color: #2D59C6; }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingAnimation
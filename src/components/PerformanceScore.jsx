import { useEffect, useRef } from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import './PerformanceScore.css';

// Register Chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

export default function PerformanceScore({ score }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const getScoreColor = (score) => {
    if (score >= 90) return '#0CCE6B'; // Good (green)
    if (score >= 50) return '#FFA400'; // Needs improvement (orange)
    return '#FF4E42'; // Poor (red)
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Fast';
    if (score >= 50) return 'Needs Improvement';
    return 'Slow';
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    const scoreColor = getScoreColor(score);

    chartRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [score, 100 - score],
          backgroundColor: [scoreColor, '#E0E0E0'],
          borderWidth: 0,
          circumference: 180,
          rotation: 270
        }]
      },
      options: {
        cutout: '75%',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        }
      },
      plugins: [{
        id: 'centerText',
        beforeDraw: (chart) => {
          const ctx = chart.ctx;
          const centerX = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
          const centerY = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2 + 20;

          ctx.save();

          // Draw score
          ctx.font = 'bold 48px Arial';
          ctx.fillStyle = scoreColor;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(Math.round(score), centerX, centerY);

          ctx.restore();
        }
      }]
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [score]);

  return (
    <div className="performance-score-container">
      <h2 className="score-title">Performance Score</h2>
      <div className="gauge-container">
        <canvas ref={canvasRef}></canvas>
      </div>
      <div className="score-info">
        <span className="score-label" style={{ color: getScoreColor(score) }}>
          {getScoreLabel(score)}
        </span>
      </div>
      <div className="score-legend">
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#0CCE6B' }}></span>
          <span>90-100: Fast</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#FFA400' }}></span>
          <span>50-89: Needs Improvement</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#FF4E42' }}></span>
          <span>0-49: Slow</span>
        </div>
      </div>
    </div>
  );
}

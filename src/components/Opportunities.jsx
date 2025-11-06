import './Opportunities.css';

export default function Opportunities({ opportunities }) {
  if (!opportunities || opportunities.length === 0) {
    return null;
  }

  const getPriorityBadge = (savings) => {
    if (savings.ms > 500 || savings.bytes > 100000) {
      return { label: 'HIGH', color: '#FF4E42' };
    }
    if (savings.ms > 200 || savings.bytes > 50000) {
      return { label: 'MEDIUM', color: '#FFA400' };
    }
    return { label: 'LOW', color: '#0CCE6B' };
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 10) / 10 + ' ' + sizes[i];
  };

  const formatTime = (ms) => {
    if (ms < 1000) return Math.round(ms) + ' ms';
    return (ms / 1000).toFixed(2) + ' s';
  };

  return (
    <div className="opportunities-container">
      <h2 className="opportunities-title">Optimization Opportunities</h2>
      <p className="opportunities-subtitle">
        Top recommendations to improve your page performance
      </p>

      <div className="opportunities-list">
        {opportunities.map((opportunity, index) => {
          const priority = getPriorityBadge(opportunity.savings);

          return (
            <div key={opportunity.id} className="opportunity-card">
              <div className="opportunity-header">
                <div className="opportunity-rank">#{index + 1}</div>
                <div className="opportunity-info">
                  <h3 className="opportunity-title">{opportunity.title}</h3>
                  <div
                    className="priority-badge"
                    style={{ backgroundColor: priority.color }}
                  >
                    {priority.label}
                  </div>
                </div>
              </div>

              <p
                className="opportunity-description"
                dangerouslySetInnerHTML={{ __html: opportunity.description }}
              />

              <div className="opportunity-savings">
                {opportunity.savings.ms > 0 && (
                  <div className="saving-item">
                    <span className="saving-icon">⏱️</span>
                    <span className="saving-label">Potential savings:</span>
                    <span className="saving-value">
                      {formatTime(opportunity.savings.ms)}
                    </span>
                  </div>
                )}
                {opportunity.savings.bytes > 0 && (
                  <div className="saving-item">
                    <span className="saving-icon">💾</span>
                    <span className="saving-label">Size reduction:</span>
                    <span className="saving-value">
                      {formatBytes(opportunity.savings.bytes)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

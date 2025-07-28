import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock } from 'lucide-react';

const initialIntegrationStatus = {
  n8n: { connected: true, lastSync: '2 min ago', status: 'healthy' },
  kajabi: { connected: true, lastSync: '1 min ago', status: 'healthy' },
  canva: { connected: true, lastSync: '3 min ago', status: 'healthy' },
  figma: { connected: true, lastSync: '5 min ago', status: 'healthy' },
  claude: { connected: true, lastSync: '1 min ago', status: 'healthy' },
  'nlp-tools': { connected: true, lastSync: '30 sec ago', status: 'healthy' },
  'website-chat': { connected: true, lastSync: '45 sec ago', status: 'healthy' },
  'twitter-api': { connected: true, lastSync: '2 min ago', status: 'healthy' },
  midjourney: { connected: false, lastSync: 'Testing', status: 'testing' }
};

const AIStaffDashboard = () => {
  const [organizationSuggestions, setOrganizationSuggestions] = useState([
    { id: 1, title: 'Organize your drive', description: 'Group related files' },
    { id: 2, title: 'Delete duplicates', description: 'Remove redundant data' }
  ]);

  const [integrationStatus, setIntegrationStatus] = useState(initialIntegrationStatus);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      if (isMonitoring) {
        setLastUpdate(new Date());
        setIntegrationStatus(prev => ({
          ...prev,
          n8n: { ...prev.n8n, lastSync: 'just now' }
        }));
      }
    }, 30000);
    return () => clearInterval(timer);
  }, [isMonitoring]);

  const getStatusIcon = status =>
    status === 'healthy' ? (
      <CheckCircle className="w-4 h-4 text-green-500" />
    ) : (
      <Clock className="w-4 h-4 text-gray-400" />
    );

  return (
    <div>
      <h1>Integration Status</h1>
      <ul>
        {Object.entries(integrationStatus).map(([key, status]) => (
          <li key={key}>
            {status.connected ? '🟢' : '🔴'} {key} – last sync {status.lastSync}{' '}
            {getStatusIcon(status.status)}
          </li>
        ))}
      </ul>
      <button onClick={() => setIsMonitoring(v => !v)}>
        {isMonitoring ? 'Pause' : 'Resume'} Monitoring
      </button>
      <p>Last update: {lastUpdate.toLocaleTimeString()}</p>
    </div>
  );
};

export default AIStaffDashboard;

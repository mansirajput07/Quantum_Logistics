import React, { useState, useEffect } from 'react';
import { Play, RefreshCw, TrendingUp, MapPin, Zap, Activity, Settings } from 'lucide-react';

const QuantumLogisticsModules = () => {
  const [activeModule, setActiveModule] = useState('qaoa');
  
  return (
    <div className="quantum-logistics-container">
      <div className="max-w-container">
        {/* Header */}
        <div className="header">
          <h1>Quantum Path Optimization for Logistics</h1>
          <p>Interactive Quantum Algorithm Demonstrations</p>
        </div>

        {/* Module Selector */}
        <div className="module-selector">
          <button
            onClick={() => setActiveModule('qaoa')}
            className={`module-btn ${activeModule === 'qaoa' ? 'active' : 'inactive'}`}
          >
            <Zap size={20} />
            Module 1: QAOA Route Optimizer
          </button>
          <button
            onClick={() => setActiveModule('qml')}
            className={`module-btn ${activeModule === 'qml' ? 'active' : 'inactive'}`}
          >
            <Activity size={20} />
            Module 2: QML Traffic Predictor
          </button>
        </div>

        {/* Module Content */}
        {activeModule === 'qaoa' ? <QAOAModule /> : <QMLModule />}
      </div>
    </div>
  );
};

// Module 1: QAOA Route Optimization
const QAOAModule = () => {
  const [nodes, setNodes] = useState([
    { id: 'A', x: 150, y: 150, label: 'Warehouse' },
    { id: 'B', x: 350, y: 100, label: 'Stop 1' },
    { id: 'C', x: 500, y: 200, label: 'Stop 2' },
    { id: 'D', x: 400, y: 350, label: 'Stop 3' },
    { id: 'E', x: 200, y: 300, label: 'Stop 4' }
  ]);
  
  const [isRunning, setIsRunning] = useState(false);
  const [iteration, setIteration] = useState(0);
  const [bestRoute, setBestRoute] = useState([]);
  const [bestCost, setBestCost] = useState(Infinity);
  const [currentRoute, setCurrentRoute] = useState([]);
  const [qubits, setQubits] = useState(5);
  const [layers, setLayers] = useState(3);
  const [convergenceData, setConvergenceData] = useState([]);

  // Calculate distance between two nodes
  const calculateDistance = (node1, node2) => {
    const dx = node1.x - node2.x;
    const dy = node1.y - node2.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Calculate total route cost
  const calculateRouteCost = (route) => {
    let cost = 0;
    for (let i = 0; i < route.length - 1; i++) {
      cost += calculateDistance(route[i], route[i + 1]);
    }
    // Add return to start
    cost += calculateDistance(route[route.length - 1], route[0]);
    return cost;
  };

  // Simulate QAOA optimization
  const runQAOA = async () => {
    setIsRunning(true);
    setIteration(0);
    setConvergenceData([]);
    
    const maxIterations = 20;
    let currentBest = Infinity;
    let currentBestRoute = [];
    const data = [];

    for (let i = 0; i < maxIterations; i++) {
      // Simulate quantum circuit evaluation
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Generate candidate route (simulating quantum superposition)
      const shuffled = [...nodes].sort(() => Math.random() - 0.5);
      const cost = calculateRouteCost(shuffled);
      
      // Update if better (simulating optimization)
      if (cost < currentBest) {
        currentBest = cost;
        currentBestRoute = shuffled;
      }
      
      setCurrentRoute(shuffled);
      setBestRoute(currentBestRoute);
      setBestCost(currentBest);
      setIteration(i + 1);
      data.push({ iter: i + 1, cost: currentBest });
      setConvergenceData(data);
    }
    
    setIsRunning(false);
  };

  const resetOptimization = () => {
    setBestRoute([]);
    setBestCost(Infinity);
    setCurrentRoute([]);
    setIteration(0);
    setConvergenceData([]);
  };

  return (
    <div className="grid-container">
      {/* Visualization Panel */}
      <div className="card">
        <h2>Route Visualization</h2>
        
        {/* SVG Canvas */}
        <svg width="600" height="400" className="svg-canvas">
          {/* Draw edges for best route */}
          {bestRoute.length > 0 && bestRoute.map((node, idx) => {
            const nextNode = bestRoute[(idx + 1) % bestRoute.length];
            return (
              <line
                key={`edge-${idx}`}
                x1={node.x}
                y1={node.y}
                x2={nextNode.x}
                y2={nextNode.y}
                stroke="#8b5cf6"
                strokeWidth="3"
                strokeDasharray="5,5"
              />
            );
          })}
          
          {/* Draw nodes */}
          {nodes.map((node) => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r="25"
                fill={node.id === 'A' ? '#ef4444' : '#3b82f6'}
                stroke="#1f2937"
                strokeWidth="2"
              />
              <text
                x={node.x}
                y={node.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="14"
                fontWeight="bold"
              >
                {node.id}
              </text>
              <text
                x={node.x}
                y={node.y + 45}
                textAnchor="middle"
                fill="#374151"
                fontSize="12"
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>

        {/* Route Sequence */}
        {bestRoute.length > 0 && (
          <div className="route-sequence">
            <p>Optimal Route Sequence:</p>
            <div className="route-badges">
              {bestRoute.map((node, idx) => (
                <span key={idx} className="badge badge-purple">
                  {node.id}
                </span>
              ))}
              <span className="badge badge-red">
                {bestRoute[0]?.id}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Control Panel */}
      <div className="space-y-6">
        {/* Quantum Circuit Parameters */}
        <div className="card">
          <h3>
            <Settings size={20} />
            QAOA Parameters
          </h3>
          
          <div className="space-y-4">
            <div className="form-group">
              <label>Number of Qubits: {qubits}</label>
              <input
                type="range"
                min="3"
                max="10"
                value={qubits}
                onChange={(e) => setQubits(parseInt(e.target.value))}
                disabled={isRunning}
              />
            </div>
            
            <div className="form-group">
              <label>QAOA Layers (p): {layers}</label>
              <input
                type="range"
                min="1"
                max="5"
                value={layers}
                onChange={(e) => setLayers(parseInt(e.target.value))}
                disabled={isRunning}
              />
            </div>

            <div className="button-grid">
              <button
                onClick={runQAOA}
                disabled={isRunning}
                className="btn btn-primary"
              >
                <Play size={18} />
                {isRunning ? 'Optimizing...' : 'Run QAOA'}
              </button>
              
              <button
                onClick={resetOptimization}
                disabled={isRunning}
                className="btn btn-secondary"
              >
                <RefreshCw size={18} />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="card">
          <h3>Optimization Metrics</h3>
          
          <div className="metrics-grid">
            <div className="metric-card blue">
              <p>Iterations</p>
              <p>{iteration}</p>
            </div>
            
            <div className="metric-card green">
              <p>Best Cost</p>
              <p>{bestCost === Infinity ? '—' : Math.round(bestCost)}</p>
            </div>
          </div>

          {/* Convergence Graph */}
          {convergenceData.length > 0 && (
            <div className="convergence-section">
              <p>Convergence</p>
              <svg width="100%" height="150" className="convergence-graph">
                {convergenceData.map((point, idx) => {
                  if (idx === 0) return null;
                  const prev = convergenceData[idx - 1];
                  const x1 = (prev.iter / 20) * 100;
                  const x2 = (point.iter / 20) * 100;
                  const maxCost = Math.max(...convergenceData.map(d => d.cost));
                  const y1 = 140 - (prev.cost / maxCost) * 120;
                  const y2 = 140 - (point.cost / maxCost) * 120;
                  
                  return (
                    <line
                      key={idx}
                      x1={`${x1}%`}
                      y1={y1}
                      x2={`${x2}%`}
                      y2={y2}
                      stroke="#8b5cf6"
                      strokeWidth="2"
                    />
                  );
                })}
              </svg>
            </div>
          )}
        </div>

        {/* Algorithm Info */}
        <div className="info-card">
          <h3>How QAOA Works</h3>
          <ul>
            <li>✓ Encodes TSP as quantum Hamiltonian</li>
            <li>✓ Uses superposition to explore multiple routes</li>
            <li>✓ Applies cost and mixer operators in layers</li>
            <li>✓ Hybrid quantum-classical optimization</li>
            <li>✓ Converges to optimal or near-optimal solution</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Module 2: Quantum Machine Learning Traffic Predictor
const QMLModule = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [predictions, setPredictions] = useState([]);
  const [selectedModel, setSelectedModel] = useState('vqc');

  // Traffic patterns
  const trafficScenarios = [
    { time: '06:00', day: 'Mon', weather: 'Clear', level: 'Medium' },
    { time: '08:00', day: 'Mon', weather: 'Clear', level: 'Heavy' },
    { time: '12:00', day: 'Mon', weather: 'Rainy', level: 'Heavy' },
    { time: '15:00', day: 'Mon', weather: 'Clear', level: 'Medium' },
    { time: '18:00', day: 'Mon', weather: 'Clear', level: 'Heavy' },
    { time: '22:00', day: 'Mon', weather: 'Clear', level: 'Light' }
  ];

  const trainModel = async () => {
    setIsTraining(true);
    setTrainingProgress(0);
    setAccuracy(0);
    
    // Simulate quantum circuit training
    for (let i = 0; i <= 100; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 150));
      setTrainingProgress(i);
      setAccuracy(Math.min(50 + i * 0.4 + Math.random() * 5, 96));
    }
    
    // Generate predictions
    const preds = trafficScenarios.map(scenario => ({
      ...scenario,
      predicted: Math.random() > 0.2 ? scenario.level : 
                 (scenario.level === 'Heavy' ? 'Medium' : 'Heavy'),
      confidence: 0.75 + Math.random() * 0.2
    }));
    
    setPredictions(preds);
    setIsTraining(false);
  };

  const resetModel = () => {
    setTrainingProgress(0);
    setAccuracy(0);
    setPredictions([]);
  };

  return (
    <div className="grid-container">
      {/* Training Panel */}
      <div className="card">
        <h2>Quantum Model Training</h2>
        
        {/* Model Selection */}
        <div className="form-group">
          <label>Select QML Model</label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            disabled={isTraining}
          >
            <option value="vqc">Variational Quantum Classifier (VQC)</option>
            <option value="qsvm">Quantum Support Vector Machine (QSVM)</option>
            <option value="qgan">Quantum GAN (QGAN)</option>
          </select>
        </div>

        {/* Model Architecture */}
        <div className="architecture-info">
          <h3>Quantum Circuit Architecture</h3>
          <div className="architecture-row">
            <span>Input Features:</span>
            <span>4 (time, day, weather, history)</span>
          </div>
          <div className="architecture-row">
            <span>Qubits:</span>
            <span>8</span>
          </div>
          <div className="architecture-row">
            <span>Circuit Depth:</span>
            <span>6 layers</span>
          </div>
          <div className="architecture-row">
            <span>Entanglement:</span>
            <span>Full</span>
          </div>
        </div>

        {/* Training Progress */}
        <div className="progress-section">
          <div className="progress-header">
            <span>Training Progress</span>
            <span className="progress-percent">{trainingProgress}%</span>
          </div>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${trainingProgress}%` }}
            />
          </div>
        </div>

        {/* Accuracy Metric */}
        <div className="accuracy-card">
          <div className="accuracy-info">
            <p>Model Accuracy</p>
            <p>{accuracy.toFixed(1)}%</p>
          </div>
          <TrendingUp size={48} color="#16a34a" />
        </div>

        {/* Action Buttons */}
        <div className="button-grid">
          <button
            onClick={trainModel}
            disabled={isTraining}
            className="btn btn-primary"
          >
            <Play size={18} />
            {isTraining ? 'Training...' : 'Train Model'}
          </button>
          
          <button
            onClick={resetModel}
            disabled={isTraining}
            className="btn btn-secondary"
          >
            <RefreshCw size={18} />
            Reset
          </button>
        </div>

        {/* Model Info */}
        <div className="model-features">
          <h4>Model Features</h4>
          <ul>
            <li>• Quantum feature maps for high-dimensional data</li>
            <li>• Entanglement for capturing correlations</li>
            <li>• Variational parameters optimized classically</li>
            <li>• Real-time traffic pattern recognition</li>
          </ul>
        </div>
      </div>

      {/* Predictions Panel */}
      <div className="space-y-6">
        <div className="card">
          <h2>Traffic Predictions</h2>
          
          {predictions.length === 0 ? (
            <div className="predictions-empty">
              <Activity size={48} />
              <p>Train the model to see predictions</p>
            </div>
          ) : (
            <div className="predictions-list">
              {predictions.map((pred, idx) => (
                <div key={idx} className="prediction-item">
                  <div className="prediction-header">
                    <div className="prediction-info">
                      <MapPin size={20} />
                      <div className="prediction-details">
                        <p>{pred.time} - {pred.day}</p>
                        <p>{pred.weather}</p>
                      </div>
                    </div>
                    <div>
                      <span className={`traffic-badge ${
                        pred.predicted === 'Light' ? 'traffic-light' :
                        pred.predicted === 'Medium' ? 'traffic-medium' :
                        'traffic-heavy'
                      }`}>
                        {pred.predicted}
                      </span>
                    </div>
                  </div>
                  <div className="confidence-bar">
                    <span>Confidence:</span>
                    <div className="confidence-bar-bg">
                      <div
                        className="confidence-bar-fill"
                        style={{ width: `${pred.confidence * 100}%` }}
                      />
                    </div>
                    <span>{(pred.confidence * 100).toFixed(0)}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quantum Advantage */}
        <div className="advantage-section">
          <h3>Quantum Advantage in ML</h3>
          <div className="space-y-3">
            <div className="advantage-item">
              <Zap size={20} />
              <div>
                <p>High-Dimensional Feature Space</p>
                <p>Quantum states naturally encode complex patterns</p>
              </div>
            </div>
            <div className="advantage-item">
              <Activity size={20} />
              <div>
                <p>Faster Training</p>
                <p>Quantum parallelism accelerates convergence</p>
              </div>
            </div>
            <div className="advantage-item">
              <TrendingUp size={20} />
              <div>
                <p>Better Generalization</p>
                <p>Quantum entanglement captures correlations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="card">
          <h3>Real-World Applications</h3>
          <div className="space-y-3">
            <div className="feature-card purple">
              <p>Dynamic Route Planning</p>
              <p>Predict congestion and reroute in real-time</p>
            </div>
            <div className="feature-card blue">
              <p>Fleet Optimization</p>
              <p>Allocate vehicles based on demand forecasts</p>
            </div>
            <div className="feature-card green">
              <p>Delivery Time Estimation</p>
              <p>Accurate ETAs considering traffic patterns</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantumLogisticsModules;
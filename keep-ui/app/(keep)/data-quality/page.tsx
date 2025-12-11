"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { ArrowUp, ArrowDown } from 'lucide-react';

Chart.register(...registerables);

// Types
interface MetricData {
  completeness: number;
  accuracy: number;
  consistency: number;
  timeliness: number;
  duplicates: number;
  schema: number;
  changes: {
    completeness: number;
    accuracy: number;
    consistency: number;
    timeliness: number;
    duplicates: number;
    schema: number;
  };
  timeliness_trend: Array<{ date: string; value: number }>;
  duplicates_trend: Array<{ date: string; count: number }>;
  duplicate_records: Array<{ id: number; field: string; count: number; severity: string }>;
  schema_validation: {
    field_type_mismatches: number;
    missing_required_fields: number;
    constraint_violations: number;
    format_errors: number;
    invalid_ranges: number;
    details: Array<{ field: string; issue: string; expected: string; found: string }>;
  };
}

// Mock data generator matching the image
const generateMockData = (): MetricData => {
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const timelinessData = [
    { date: 'Monday', value: 89.5 },
    { date: 'Tuesday', value: 85.2 },
    { date: 'Wednesday', value: 96.8 },
    { date: 'Thursday', value: 84.1 },
    { date: 'Friday', value: 95.7 },
    { date: 'Saturday', value: 88.3 },
    { date: 'Sunday', value: 90.4 }
  ];
  
  const duplicatesTrend = [
    { date: 'Monday', count: 45 },
    { date: 'Tuesday', count: 47 },
    { date: 'Wednesday', count: 55 },
    { date: 'Thursday', count: 64 },
    { date: 'Friday', count: 37 },
    { date: 'Saturday', count: 33 },
    { date: 'Sunday', count: 68 }
  ];
  
  return {
    completeness: 92.7,
    accuracy: 93.3,
    consistency: 93.5,
    timeliness: 91.1,
    duplicates: 50,
    schema: 95.4,
    changes: {
      completeness: 1.36,
      accuracy: -5.02,
      consistency: 0.36,
      timeliness: 16.39,
      duplicates: -1.09,
      schema: 17.42
    },
    timeliness_trend: timelinessData,
    duplicates_trend: duplicatesTrend,
    duplicate_records: [
      { id: 1001, field: 'customer_email', count: 12, severity: 'Medium' },
      { id: 1002, field: 'order_id', count: 5, severity: 'High' },
      { id: 1003, field: 'product_sku', count: 8, severity: 'Medium' },
      { id: 1004, field: 'user_phone', count: 3, severity: 'Low' },
      { id: 1005, field: 'transaction_ref', count: 15, severity: 'High' }
    ],
    schema_validation: {
      field_type_mismatches: 4,
      missing_required_fields: 2,
      constraint_violations: 2,
      format_errors: 0,
      invalid_ranges: 2,
      details: [
        { field: 'customer_age', issue: 'Type Mismatch', expected: 'Integer', found: 'String' },
        { field: 'order_date', issue: 'Format Error', expected: 'ISO-8601', found: 'Custom' },
        { field: 'product_price', issue: 'Constraint Violation', expected: '> 0', found: 'Negative values' },
        { field: 'email', issue: 'Format Error', expected: 'Valid email', found: 'Invalid format' }
      ]
    }
  };
};

const DataQualityDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricData | null>(null);
  const [updating, setUpdating] = useState<Record<string, boolean>>({});
  
  const timelinessChartRef = useRef<HTMLCanvasElement>(null);
  const comparisonChartRef = useRef<HTMLCanvasElement>(null);
  const duplicatesChartRef = useRef<HTMLCanvasElement>(null);
  
  const timelinessChartInstance = useRef<Chart | null>(null);
  const comparisonChartInstance = useRef<Chart | null>(null);
  const duplicatesChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    const updateMetrics = () => {
      const data = generateMockData();
      setMetrics(data);
    };

    updateMetrics();
    // Auto-refresh every 30 seconds (optional)
    // const interval = setInterval(updateMetrics, 30000);
    // return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!metrics) return;

    // Update Timeliness Chart
    if (timelinessChartRef.current) {
      if (timelinessChartInstance.current) {
        timelinessChartInstance.current.destroy();
      }

      const dataValues = metrics.timeliness_trend.map(item => item.value);
      const minValue = Math.min(...dataValues);
      const maxValue = Math.max(...dataValues);
      
      const pointColors = dataValues.map(value => 
        (value === minValue || value === maxValue) ? '#ef4444' : '#60a5fa'
      );
      
      const pointRadii = dataValues.map(value => 
        (value === minValue || value === maxValue) ? 6 : 4
      );

      const config: ChartConfiguration = {
        type: 'line',
        data: {
          labels: metrics.timeliness_trend.map(item => item.date),
          datasets: [{
            label: '',
            data: dataValues,
            borderColor: '#60a5fa',
            backgroundColor: 'transparent',
            borderWidth: 2,
            tension: 0.3,
            fill: false,
            pointBackgroundColor: pointColors,
            pointBorderColor: pointColors,
            pointBorderWidth: 0,
            pointRadius: pointRadii,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: pointColors,
            pointHoverBorderColor: '#ffffff',
            pointHoverBorderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#ffffff',
              titleColor: '#1f2937',
              bodyColor: '#6b7280',
              borderColor: '#e5e7eb',
              borderWidth: 1,
              padding: 12,
              displayColors: false,
              callbacks: {
                title: (context) => context[0].label,
                label: (context) => context.parsed.y + '%'
              }
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              min: Math.floor(minValue - 10),
              max: Math.ceil(maxValue + 10),
              ticks: {
                color: '#9ca3af',
                font: { size: 11 },
                stepSize: 20
              },
              grid: {
                color: '#f3f4f6'
              }
            },
            x: {
              ticks: {
                color: '#9ca3af',
                font: { size: 11 }
              },
              grid: {
                color: '#f3f4f6'
              }
            }
          }
        }
      };

      timelinessChartInstance.current = new Chart(timelinessChartRef.current, config);
    }

    // Update Comparison Chart
    if (comparisonChartRef.current) {
      if (comparisonChartInstance.current) {
        comparisonChartInstance.current.destroy();
      }

      const config: ChartConfiguration = {
        type: 'bar',
        data: {
          labels: ['Accuracy', 'Consistency'],
          datasets: [{
            label: 'Score %',
            data: [metrics.accuracy, metrics.consistency],
            backgroundColor: [
              'rgba(255, 122, 0, 0.8)',
              'rgba(255, 122, 0, 0.5)'
            ],
            borderColor: ['#FF7A00', '#FF7A00'],
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: true,
              labels: {
                color: '#333',
                font: { size: 12 }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              min: 80,
              max: 100,
              ticks: { color: '#666' },
              grid: { color: 'rgba(0, 0, 0, 0.05)' }
            },
            x: {
              ticks: {
                color: '#666',
                font: { size: 11 }
              },
              grid: { display: false }
            }
          }
        }
      };

      comparisonChartInstance.current = new Chart(comparisonChartRef.current, config);
    }

    // Update Duplicates Chart
    if (duplicatesChartRef.current) {
      if (duplicatesChartInstance.current) {
        duplicatesChartInstance.current.destroy();
      }

      const dataValues = metrics.duplicates_trend.map(item => item.count);
      const minValue = Math.min(...dataValues);
      const maxValue = Math.max(...dataValues);
      
      const pointColors = dataValues.map(value => 
        (value === minValue || value === maxValue) ? '#ef4444' : '#f97316'
      );
      
      const pointRadii = dataValues.map(value => 
        (value === minValue || value === maxValue) ? 6 : 4
      );

      const config: ChartConfiguration = {
        type: 'line',
        data: {
          labels: metrics.duplicates_trend.map(item => item.date),
          datasets: [{
            label: '',
            data: dataValues,
            borderColor: '#f97316',
            backgroundColor: 'transparent',
            borderWidth: 2,
            tension: 0.3,
            fill: false,
            pointBackgroundColor: pointColors,
            pointBorderColor: pointColors,
            pointBorderWidth: 0,
            pointRadius: pointRadii,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: pointColors,
            pointHoverBorderColor: '#ffffff',
            pointHoverBorderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#ffffff',
              titleColor: '#1f2937',
              bodyColor: '#6b7280',
              borderColor: '#e5e7eb',
              borderWidth: 1,
              padding: 12,
              displayColors: false,
              callbacks: {
                title: (context) => context[0].label,
                label: (context) => context.parsed.y + ' duplicates'
              }
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              min: Math.floor(minValue - 10),
              max: Math.ceil(maxValue + 10),
              ticks: {
                color: '#9ca3af',
                font: { size: 11 },
                stepSize: 10
              },
              grid: {
                color: '#f3f4f6'
              }
            },
            x: {
              ticks: {
                color: '#9ca3af',
                font: { size: 11 }
              },
              grid: {
                color: '#f3f4f6'
              }
            }
          }
        }
      };

      duplicatesChartInstance.current = new Chart(duplicatesChartRef.current, config);
    }

    return () => {
      if (timelinessChartInstance.current) timelinessChartInstance.current.destroy();
      if (comparisonChartInstance.current) comparisonChartInstance.current.destroy();
      if (duplicatesChartInstance.current) duplicatesChartInstance.current.destroy();
    };
  }, [metrics]);

  if (!metrics) {
    return (
      <div className="flex-1 flex items-center justify-center h-full">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const getChangeIcon = (value: number) => {
    if (value > 0) return '↑';
    if (value < 0) return '↓';
    return '→';
  };

  const getChangeClass = (value: number) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full gap-5 px-4 py-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold">Data Quality Dashboard</h1>
      </div>

      {/* Metrics Cards - 6 columns with Dashboard color scheme */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2.5">
        {/* Data Completeness */}
        <div className="bg-chart-1/10 rounded-lg shadow-sm p-2.5 border-l-2 border-chart-1">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">DATA COMPLETENESS</p>
            <h2 className="text-xl font-bold font-mono">{metrics.completeness}%</h2>
            <div className="flex items-center gap-1">
              {metrics.changes.completeness > 0 ? (
                <ArrowUp className="h-3 w-3 text-chart-4" />
              ) : (
                <ArrowDown className="h-3 w-3 text-destructive" />
              )}
              <span className={`text-xs ${
                metrics.changes.completeness > 0 ? 'text-chart-4' : 'text-destructive'
              }`}>
                {metrics.changes.completeness > 0 ? '+' : ''}{metrics.changes.completeness}%
              </span>
            </div>
          </div>
        </div>

        {/* Data Accuracy */}
        <div className="bg-chart-2/10 rounded-lg shadow-sm p-2.5 border-l-2 border-chart-2">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">DATA ACCURACY</p>
            <h2 className="text-xl font-bold font-mono">{metrics.accuracy}%</h2>
            <div className="flex items-center gap-1">
              {metrics.changes.accuracy > 0 ? (
                <ArrowUp className="h-3 w-3 text-chart-4" />
              ) : (
                <ArrowDown className="h-3 w-3 text-destructive" />
              )}
              <span className={`text-xs ${
                metrics.changes.accuracy > 0 ? 'text-chart-4' : 'text-destructive'
              }`}>
                {metrics.changes.accuracy > 0 ? '+' : ''}{metrics.changes.accuracy}%
              </span>
            </div>
          </div>
        </div>

        {/* Data Consistency */}
        <div className="bg-chart-4/10 rounded-lg shadow-sm p-2.5 border-l-2 border-chart-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">DATA CONSISTENCY</p>
            <h2 className="text-xl font-bold font-mono">{metrics.consistency}%</h2>
            <div className="flex items-center gap-1">
              {metrics.changes.consistency > 0 ? (
                <ArrowUp className="h-3 w-3 text-chart-4" />
              ) : (
                <ArrowDown className="h-3 w-3 text-destructive" />
              )}
              <span className={`text-xs ${
                metrics.changes.consistency > 0 ? 'text-chart-4' : 'text-destructive'
              }`}>
                {metrics.changes.consistency > 0 ? '+' : ''}{metrics.changes.consistency}%
              </span>
            </div>
          </div>
        </div>

        {/* Data Timeliness */}
        <div className="bg-chart-4/10 rounded-lg shadow-sm p-2.5 border-l-2 border-chart-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">DATA TIMELINESS</p>
            <h2 className="text-xl font-bold font-mono">{metrics.timeliness}%</h2>
            <div className="flex items-center gap-1">
              {metrics.changes.timeliness > 0 ? (
                <ArrowUp className="h-3 w-3 text-chart-4" />
              ) : (
                <ArrowDown className="h-3 w-3 text-destructive" />
              )}
              <span className={`text-xs ${
                metrics.changes.timeliness > 0 ? 'text-chart-4' : 'text-destructive'
              }`}>
                {metrics.changes.timeliness > 0 ? '+' : ''}{metrics.changes.timeliness}%
              </span>
            </div>
          </div>
        </div>

        {/* Duplicate Records */}
        <div className="bg-chart-5/10 rounded-lg shadow-sm p-2.5 border-l-2 border-chart-5">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">DUPLICATE RECORDS</p>
            <h2 className="text-xl font-bold font-mono">{metrics.duplicates}</h2>
            <div className="flex items-center gap-1">
              {metrics.changes.duplicates > 0 ? (
                <ArrowUp className="h-3 w-3 text-chart-4" />
              ) : (
                <ArrowDown className="h-3 w-3 text-destructive" />
              )}
              <span className={`text-xs ${
                metrics.changes.duplicates > 0 ? 'text-chart-4' : 'text-destructive'
              }`}>
                {metrics.changes.duplicates > 0 ? '+' : ''}{metrics.changes.duplicates}%
              </span>
            </div>
          </div>
        </div>

        {/* Schema Validation */}
        <div className="bg-chart-1/10 rounded-lg shadow-sm p-2.5 border-l-2 border-chart-1">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">SCHEMA VALIDATION</p>
            <h2 className="text-xl font-bold font-mono">{metrics.schema}%</h2>
            <div className="flex items-center gap-1">
              {metrics.changes.schema > 0 ? (
                <ArrowUp className="h-3 w-3 text-chart-4" />
              ) : (
                <ArrowDown className="h-3 w-3 text-destructive" />
              )}
              <span className={`text-xs ${
                metrics.changes.schema > 0 ? 'text-chart-4' : 'text-destructive'
              }`}>
                {metrics.changes.schema > 0 ? '+' : ''}{metrics.changes.schema}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        {/* Timeliness Trend Chart */}
        <div className="bg-white rounded-lg shadow-sm p-2.5">
          <h3 className="text-sm font-medium mb-2">Data Timeliness Trend (7 Days)</h3>
          <div className="h-[180px]">
            <canvas ref={timelinessChartRef}></canvas>
          </div>
        </div>

        {/* Accuracy vs Consistency */}
        <div className="bg-white rounded-lg shadow-sm p-2.5">
          <h3 className="text-sm font-medium mb-2">Accuracy vs Consistency Comparison</h3>
          <div className="h-[180px]">
            <canvas ref={comparisonChartRef}></canvas>
          </div>
        </div>
      </div>

      {/* Duplicates Trend and Schema Validation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        {/* Duplicates Trend Chart */}
        <div className="bg-white rounded-lg shadow-sm p-2.5">
          <h3 className="text-sm font-medium mb-2">Duplicate Records Trend (7 Days)</h3>
          <div className="h-[170px]">
            <canvas ref={duplicatesChartRef}></canvas>
          </div>
        </div>

        {/* Schema Validation Issues */}
        <div className="bg-white rounded-lg shadow-sm p-2.5">
          <h3 className="text-sm font-medium mb-2">Schema Validation Issues</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center py-2 border-l-4 border-blue-400 pl-3 bg-blue-50">
              <span className="text-xs font-medium text-gray-700">Type Mismatches</span>
              <span className="text-lg font-bold text-gray-900">{metrics.schema_validation.field_type_mismatches}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-l-4 border-blue-400 pl-3 bg-blue-50">
              <span className="text-xs font-medium text-gray-700">Missing Required Fields</span>
              <span className="text-lg font-bold text-gray-900">{metrics.schema_validation.missing_required_fields}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-l-4 border-blue-400 pl-3 bg-blue-50">
              <span className="text-xs font-medium text-gray-700">Constraint Violations</span>
              <span className="text-lg font-bold text-gray-900">{metrics.schema_validation.constraint_violations}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-l-4 border-blue-400 pl-3 bg-blue-50">
              <span className="text-xs font-medium text-gray-700">Format Errors</span>
              <span className="text-lg font-bold text-gray-900">{metrics.schema_validation.format_errors}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-l-4 border-blue-400 pl-3 bg-blue-50">
              <span className="text-xs font-medium text-gray-700">Invalid Ranges</span>
              <span className="text-lg font-bold text-gray-900">{metrics.schema_validation.invalid_ranges}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        {/* Duplicate Records Details Table */}
        <div className="bg-white rounded-lg shadow-sm p-2.5">
          <h3 className="text-sm font-medium mb-2">Duplicate Records Details</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">Record ID</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">Field Name</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">Duplicate Count</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">Severity</th>
                </tr>
              </thead>
              <tbody>
                {metrics.duplicate_records.map((record) => (
                  <tr key={record.id} className="border-b border-gray-100">
                    <td className="px-3 py-2 text-sm text-gray-900">{record.id}</td>
                    <td className="px-3 py-2 text-sm text-gray-900">{record.field}</td>
                    <td className="px-3 py-2 text-sm text-gray-900">{record.count}</td>
                    <td className="px-3 py-2 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        record.severity === 'High' ? 'text-red-700' :
                        record.severity === 'Medium' ? 'text-orange-600' :
                        'text-green-600'
                      }`}>
                        {record.severity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Schema Validation Details Table */}
        <div className="bg-white rounded-lg shadow-sm p-2.5">
          <h3 className="text-sm font-medium mb-2">Schema Validation Details</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">Field Name</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">Issue Type</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">Expected</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase">Found</th>
                </tr>
              </thead>
              <tbody>
                {metrics.schema_validation.details.map((detail, idx) => (
                  <tr key={idx} className="border-b border-gray-100">
                    <td className="px-3 py-2 text-sm text-gray-900">{detail.field}</td>
                    <td className="px-3 py-2 text-sm text-gray-900">{detail.issue}</td>
                    <td className="px-3 py-2 text-sm text-gray-900">{detail.expected}</td>
                    <td className="px-3 py-2 text-sm text-gray-900">{detail.found}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataQualityDashboard;

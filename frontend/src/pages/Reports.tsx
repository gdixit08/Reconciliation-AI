import { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Filter,
  Search,
  Eye,
  BarChart3,
  PieChart,
  Activity,
  RefreshCw,
  Calendar,
  DollarSign,
  Target,
  Zap,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const mockReportData = {
  summary: {
    totalTransactions: 847,
    matchedTransactions: 723,
    unmatchedTransactions: 124,
    matchingAccuracy: 85.4,
    totalAmount: 45672.89,
    matchedAmount: 41234.56,
    unmatchedAmount: 4438.33
  },
  monthlyData: [
    { month: 'Jan 2025', matched: 156, unmatched: 23, accuracy: 87.2 },
    { month: 'Dec 2024', matched: 142, unmatched: 18, accuracy: 88.8 },
    { month: 'Nov 2024', matched: 134, unmatched: 21, accuracy: 86.5 },
    { month: 'Oct 2024', matched: 151, unmatched: 19, accuracy: 88.8 },
    { month: 'Sep 2024', matched: 140, unmatched: 24, accuracy: 85.4 }
  ],
  unmatchedReasons: [
    { reason: 'No close match found', count: 67, percentage: 54.0 },
    { reason: 'Amount mismatch', count: 28, percentage: 22.6 },
    { reason: 'Date variance > 3 days', count: 19, percentage: 15.3 },
    { reason: 'Duplicate in ledger', count: 10, percentage: 8.1 }
  ],
  confidenceDistribution: [
    { range: '90-100%', count: 425, color: 'bg-emerald-500' },
    { range: '80-89%', count: 185, color: 'bg-blue-500' },
    { range: '70-79%', count: 113, color: 'bg-amber-500' },
    { range: '60-69%', count: 78, color: 'bg-orange-500' },
    { range: '<60%', count: 46, color: 'bg-red-500' }
  ]
};

// Counter Animation Hook
const useCountAnimation = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(end * progress));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);
  
  return count;
};

const ReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('last-6-months');
  const [selectedReport, setSelectedReport] = useState('summary');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  type StatCardProps = {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ElementType;
    trend?: string;
    color?: string;
    delay?: number;
    numericValue?: number;
  };

  const StatCard = ({ 
    title, 
    value, 
    subtitle, 
    icon: Icon, 
    trend, 
    color = 'text-gray-900',
    delay = 0,
    numericValue
  }: StatCardProps) => {
    const animatedValue = useCountAnimation(numericValue || 0, 2000);
    
    return (
      <div 
        className={`group bg-gradient-to-br from-white to-gray-50/50 rounded-xl border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] ${
          mounted ? 'animate-in slide-in-from-bottom-4 fade-in' : 'opacity-0'
        }`}
        style={{ animationDelay: `${delay}ms` }}
      >
        <div className="relative overflow-hidden p-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-600 mb-2">{title}</p>
              <p className={`text-3xl font-bold ${color} mb-1 transition-all duration-300`}>
                {numericValue ? 
                  (typeof value === 'string' && value.includes('$') ? `$${animatedValue.toLocaleString()}` : 
                   typeof value === 'string' && value.includes('%') ? `${animatedValue}%` : 
                   animatedValue.toLocaleString()) 
                  : value
                }
              </p>
              {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
            </div>
            <div className="relative">
              <div className="p-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl shadow-inner group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                <Icon className="h-7 w-7 text-blue-600 transition-transform duration-300 group-hover:rotate-12" />
              </div>
              <div className="absolute inset-0 bg-blue-400 rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
            </div>
          </div>
          
          {trend && (
            <div className="flex items-center mt-4 pt-4 border-t border-gray-100 relative z-10">
              <div className="flex items-center space-x-1">
                {trend.includes('+') ? (
                  <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm font-semibold ${trend.includes('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                  {trend}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const UnmatchedReasonsChart = () => (
    <div className="bg-gradient-to-br from-white to-red-50/30 rounded-xl border-0 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Unmatched Transaction Reasons</h3>
          <p className="text-sm text-gray-600 mt-1">Analysis of why transactions couldn't be matched</p>
        </div>
        <div className="p-2 bg-gradient-to-br from-red-100 to-pink-100 rounded-lg">
          <AlertTriangle className="h-5 w-5 text-red-600" />
        </div>
      </div>
      
      <div className="space-y-4">
        {mockReportData.unmatchedReasons.map((item, index) => (
          <div key={index} className="group">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-800">{item.reason}</span>
              <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                {item.count} ({item.percentage}%)
              </span>
            </div>
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                <div 
                  className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-1000 ease-out shadow-sm relative overflow-hidden"
                  style={{ 
                    width: mounted ? `${item.percentage}%` : '0%',
                    animationDelay: `${index * 200}ms`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ConfidenceDistribution = () => (
    <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-xl border-0 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">AI Confidence Distribution</h3>
          <p className="text-sm text-gray-600 mt-1">Distribution of matching confidence scores</p>
        </div>
        <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg">
          <Target className="h-5 w-5 text-blue-600" />
        </div>
      </div>
      
      <div className="space-y-4">
        {mockReportData.confidenceDistribution.map((item, index) => (
          <div key={index} className="group">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${item.color} shadow-sm`}></div>
                <span className="text-sm font-semibold text-gray-800">{item.range}</span>
              </div>
              <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                {item.count}
              </span>
            </div>
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                <div 
                  className={`${item.color} h-4 rounded-full transition-all duration-1000 ease-out shadow-sm relative overflow-hidden`}
                  style={{ 
                    width: mounted ? `${(item.count / mockReportData.summary.totalTransactions) * 100}%` : '0%',
                    animationDelay: `${index * 150}ms`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const MonthlyTrends = () => (
    <div className="bg-gradient-to-br from-white to-gray-50/30 rounded-xl border-0 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Monthly Matching Trends</h3>
          <p className="text-sm text-gray-600 mt-1">Historical performance over time</p>
        </div>
        <div className="p-2 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg">
          <TrendingUp className="h-5 w-5 text-emerald-600" />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 font-semibold text-gray-700">Month</th>
              <th className="text-right py-3 font-semibold text-gray-700">Matched</th>
              <th className="text-right py-3 font-semibold text-gray-700">Unmatched</th>
              <th className="text-right py-3 font-semibold text-gray-700">Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {mockReportData.monthlyData.map((item, index) => (
              <tr key={index} className="group border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent transition-all duration-200">
                <td className="py-4 font-semibold text-gray-900 group-hover:text-blue-900 transition-colors">
                  {item.month}
                </td>
                <td className="py-4 text-right text-emerald-600 font-bold group-hover:scale-105 transition-transform">
                  {item.matched}
                </td>
                <td className="py-4 text-right text-red-600 font-bold group-hover:scale-105 transition-transform">
                  {item.unmatched}
                </td>
                <td className="py-4 text-right">
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold shadow-sm transition-all duration-200 group-hover:scale-105 ${
                    item.accuracy >= 88 ? 'bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 border border-emerald-300' :
                    item.accuracy >= 85 ? 'bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 border border-amber-300' :
                    'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300'
                  }`}>
                    {item.accuracy}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      {/* Enhanced Header with Animation */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                  <BarChart3 className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -inset-1 bg-blue-400 rounded-xl opacity-30 blur animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                  Reconciliation Reports
                </h1>
                <div className="flex items-center space-x-4 mt-2">
                  <p className="text-sm text-gray-600">Advanced analytics and insights</p>
                  <div className="flex items-center space-x-2 px-2 py-1 bg-emerald-100 rounded-full">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-semibold text-emerald-700">Live Data</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mt-6 sm:mt-0">
              <button
                onClick={handleRefresh}
                className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-all duration-200 hover:scale-105"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg bg-white/90 backdrop-blur text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
              >
                <option value="last-month">Last Month</option>
                <option value="last-3-months">Last 3 Months</option>
                <option value="last-6-months">Last 6 Months</option>
                <option value="last-year">Last Year</option>
                <option value="custom">Custom Range</option>
              </select>
              
              <button className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 p-1 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
          {[
            { id: 'summary', label: 'Summary', icon: Activity },
            { id: 'trends', label: 'Trends', icon: TrendingUp },
            { id: 'unmatched', label: 'Unmatched Analysis', icon: AlertTriangle },
            { id: 'confidence', label: 'AI Confidence', icon: Zap }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedReport(tab.id)}
              className={`inline-flex items-center px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 ${
                selectedReport === tab.id
                  ? 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Summary Dashboard with Enhanced Animations */}
        {selectedReport === 'summary' && (
          <div className="space-y-8">
            {/* Enhanced Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Transactions"
                value={mockReportData.summary.totalTransactions.toLocaleString()}
                numericValue={mockReportData.summary.totalTransactions}
                icon={FileText}
                trend="+12% from last month"
                delay={0}
              />
              <StatCard
                title="Matching Accuracy"
                value={`${mockReportData.summary.matchingAccuracy}%`}
                numericValue={mockReportData.summary.matchingAccuracy}
                subtitle={`${mockReportData.summary.matchedTransactions} matched`}
                icon={Target}
                color="text-emerald-600"
                trend="+2.1% improvement"
                delay={100}
              />
              <StatCard
                title="Total Amount"
                value={`$${mockReportData.summary.totalAmount.toLocaleString()}`}
                numericValue={mockReportData.summary.totalAmount}
                subtitle={`$${mockReportData.summary.matchedAmount.toLocaleString()} matched`}
                icon={DollarSign}
                trend="+$3,421 from last month"
                delay={200}
              />
              <StatCard
                title="Unmatched Items"
                value={mockReportData.summary.unmatchedTransactions}
                numericValue={mockReportData.summary.unmatchedTransactions}
                subtitle={`$${mockReportData.summary.unmatchedAmount.toLocaleString()} unmatched`}
                icon={AlertTriangle}
                color="text-red-600"
                trend="-8 from last month"
                delay={300}
              />
            </div>

            {/* Enhanced Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <UnmatchedReasonsChart />
              <ConfidenceDistribution />
            </div>

            <MonthlyTrends />
          </div>
        )}

        {/* Enhanced Trends View */}
        {selectedReport === 'trends' && (
          <div className="space-y-8 animate-in slide-in-from-right-5 fade-in duration-500">
            <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-xl border-0 shadow-lg p-8 hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Historical Matching Performance</h2>
              <MonthlyTrends />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-xl border-0 shadow-lg p-8 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Accuracy Trends</h3>
                  <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg group-hover:scale-110 transition-transform">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 mx-auto mb-4 text-blue-400 animate-pulse" />
                    <p className="text-lg font-semibold">Interactive Chart</p>
                    <p className="text-sm">Real-time accuracy visualization</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-white to-emerald-50/30 rounded-xl border-0 shadow-lg p-8 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Volume Analysis</h3>
                  <div className="p-2 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg group-hover:scale-110 transition-transform">
                    <Activity className="h-5 w-5 text-emerald-600" />
                  </div>
                </div>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Activity className="h-16 w-16 mx-auto mb-4 text-emerald-400 animate-pulse" />
                    <p className="text-lg font-semibold">Volume Trends</p>
                    <p className="text-sm">Transaction flow patterns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Unmatched Analysis */}
        {selectedReport === 'unmatched' && (
          <div className="space-y-8 animate-in slide-in-from-left-5 fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Unmatched Transaction Analysis</h2>
                <p className="text-gray-600 mt-1">Detailed breakdown of unmatched items</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm bg-white/90 backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
                  />
                </div>
                
                <button className="inline-flex items-center px-4 py-3 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white/90 backdrop-blur hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 hover:shadow-md">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </button>
              </div>
            </div>

            <UnmatchedReasonsChart />

            <div className="bg-gradient-to-br from-white to-gray-50/30 rounded-xl border-0 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Transaction Details</h3>
                <p className="text-sm text-gray-600 mt-1">Review and manage unmatched items</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Date</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Description</th>
                      <th className="text-right py-4 px-6 font-semibold text-gray-700">Amount</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Reason</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { date: '2025-01-15', description: 'Amazon Prime Subscription', amount: -12.99, reason: 'No close match found' },
                      { date: '2025-01-14', description: 'Starbucks Coffee', amount: -4.85, reason: 'Amount mismatch' },
                      { date: '2025-01-13', description: 'Salary Deposit', amount: 3500.00, reason: 'Date variance > 3 days' },
                      { date: '2025-01-12', description: 'Gas Station', amount: -45.20, reason: 'Duplicate in ledger' },
                    ].map((transaction, index) => (
                      <tr key={index} className="group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent transition-all duration-200 hover:scale-[1.01] hover:shadow-sm">
                        <td className="py-4 px-6 text-gray-900 font-medium group-hover:text-blue-900 transition-colors">
                          {transaction.date}
                        </td>
                        <td className="py-4 px-6 text-gray-900 font-medium">{transaction.description}</td>
                        <td className={`py-4 px-6 text-right font-bold transition-transform group-hover:scale-105 ${
                          transaction.amount >= 0 ? 'text-emerald-600' : 'text-red-600'
                        }`}>
                          ${Math.abs(transaction.amount).toFixed(2)}
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300 shadow-sm">
                            {transaction.reason}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <button className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-semibold hover:scale-105 transition-all duration-200">
                            <Eye className="h-4 w-4 mr-1" />
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Confidence Scores */}
        {selectedReport === 'confidence' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-5 fade-in duration-500">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">AI Confidence Score Analysis</h2>
              <p className="text-gray-600 mt-1">Deep insights into matching algorithm performance</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ConfidenceDistribution />
              
              <div className="bg-gradient-to-br from-white to-purple-50/30 rounded-xl border-0 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Performance Insights</h3>
                  <div className="p-2 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
                    <Zap className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  {[
                    { 
                      icon: CheckCircle, 
                      color: 'emerald', 
                      title: 'High Confidence Matches',
                      description: '610 transactions (72%) with >80% confidence',
                      delay: 0
                    },
                    { 
                      icon: AlertTriangle, 
                      color: 'amber', 
                      title: 'Medium Confidence',
                      description: '191 transactions need review (60-80% confidence)',
                      delay: 100
                    },
                    { 
                      icon: XCircle, 
                      color: 'red', 
                      title: 'Low Confidence',
                      description: '46 transactions require manual matching',
                      delay: 200
                    }
                  ].map((insight, index) => (
                    <div 
                      key={index}
                      className={`group flex items-center p-4 bg-gradient-to-r from-${insight.color}-50 to-${insight.color}-100/50 rounded-xl border border-${insight.color}-200 hover:shadow-md transition-all duration-300 hover:scale-[1.02] ${
                        mounted ? 'animate-in slide-in-from-right-4 fade-in' : 'opacity-0'
                      }`}
                      style={{ animationDelay: `${insight.delay}ms` }}
                    >
                      <insight.icon className={`h-6 w-6 text-${insight.color}-500 mr-4 group-hover:scale-110 transition-transform`} />
                      <div>
                        <p className={`text-sm font-bold text-${insight.color}-800`}>{insight.title}</p>
                        <p className={`text-xs text-${insight.color}-600 mt-1`}>{insight.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-gray-50/30 rounded-xl border-0 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Low Confidence Transactions</h3>
                <p className="text-sm text-gray-600 mt-1">Transactions requiring manual review and verification</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Bank Transaction</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Suggested Match</th>
                      <th className="text-center py-4 px-6 font-semibold text-gray-700">AI Confidence</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { 
                        bank: 'APPLE.COM/BILL - $9.99 - 2025-01-15',
                        suggested: 'Apple Music Subscription - $9.99 - 2025-01-14',
                        confidence: 55
                      },
                      { 
                        bank: 'PAYPAL TRANSFER - $150.00 - 2025-01-13',
                        suggested: 'PayPal Payment - $148.50 - 2025-01-13',
                        confidence: 48
                      },
                      { 
                        bank: 'ATM WITHDRAWAL - $40.00 - 2025-01-12',
                        suggested: 'Cash Withdrawal - $40.00 - 2025-01-11',
                        confidence: 42
                      }
                    ].map((item, index) => (
                      <tr key={index} className="group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent transition-all duration-200 hover:scale-[1.01]">
                        <td className="py-4 px-6 text-gray-900 text-sm font-medium">{item.bank}</td>
                        <td className="py-4 px-6 text-gray-700 text-sm">{item.suggested}</td>
                        <td className="py-4 px-6 text-center">
                          <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold shadow-sm transition-all duration-200 group-hover:scale-105 ${
                            item.confidence >= 50 
                              ? 'bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 border border-amber-300' 
                              : 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300'
                          }`}>
                            {item.confidence}%
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex space-x-3">
                            <button className="text-emerald-600 hover:text-emerald-800 text-sm font-semibold hover:scale-105 transition-all duration-200">
                              Accept
                            </button>
                            <button className="text-red-600 hover:text-red-800 text-sm font-semibold hover:scale-105 transition-all duration-200">
                              Reject
                            </button>
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold hover:scale-105 transition-all duration-200">
                              Edit Match
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
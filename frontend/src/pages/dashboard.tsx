import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Zap,
  Activity,
  Gauge,
  Users,
  Calendar,
  DollarSign,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Shield,
  RefreshCw,
  Bell,
  Star,
  ChevronRight,
  BarChart3,
  PieChart,
  LineChart,
  Layers,
  GitBranch,
  Workflow
} from 'lucide-react';

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

// Real-time Activity Component
const RealTimeActivity = () => {
  const [activities, setActivities] = useState([
    { id: 1, type: 'match', message: 'AI matched Amazon transaction', time: '2 min ago', confidence: 95 },
    { id: 2, type: 'review', message: 'Flagged suspicious amount variance', time: '5 min ago', confidence: 45 },
    { id: 3, type: 'auto', message: 'Auto-approved payroll deposits', time: '8 min ago', confidence: 99 },
    { id: 4, type: 'pattern', message: 'New spending pattern detected', time: '12 min ago', confidence: 78 }
  ]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'match': return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case 'review': return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'auto': return <Zap className="h-4 w-4 text-blue-500" />;
      case 'pattern': return <Brain className="h-4 w-4 text-purple-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/30 h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg">
              <Activity className="h-5 w-5 text-blue-600" />
            </div>
            <CardTitle className="text-lg">Live Activity Feed</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-emerald-600">Real-time</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
          {activities.map((activity, index) => (
            <div 
              key={activity.id} 
              className={`flex items-start gap-3 p-3 rounded-lg hover:bg-white/60 transition-all duration-200 cursor-pointer group ${
                index === 0 ? 'bg-blue-50/50 border border-blue-200' : 'bg-gray-50/30'
              }`}
            >
              <div className="mt-1">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 group-hover:text-blue-900 transition-colors">
                  {activity.message}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-gray-500">{activity.time}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    activity.confidence >= 90 ? 'bg-emerald-100 text-emerald-700' :
                    activity.confidence >= 70 ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {activity.confidence}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// AI Insights Component
const AIInsights = () => {
  const insights = [
    {
      title: 'Anomaly Detection',
      description: 'Found 3 unusual transactions requiring attention',
      icon: Shield,
      color: 'red',
      severity: 'high',
      count: 3
    },
    {
      title: 'Pattern Recognition',
      description: 'Identified new recurring payment pattern',
      icon: Brain,
      color: 'purple',
      severity: 'medium',
      count: 1
    },
    {
      title: 'Smart Suggestions',
      description: 'AI can auto-match 15 more transactions',
      icon: Sparkles,
      color: 'blue',
      severity: 'info',
      count: 15
    },
    {
      title: 'Efficiency Boost',
      description: 'Processing time improved by 34%',
      icon: Zap,
      color: 'emerald',
      severity: 'success',
      count: 34
    }
  ];

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-purple-50/30">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
            <Brain className="h-5 w-5 text-purple-600" />
          </div>
          <CardTitle className="text-lg">AI Intelligence</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div 
              key={index}
              className={`group p-3 rounded-lg border-l-4 hover:shadow-md transition-all duration-200 cursor-pointer bg-gradient-to-r from-${insight.color}-50/50 to-transparent border-${insight.color}-400`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <insight.icon className={`h-5 w-5 text-${insight.color}-600 mt-0.5 group-hover:scale-110 transition-transform`} />
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900">{insight.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{insight.description}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`text-lg font-bold text-${insight.color}-600`}>
                    {insight.count}
                  </span>
                  <ChevronRight className="h-3 w-3 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Performance Metrics Component
const PerformanceMetrics = () => {
  const metrics = [
    { label: 'Accuracy Rate', value: 94.2, target: 95, color: 'emerald' },
    { label: 'Processing Speed', value: 87.5, target: 90, color: 'blue' },
    { label: 'Auto-Match Rate', value: 78.9, target: 80, color: 'purple' },
    { label: 'User Satisfaction', value: 91.3, target: 95, color: 'amber' }
  ];

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-emerald-50/30">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg">
            <Gauge className="h-5 w-5 text-emerald-600" />
          </div>
          <CardTitle className="text-lg">Performance KPIs</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold text-${metric.color}-600`}>
                    {metric.value}%
                  </span>
                  <span className="text-xs text-gray-500">/{metric.target}%</span>
                </div>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-600 h-2 rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${metric.value}%` }}
                  ></div>
                </div>
                <div 
                  className="absolute top-0 w-0.5 h-2 bg-gray-400 rounded-full"
                  style={{ left: `${metric.target}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('today');

  // Mock comprehensive statistics
  const stats = {
    totalTransactions: 1247,
    processedToday: 156,
    aiMatches: 134,
    pendingReview: 22,
    accuracy: 94.2,
    avgProcessingTime: 2.3,
    costSavings: 15420,
    timesSaved: 8.5
  };

  const animatedTotal = useCountAnimation(stats.totalTransactions, 2000);
  const animatedProcessed = useCountAnimation(stats.processedToday, 1500);
  const animatedMatches = useCountAnimation(stats.aiMatches, 1800);
  const animatedPending = useCountAnimation(stats.pendingReview, 1200);
  const animatedAccuracy = useCountAnimation(stats.accuracy * 10, 2200);
  const animatedSavings = useCountAnimation(stats.costSavings, 2500);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      {/* Enhanced Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                  <Workflow className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -inset-1 bg-blue-400 rounded-xl opacity-30 blur animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                  Reconciliation Command Center
                </h1>
                <div className="flex items-center space-x-4 mt-2">
                  <p className="text-gray-600">Real-time monitoring and AI-powered insights</p>
                  <div className="flex items-center space-x-2 px-2 py-1 bg-emerald-100 rounded-full">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-semibold text-emerald-700">Active</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <select 
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg bg-white/90 backdrop-blur text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
              <Button variant="outline" size="sm" className="border-gray-200 hover:bg-gray-50">
                <Bell className="h-4 w-4 mr-2" />
                Alerts
                <Badge className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5">3</Badge>
              </Button>
              <Button variant="outline" size="sm" className="border-gray-200 hover:bg-gray-50">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Hero Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className={`group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/30 ${
            mounted ? 'animate-in slide-in-from-bottom-4 fade-in' : 'opacity-0'
          }`} style={{ animationDelay: '0ms' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-gray-700">Transactions Processed</CardTitle>
                <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative z-10">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    {mounted ? animatedProcessed : stats.processedToday}
                  </span>
                  <span className="text-sm font-medium text-gray-500">today</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                  <span className="text-xs font-medium text-emerald-600">+23% vs yesterday</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Total: {mounted ? animatedTotal.toLocaleString() : stats.totalTransactions.toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] bg-gradient-to-br from-white via-emerald-50/50 to-green-50/30 ${
            mounted ? 'animate-in slide-in-from-bottom-4 fade-in' : 'opacity-0'
          }`} style={{ animationDelay: '100ms' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-gray-700">AI Match Rate</CardTitle>
                <div className="p-2 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg group-hover:scale-110 transition-transform">
                  <Brain className="h-4 w-4 text-emerald-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative z-10">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-emerald-600">
                    {mounted ? (animatedAccuracy / 10).toFixed(1) : stats.accuracy}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                  <span className="text-xs font-medium text-emerald-600">+2.1% this week</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {mounted ? animatedMatches : stats.aiMatches} auto-matched
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] bg-gradient-to-br from-white via-amber-50/50 to-orange-50/30 ${
            mounted ? 'animate-in slide-in-from-bottom-4 fade-in' : 'opacity-0'
          }`} style={{ animationDelay: '200ms' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-gray-700">Pending Review</CardTitle>
                <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg group-hover:scale-110 transition-transform">
                  <Clock className="h-4 w-4 text-amber-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative z-10">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-amber-600">
                    {mounted ? animatedPending : stats.pendingReview}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowDownRight className="h-3 w-3 text-amber-500" />
                  <span className="text-xs font-medium text-amber-600">-15% vs last week</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Avg review time: 5.2 min
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] bg-gradient-to-br from-white via-purple-50/50 to-pink-50/30 ${
            mounted ? 'animate-in slide-in-from-bottom-4 fade-in' : 'opacity-0'
          }`} style={{ animationDelay: '300ms' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-gray-700">Cost Savings</CardTitle>
                <div className="p-2 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg group-hover:scale-110 transition-transform">
                  <DollarSign className="h-4 w-4 text-purple-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative z-10">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-purple-600">
                    ${mounted ? animatedSavings.toLocaleString() : stats.costSavings.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowUpRight className="h-3 w-3 text-purple-500" />
                  <span className="text-xs font-medium text-purple-600">vs manual process</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Time saved: {stats.timesSaved}h this week
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-4 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg p-1 rounded-xl">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-semibold">
              Command Center
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-semibold">
              Live Monitoring
            </TabsTrigger>
            <TabsTrigger value="ai-insights" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-semibold">
              AI Intelligence
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-semibold">
              Analytics Hub
            </TabsTrigger>
          </TabsList>

          {/* Command Center Overview */}
          <TabsContent value="overview" className="space-y-6 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RealTimeActivity />
              </div>
              <div>
                <AIInsights />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PerformanceMetrics />
              
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-indigo-50/30">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-lg">
                      <Users className="h-5 w-5 text-indigo-600" />
                    </div>
                    <CardTitle className="text-lg">Team Activity</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Sarah Chen', action: 'Reviewed 12 transactions', time: '5 min ago', avatar: 'SC' },
                      { name: 'Mike Johnson', action: 'Approved batch reconciliation', time: '18 min ago', avatar: 'MJ' },
                      { name: 'Lisa Wang', action: 'Created new matching rule', time: '32 min ago', avatar: 'LW' },
                      { name: 'AI Assistant', action: 'Auto-processed 45 matches', time: '1 hour ago', avatar: 'AI' }
                    ].map((user, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-50/50 transition-colors">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          user.avatar === 'AI' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                        }`}>
                          {user.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.action}</p>
                        </div>
                        <span className="text-xs text-gray-400">{user.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Live Monitoring */}
          <TabsContent value="monitoring" className="space-y-6 animate-in slide-in-from-right-5 fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Processing Queue', value: '8', color: 'blue', icon: Layers },
                { label: 'Active Sessions', value: '3', color: 'emerald', icon: Users },
                { label: 'System Load', value: '67%', color: 'amber', icon: Gauge },
                { label: 'Uptime', value: '99.9%', color: 'green', icon: Shield }
              ].map((metric, index) => (
                <Card key={index} className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">{metric.label}</p>
                        <p className={`text-2xl font-bold text-${metric.color}-600 mt-1`}>{metric.value}</p>
                      </div>
                      <metric.icon className={`h-8 w-8 text-${metric.color}-500 opacity-60`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-blue-600" />
                    Processing Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <LineChart className="h-16 w-16 mx-auto mb-4 text-blue-400" />
                      <p className="text-lg font-semibold">Real-time Processing Chart</p>
                      <p className="text-sm">Live transaction flow visualization</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-emerald-50/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitBranch className="h-5 w-5 text-emerald-600" />
                    Match Flow Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { stage: 'Data Ingestion', status: 'completed', count: 156, color: 'emerald' },
                      { stage: 'AI Processing', status: 'active', count: 134, color: 'blue' },
                      { stage: 'Pattern Matching', status: 'active', count: 98, color: 'amber' },
                      { stage: 'Quality Check', status: 'pending', count: 22, color: 'gray' }
                    ].map((stage, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50/50">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            stage.status === 'completed' ? 'bg-emerald-500' :
                            stage.status === 'active' ? 'bg-blue-500 animate-pulse' :
                            'bg-gray-300'
                          }`}></div>
                          <span className="text-sm font-medium">{stage.stage}</span>
                        </div>
                        <span className={`text-sm font-bold text-${stage.color}-600`}>
                          {stage.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Intelligence */}
          <TabsContent value="ai-insights" className="space-y-6 animate-in slide-in-from-left-5 fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-purple-50/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    ML Model Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { model: 'Pattern Recognition', accuracy: 94.2, trend: '+2.1%' },
                      { model: 'Amount Matching', accuracy: 96.8, trend: '+1.5%' },
                      { model: 'Description Analysis', accuracy: 89.4, trend: '+3.2%' },
                      { model: 'Date Correlation', accuracy: 91.7, trend: '+0.8%' }
                    ].map((model, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-purple-50/50">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{model.model}</p>
                          <p className="text-xs text-gray-600">Last updated: 2 hours ago</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-purple-600">{model.accuracy}%</p>
                          <p className="text-xs text-emerald-600">{model.trend}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-amber-50/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-amber-600" />
                    Learning Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-amber-50 rounded-lg">
                      <div className="text-3xl font-bold text-amber-600 mb-2">2,847</div>
                      <p className="text-sm text-amber-700">Training samples processed today</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-xl font-bold text-gray-900">15</div>
                        <p className="text-xs text-gray-600">New patterns</p>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <div className="text-xl font-bold text-gray-900">98.2%</div>
                        <p className="text-xs text-gray-600">Confidence</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Hub */}
          <TabsContent value="analytics" className="space-y-6 animate-in slide-in-from-bottom-5 fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Transaction Volume', icon: BarChart3, color: 'blue' },
                { title: 'Match Distribution', icon: PieChart, color: 'emerald' },
                { title: 'Performance Trends', icon: LineChart, color: 'purple' }
              ].map((chart, index) => (
                <Card key={index} className={`border-0 shadow-xl bg-gradient-to-br from-white to-${chart.color}-50/30`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <chart.icon className={`h-5 w-5 text-${chart.color}-600`} />
                      {chart.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <chart.icon className={`h-12 w-12 mx-auto mb-2 text-${chart.color}-400`} />
                        <p className="text-sm font-medium">Interactive Chart</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}
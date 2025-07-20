import { useState, useMemo } from 'react';
import { 
  Upload, 
  Download, 
  FileText, 
  CheckCircle,  
  AlertTriangle, 
  ThumbsUp,
  ThumbsDown,
  Link,
  Search,
  TrendingUp,
  Activity,
  BarChart3,
  Filter,
  DollarSign,
  Clock,
  Eye,
  RefreshCw,
  ArrowUpRight,
  Zap
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Button,
} from '@/components/ui/button';
import {
  Input,
} from '@/components/ui/input';
import {
  Badge,
} from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import {
  Progress,
} from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Enhanced mock data with more details
const mockMatches = [
  {
    id: 1,
    bankDate: '2024-06-15',
    bankAmount: -125.50,
    bankDescription: 'AMZ*Digital Services',
    ledgerDate: '2024-06-15',
    ledgerAmount: -125.50,
    ledgerDescription: 'Amazon AWS Subscription',
    confidence: 95,
    status: 'matched',
    feedback: null,
    category: 'Software & Subscriptions',
    riskLevel: 'low'
  },
  {
    id: 2,
    bankDate: '2024-06-14',
    bankAmount: -45.20,
    bankDescription: 'STARBUCKS #1234',
    ledgerDate: '2024-06-14',
    ledgerAmount: -45.20,
    ledgerDescription: 'Coffee Meeting - Client',
    confidence: 88,
    status: 'matched',
    feedback: 'confirmed',
    category: 'Meals & Entertainment',
    riskLevel: 'low'
  },
  {
    id: 3,
    bankDate: '2024-06-13',
    bankAmount: -89.99,
    bankDescription: 'APPLE.COM/BILL',
    ledgerDate: '2024-06-14',
    ledgerAmount: -89.99,
    ledgerDescription: 'Software Subscription',
    confidence: 72,
    status: 'review',
    feedback: null,
    category: 'Software & Subscriptions',
    riskLevel: 'medium'
  },
  {
    id: 4,
    bankDate: '2024-06-12',
    bankAmount: -156.78,
    bankDescription: 'WAL-MART SUPERCENTER',
    ledgerDate: null,
    ledgerAmount: null,
    ledgerDescription: null,
    confidence: 0,
    status: 'unmatched',
    feedback: null,
    category: 'Unknown',
    riskLevel: 'high'
  },
  {
    id: 5,
    bankDate: '2024-06-11',
    bankAmount: 2500.00,
    bankDescription: 'DIRECT DEPOSIT PAYROLL',
    ledgerDate: '2024-06-11',
    ledgerAmount: 2500.00,
    ledgerDescription: 'Monthly Salary',
    confidence: 100,
    status: 'matched',
    feedback: 'confirmed',
    category: 'Income',
    riskLevel: 'low'
  }
];

const mockStats = {
  totalTransactions: 156,
  matchedTransactions: 142,
  reviewRequired: 8,
  unmatched: 6,
  averageConfidence: 87.5,
  totalAmount: 15420.50,
  matchedAmount: 14890.25,
  processingTime: '2.3s',
  lastSync: '2 minutes ago'
};

export default function BankReconciliationAnalytics() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterConfidence, setFilterConfidence] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('card');

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'bg-emerald-500';
    if (confidence >= 70) return 'bg-amber-500';
    if (confidence >= 50) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getConfidenceGradient = (confidence: number) => {
    if (confidence >= 90) return 'from-emerald-500 to-emerald-600';
    if (confidence >= 70) return 'from-amber-500 to-amber-600';
    if (confidence >= 50) return 'from-orange-500 to-orange-600';
    return 'from-red-500 to-red-600';
  };

  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-200">Low Risk</Badge>;
      case 'medium':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200">Medium Risk</Badge>;
      case 'high':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">High Risk</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string, confidence: number) => {
    switch (status) {
      case 'matched':
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-200">✓ Matched</Badge>;
      case 'review':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200">⚠ Review</Badge>;
      case 'unmatched':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">✗ Unmatched</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const handleFeedback = (matchId: number, feedback: string) => {
    console.log(`Feedback for match ${matchId}: ${feedback}`);
  };

  const filteredMatches = useMemo(() => {
    return mockMatches.filter(match => {
      const searchMatch = match.bankDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (match.ledgerDescription && match.ledgerDescription.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const confidenceMatch = filterConfidence === 'all' || 
                             (filterConfidence === 'high' && match.confidence >= 90) ||
                             (filterConfidence === 'medium' && match.confidence >= 70 && match.confidence < 90) ||
                             (filterConfidence === 'low' && match.confidence < 70);
      
      return searchMatch && confidenceMatch;
    }).sort((a, b) => {
      if (sortBy === 'confidence') return b.confidence - a.confidence;
      if (sortBy === 'amount') return Math.abs(b.bankAmount) - Math.abs(a.bankAmount);
      return new Date(b.bankDate).getTime() - new Date(a.bankDate).getTime();
    });
  }, [searchTerm, filterConfidence, sortBy]);

  const matchingProgress = (mockStats.matchedTransactions / mockStats.totalTransactions) * 100;

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
        <div className="backdrop-blur-xl bg-white/70 border-b border-white/20 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
            {/* Enhanced Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Bank Reconciliation Analytics
                  </h1>
                  <div className="flex items-center gap-4 mt-1">
                    <p className="text-gray-600">Automated transaction matching and reconciliation dashboard</p>
                    <div className="flex items-center gap-2 px-2 py-1 bg-emerald-100 rounded-full">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-emerald-700">Live</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" className="border-gray-200 hover:bg-gray-50">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Refresh data</TooltipContent>
                </Tooltip>
                <Button variant="outline" className="flex items-center gap-2 border-gray-200 hover:bg-gray-50">
                  <Upload className="h-4 w-4" />
                  Upload Files
                </Button>
                <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
                  <Download className="h-4 w-4" />
                  Export Report
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-4 lg:p-8 space-y-8">
          {/* Enhanced Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-gray-50/50">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-semibold text-gray-700">Total Transactions</CardTitle>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Activity className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{mockStats.totalTransactions}</div>
                <p className="text-sm text-gray-600 mt-1">
                  ${mockStats.totalAmount.toLocaleString()} total value
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                  <span className="text-xs text-emerald-600 font-medium">+12% from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-emerald-50/50">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-bl-full"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-semibold text-gray-700">Matched</CardTitle>
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-600">{mockStats.matchedTransactions}</div>
                <div className="flex items-center justify-between mt-2">
                  <Progress value={matchingProgress} className="flex-1 h-2" />
                  <span className="text-sm font-medium text-emerald-600 ml-2">
                    {matchingProgress.toFixed(1)}%
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">Success rate</p>
              </CardContent>
            </Card>
            
            <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-amber-50/50">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/10 to-transparent rounded-bl-full"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-semibold text-gray-700">Needs Review</CardTitle>
                <div className="p-2 bg-amber-100 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-amber-600">{mockStats.reviewRequired}</div>
                <p className="text-sm text-gray-600 mt-1">Low confidence matches</p>
                <div className="flex items-center gap-2 mt-2">
                  <Clock className="h-3 w-3 text-amber-500" />
                  <span className="text-xs text-amber-600 font-medium">Avg. 5min review time</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/50">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-semibold text-gray-700">AI Confidence</CardTitle>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Zap className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{mockStats.averageConfidence}%</div>
                <p className="text-sm text-gray-600 mt-1">Matching accuracy</p>
                <div className="flex items-center gap-2 mt-2">
                  <TrendingUp className="h-3 w-3 text-blue-500" />
                  <span className="text-xs text-blue-600 font-medium">Processing: {mockStats.processingTime}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <TabsList className="grid w-full sm:w-auto grid-cols-4 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg">
                <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="matches" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  All Matches
                </TabsTrigger>
                <TabsTrigger value="review" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Review Queue
                  {mockStats.reviewRequired > 0 && (
                    <Badge className="ml-2 bg-amber-500 text-white text-xs px-1.5 py-0.5">
                      {mockStats.reviewRequired}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="reports" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Reports
                </TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Last sync: {mockStats.lastSync}</span>
              </div>
            </div>

            {/* Enhanced Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg font-semibold">Matching Status Distribution</CardTitle>
                        <CardDescription>Real-time breakdown of transaction matching results</CardDescription>
                      </div>
                      <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg">
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { label: 'Matched', count: mockStats.matchedTransactions, color: 'emerald', percentage: (mockStats.matchedTransactions / mockStats.totalTransactions) * 100 },
                        { label: 'Review Required', count: mockStats.reviewRequired, color: 'amber', percentage: (mockStats.reviewRequired / mockStats.totalTransactions) * 100 },
                        { label: 'Unmatched', count: mockStats.unmatched, color: 'red', percentage: (mockStats.unmatched / mockStats.totalTransactions) * 100 }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50/50">
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 bg-${item.color}-500 rounded-full shadow-sm`}></div>
                            <span className="text-sm font-medium">{item.label} ({item.count})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full bg-${item.color}-500`}
                                style={{ width: `${item.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-semibold text-gray-700 min-w-[3rem] text-right">
                              {item.percentage.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
                        <CardDescription>Latest matching results and user actions</CardDescription>
                      </div>
                      <div className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg">
                        <Activity className="h-5 w-5 text-emerald-600" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { icon: CheckCircle, color: 'emerald', text: '142 transactions automatically matched', time: '2 minutes ago' },
                        { icon: ThumbsUp, color: 'blue', text: 'User confirmed Starbucks transaction match', time: '5 minutes ago' },
                        { icon: AlertTriangle, color: 'amber', text: '8 transactions require manual review', time: '5 minutes ago' },
                        { icon: Zap, color: 'purple', text: 'AI confidence improved by 3.2%', time: '1 hour ago' }
                      ].map((activity, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50/50 transition-colors">
                          <div className={`p-1.5 bg-${activity.color}-100 rounded-full`}>
                            <activity.icon className={`h-3 w-3 text-${activity.color}-600`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{activity.text}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {mockStats.reviewRequired > 0 && (
                <Alert className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 shadow-lg">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <AlertTitle className="text-amber-900 font-semibold">Action Required</AlertTitle>
                  <AlertDescription className="text-amber-800">
                    {mockStats.reviewRequired} transactions have low confidence matches and require your review.
                    <Button 
                      variant="link" 
                      className="p-0 h-auto ml-2 text-amber-700 hover:text-amber-900 font-semibold" 
                      onClick={() => setActiveTab('review')}
                    >
                      Review now →
                    </Button>
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>

            {/* Enhanced Matches Tab */}
            <TabsContent value="matches" className="space-y-6">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50/50">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg font-semibold">All Transaction Matches</CardTitle>
                      <CardDescription>
                        Complete list of {filteredMatches.length} transaction matches with AI confidence scores
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={viewMode === 'card' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('card')}
                        className="px-3"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === 'table' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('table')}
                        className="px-3"
                      >
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Enhanced Filters */}
                  <div className="flex flex-col lg:flex-row gap-4 mb-6 p-4 bg-gray-50/50 rounded-xl">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search transactions, descriptions, amounts..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 bg-white border-gray-200 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Select value={filterConfidence} onValueChange={setFilterConfidence}>
                        <SelectTrigger className="w-40 bg-white border-gray-200">
                          <Filter className="h-4 w-4 mr-2" />
                          <SelectValue placeholder="Confidence" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Confidence</SelectItem>
                          <SelectItem value="high">High (90%+)</SelectItem>
                          <SelectItem value="medium">Medium (70-89%)</SelectItem>
                          <SelectItem value="low">Low 70%</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-36 bg-white border-gray-200">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="date">Date</SelectItem>
                          <SelectItem value="confidence">Confidence</SelectItem>
                          <SelectItem value="amount">Amount</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Enhanced Transaction Cards */}
                  <div className="space-y-4">
                    {filteredMatches.map((match) => (
                      <div key={match.id} className="group border border-gray-200 rounded-xl p-6 bg-white hover:shadow-lg transition-all duration-200 hover:border-blue-200">
                        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
                          <div className="flex items-center gap-4">
                            {getStatusBadge(match.status, match.confidence)}
                            {getRiskBadge(match.riskLevel)}
                            {match.confidence > 0 && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center gap-3">
                                    <div className="w-20 bg-gray-200 rounded-full h-2.5">
                                      <div
                                        className={`h-2.5 rounded-full bg-gradient-to-r ${getConfidenceGradient(match.confidence)} shadow-sm`}
                                        style={{ width: `${match.confidence}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-700">{match.confidence}%</span>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  AI Confidence Score: {match.confidence}%
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                          
                          {match.status === 'review' && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleFeedback(match.id, 'confirm')}
                                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700"
                              >
                                <ThumbsUp className="h-3 w-3" />
                                Confirm
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleFeedback(match.id, 'reject')}
                                className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50"
                              >
                                <ThumbsDown className="h-3 w-3" />
                                Reject
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                              >
                                <Link className="h-3 w-3" />
                                Link
                              </Button>
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-blue-600" />
                              <h4 className="font-semibold text-sm text-gray-700">Bank Transaction</h4>
                            </div>
                            <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 p-4 rounded-xl border border-blue-200/50">
                              <div className="flex justify-between items-start mb-2">
                                <span className="text-lg font-bold text-blue-900">
                                  ${Math.abs(match.bankAmount).toFixed(2)}
                                </span>
                                <div className="text-right">
                                  <span className="text-sm font-medium text-blue-700">{match.bankDate}</span>
                                  <p className="text-xs text-blue-600">{match.category}</p>
                                </div>
                              </div>
                              <p className="text-sm text-blue-800 font-medium">{match.bankDescription}</p>
                            </div>
                          </div>

                          {match.ledgerDescription && (
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-emerald-600" />
                                <h4 className="font-semibold text-sm text-gray-700">Ledger Entry</h4>
                              </div>
                              <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 p-4 rounded-xl border border-emerald-200/50">
                                <div className="flex justify-between items-start mb-2">
                                  <span className="text-lg font-bold text-emerald-900">
                                    ${Math.abs(match.ledgerAmount).toFixed(2)}
                                  </span>
                                  <span className="text-sm font-medium text-emerald-700">{match.ledgerDate}</span>
                                </div>
                                <p className="text-sm text-emerald-800 font-medium">{match.ledgerDescription}</p>
                              </div>
                            </div>
                          )}

                          {match.status === 'unmatched' && (
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-red-600" />
                                <h4 className="font-semibold text-sm text-gray-700">Status</h4>
                              </div>
                              <div className="bg-gradient-to-r from-red-50 to-red-100/50 p-4 rounded-xl border border-red-200/50">
                                <p className="text-sm text-red-800 font-medium mb-3">No matching ledger entry found</p>
                                <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                                  Create Ledger Entry
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Enhanced Review Tab */}
            <TabsContent value="review" className="space-y-6">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-amber-50/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold text-amber-900">Review Queue</CardTitle>
                      <CardDescription>
                        {mockMatches.filter(match => match.status === 'review').length} transactions requiring manual verification
                      </CardDescription>
                    </div>
                    <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mockMatches.filter(match => match.status === 'review').map((match) => (
                      <div key={match.id} className="border-2 border-amber-200 rounded-xl p-6 bg-gradient-to-r from-amber-50 to-orange-50 shadow-lg">
                        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <AlertTriangle className="h-5 w-5 text-amber-600" />
                              <span className="font-semibold text-amber-900">
                                Low Confidence Match ({match.confidence}%)
                              </span>
                              {getRiskBadge(match.riskLevel)}
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <DollarSign className="h-4 w-4 text-blue-600" />
                                  <span className="font-semibold text-sm">Bank Transaction</span>
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  <p className="font-medium text-sm">{match.bankDescription}</p>
                                  <p className="text-xs text-gray-600">
                                    ${Math.abs(match.bankAmount).toFixed(2)} on {match.bankDate}
                                  </p>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-emerald-600" />
                                  <span className="font-semibold text-sm">Ledger Entry</span>
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  <p className="font-medium text-sm">{match.ledgerDescription}</p>
                                  <p className="text-xs text-gray-600">
                                    ${Math.abs(match.ledgerAmount).toFixed(2)} on {match.ledgerDate}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                              size="sm"
                              onClick={() => handleFeedback(match.id, 'confirm')}
                              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 shadow-lg"
                            >
                              <ThumbsUp className="h-4 w-4" />
                              Confirm Match
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleFeedback(match.id, 'reject')}
                              className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50"
                            >
                              <ThumbsDown className="h-4 w-4" />
                              Reject Match
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                            >
                              <Link className="h-4 w-4" />
                              Find Better Match
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Enhanced Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/30">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg font-semibold">Generate Reports</CardTitle>
                        <CardDescription>Export comprehensive reconciliation reports</CardDescription>
                      </div>
                      <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { icon: FileText, label: 'Monthly Reconciliation Report', format: 'PDF', primary: true },
                      { icon: Download, label: 'Export Matched Transactions', format: 'CSV', primary: false },
                      { icon: Download, label: 'Export Unmatched Items', format: 'CSV', primary: false },
                      { icon: BarChart3, label: 'Detailed Analytics Report', format: 'PDF', primary: false }
                    ].map((report, index) => (
                      <Button 
                        key={index}
                        variant={report.primary ? "default" : "outline"} 
                        className={`w-full flex items-center justify-between gap-3 h-12 ${
                          report.primary 
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg' 
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <report.icon className="h-4 w-4" />
                          <span className="font-medium">{report.label}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {report.format}
                        </Badge>
                      </Button>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-emerald-50/30">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg font-semibold">Report Summary</CardTitle>
                        <CardDescription>Key performance metrics and insights</CardDescription>
                      </div>
                      <div className="p-2 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg">
                        <BarChart3 className="h-5 w-5 text-emerald-600" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
                        <div className="text-3xl font-bold text-emerald-700">{mockStats.matchedTransactions}</div>
                        <div className="text-sm text-emerald-600 font-medium">Matched</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200">
                        <div className="text-3xl font-bold text-red-700">{mockStats.unmatched}</div>
                        <div className="text-sm text-red-600 font-medium">Unmatched</div>
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                      <div className="text-2xl font-bold text-blue-700">
                        ${(mockStats.matchedAmount).toLocaleString()}
                      </div>
                      <div className="text-sm text-blue-600 font-medium">Total Matched Amount</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                      <div className="text-2xl font-bold text-purple-700">{mockStats.averageConfidence}%</div>
                      <div className="text-sm text-purple-600 font-medium">Average AI Confidence</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </TooltipProvider>
  );
}

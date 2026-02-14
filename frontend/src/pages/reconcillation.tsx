import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Loader2, 
  Upload, 
  FileSpreadsheet, 
  Check, 
  X, 
  FileDown, 
  ChevronDown, 
  RefreshCw,
  Search,
  Eye,
  TrendingUp,
  DollarSign,
  Calendar,
  Target,
  Zap,
  Brain,
  Shield,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Settings
} from "lucide-react";
import { toast } from "sonner";

// Types
type TransactionStatus = 'matched' | 'unmatched' | 'review';
interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  source: 'bank' | 'ledger';
  matchId?: string;
  confidence?: number;
  status: TransactionStatus;
  category?: string;
}

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

function Reconciliation() {
  const [bankFile, setBankFile] = useState<File | null>(null);
  const [ledgerFile, setLedgerFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReconciled, setIsReconciled] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'confidence'>('date');

  useEffect(() => {
    setMounted(true);
  }, []);

  // File upload handlers
  const handleBankFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBankFile(e.target.files[0]);
      toast.success("Bank file uploaded successfully", {
        description: `${e.target.files[0].name} is ready for processing`
      });
    }
  };
  
  const handleLedgerFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLedgerFile(e.target.files[0]);
      toast.success("Ledger file uploaded successfully", {
        description: `${e.target.files[0].name} is ready for processing`
      });
    }
  };
  
  const startReconciliation = async () => {
    if (!bankFile || !ledgerFile) {
      toast.error("Missing files", {
        description: "Please upload both bank and ledger files to proceed"
      });
      return;
    }
    
    setIsProcessing(true);
    setProgress(10);
    
    try {
      const formData = new FormData();
      formData.append('bank', bankFile);
      formData.append('ledger', ledgerFile);
      formData.append('modify_bank', 'true');
    
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 10;
          return newProgress < 90 ? newProgress : prev;
        });
      }, 300);
    
      const response = await fetch('http://localhost:8000/reconcile', {
        method: 'POST',
        body: formData,
      });
      
      clearInterval(progressInterval);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      setProgress(100);
      
      if (data.success) {
        const processedTransactions = data.transactions.map((transaction: any) => {
          return {
            id: transaction.id || `tx-${Math.random().toString(36).substr(2, 9)}`,
            date: transaction.date || new Date().toISOString().split('T')[0],
            description: transaction.description || 'Unknown transaction',
            amount: parseFloat(transaction.amount) || 0,
            source: transaction.source || 'unknown',
            status: transaction.status || 'unmatched',
            matchId: transaction.matchId,
            confidence: transaction.confidence,
            category: transaction.category || undefined
          };
        });
        
        setTransactions(processedTransactions);
        
        toast.success(
          `🎉 Reconciliation Complete!`, 
          {
            description: `Successfully processed files. Modified ${data.source} data with ${data.modification_count} changes.`
          }
        );
      } else {
        throw new Error("API returned success: false");
      }
      
      setIsProcessing(false);
      setIsReconciled(true);
    } catch (error) {
      console.error('Error during reconciliation:', error);
      toast.error(
        "Reconciliation Failed", 
        { 
          description: error instanceof Error ? error.message : "There was an error processing your files. Please try again."
        }
      );
      setIsProcessing(false);
      setProgress(0);
    }  
  };
  
  // Filter and search transactions
  const filteredTransactions = transactions.filter(transaction => {
    const matchesTab = activeTab === 'all' || transaction.status === activeTab;
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.amount.toString().includes(searchTerm);
    return matchesTab && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy === 'amount') return Math.abs(b.amount) - Math.abs(a.amount);
    if (sortBy === 'confidence') return (b.confidence || 0) - (a.confidence || 0);
    return 0;
  });
  
  // Count transactions by status
  const matchedCount = transactions.filter(t => t.status === 'matched').length / 2 || 0;
  const unmatchedCount = transactions.filter(t => t.status === 'unmatched').length || 0;
  const reviewCount = transactions.filter(t => t.status === 'review').length / 2 || 0;
  
  // Calculate stats
  const totalTransactionPairs = transactions.length > 0 
    ? (transactions.filter(t => t.matchId).length / 2) + unmatchedCount 
    : 0;
  const completionPercentage = totalTransactionPairs > 0 
    ? Math.round((matchedCount / totalTransactionPairs) * 100) 
    : 0;

  // Animated counters
  const animatedMatched = useCountAnimation(matchedCount, 1500);
  const animatedUnmatched = useCountAnimation(unmatchedCount, 1800);
  const animatedReview = useCountAnimation(reviewCount, 1200);
  const animatedPercentage = useCountAnimation(completionPercentage, 2000);
  
  // Calculate totals
  const totalAmount = transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const matchedAmount = transactions
    .filter(t => t.status === 'matched')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  // Handle match confirmation and rejection
  const confirmMatch = async (id: string) => {
    try {
      const transaction = transactions.find(t => t.id === id);
      if (!transaction || !transaction.matchId) return;
      
      setTransactions(transactions.map(t => {
        if (t.id === id || t.matchId === transaction.matchId) {
          return {...t, status: 'matched', confidence: 100};
        }
        return t;
      }));
      
      toast.success("✅ Match confirmed", {
        description: "Transaction pair has been successfully matched"
      });
    } catch (error) {
      console.error('Error confirming match:', error);
      toast.error("Failed to confirm match. Please try again.");
    }
  };
  
  const rejectMatch = async (id: string) => {
    try {
      const transaction = transactions.find(t => t.id === id);
      if (!transaction || !transaction.matchId) return;
      
      const matchId = transaction.matchId;
      
      setTransactions(transactions.map(t => {
        if (t.id === id || t.matchId === matchId) {
          return {...t, status: 'unmatched', matchId: undefined, confidence: undefined};
        }
        return t;
      }));
      
      toast.success("❌ Match rejected", {
        description: "Transaction pair has been unmatched"
      });
    } catch (error) {
      console.error('Error rejecting match:', error);
      toast.error("Failed to reject match. Please try again.");
    }
  };
  
  // Refresh data by reprocessing the files
  const refreshData = () => {
    if (bankFile && ledgerFile) {
      toast.info("🔄 Refreshing data...", {
        description: "Re-processing files with latest algorithms"
      });
      startReconciliation();
    } else {
      toast.error("Please ensure both files are uploaded before refreshing");
    }
  };
  
  // Export report
  const exportReport = () => {
    if (transactions.length === 0) {
      toast.error("No data to export");
      return;
    }
    
    toast.success("📊 Export started", {
      description: "Your comprehensive report is being generated..."
    });
    
    try {
      const headers = ["Date", "Description", "Amount", "Source", "Status", "Confidence", "Category"];
      
      const csvContent = "data:text/csv;charset=utf-8," + 
        headers.join(",") + "\n" +
        transactions.map(t => 
          `${t.date},"${t.description.replace(/,/g, ";")}",${t.amount},${t.source},${t.status},${t.confidence || ''},${t.category || ''}`
        ).join("\n");
        
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `reconciliation_report_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export report");
    }
  };
  
  // Render confidence badge with appropriate color
  const renderConfidenceBadge = (confidence?: number) => {
    if (!confidence) return null;
    
    let badgeColor = 'bg-gradient-to-r from-red-500 to-red-600 text-white';
    if (confidence >= 90) badgeColor = 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white';
    else if (confidence >= 70) badgeColor = 'bg-gradient-to-r from-amber-500 to-amber-600 text-white';
    else if (confidence >= 50) badgeColor = 'bg-gradient-to-r from-orange-500 to-orange-600 text-white';
    
    return (
      <span className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full shadow-sm ${badgeColor}`}>
        <Target className="h-3 w-3 mr-1" />
        {confidence}%
      </span>
    );
  };

  // Enhanced File Upload Component
  const FileUploadCard = ({ 
    title, 
    description, 
    file, 
    onFileChange, 
    icon: Icon, 
    color 
  }: {
    title: string;
    description: string;
    file: File | null;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon: any;
    color: string;
  }) => (
    <Card className={`group border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] bg-gradient-to-br from-white to-${color}-50/30 ${
      mounted ? 'animate-in slide-in-from-bottom-4 fade-in' : 'opacity-0'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 bg-gradient-to-br from-${color}-100 to-${color}-200 rounded-lg group-hover:scale-110 transition-transform`}>
            <Icon className={`h-5 w-5 text-${color}-600`} />
          </div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center w-full">
          <label className={`group/upload flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
            file 
              ? `border-${color}-400 bg-${color}-50 hover:bg-${color}-100` 
              : `border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-${color}-400`
          }`}>
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {file ? (
                <>
                  <FileSpreadsheet className={`w-10 h-10 mb-3 text-${color}-500 group-hover/upload:scale-110 transition-transform`} />
                  <p className={`text-sm font-semibold text-${color}-700`}>{file.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{(file.size / 1024).toFixed(1)} KB</p>
                </>
              ) : (
                <>
                  <Upload className="w-10 h-10 mb-3 text-gray-400 group-hover/upload:text-blue-500 group-hover/upload:scale-110 transition-all" />
                  <p className="text-sm font-medium text-gray-600 group-hover/upload:text-gray-900">
                    Drop file here or click to browse
                  </p>
                  <p className="text-xs text-gray-500 mt-1">CSV files only</p>
                </>
              )}
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept=".csv,.xlsx,.xls" 
              onChange={onFileChange}
              disabled={isProcessing}
            />
          </label>
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                  <Brain className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -inset-1 bg-blue-400 rounded-xl opacity-30 blur animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                  AI-Powered Reconciliation
                </h1>
                <div className="flex items-center space-x-4 mt-2">
                  <p className="text-gray-600">Intelligent financial data matching and analysis</p>
                  <div className="flex items-center space-x-2 px-2 py-1 bg-emerald-100 rounded-full">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-semibold text-emerald-700">Smart Mode</span>
                  </div>
                </div>
              </div>
            </div>
            {isReconciled && (
              <div className="flex items-center space-x-3">
                <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-3 py-1">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Reconciled
                </Badge>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isReconciled ? (
          <div className="space-y-8">
            {/* File Upload Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FileUploadCard
                title="Bank Statement"
                description="Upload your bank transaction data"
                file={bankFile}
                onFileChange={handleBankFileUpload}
                icon={DollarSign}
                color="blue"
              />
              <FileUploadCard
                title="Ledger Entries"
                description="Upload your accounting ledger data"
                file={ledgerFile}
                onFileChange={handleLedgerFileUpload}
                icon={FileText}
                color="emerald"
              />
            </div>

            {/* Process Button */}
            <div className="flex justify-center">
              <div className="w-full md:w-96">
                <Button 
                  onClick={startReconciliation}
                  disabled={!bankFile || !ledgerFile || isProcessing}
                  className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                      AI Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-3 h-5 w-5" />
                      Start AI Reconciliation
                    </>
                  )}
                </Button>
                
                {(!bankFile || !ledgerFile) && (
                  <p className="text-center text-sm text-amber-600 mt-3 font-medium">
                    Please upload both files to begin reconciliation
                  </p>
                )}
              </div>
            </div>

            {/* Enhanced Progress Bar */}
            {isProcessing && (
              <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Brain className="h-5 w-5 text-blue-600 animate-pulse" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-blue-900">AI Processing in Progress</h3>
                          <p className="text-sm text-blue-600">Analyzing patterns and matching transactions...</p>
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-blue-600">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-3" />
                    <div className="flex items-center justify-center space-x-6 text-xs text-blue-600 font-medium">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span>Pattern Recognition</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                        <span>Amount Matching</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                        <span>Validation</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Enhanced Results Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className={`group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/30 ${
                mounted ? 'animate-in slide-in-from-bottom-4 fade-in' : 'opacity-0'
              }`} style={{ animationDelay: '0ms' }}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-gray-700">Completion Rate</CardTitle>
                    <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg group-hover:scale-110 transition-transform">
                      <Target className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative z-10">
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-4xl font-bold text-blue-600">
                        {mounted ? animatedPercentage : completionPercentage}%
                      </span>
                    </div>
                    <Progress value={mounted ? animatedPercentage : completionPercentage} className="h-2.5 mb-2" />
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-3 w-3 text-blue-500" />
                      <span className="text-xs font-medium text-blue-600">Processing complete</span>
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
                    <CardTitle className="text-sm font-semibold text-gray-700">Successfully Matched</CardTitle>
                    <div className="p-2 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative z-10">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-bold text-emerald-600">
                        {mounted ? animatedMatched : matchedCount}
                      </span>
                      <span className="text-sm font-medium text-gray-500">pairs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                      <span className="text-xs font-medium text-emerald-600">
                        ${matchedAmount.toLocaleString()} matched
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className={`group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] bg-gradient-to-br from-white via-red-50/50 to-pink-50/30 ${
                mounted ? 'animate-in slide-in-from-bottom-4 fade-in' : 'opacity-0'
              }`} style={{ animationDelay: '200ms' }}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-red-500/10 to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-gray-700">Unmatched Items</CardTitle>
                    <div className="p-2 bg-gradient-to-br from-red-100 to-pink-100 rounded-lg group-hover:scale-110 transition-transform">
                      <XCircle className="h-4 w-4 text-red-600" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative z-10">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-bold text-red-600">
                        {mounted ? animatedUnmatched : unmatchedCount}
                      </span>
                      <span className="text-sm font-medium text-gray-500">items</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-3 w-3 text-red-500" />
                      <span className="text-xs font-medium text-red-600">Requires attention</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className={`group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] bg-gradient-to-br from-white via-amber-50/50 to-orange-50/30 ${
                mounted ? 'animate-in slide-in-from-bottom-4 fade-in' : 'opacity-0'
              }`} style={{ animationDelay: '300ms' }}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-gray-700">Needs Review</CardTitle>
                    <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg group-hover:scale-110 transition-transform">
                      <Clock className="h-4 w-4 text-amber-600" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative z-10">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-bold text-amber-600">
                        {mounted ? animatedReview : reviewCount}
                      </span>
                      <span className="text-sm font-medium text-gray-500">pairs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-3 w-3 text-amber-500" />
                      <span className="text-xs font-medium text-amber-600">Manual review needed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Action Bar */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-white to-gray-50/50">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </div>
                    
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="date">Sort by Date</option>
                      <option value="amount">Sort by Amount</option>
                      <option value="confidence">Sort by Confidence</option>
                    </select>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      variant="outline" 
                      onClick={refreshData}
                      className="border-blue-200 text-blue-700 hover:bg-blue-50"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Refresh
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={exportReport}
                      className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                    >
                      <FileDown className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="border-gray-200 hover:bg-gray-50">
                          <Settings className="mr-2 h-4 w-4" />
                          Actions 
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem>
                          <Zap className="mr-2 h-4 w-4" />
                          Auto-match similar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className="mr-2 h-4 w-4" />
                          Validate all matches
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <X className="mr-2 h-4 w-4" />
                          Clear all matches
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Transaction Table with Tabs */}
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <TabsList className="grid w-full sm:w-auto grid-cols-4 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg p-1 rounded-xl">
                  <TabsTrigger 
                    value="all" 
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-semibold"
                  >
                    All ({transactions.length})
                  </TabsTrigger>
                  <TabsTrigger 
                    value="matched" 
                    className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white font-semibold"
                  >
                    Matched ({matchedCount})
                  </TabsTrigger>
                  <TabsTrigger 
                    value="unmatched" 
                    className="data-[state=active]:bg-red-600 data-[state=active]:text-white font-semibold"
                  >
                    Unmatched ({unmatchedCount})
                  </TabsTrigger>
                  <TabsTrigger 
                    value="review" 
                    className="data-[state=active]:bg-amber-600 data-[state=active]:text-white font-semibold"
                  >
                    Review ({reviewCount})
                    {reviewCount > 0 && (
                      <Badge className="ml-2 bg-amber-500 text-white text-xs px-1.5 py-0.5">
                        !
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>
                
                <div className="text-sm text-gray-600 font-medium mt-4 sm:mt-0">
                  Total: ${totalAmount.toLocaleString()} • 
                  Showing {filteredTransactions.length} transactions
                </div>
              </div>
              
              <TabsContent value={activeTab} className="mt-0">
                <Card className="border-0 shadow-xl bg-white overflow-hidden">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                          <TableRow>
                            <TableHead className="font-semibold text-gray-700">Date</TableHead>
                            <TableHead className="font-semibold text-gray-700">Description</TableHead>
                            <TableHead className="font-semibold text-gray-700">Amount</TableHead>
                            <TableHead className="font-semibold text-gray-700">Source</TableHead>
                            <TableHead className="font-semibold text-gray-700">AI Confidence</TableHead>
                            <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredTransactions.length > 0 ? (
                            filteredTransactions.map((transaction, index) => (
                              <TableRow 
                                key={transaction.id} 
                                className={`group transition-all duration-200 hover:scale-[1.01] hover:shadow-sm ${
                                  transaction.status === 'matched' ? 'bg-gradient-to-r from-emerald-50/50 to-transparent border-l-4 border-emerald-400' :
                                  transaction.status === 'review' ? 'bg-gradient-to-r from-amber-50/50 to-transparent border-l-4 border-amber-400' : 
                                  'hover:bg-gray-50/50'
                                } ${mounted ? 'animate-in slide-in-from-bottom-2 fade-in' : 'opacity-0'}`}
                                style={{ animationDelay: `${index * 50}ms` }}
                              >
                                <TableCell className="font-medium text-gray-900 group-hover:text-blue-900 transition-colors">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-3 w-3 text-gray-400" />
                                    {transaction.date}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex flex-col">
                                    <span className="font-medium text-gray-900 group-hover:text-blue-900 transition-colors">
                                      {transaction.description}
                                    </span>
                                    {transaction.category && (
                                      <Badge variant="outline" className="w-fit mt-1 text-xs">
                                        {transaction.category}
                                      </Badge>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className={`flex items-center gap-2 font-bold ${
                                    transaction.amount < 0 ? 'text-red-600' : 'text-emerald-600'
                                  }`}>
                                    {transaction.amount < 0 ? (
                                      <ArrowDownRight className="h-3 w-3" />
                                    ) : (
                                      <ArrowUpRight className="h-3 w-3" />
                                    )}
                                    ${Math.abs(transaction.amount).toLocaleString()}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge 
                                    className={`${
                                      transaction.source === 'bank' 
                                        ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300' 
                                        : 'bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 border border-emerald-300'
                                    }`}
                                  >
                                    {transaction.source === 'bank' ? '🏦 Bank' : '📊 Ledger'}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  {renderConfidenceBadge(transaction.confidence)}
                                </TableCell>
                                <TableCell className="text-right">
                                  {transaction.status === 'review' && (
                                    <div className="flex justify-end space-x-2">
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => confirmMatch(transaction.id)}
                                        className="h-8 w-8 p-0 hover:bg-emerald-100 transition-colors"
                                      >
                                        <Check className="h-4 w-4 text-emerald-600" />
                                      </Button>
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => rejectMatch(transaction.id)}
                                        className="h-8 w-8 p-0 hover:bg-red-100 transition-colors"
                                      >
                                        <X className="h-4 w-4 text-red-600" />
                                      </Button>
                                    </div>
                                  )}
                                  {transaction.status === 'matched' && (
                                    <div className="flex justify-end">
                                      <Badge className="bg-emerald-100 text-emerald-800 border border-emerald-300">
                                        <CheckCircle2 className="h-3 w-3 mr-1" />
                                        Confirmed
                                      </Badge>
                                    </div>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={6} className="text-center py-12">
                                <div className="flex flex-col items-center space-y-3">
                                  <div className="p-3 bg-gray-100 rounded-full">
                                    <Search className="h-8 w-8 text-gray-400" />
                                  </div>
                                  <div>
                                    <p className="text-lg font-medium text-gray-900">No transactions found</p>
                                    <p className="text-sm text-gray-500">
                                      {searchTerm ? `No results for "${searchTerm}"` : 'No transactions in this category'}
                                    </p>
                                  </div>
                                  {searchTerm && (
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => setSearchTerm('')}
                                    >
                                      Clear search
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>
    </div>
  );
}

export default Reconciliation;

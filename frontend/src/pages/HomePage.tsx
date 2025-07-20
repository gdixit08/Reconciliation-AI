import { useState, useEffect } from 'react';
import { 
  Upload, 
  GitCompare, 
  FileText, 
  PieChart, 
  Shield, 
  Zap, 
  BrainCircuit, 
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  TrendingUp,
  Play,
  Sparkles,
  Target,
  Award,
  BarChart3,
  Activity,
  DollarSign,
  Globe
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';

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

export default function HomePage() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animated stats
  const accuracy = useCountAnimation(95, 2000);
  const timeSaved = useCountAnimation(80, 2200);
  const customers = useCountAnimation(1250, 1800);
  const transactions = useCountAnimation(500000, 2500);

  const features = [
    {
      icon: <Upload className="h-10 w-10 text-blue-600" />,
      title: "AI-Powered Upload",
      description: "Intelligent file processing with automatic format detection and data validation for seamless uploads.",
      gradient: "from-blue-500 to-indigo-600",
      delay: 0
    },
    {
      icon: <GitCompare className="h-10 w-10 text-emerald-600" />,
      title: "Smart Matching Engine",
      description: "Advanced machine learning algorithms that achieve 95%+ accuracy in transaction matching and pattern recognition.",
      gradient: "from-emerald-500 to-green-600",
      delay: 100
    },
    {
      icon: <BrainCircuit className="h-10 w-10 text-purple-600" />,
      title: "Adaptive Learning",
      description: "Self-improving AI system that learns from your business patterns to deliver increasingly accurate results.",
      gradient: "from-purple-500 to-pink-600",
      delay: 200
    },
    {
      icon: <FileText className="h-10 w-10 text-orange-600" />,
      title: "Enterprise Reports",
      description: "Professional-grade reporting with customizable templates, audit trails, and compliance-ready documentation.",
      gradient: "from-orange-500 to-red-600",
      delay: 300
    }
  ];

  const benefits = [
    {
      icon: <Clock className="h-6 w-6 text-emerald-600" />,
      title: "Save 80% Time",
      description: "Reduce reconciliation time from hours to minutes with intelligent automation.",
      stat: "80%",
      color: "emerald"
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      title: "99.9% Accuracy",
      description: "Minimize errors with our precision-engineered matching algorithms.",
      stat: "99.9%",
      color: "blue"
    },
    {
      icon: <Zap className="h-6 w-6 text-amber-600" />,
      title: "Real-time Processing",
      description: "Instant results with cloud-powered processing infrastructure.",
      stat: "<2s",
      color: "amber"
    },
    {
      icon: <PieChart className="h-6 w-6 text-purple-600" />,
      title: "Advanced Analytics",
      description: "Gain deep insights with AI-powered transaction pattern analysis.",
      stat: "∞",
      color: "purple"
    }
  ];

  const stats = [
    { label: "Accuracy Rate", value: accuracy, suffix: "%", icon: Target },
    { label: "Time Saved", value: timeSaved, suffix: "%", icon: Clock },
    { label: "Happy Customers", value: customers, suffix: "+", icon: Users },
    { label: "Transactions Processed", value: transactions, suffix: "+", icon: Activity }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CFO, TechCorp",
      content: "ReconcileAI transformed our month-end process. What used to take 3 days now takes 3 hours.",
      rating: 5,
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Finance Director, GlobalTrade",
      content: "The accuracy is incredible. We've eliminated reconciliation errors almost entirely.",
      rating: 5,
      avatar: "MC"
    },
    {
      name: "Emily Rodriguez",
      role: "Accounting Manager, StartupX",
      content: "Even with our complex transaction patterns, the AI adapts and learns. Remarkable technology.",
      rating: 5,
      avatar: "ER"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-800/90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className={`lg:w-1/2 mb-12 lg:mb-0 ${mounted ? 'animate-in slide-in-from-left-5 fade-in duration-1000' : 'opacity-0'}`}>
              <Badge className="mb-6 bg-gradient-to-r from-emerald-400 to-emerald-600 text-white border-0 shadow-lg">
                <Sparkles className="h-3 w-3 mr-1" />
                AI-Powered • NEW
              </Badge>
              
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
                Automate Your
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Bank Reconciliation
                </span>
              </h1>
              
              <p className="text-xl text-blue-100 mb-8 max-w-lg leading-relaxed">
                Stop spending hours manually matching bank statements. ReconcileAI uses advanced machine learning 
                to reconcile your finances with <span className="font-semibold text-white">95%+ accuracy</span> in minutes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200" 
                  onClick={() => navigate("/signup")}
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                  onClick={() => navigate("/watchDemo")}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center space-x-6 text-blue-100">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">4.9/5 Rating</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm font-medium">SOC 2 Certified</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Globe className="h-4 w-4 text-blue-300" />
                  <span className="text-sm font-medium">1000+ Companies</span>
                </div>
              </div>
            </div>
            
            <div className={`lg:w-1/2 ${mounted ? 'animate-in slide-in-from-right-5 fade-in duration-1000 delay-300' : 'opacity-0'}`}>
              <div className="relative mx-auto max-w-lg">
                <div className="relative">
                  {/* Main dashboard image */}
                  <div className="relative shadow-2xl rounded-2xl overflow-hidden border border-white/20 backdrop-blur-sm bg-white/10">
                    <img 
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                      alt="ReconcileAI Dashboard" 
                      className="w-full h-auto transform hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
                  </div>
                  
                  {/* Floating accuracy badge */}
                  <div className={`absolute -bottom-8 -left-8 bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 ${mounted ? 'animate-in zoom-in duration-1000 delay-1000' : 'opacity-0'}`}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-900">{mounted ? accuracy : 95}% Accuracy</div>
                        <div className="text-sm text-gray-500">AI-Powered Matching</div>
                      </div>
                    </div>
                  </div>

                  {/* Floating stats */}
                  <div className={`absolute -top-4 -right-4 bg-white p-3 rounded-xl shadow-xl border border-gray-100 ${mounted ? 'animate-in zoom-in duration-1000 delay-700' : 'opacity-0'}`}>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-emerald-500" />
                      <div className="text-sm font-semibold text-gray-900">{mounted ? timeSaved : 80}% Time Saved</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`text-center group ${mounted ? 'animate-in slide-in-from-bottom-4 fade-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {mounted ? stat.value.toLocaleString() : 0}{stat.suffix}
                </div>
                <div className="text-sm font-medium text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced How It Works */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 border border-blue-200">
              Simple Process
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How ReconcileAI Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined 4-step process transforms hours of manual work into minutes of automated precision
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                step: "1", 
                title: "Smart Upload", 
                desc: "Drag & drop your files. Our AI automatically detects formats and validates data integrity.",
                icon: Upload,
                color: "blue"
              },
              { 
                step: "2", 
                title: "AI Matching", 
                desc: "Advanced algorithms analyze patterns, amounts, and descriptions for precise matching.",
                icon: BrainCircuit,
                color: "emerald"
              },
              { 
                step: "3", 
                title: "Review Dashboard", 
                desc: "Intuitive interface shows matches with confidence scores. Review and approve in one click.",
                icon: CheckCircle,
                color: "amber"
              },
              { 
                step: "4", 
                title: "Export & Analyze", 
                desc: "Generate professional reports with insights, audit trails, and compliance documentation.",
                icon: FileText,
                color: "purple"
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`relative group ${mounted ? 'animate-in slide-in-from-bottom-5 fade-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-white to-gray-50/50">
                  <CardContent className="p-8 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 flex items-center justify-center mb-4 mx-auto`}>
                      <span className="text-white font-bold text-sm">{item.step}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
                
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200">
              <Award className="h-3 w-3 mr-1" />
              Enterprise Features
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful AI-Driven Capabilities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cutting-edge technology designed to handle complex financial reconciliation challenges
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] bg-gradient-to-br from-white to-gray-50/30 overflow-hidden ${
                  mounted ? 'animate-in slide-in-from-bottom-4 fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${feature.delay}ms` }}
              >
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  <CardHeader className="p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-3 bg-gray-50 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {feature.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                    <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 border border-emerald-200">
              <TrendingUp className="h-3 w-3 mr-1" />
              Proven Results
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Finance Teams Choose ReconcileAI</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of finance professionals who have transformed their reconciliation workflow
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card 
                key={index} 
                className={`group p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-r from-white to-gray-50/50 ${
                  mounted ? 'animate-in slide-in-from-bottom-4 fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-start space-x-6">
                  <div className={`p-4 bg-gradient-to-r from-${benefit.color}-100 to-${benefit.color}-200 rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    {benefit.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{benefit.title}</h3>
                      <Badge className={`bg-gradient-to-r from-${benefit.color}-500 to-${benefit.color}-600 text-white border-0 text-lg px-3 py-1`}>
                        {benefit.stat}
                      </Badge>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-100 text-yellow-700 border border-yellow-200">
              <Star className="h-3 w-3 mr-1" />
              Customer Success
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Finance Leaders</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what our customers say about their ReconcileAI experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-white to-gray-50/30 ${
                  mounted ? 'animate-in slide-in-from-bottom-4 fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-6 italic leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Transform Your
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Reconciliation Process?
              </span>
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Join thousands of finance teams saving 80% of their reconciliation time. 
              Start your free trial today and experience the future of financial automation.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-200 px-8 py-4 text-lg font-semibold" 
              onClick={() => navigate("/reconciliation")}
            >
              <Zap className="mr-2 h-5 w-5" />
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold" 
              onClick={() => navigate("/contact")}
            >
              <Play className="mr-2 h-5 w-5" />
              Schedule Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mt-12 text-blue-100">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-emerald-400" />
              <span className="font-medium">Bank-Grade Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-emerald-400" />
              <span className="font-medium">No Setup Required</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-emerald-400" />
              <span className="font-medium">24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
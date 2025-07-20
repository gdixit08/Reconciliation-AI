import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Bell,
    CreditCard,
    GaugeCircle,
    ImagePlus,
    Palette,
    Sun,
    Moon,
    Monitor,
    Settings as SettingsIcon,
    Save,
    CheckCircle,
    AlertTriangle,
    Trash2,
    Download,
    Shield,
    Zap,
    Target,
    Clock,
    TrendingUp,
    DollarSign,
    Star,
    Crown,
    FileText,
    Database,
    Lock,
    Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.6,
            staggerChildren: 0.1
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

const tabContentAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.4, ease: "easeInOut" }
    },
    exit: { 
        opacity: 0, 
        x: 20,
        transition: { duration: 0.3, ease: "easeInOut" }
    }
};

const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    }
};

const plans = [
    {
        id: "free",
        name: "Free Plan",
        description: "Perfect for getting started",
        price: "$0/month",
        features: ["Manual reconciliation", "Up to 100 transactions/month", "Basic CSV exports", "Email support"],
        gradient: "from-gray-500 to-gray-600",
        bgGradient: "from-gray-50 to-gray-100",
        popular: false
    },
    {
        id: "pro",
        name: "Pro Plan",
        description: "Advanced features for professionals",
        price: "$29.99/month",
        features: ["AI-powered matching", "Unlimited transactions", "Advanced reports", "PDF exports", "Priority support"],
        gradient: "from-blue-500 to-indigo-600",
        bgGradient: "from-blue-50 to-indigo-100",
        popular: true
    },
    {
        id: "business",
        name: "Business Plan",
        description: "Enterprise-grade solutions",
        price: "$99.99/month",
        features: ["All Pro features", "Team collaboration", "API access", "Custom matching rules", "24/7 dedicated support", "Advanced analytics"],
        gradient: "from-purple-500 to-pink-600",
        bgGradient: "from-purple-50 to-pink-100",
        popular: false
    }
];

export default function SettingsPage() {
    const [theme, setTheme] = useState("system");
    const [subscriptionPlan, setSubscriptionPlan] = useState("pro");
    const [confidenceThreshold, setConfidenceThreshold] = useState(75);
    const [avatarUrl, setAvatarUrl] = useState("/api/placeholder/150/150");
    const [userInitials, setUserInitials] = useState("JS");
    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState("theme");

    useEffect(() => {
        setMounted(true);
    }, []);

    // Notification states
    const [notifications, setNotifications] = useState({
        emailAlerts: true,
        reconciliationComplete: true,
        unmatched: true,
        weeklyReports: false,
        newFeatures: true,
        systemUpdates: false
    });

    const handleNotificationChange = (key: keyof typeof notifications) => {
        setNotifications({
            ...notifications,
            [key]: !notifications[key]
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarUrl("/api/placeholder/150/150");
        }
    };

    const getConfidenceLabel = (value: number) => {
        if (value < 50) return { label: 'Low', color: 'text-red-600', bg: 'bg-red-100' };
        if (value < 80) return { label: 'Medium', color: 'text-amber-600', bg: 'bg-amber-100' };
        return { label: 'High', color: 'text-emerald-600', bg: 'bg-emerald-100' };
    };

    const confidenceInfo = getConfidenceLabel(confidenceThreshold);

    const notificationCategories = [
        {
            title: "Email Notifications",
            icon: Bell,
            items: [
                {
                    key: 'emailAlerts',
                    title: 'Email Alerts',
                    description: 'Receive all notifications via email',
                    checked: notifications.emailAlerts
                },
                {
                    key: 'weeklyReports',
                    title: 'Weekly Summary Reports',
                    description: 'Get a weekly summary of reconciliation activities',
                    checked: notifications.weeklyReports
                }
            ]
        },
        {
            title: "Reconciliation Alerts",
            icon: Target,
            items: [
                {
                    key: 'reconciliationComplete',
                    title: 'Reconciliation Complete',
                    description: 'When automated reconciliation finishes successfully',
                    checked: notifications.reconciliationComplete
                },
                {
                    key: 'unmatched',
                    title: 'Unmatched Transactions',
                    description: 'When transactions require manual review or attention',
                    checked: notifications.unmatched
                }
            ]
        },
        {
            title: "System Updates",
            icon: Zap,
            items: [
                {
                    key: 'newFeatures',
                    title: 'New Features',
                    description: 'Get notified about new app features and improvements',
                    checked: notifications.newFeatures
                },
                {
                    key: 'systemUpdates',
                    title: 'System Maintenance',
                    description: 'Maintenance and system update notifications',
                    checked: notifications.systemUpdates
                }
            ]
        }
    ];

    const billingHistory = [
        { date: 'Apr 15, 2025', description: 'Pro Plan - Monthly', amount: '$29.99', status: 'paid' },
        { date: 'Mar 15, 2025', description: 'Pro Plan - Monthly', amount: '$29.99', status: 'paid' },
        { date: 'Feb 15, 2025', description: 'Pro Plan - Monthly', amount: '$29.99', status: 'paid' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
            {/* Enhanced Header */}
            <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center justify-between"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                                <SettingsIcon className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                                    Settings
                                </h1>
                                <p className="text-gray-600 mt-1">Customize your ReconcileAI experience</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Badge className="bg-emerald-100 text-emerald-800 border border-emerald-200">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                All Settings Saved
                            </Badge>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <motion.div layout className="mb-8">
                            <TabsList className="grid grid-cols-2 md:grid-cols-4 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg p-1 rounded-xl">
                                <TabsTrigger value="theme" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white font-semibold">
                                    <Palette size={16} className="mr-2 hidden md:inline" />
                                    Theme
                                </TabsTrigger>
                                <TabsTrigger value="notifications" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-semibold">
                                    <Bell size={16} className="mr-2 hidden md:inline" />
                                    Notifications
                                </TabsTrigger>
                                <TabsTrigger value="subscription" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white font-semibold">
                                    <CreditCard size={16} className="mr-2 hidden md:inline" />
                                    Subscription
                                </TabsTrigger>
                                <TabsTrigger value="advanced" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white font-semibold">
                                    <GaugeCircle size={16} className="mr-2 hidden md:inline" />
                                    Advanced
                                </TabsTrigger>
                            </TabsList>
                        </motion.div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={tabContentAnimation}
                            >
                                {/* Enhanced Theme Settings */}
                                <TabsContent value="theme">
                                    <motion.div variants={cardVariants}>
                                        <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-purple-50/30">
                                            <CardHeader className="border-b border-gray-100">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg">
                                                        <Palette className="h-5 w-5 text-purple-600" />
                                                    </div>
                                                    <div>
                                                        <CardTitle className="text-xl">Theme & Appearance</CardTitle>
                                                        <CardDescription>Customize how ReconcileAI looks and feels</CardDescription>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-8 space-y-8">
                                                <motion.div variants={containerVariants} className="space-y-6">
                                                    {/* Color Theme */}
                                                    <motion.div variants={itemAnimation}>
                                                        <div className="flex items-center gap-3 mb-4">
                                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                                <Sun className="h-4 w-4 text-blue-600" />
                                                            </div>
                                                            <h3 className="text-lg font-semibold text-gray-900">Color Theme</h3>
                                                        </div>
                                                        <RadioGroup
                                                            value={theme}
                                                            onValueChange={setTheme}
                                                            className="grid grid-cols-1 md:grid-cols-3 gap-4"
                                                        >
                                                            {[
                                                                { value: "light", icon: Sun, label: "Light Mode", gradient: "from-yellow-100 to-orange-100" },
                                                                { value: "dark", icon: Moon, label: "Dark Mode", gradient: "from-slate-100 to-gray-100" },
                                                                { value: "system", icon: Monitor, label: "System Default", gradient: "from-blue-100 to-indigo-100" }
                                                            ].map((option) => (
                                                                <motion.div
                                                                    key={option.value}
                                                                    whileHover={{ scale: 1.02 }}
                                                                    whileTap={{ scale: 0.98 }}
                                                                    className={`group p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                                                        theme === option.value 
                                                                            ? 'border-purple-400 bg-gradient-to-r ' + option.gradient + ' shadow-lg' 
                                                                            : 'border-gray-200 hover:border-purple-300 bg-white hover:shadow-md'
                                                                    }`}
                                                                >
                                                                    <div className="flex items-center space-x-3">
                                                                        <RadioGroupItem value={option.value} id={option.value} />
                                                                        <Label htmlFor={option.value} className="flex items-center cursor-pointer">
                                                                            <option.icon size={18} className="mr-2" />
                                                                            {option.label}
                                                                        </Label>
                                                                    </div>
                                                                </motion.div>
                                                            ))}
                                                        </RadioGroup>
                                                    </motion.div>

                                                    {/* User Avatar */}
                                                    <motion.div variants={itemAnimation} className="pt-6 border-t border-gray-100">
                                                        <div className="flex items-center gap-3 mb-6">
                                                            <div className="p-2 bg-emerald-100 rounded-lg">
                                                                <ImagePlus className="h-4 w-4 text-emerald-600" />
                                                            </div>
                                                            <h3 className="text-lg font-semibold text-gray-900">Profile Avatar</h3>
                                                        </div>
                                                        <div className="flex items-start space-x-6">
                                                            <motion.div
                                                                whileHover={{ scale: 1.05 }}
                                                                className="relative group"
                                                            >
                                                                <Avatar className="h-32 w-32 shadow-xl ring-4 ring-white">
                                                                    <AvatarImage src={avatarUrl} alt="User avatar" />
                                                                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-2xl font-bold">
                                                                        {userInitials}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                    <ImagePlus className="h-8 w-8 text-white" />
                                                                </div>
                                                            </motion.div>
                                                            <div className="space-y-4">
                                                                <div className="text-sm text-gray-600 leading-relaxed">
                                                                    Upload a new avatar image. Supports JPG, PNG or GIF formats, maximum 2MB file size.
                                                                </div>
                                                                <div className="flex items-center space-x-3">
                                                                    <Label
                                                                        htmlFor="avatar-upload"
                                                                        className="cursor-pointer inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                                                                    >
                                                                        <ImagePlus size={16} className="mr-2" />
                                                                        Upload New Image
                                                                    </Label>
                                                                    <input
                                                                        id="avatar-upload"
                                                                        type="file"
                                                                        accept="image/png, image/jpeg, image/gif"
                                                                        className="hidden"
                                                                        onChange={handleFileChange}
                                                                    />
                                                                    <Button variant="outline" onClick={() => setAvatarUrl("/api/placeholder/150/150")}>
                                                                        Reset to Default
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>

                                                    {/* Display Settings */}
                                                    <motion.div variants={itemAnimation} className="pt-6 border-t border-gray-100">
                                                        <div className="flex items-center gap-3 mb-6">
                                                            <div className="p-2 bg-amber-100 rounded-lg">
                                                                <Eye className="h-4 w-4 text-amber-600" />
                                                            </div>
                                                            <h3 className="text-lg font-semibold text-gray-900">Display Preferences</h3>
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            <div className="space-y-3">
                                                                <Label className="text-sm font-semibold text-gray-700">Font Size</Label>
                                                                <Select defaultValue="medium">
                                                                    <SelectTrigger className="bg-white border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200">
                                                                        <SelectValue placeholder="Select font size" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="small">Small (14px)</SelectItem>
                                                                        <SelectItem value="medium">Medium (16px)</SelectItem>
                                                                        <SelectItem value="large">Large (18px)</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                                <p className="text-xs text-gray-500">Controls the base font size throughout the application</p>
                                                            </div>
                                                            <div className="space-y-3">
                                                                <Label className="text-sm font-semibold text-gray-700">Table Density</Label>
                                                                <Select defaultValue="comfortable">
                                                                    <SelectTrigger className="bg-white border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200">
                                                                        <SelectValue placeholder="Select table density" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="compact">Compact</SelectItem>
                                                                        <SelectItem value="comfortable">Comfortable</SelectItem>
                                                                        <SelectItem value="spacious">Spacious</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                                <p className="text-xs text-gray-500">Controls spacing in reconciliation tables</p>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                </motion.div>

                                                <motion.div variants={itemAnimation} className="pt-6 border-t border-gray-100">
                                                    <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                                                        <Save className="mr-2 h-4 w-4" />
                                                        Save Theme Settings
                                                    </Button>
                                                </motion.div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </TabsContent>

                                {/* Enhanced Notification Settings */}
                                <TabsContent value="notifications">
                                    <motion.div variants={cardVariants}>
                                        <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50/30">
                                            <CardHeader className="border-b border-gray-100">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg">
                                                        <Bell className="h-5 w-5 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <CardTitle className="text-xl">Notification Preferences</CardTitle>
                                                        <CardDescription>Control how and when you receive alerts and updates</CardDescription>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-8">
                                                <motion.div variants={containerVariants} className="space-y-8">
                                                    {notificationCategories.map((category, categoryIndex) => (
                                                        <motion.div
                                                            key={category.title}
                                                            variants={itemAnimation}
                                                            className="space-y-4"
                                                        >
                                                            <div className="flex items-center gap-3 mb-4">
                                                                <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg">
                                                                    <category.icon className="h-4 w-4 text-blue-600" />
                                                                </div>
                                                                <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                                                            </div>
                                                            <div className="space-y-4">
                                                                {category.items.map((item) => (
                                                                    <motion.div
                                                                        key={item.key}
                                                                        whileHover={{ x: 4 }}
                                                                        className="flex items-center justify-between p-4 rounded-xl bg-white border border-gray-100 hover:shadow-md transition-all duration-200"
                                                                    >
                                                                        <div className="flex-1">
                                                                            <div className="font-semibold text-gray-900 mb-1">{item.title}</div>
                                                                            <div className="text-sm text-gray-600 leading-relaxed">{item.description}</div>
                                                                        </div>
                                                                        <Switch
                                                                            checked={item.checked}
                                                                            onCheckedChange={() => handleNotificationChange(item.key as keyof typeof notifications)}
                                                                            className="data-[state=checked]:bg-blue-600 ml-4"
                                                                        />
                                                                    </motion.div>
                                                                ))}
                                                            </div>
                                                            {categoryIndex < notificationCategories.length - 1 && (
                                                                <div className="border-t border-gray-100 mt-6"></div>
                                                            )}
                                                        </motion.div>
                                                    ))}
                                                </motion.div>

                                                <motion.div variants={itemAnimation} className="pt-6 border-t border-gray-100">
                                                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                                                        <Save className="mr-2 h-4 w-4" />
                                                        Save Notification Settings
                                                    </Button>
                                                </motion.div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </TabsContent>

                                {/* Enhanced Subscription Settings */}
                                <TabsContent value="subscription">
                                    <motion.div variants={cardVariants}>
                                        <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-emerald-50/30">
                                            <CardHeader className="border-b border-gray-100">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg">
                                                        <CreditCard className="h-5 w-5 text-emerald-600" />
                                                    </div>
                                                    <div>
                                                        <CardTitle className="text-xl">Subscription & Billing</CardTitle>
                                                        <CardDescription>Manage your subscription plan and billing information</CardDescription>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-8 space-y-8">
                                                <motion.div variants={containerVariants}>
                                                    {/* Current Plan Section */}
                                                    <motion.div variants={itemAnimation}>
                                                        <div className="flex items-center gap-3 mb-6">
                                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                                <Star className="h-4 w-4 text-blue-600" />
                                                            </div>
                                                            <h3 className="text-lg font-semibold text-gray-900">Choose Your Plan</h3>
                                                        </div>
                                                        
                                                        <RadioGroup
                                                            value={subscriptionPlan}
                                                            onValueChange={setSubscriptionPlan}
                                                        >
                                                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                                                {plans.map((plan, index) => (
                                                                    <motion.div
                                                                        key={plan.id}
                                                                        variants={itemAnimation}
                                                                        whileHover={{ scale: 1.02, y: -4 }}
                                                                        className={`relative group cursor-pointer ${
                                                                            subscriptionPlan === plan.id
                                                                                ? 'transform scale-105 z-10'
                                                                                : ''
                                                                        }`}
                                                                    >
                                                                        <div
                                                                            className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                                                                                subscriptionPlan === plan.id
                                                                                    ? 'border-emerald-400 shadow-xl bg-gradient-to-br ' + plan.bgGradient
                                                                                    : 'border-gray-200 hover:border-emerald-300 bg-white hover:shadow-lg'
                                                                            }`}
                                                                        >
                                                                            {plan.popular && (
                                                                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                                                                    <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-1 shadow-lg">
                                                                                        <Crown className="h-3 w-3 mr-1" />
                                                                                        Most Popular
                                                                                    </Badge>
                                                                                </div>
                                                                            )}
                                                                            
                                                                            <div className="flex items-center justify-between mb-4">
                                                                                <div>
                                                                                    <h4 className="text-xl font-bold text-gray-900">{plan.name}</h4>
                                                                                    <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
                                                                                </div>
                                                                                <RadioGroupItem
                                                                                    value={plan.id}
                                                                                    id={plan.id}
                                                                                    className="data-[state=checked]:border-emerald-500 data-[state=checked]:text-emerald-600"
                                                                                />
                                                                            </div>
                                                                            
                                                                            <div className="mb-6">
                                                                                <span className="text-4xl font-bold text-gray-900">{plan.price.split('/')[0]}</span>
                                                                                <span className="text-gray-500">/{plan.price.split('/')[1]}</span>
                                                                            </div>
                                                                            
                                                                            <ul className="space-y-3">
                                                                                {plan.features.map((feature, featureIndex) => (
                                                                                    <li key={featureIndex} className="flex items-start">
                                                                                        <CheckCircle className="w-4 h-4 mr-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                                                                                        <span className="text-sm text-gray-700">{feature}</span>
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                    </motion.div>
                                                                ))}
                                                            </div>
                                                        </RadioGroup>
                                                    </motion.div>

                                                    {/* Billing Information */}
                                                    <motion.div variants={itemAnimation} className="pt-6 border-t border-gray-100">
                                                        <div className="flex items-center gap-3 mb-6">
                                                            <div className="p-2 bg-purple-100 rounded-lg">
                                                                <Lock className="h-4 w-4 text-purple-600" />
                                                            </div>
                                                            <h3 className="text-lg font-semibold text-gray-900">Billing Information</h3>
                                                        </div>
                                                        
                                                        <div className="space-y-4">
                                                            <div className="flex items-center justify-between p-6 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-colors bg-gradient-to-r from-white to-purple-50/30">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="p-3 bg-purple-100 rounded-lg">
                                                                        <CreditCard className="h-5 w-5 text-purple-600" />
                                                                    </div>
                                                                    <div>
                                                                        <div className="font-semibold text-gray-900">•••• •••• •••• 4242</div>
                                                                        <div className="text-sm text-gray-600">Expires 12/2025 • Visa</div>
                                                                    </div>
                                                                </div>
                                                                <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                                                                    Update Card
                                                                </Button>
                                                            </div>
                                                            
                                                            <div className="p-6 bg-gradient-to-r from-emerald-50 to-emerald-100/50 rounded-xl border border-emerald-200">
                                                                <div className="flex items-start justify-between">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="p-2 bg-emerald-100 rounded-lg">
                                                                            <Clock className="h-4 w-4 text-emerald-600" />
                                                                        </div>
                                                                        <div>
                                                                            <div className="font-semibold text-emerald-900">Next Billing Cycle</div>
                                                                            <div className="text-sm text-emerald-700 mt-1">
                                                                                Your next payment of <span className="font-bold">$29.99</span> is due on <span className="font-bold">May 15, 2025</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-3 mt-4">
                                                                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                                                                        Change Plan
                                                                    </Button>
                                                                    <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50">
                                                                        <Trash2 className="h-3 w-3 mr-1" />
                                                                        Cancel Subscription
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>

                                                    {/* Billing History */}
                                                    <motion.div variants={itemAnimation} className="pt-6 border-t border-gray-100">
                                                        <div className="flex items-center gap-3 mb-6">
                                                            <div className="p-2 bg-indigo-100 rounded-lg">
                                                                <FileText className="h-4 w-4 text-indigo-600" />
                                                            </div>
                                                            <h3 className="text-lg font-semibold text-gray-900">Billing History</h3>
                                                        </div>
                                                        
                                                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                                            <table className="w-full">
                                                                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                                                    <tr>
                                                                        <th className="text-left py-4 px-6 font-semibold text-gray-700">Date</th>
                                                                        <th className="text-left py-4 px-6 font-semibold text-gray-700">Description</th>
                                                                        <th className="text-right py-4 px-6 font-semibold text-gray-700">Amount</th>
                                                                        <th className="text-right py-4 px-6 font-semibold text-gray-700">Receipt</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="divide-y divide-gray-100">
                                                                    {billingHistory.map((item, index) => (
                                                                        <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                                                            <td className="py-4 px-6 text-gray-900 font-medium">{item.date}</td>
                                                                            <td className="py-4 px-6 text-gray-700">{item.description}</td>
                                                                            <td className="text-right py-4 px-6 font-semibold text-gray-900">{item.amount}</td>
                                                                            <td className="text-right py-4 px-6">
                                                                                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                                                                                    <Download className="h-3 w-3 mr-1" />
                                                                                    Download
                                                                                </Button>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </motion.div>
                                                </motion.div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </TabsContent>

                                {/* Enhanced Advanced Settings */}
                                <TabsContent value="advanced">
                                    <motion.div variants={cardVariants}>
                                        <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-amber-50/30">
                                            <CardHeader className="border-b border-gray-100">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg">
                                                        <GaugeCircle className="h-5 w-5 text-amber-600" />
                                                    </div>
                                                    <div>
                                                        <CardTitle className="text-xl">Advanced Settings</CardTitle>
                                                        <CardDescription>Fine-tune the AI reconciliation engine and data processing</CardDescription>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-8 space-y-8">
                                                <motion.div variants={containerVariants}>
                                                    {/* Confidence Threshold */}
                                                    <motion.div variants={itemAnimation}>
                                                        <div className="flex items-center gap-3 mb-6">
                                                            <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg">
                                                                <Target className="h-4 w-4 text-blue-600" />
                                                            </div>
                                                            <h3 className="text-lg font-semibold text-gray-900">AI Confidence Threshold</h3>
                                                        </div>
                                                        
                                                        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                                                            <div className="flex justify-between items-center mb-4">
                                                                <div>
                                                                    <Label className="text-base font-semibold text-gray-900">
                                                                        Minimum confidence for auto-matching: {confidenceThreshold}%
                                                                    </Label>
                                                                    <p className="text-sm text-gray-600 mt-1">Controls how strict the AI matching algorithm should be</p>
                                                                </div>
                                                                <Badge className={`${confidenceInfo.bg} ${confidenceInfo.color} px-3 py-1 text-sm font-bold`}>
                                                                    {confidenceInfo.label}
                                                                </Badge>
                                                            </div>
                                                            
                                                            <Slider
                                                                value={[confidenceThreshold]}
                                                                max={100}
                                                                step={5}
                                                                onValueChange={(value) => setConfidenceThreshold(value[0])}
                                                                className="py-6"
                                                            />
                                                            
                                                            <div className="text-sm text-gray-600 bg-white/70 p-4 rounded-lg">
                                                                {confidenceThreshold < 50 ?
                                                                    'Low threshold enables more automatic matches but may include some incorrect ones. Best for high-volume processing where manual review is acceptable.' :
                                                                    confidenceThreshold < 80 ?
                                                                        'Medium threshold provides a good balance between automation and accuracy. Recommended for most use cases.' :
                                                                        'High threshold ensures maximum accuracy with very few false positives, but may require more manual review of transactions.'}
                                                            </div>
                                                        </div>
                                                    </motion.div>

                                                    {/* Matching Rules */}
                                                    <motion.div variants={itemAnimation} className="pt-6 border-t border-gray-100">
                                                        <div className="flex items-center gap-3 mb-6">
                                                            <div className="p-2 bg-emerald-100 rounded-lg">
                                                                <Zap className="h-4 w-4 text-emerald-600" />
                                                            </div>
                                                            <h3 className="text-lg font-semibold text-gray-900">Smart Matching Rules</h3>
                                                        </div>
                                                        
                                                        <div className="space-y-4">
                                                            {[
                                                                {
                                                                    title: 'Date Tolerance',
                                                                    description: 'Allow matching transactions within ±1 day of each other',
                                                                    defaultChecked: true,
                                                                    icon: Clock,
                                                                    color: 'blue'
                                                                },
                                                                {
                                                                    title: 'Amount Tolerance',
                                                                    description: 'Accept small amount differences (fees, rounding, etc.)',
                                                                    defaultChecked: true,
                                                                    icon: DollarSign,
                                                                    color: 'emerald'
                                                                },
                                                                {
                                                                    title: 'Fuzzy Description Matching',
                                                                    description: 'Use advanced NLP to match similar transaction descriptions',
                                                                    defaultChecked: true,
                                                                    icon: FileText,
                                                                    color: 'purple'
                                                                }
                                                            ].map((rule, index) => (
                                                                <motion.div
                                                                    key={rule.title}
                                                                    whileHover={{ x: 4 }}
                                                                    className="flex items-center justify-between p-4 rounded-xl bg-white border border-gray-100 hover:shadow-md transition-all duration-200"
                                                                >
                                                                    <div className="flex items-center gap-4">
                                                                        <div className={`p-2 bg-${rule.color}-100 rounded-lg`}>
                                                                            <rule.icon className={`h-4 w-4 text-${rule.color}-600`} />
                                                                        </div>
                                                                        <div>
                                                                            <div className="font-semibold text-gray-900">{rule.title}</div>
                                                                            <div className="text-sm text-gray-600">{rule.description}</div>
                                                                        </div>
                                                                    </div>
                                                                    <Switch defaultChecked={rule.defaultChecked} className={`data-[state=checked]:bg-${rule.color}-600`} />
                                                                </motion.div>
                                                            ))}
                                                        </div>
                                                    </motion.div>

                                                    {/* Data Management */}
                                                    <motion.div variants={itemAnimation} className="pt-6 border-t border-gray-100">
                                                        <div className="flex items-center gap-3 mb-6">
                                                            <div className="p-2 bg-indigo-100 rounded-lg">
                                                                <Database className="h-4 w-4 text-indigo-600" />
                                                            </div>
                                                            <h3 className="text-lg font-semibold text-gray-900">Data Management</h3>
                                                        </div>
                                                        
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            <div className="space-y-3">
                                                                <Label className="text-sm font-semibold text-gray-700">Default Export Format</Label>
                                                                <Select defaultValue="csv">
                                                                    <SelectTrigger className="bg-white border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200">
                                                                        <SelectValue placeholder="Select export format" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="csv">CSV (Comma Separated)</SelectItem>
                                                                        <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                                                                        <SelectItem value="pdf">PDF Report</SelectItem>
                                                                        <SelectItem value="json">JSON Data</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                                <p className="text-xs text-gray-500">Choose the default format for exporting reconciliation reports</p>
                                                            </div>
                                                            <div className="space-y-3">
                                                                <Label className="text-sm font-semibold text-gray-700">Data Retention Period</Label>
                                                                <Select defaultValue="12months">
                                                                    <SelectTrigger className="bg-white border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200">
                                                                        <SelectValue placeholder="Select retention period" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="3months">3 months</SelectItem>
                                                                        <SelectItem value="6months">6 months</SelectItem>
                                                                        <SelectItem value="12months">12 months (Recommended)</SelectItem>
                                                                        <SelectItem value="5years">5 years</SelectItem>
                                                                        <SelectItem value="indefinite">Indefinite</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                                <p className="text-xs text-gray-500">How long to retain transaction history and reconciliation data</p>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                </motion.div>

                                                <motion.div variants={itemAnimation} className="pt-6 border-t border-gray-100">
                                                    <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                                                        <Save className="mr-2 h-4 w-4" />
                                                        Save Advanced Settings
                                                    </Button>
                                                </motion.div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </TabsContent>
                            </motion.div>
                        </AnimatePresence>
                    </Tabs>
                </motion.div>
            </div>
        </div>
    );
}
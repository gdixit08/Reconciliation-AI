import { useState } from "react";
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
import {
    Bell,
    CreditCard,
    GaugeCircle,
    ImagePlus,
    Palette,
    Sun,
    Moon,
    Monitor
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

const plans = [
    {
        id: "free",
        name: "Free Plan",
        description: "Basic reconciliation features",
        price: "$0/month",
        features: ["Manual reconciliation", "Limited to 100 transactions", "CSV exports"]
    },
    {
        id: "pro",
        name: "Pro Plan",
        description: "Advanced features for professionals",
        price: "$29.99/month",
        features: ["Automated matching", "Unlimited transactions", "PDF reports", "Email support"]
    },
    {
        id: "business",
        name: "Business Plan",
        description: "Enterprise-grade solutions",
        price: "$99.99/month",
        features: ["All Pro features", "Team collaboration", "API access", "Custom rules", "24/7 support"]
    }
];

export default function SettingsPage() {
    const [theme, setTheme] = useState("system");
    const [subscriptionPlan, setSubscriptionPlan] = useState("pro");
    const [confidenceThreshold, setConfidenceThreshold] = useState(75);
    const [avatarUrl, setAvatarUrl] = useState("/api/placeholder/150/150");
    const [userInitials, setUserInitials] = useState("JS");

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
            // In a real app, you would upload this file to a server
            // For demo purposes, we're just showing the placeholder image
            setAvatarUrl("/api/placeholder/150/150");
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">Settings</h1>

            <Tabs defaultValue="theme">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
                    <TabsTrigger value="theme">
                        <Palette size={16} className="mr-2 hidden md:inline" />
                        Theme
                    </TabsTrigger>
                    <TabsTrigger value="notifications">
                        <Bell size={16} className="mr-2 hidden md:inline" />
                        Notifications
                    </TabsTrigger>
                    <TabsTrigger value="subscription">
                        <CreditCard size={16} className="mr-2 hidden md:inline" />
                        Subscription
                    </TabsTrigger>
                    <TabsTrigger value="advanced">
                        <GaugeCircle size={16} className="mr-2 hidden md:inline" />
                        Advanced
                    </TabsTrigger>
                </TabsList>

                {/* Theme Settings */}
                <TabsContent value="theme">
                    <Card>
                        <CardHeader>
                            <CardTitle>Theme Settings</CardTitle>
                            <CardDescription>Customize your application appearance</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Color Theme</h3>
                                <RadioGroup
                                    defaultValue={theme}
                                    onValueChange={setTheme}
                                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="light" id="light" />
                                        <Label htmlFor="light" className="flex items-center">
                                            <Sun size={18} className="mr-2" />
                                            Light Mode
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="dark" id="dark" />
                                        <Label htmlFor="dark" className="flex items-center">
                                            <Moon size={18} className="mr-2" />
                                            Dark Mode
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="system" id="system" />
                                        <Label htmlFor="system" className="flex items-center">
                                            <Monitor size={18} className="mr-2" />
                                            System Default
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-4 pt-6 border-t">
                                <h3 className="text-lg font-medium">User Avatar</h3>
                                <div className="flex items-start space-x-4">
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage src={avatarUrl} alt="User avatar" />
                                        <AvatarFallback>{userInitials}</AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-2">
                                        <div className="text-sm text-gray-500">
                                            Upload a new avatar image. JPG, PNG or GIF, max 2MB.
                                        </div>
                                        <div className="flex items-center">
                                            <Label
                                                htmlFor="avatar-upload"
                                                className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
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
                                            <Button variant="outline" className="ml-2" onClick={() => setAvatarUrl("/api/placeholder/150/150")}>
                                                Reset
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-6 border-t">
                                <h3 className="text-lg font-medium">Font Size</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Select defaultValue="medium">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select font size" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="small">Small</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="large">Large</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <div className="text-sm text-gray-500">
                                            Controls the base font size throughout the application
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-6 border-t">
                                <h3 className="text-lg font-medium">Table Density</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Select defaultValue="comfortable">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select table density" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="compact">Compact</SelectItem>
                                                <SelectItem value="comfortable">Comfortable</SelectItem>
                                                <SelectItem value="spacious">Spacious</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <div className="text-sm text-gray-500">
                                            Controls spacing in reconciliation tables
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button>Save Theme Settings</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notification Settings */}
                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>Manage how you receive alerts and updates</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Email Notifications</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <div className="font-medium">Email Alerts</div>
                                            <div className="text-sm text-gray-500">Receive all notifications via email</div>
                                        </div>
                                        <Switch
                                            checked={notifications.emailAlerts}
                                            onCheckedChange={() => handleNotificationChange('emailAlerts')}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <div className="font-medium">Weekly Summary Reports</div>
                                            <div className="text-sm text-gray-500">Get a weekly summary of reconciliation activities</div>
                                        </div>
                                        <Switch
                                            checked={notifications.weeklyReports}
                                            onCheckedChange={() => handleNotificationChange('weeklyReports')}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-6 border-t">
                                <h3 className="text-lg font-medium">Reconciliation Alerts</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <div className="font-medium">Reconciliation Complete</div>
                                            <div className="text-sm text-gray-500">When automated reconciliation finishes</div>
                                        </div>
                                        <Switch
                                            checked={notifications.reconciliationComplete}
                                            onCheckedChange={() => handleNotificationChange('reconciliationComplete')}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <div className="font-medium">Unmatched Transactions</div>
                                            <div className="text-sm text-gray-500">When transactions require manual review</div>
                                        </div>
                                        <Switch
                                            checked={notifications.unmatched}
                                            onCheckedChange={() => handleNotificationChange('unmatched')}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-6 border-t">
                                <h3 className="text-lg font-medium">System Updates</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <div className="font-medium">New Features</div>
                                            <div className="text-sm text-gray-500">Get notified about new app features</div>
                                        </div>
                                        <Switch
                                            checked={notifications.newFeatures}
                                            onCheckedChange={() => handleNotificationChange('newFeatures')}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <div className="font-medium">System Updates</div>
                                            <div className="text-sm text-gray-500">Maintenance and update notifications</div>
                                        </div>
                                        <Switch
                                            checked={notifications.systemUpdates}
                                            onCheckedChange={() => handleNotificationChange('systemUpdates')}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button>Save Notification Settings</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Subscription Settings */}
                <TabsContent value="subscription">
                    <Card>
                        <CardHeader>
                            <CardTitle>Subscription Plan</CardTitle>
                            <CardDescription>Manage your subscription and billing</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Current Plan</h3>

                                {/* Wrap the plan selection in a RadioGroup */}
                                <RadioGroup
                                    value={subscriptionPlan}
                                    onValueChange={setSubscriptionPlan}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {plans.map((plan) => (
                                            <div
                                                key={plan.id}
                                                className={`border rounded-lg p-4 ${subscriptionPlan === plan.id
                                                        ? 'border-primary bg-primary/5 ring-2 ring-primary'
                                                        : 'border-gray-200'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="font-medium">{plan.name}</div>
                                                    <RadioGroupItem
                                                        value={plan.id}
                                                        id={plan.id}
                                                    />
                                                </div>
                                                <div className="text-2xl font-bold mb-2">{plan.price}</div>
                                                <div className="text-sm text-gray-500 mb-4">{plan.description}</div>
                                                <ul className="text-sm space-y-2">
                                                    {plan.features.map((feature, index) => (
                                                        <li key={index} className="flex items-center">
                                                            <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                            </svg>
                                                            {feature}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-4 pt-6 border-t">
                                <h3 className="text-lg font-medium">Billing Information</h3>
                                <div className="flex items-center justify-between p-4 border rounded-md">
                                    <div className="space-y-0.5">
                                        <div className="font-medium">Credit Card ending in 4242</div>
                                        <div className="text-sm text-gray-500">Expires 12/2025</div>
                                    </div>
                                    <Button variant="outline" size="sm">Update</Button>
                                </div>
                                <div className="p-4 border rounded-md">
                                    <div className="font-medium mb-2">Billing Cycle</div>
                                    <div className="text-sm mb-4">
                                        Next payment of $29.99 on May 15, 2025
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">Change Plan</Button>
                                        <Button variant="destructive" size="sm">Cancel Subscription</Button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-6 border-t">
                                <h3 className="text-lg font-medium">Billing History</h3>
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left pb-2">Date</th>
                                            <th className="text-left pb-2">Description</th>
                                            <th className="text-right pb-2">Amount</th>
                                            <th className="text-right pb-2">Receipt</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b">
                                            <td className="py-2">Apr 15, 2025</td>
                                            <td className="py-2">Pro Plan - Monthly</td>
                                            <td className="text-right py-2">$29.99</td>
                                            <td className="text-right py-2">
                                                <Button variant="link" size="sm" className="h-auto p-0">Download</Button>
                                            </td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="py-2">Mar 15, 2025</td>
                                            <td className="py-2">Pro Plan - Monthly</td>
                                            <td className="text-right py-2">$29.99</td>
                                            <td className="text-right py-2">
                                                <Button variant="link" size="sm" className="h-auto p-0">Download</Button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2">Feb 15, 2025</td>
                                            <td className="py-2">Pro Plan - Monthly</td>
                                            <td className="text-right py-2">$29.99</td>
                                            <td className="text-right py-2">
                                                <Button variant="link" size="sm" className="h-auto p-0">Download</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Advanced Settings */}
                <TabsContent value="advanced">
                    <Card>
                        <CardHeader>
                            <CardTitle>Advanced Settings</CardTitle>
                            <CardDescription>Configure technical aspects of the reconciliation engine</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Confidence Threshold</h3>
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <Label>Minimum confidence for auto-matching: {confidenceThreshold}%</Label>
                                            <span className="text-sm text-gray-500">
                                                {confidenceThreshold < 50 ? 'Low' : confidenceThreshold < 80 ? 'Medium' : 'High'}
                                            </span>
                                        </div>
                                        <Slider
                                            defaultValue={[confidenceThreshold]}
                                            max={100}
                                            step={5}
                                            onValueChange={(value) => setConfidenceThreshold(value[0])}
                                            className="py-4"
                                        />
                                        <div className="text-sm text-gray-500">
                                            {confidenceThreshold < 50 ?
                                                'Low threshold may result in incorrect matches but fewer manual reviews' :
                                                confidenceThreshold < 80 ?
                                                    'Medium threshold balances automatic matching with accuracy' :
                                                    'High threshold ensures high quality matches but may require more manual review'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-6 border-t">
                                <h3 className="text-lg font-medium">Matching Rules</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <div className="font-medium">Date Tolerance</div>
                                            <div className="text-sm text-gray-500">Allow matching within +/- 1 day</div>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <div className="font-medium">Amount Tolerance</div>
                                            <div className="text-sm text-gray-500">Allow matching with small amount differences</div>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <div className="font-medium">Description Matching</div>
                                            <div className="text-sm text-gray-500">Use fuzzy matching on transaction descriptions</div>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-6 border-t">
                                <h3 className="text-lg font-medium">Data Management</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="font-medium">Export Format</div>
                                        <div className="text-sm text-gray-500 mb-2">Choose default export format for reports</div>
                                        <Select defaultValue="csv">
                                            <SelectTrigger className="w-full md:w-60">
                                                <SelectValue placeholder="Select export format" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="csv">CSV</SelectItem>
                                                <SelectItem value="excel">Excel</SelectItem>
                                                <SelectItem value="pdf">PDF</SelectItem>
                                                <SelectItem value="json">JSON</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <div className="font-medium">Data Retention</div>
                                        <div className="text-sm text-gray-500 mb-2">How long to keep transaction history</div>
                                        <Select defaultValue="12months">
                                            <SelectTrigger className="w-full md:w-60">
                                                <SelectValue placeholder="Select retention period" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="3months">3 months</SelectItem>
                                                <SelectItem value="6months">6 months</SelectItem>
                                                <SelectItem value="12months">12 months</SelectItem>
                                                <SelectItem value="5years">5 years</SelectItem>
                                                <SelectItem value="indefinite">Indefinite</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button>Save Advanced Settings</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
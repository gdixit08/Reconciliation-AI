import { SignupForm } from '@/components/UIComponents/SignupForm';
import { GitCompare} from 'lucide-react';
export default function SignupPage() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <div className="hidden lg:flex lg:w-1/2 bg-blue-600 p-12 flex-col justify-between">
                <div>
                    <div className="flex items-center">
                        <div className="h-10 w-10 bg-white rounded-md flex items-center justify-center">
                            <GitCompare className="h-6 w-6 text-blue-600" />
                        </div>
                        <span className="ml-3 text-2xl font-bold text-white"><a href="/">ReconcileAI</a></span>
                    </div>

                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-white">Streamline your reconciliation process</h2>
                        <p className="mt-4 text-xl text-blue-100">
                            Join thousands of companies saving time and reducing errors with our intelligent reconciliation platform.
                        </p>
                    </div>

                    <div className="mt-12">
                        <div className="flex items-center mb-8">
                            <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-white font-semibold">Reduce manual effort</h3>
                                <p className="text-blue-200">Automatically match 95% of your transactions</p>
                            </div>
                        </div>

                        <div className="flex items-center mb-8">
                            <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-white font-semibold">Save time</h3>
                                <p className="text-blue-200">Complete reconciliation up to 80% faster</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-white font-semibold">Improve accuracy</h3>
                                <p className="text-blue-200">Eliminate human error in the matching process</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-blue-200 text-sm">
                    <p>© 2025 ReconcileAI. All rights reserved.</p>
                </div>
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
                <SignupForm />
            </div>
        </div>
    );
}


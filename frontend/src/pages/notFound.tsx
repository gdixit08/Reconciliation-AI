import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, FileSearch, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg-red-100 p-3 rounded-full">
            <FileSearch size={32} className="text-red-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Page Not Found</CardTitle>
          <CardDescription className="text-gray-500">
            The page you're looking for doesn't exist or has been moved.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="text-center">
          <div className="space-y-4">
            <p className="text-gray-600">
              You might want to check if you're looking for one of these:
            </p>
            <ul className="space-y-2 text-sm text-gray-500 list-disc list-inside">
              <li>Upload reconciliation files</li>
              <li>Review matched transactions</li>
              <li>Generate reconciliation reports</li>
            </ul>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto flex items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} />
            Go Back
          </Button>
          <Button 
            className="w-full sm:w-auto flex items-center gap-2"
            onClick={() => navigate("/")}
          >
            <Home size={16} />
            Return to Dashboard
          </Button>
        </CardFooter>
      </Card>
      
      <div className="mt-8 text-sm text-gray-500 text-center">
        <p>Need help with reconciliation? <a href="/help" className="text-blue-500 hover:underline">Visit our help center</a></p>
      </div>
    </div>
  );
}
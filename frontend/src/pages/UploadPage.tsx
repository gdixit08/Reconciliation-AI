import { useState } from 'react';
import { 
  Card,
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileIcon, UploadIcon, XIcon } from 'lucide-react';

interface FileWithPreview extends File {
  preview?: string;
}

function UploadPage() {
  const [bankFile, setBankFile] = useState<FileWithPreview | null>(null);
  const [ledgerFile, setLedgerFile] = useState<FileWithPreview | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBankFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        setError('Please upload a CSV file for bank statement');
        return;
      }
      setError(null);
      setBankFile(file);
    }
  };

  const handleLedgerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        setError('Please upload a CSV file for ledger');
        return;
      }
      setError(null);
      setLedgerFile(file);
    }
  };

  const handleRemoveBankFile = () => {
    setBankFile(null);
  };

  const handleRemoveLedgerFile = () => {
    setLedgerFile(null);
  };

  const handleUpload = async () => {
    if (!bankFile || !ledgerFile) {
      setError('Please upload both bank statement and ledger files');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Files uploaded successfully!');
      console.log('Bank File:', bankFile);
      console.log('Ledger File:', ledgerFile);
      alert('Files uploaded successfully! Redirecting to reconciliation view...');
      
    } catch (err) {
      setError('Error uploading files. Please try again.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const FileUploadBox = ({ 
    title, 
    description, 
    file, 
    onChange, 
    onRemove,
    inputId
  }: { 
    title: string;
    description: string;
    file: File | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: () => void;
    inputId: string;
  }) => (
    <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center transition-colors hover:border-gray-400">
      {!file ? (
        <>
          <div className="mb-4 flex justify-center">
            <UploadIcon className="h-10 w-10 text-gray-400" />
          </div>
          <label 
            htmlFor={inputId}
            className="block font-medium text-gray-900 mb-1 cursor-pointer"
          >
            {title}
          </label>
          <p className="text-sm text-gray-500 mb-4">{description}</p>
          <Button 
            variant="outline"
            onClick={() => document.getElementById(inputId)?.click()}
          >
            Select CSV File
          </Button>
          <input
            id={inputId}
            type="file"
            accept=".csv"
            onChange={onChange}
            className="hidden"
          />
        </>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FileIcon className="h-8 w-8 text-blue-500 mr-3" />
            <div className="text-left">
              <p className="font-medium text-gray-900">{file.name}</p>
              <p className="text-sm text-gray-500">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-gray-500 hover:text-red-500"
          >
            <XIcon className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Upload Files for Reconciliation</CardTitle>
            <CardDescription>
              Upload your bank statement and ledger CSV files to begin the reconciliation process
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <FileUploadBox 
                title="Bank Statement CSV"
                description="Upload your bank statement export file"
                file={bankFile}
                onChange={handleBankFileChange}
                onRemove={handleRemoveBankFile}
                inputId="bank-file"
              />
              
              <FileUploadBox 
                title="Ledger CSV"
                description="Upload your accounting ledger export file"
                file={ledgerFile}
                onChange={handleLedgerFileChange}
                onRemove={handleRemoveLedgerFile}
                inputId="ledger-file"
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-2">File Requirements:</h3>
              <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
                <li>Files must be in CSV format</li>
                <li>Bank statement should include date, description, and amount columns</li>
                <li>Ledger should include date, description, amount, and account columns</li>
                <li>Maximum file size: 10MB</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleUpload} 
              disabled={!bankFile || !ledgerFile || uploading}
              className="w-full"
            >
              {uploading ? "Uploading..." : "Start Reconciliation"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default UploadPage;
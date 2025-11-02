import { AlertCircle } from "lucide-react";
function ErrorMessage({ message }: any) {
  return (
    <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex items-start gap-3">
      <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={24} />
      <div>
        <h3 className="text-red-800 font-semibold mb-1">Error</h3>
        <p className="text-red-700">{message}</p>
      </div>
    </div>
  );
}
export default ErrorMessage;

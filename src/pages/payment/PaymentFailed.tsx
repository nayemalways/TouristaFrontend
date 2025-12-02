import { useSearchParams } from "react-router";
import { XCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentFailed = () => {
  const [searchParams] = useSearchParams();

  const transactionId = searchParams.get("transection_id");
  const amount = searchParams.get("amount");
  const status = searchParams.get("status");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-xl w-full border text-center">

        {/* Failed Icon */}
        <XCircle className="h-20 w-20 text-red-500 mx-auto mb-5" />

        {/* Title */}
        <h1 className="text-4xl font-bold text-red-600 mb-2">
          Payment Failed!
        </h1>

        <p className="text-gray-600 mb-6">
          Unfortunately, your payment could not be processed.  
          Please try again or contact support.
        </p>

        {/* Payment Details */}
        <div className="text-left bg-red-50 p-5 rounded-xl border border-red-200 mb-6">
          <p className="text-gray-800">
            <span className="font-semibold">Transaction ID:</span> {transactionId}
          </p>
          <p className="text-gray-800">
            <span className="font-semibold">Attempted Amount:</span> {amount} BDT
          </p>
          <p className="text-gray-800">
            <span className="font-semibold">Status:</span> {status}
          </p>
        </div>

        {/* Retry Button */}
        <Button 
          className="w-full flex items-center gap-2 justify-center py-5 text-lg bg-red-600 hover:bg-red-700"
          onClick={() => window.location.href = "/"}
        >
          <RefreshCcw className="h-6 w-6" />
          Try Again
        </Button>

      </div>
    </div>
  );
};

export default PaymentFailed;

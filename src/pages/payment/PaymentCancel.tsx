import { useSearchParams } from "react-router";
import { Ban, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentCancel = () => {
  const [searchParams] = useSearchParams();

  const transactionId = searchParams.get("transection_id");
  const amount = searchParams.get("amount");
  const status = searchParams.get("status");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-xl w-full border text-center">

        {/* Cancel Icon */}
        <Ban className="h-20 w-20 text-orange-500 mx-auto mb-5" />

        {/* Title */}
        <h1 className="text-4xl font-bold text-orange-600 mb-2">
          Payment Cancelled
        </h1>

        <p className="text-gray-600 mb-6">
          You cancelled the payment process before completion.  
          If this was unintentional, you can try again anytime.
        </p>

        {/* Payment Details */}
        <div className="text-left bg-orange-50 p-5 rounded-xl border border-orange-200 mb-6">
          <p className="text-gray-800">
            <span className="font-semibold">Transaction ID:</span> {transactionId}
          </p>
          <p className="text-gray-800">
            <span className="font-semibold">Amount:</span> {amount} BDT
          </p>
          <p className="text-gray-800">
            <span className="font-semibold">Status:</span> {status}
          </p>
        </div>

        {/* Retry Button */}
        <Button 
          className="w-full flex items-center gap-2 justify-center py-5 text-lg bg-orange-600 hover:bg-orange-700"
          onClick={() => window.location.href = "/"}
        >
          <RotateCcw className="h-6 w-6" />
          Try Again
        </Button>

      </div>
    </div>
  );
};

export default PaymentCancel;

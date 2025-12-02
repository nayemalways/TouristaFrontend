import { useSearchParams } from "react-router";
import { useGetInvoiceQuery } from "@/redux/features/payment/payment.api";
import { CheckCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [showInvoice, setShowInvoice] = useState(false);

  const transactionId = searchParams.get("transection_id");
  const amount = searchParams.get("amount");
  const status = searchParams.get("status");

  const { data, isLoading } = useGetInvoiceQuery(transactionId);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-xl w-full border text-center">
        
        {/* Success Icon */}
        <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-5" />

        {/* Title */}
        <h1 className="text-4xl font-bold text-green-600 mb-2">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your payment. Your transaction has been completed.
        </p>

        {/* Payment Details */}
        <div className="text-left bg-gray-100 p-5 rounded-xl mb-6">
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

        {/* Invoice Button */}
        <Button 
          onClick={() => setShowInvoice(!showInvoice)}
          className="w-full flex items-center gap-2 justify-center py-5 text-lg cursor-pointer"
        >
          <FileText className="h-6 w-6" />
          {showInvoice ? "Hide Invoice" : "View Invoice"}
        </Button>

        {/* Invoice Viewer */}
        {showInvoice && (
          <div className="mt-6">
            {isLoading ? (
              <p className="text-gray-500">Loading invoice...</p>
            ) : (
              <iframe
                title="Invoice"
                src={data?.data}
                className="rounded-xl border"
                width="100%"
                height="500"
              ></iframe>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;

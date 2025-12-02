import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-lg text-center border">
        <div className="flex justify-center mb-6">
          <ShieldAlert className="h-16 w-16 text-red-500" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Access Denied
        </h1>

        <p className="text-gray-600 mb-8">
          You don’t have permission to view this page.  
          Please contact the administrator if you believe this is a mistake.
        </p>

        <Link to="/">
          <Button className="px-6 py-3 text-lg cursor-pointer ">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;

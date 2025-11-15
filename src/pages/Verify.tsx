/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Spinner } from "@/components/ui/spinner";
import {
  useOtpMutation,
  useVerifyOTPMutation,
} from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dot } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

// OTP Schema
const otpSchema = z.object({
  otp: z.string().length(6, "minumum 6 digit!"),
});

// Main component
const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [email] = useState(location.state);
  const [confirm, setConfirm] = useState(false);
  const [timer, setTimer] = useState(120);

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  //  Redux hooks
  const [sendOTP, { isLoading }] = useOtpMutation();
  const [verifyOTP, { isLoading: verifyLoading }] = useVerifyOTPMutation();

  // Foirm submit handler
  const onSubmit = async (values: FieldValues) => {
    try {
      const result = await verifyOTP({ email, otp: values.otp }).unwrap();
      toast.success(result.message);
      navigate("/login");
      setConfirm(true);
    } catch (error: any) {
      toast.error(error.data.message);
      console.log(error);
    }
  };

  // OTP Send Handler
  const otpSendHandler = async () => {
    try {

      await sendOTP({ email }).unwrap();
      toast.success("6 digit OTP sent to your email!");
      setTimer(120);
      setConfirm(true);

    } catch (error) {
      toast.error("OTP sending failed!!");
      console.log(error);
    }
  };

  // Not email - got to home page
    useEffect(() => {
      if (!email) {
        navigate('/');
      }
    }, [email, navigate]);

  // Set Timer
  useEffect(() => {
    if (!email || !confirm) return;
    
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, email, confirm]);

  
  return (
    <div className="h-screen w-full flex justify-center items-center">
      {confirm ? (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Verify your account</CardTitle>
            <CardDescription>
              Enter your 6 digit otp below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <Dot />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        Please enter the one-time password sent to your email.{" "}
                        <br />
                        {timer === 0 ? (
                          <div>
                            {
                              isLoading ? <Spinner/> : <Button onClick={otpSendHandler} className="-ml-4 cursor-pointer" variant="link" >  Resend OTP </Button>
                            } 
                          </div>
                        ) : (
                          <span className="text-slate-300">Time left: {timer}</span>
                        )}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {verifyLoading ? (
                  <Spinner />
                ) : (
                  <Button className="cursor-pointer w-full block" type="submit">
                    Submit
                  </Button>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Verify your account</CardTitle>
            <CardDescription>
              We will send you an OTP at <br />
              <b>{email}</b>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Spinner />
            ) : (
              <Button
                onClick={otpSendHandler}
                className="cursor-pointer w-full block"
                type="submit"
              >
                Send OTP
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Verify;

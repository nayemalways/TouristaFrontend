/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription } from "@/components/ui/field";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { baseURL } from "@/config/config";
import { SignupSchema } from "@/zodSchema/auth.schema";



// Main Components
export function SignupForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  // React Hook Form initialization
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Redux Dispatch
  const [register, { isLoading }] = useRegisterMutation();

  // On Submit Handler
  const onSubmit = async (values: z.infer<typeof SignupSchema>) => {
    const userInfo = {
        name: values.name,
        email: values.email,
        password: values.password
      }

    try {
      const result = await register(userInfo).unwrap();
      toast.success(result?.message);
       navigate("/verify", { state: result?.data?.email });
    } catch (error: any) {
      console.log( error );
      toast.error(error?.data?.message || "Registration failed");
    }
  };

   // Handle Google Register
    const handleGoogleRegister = () => {
      window.location.href = `${baseURL}/auth/google`;
    }

  return (
    <>
      <Form {...form}>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your information below to create your account
          </p>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...field}
                      placeholder="********"
                      className="pr-10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      {...field}
                      placeholder="********"
                      className="pr-10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button  */}
          {
            isLoading ? <Spinner/> : <Button className="w-full cursor-pointer">Submit</Button>
          }
          

          {/* Continue with Google  */}
          <Field>
            <Button onClick={handleGoogleRegister} className="cursor-pointer" variant="outline" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Login with Google
            </Button>
            <FieldDescription className="text-center">
              Don&apos;t have an account?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Login
              </Link>
            </FieldDescription>
          </Field>
        </form>
      </Form>
    </>
  );
}

import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchema } from "../../schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/store/slices/userApi";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "@/store/slices/auth";
import type { RootState } from "@/store";
import { useEffect } from "react";

const Login = () => {
  const [loginMutation, { isLoading, isError }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const res = await loginMutation(data).unwrap();
      dispatch(setUserInfo(res));
      form.reset();
      toast.success("Login successfully");
      navigate("/");
    } catch (error) {
      console.log("error", error);
      toast.error("Fail to Login");
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  console.log(isError);

  return (
    <section>
      <div className=" bg-gray-50 flex flex-col justify-center pt-12 pb-2 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src="https://www.svgrepo.com/show/301692/login.svg"
            alt="Workflow"
          />{" "}
          <h2 className="mt-2 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Login to your account
          </h2>
          <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
            Or
            <Link
              to={"/register"}
              className="ml-2 font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              create a new account
            </Link>
          </p>
        </div>

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@fash.com"
                          {...field}
                        />
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
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full cursor-pointer mb-4"
                >
                  {isLoading ? "Submitting..." : "Login"}
                </Button>
              </form>
            </Form>
            <Link
              to={"/forget-password"}
              className="text-sm font-medium text-blue-500 underline"
            >
              Forget Password ?
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

import { useNavigate, useParams } from "react-router";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, type ResetPasswordSchema } from "@/schema/auth";
import { toast } from "sonner";
import {
  useLogoutMutation,
  useResetPasswordMutation,
} from "@/store/slices/userApi";
import { useDispatch } from "react-redux";
import { clearUserInfo } from "@/store/slices/auth";

const ResetPassword = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [resetPasswordMutation, { isLoading }] = useResetPasswordMutation();
  const [logoutMutation] = useLogoutMutation();

  const onSubmit = async (data: ResetPasswordSchema) => {
    try {
      const res = await resetPasswordMutation({
        newPassword: data.newPassword,
        token: params.id!,
      }).unwrap();
      await logoutMutation({});
      dispatch(clearUserInfo());
      form.reset();
      toast.success(res.message);
      navigate("/login");
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "data" in error) {
        const err = error as { data: { message: string } };
        toast.error(err.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Card className="max-w-lg mx-auto mt-10">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comfirmed Password</FormLabel>
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
                className="w-full cursor-pointer"
              >
                Reset Password
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResetPassword;

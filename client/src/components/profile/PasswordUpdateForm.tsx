import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { passwordUpdateSchema, type PasswordUpdateSchema } from "@/schema/user";
import { toast } from "sonner";
import { usePasswordUpdateMutation } from "@/store/slices/userApi";

const NameUpdateForm = () => {
  const [passwordUpdateMutation, { isLoading }] = usePasswordUpdateMutation();

  const form = useForm<PasswordUpdateSchema>({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const watchNewPassword = form.watch("newPassword");
  const confirmNewPassword = form.watch("confirmPassword");

  const onSubmit = async (data: PasswordUpdateSchema) => {
    try {
      const res = await passwordUpdateMutation({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }).unwrap();
      form.reset();
      toast.success(res.message);
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
    <div className="-mt-2 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*********" {...field} />
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
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={watchNewPassword !== confirmNewPassword || isLoading}
              className="w-full cursor-pointer mt-4"
            >
              Update Password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NameUpdateForm;

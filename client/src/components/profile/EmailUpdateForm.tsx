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
import { emailUpdateSchema, type EmailUpdateSchema } from "@/schema/user";
import { useEmailUpdateMutation } from "@/store/slices/userApi";
import { toast } from "sonner";
import { useEffect } from "react";

interface EmailUpdateFormProps {
  email: string;
}
const EmailUpdateForm = ({ email }: EmailUpdateFormProps) => {
  const [emailUpdateMutation, { isLoading }] = useEmailUpdateMutation();

  const form = useForm<EmailUpdateSchema>({
    resolver: zodResolver(emailUpdateSchema),
    defaultValues: {
      email,
    },
  });
  const watchEmail = form.watch("email");

  const onSubmit = async (data: EmailUpdateSchema) => {
    try {
      const res = await emailUpdateMutation(data).unwrap();
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

  useEffect(() => {
    form.reset({ email });
  }, [email]);

  return (
    <div className="-mt-2 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
            <Button
              type="submit"
              disabled={watchEmail === email || isLoading}
              className="w-full cursor-pointer mt-4"
            >
              Update Email
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EmailUpdateForm;

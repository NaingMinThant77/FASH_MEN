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
import { nameUpdateSchema, type NameUpdateSchema } from "@/schema/user";
import { toast } from "sonner";
import { useEffect } from "react";
import { useNameUpdateMutation } from "@/store/slices/userApi";

interface NameUpdateFormProps {
  name: string;
}
const NameUpdateForm = ({ name }: NameUpdateFormProps) => {
  const [nameUpdateMutation, { isLoading }] = useNameUpdateMutation();

  const form = useForm<NameUpdateSchema>({
    resolver: zodResolver(nameUpdateSchema),
    defaultValues: {
      name,
    },
  });
  const watchName = form.watch("name");

  const onSubmit = async (data: NameUpdateSchema) => {
    try {
      const res = await nameUpdateMutation(data).unwrap();
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
    form.reset({ name });
  }, [name]);

  return (
    <div className="-mt-2 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={watchName === name || isLoading}
              className="w-full cursor-pointer mt-4"
            >
              Update Name
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NameUpdateForm;

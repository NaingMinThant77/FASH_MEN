import { Button } from "../ui/button";
import { useForgetPasswordMutation } from "@/store/slices/userApi";
import { toast } from "sonner";

interface ResetPasswordProps {
  email: string;
}
const ResetPasswordForm = ({ email }: ResetPasswordProps) => {
  const [forgetPasswordMutation, { isLoading }] = useForgetPasswordMutation();

  const changePasswordHandler = async () => {
    try {
      const res = await forgetPasswordMutation({
        email,
      }).unwrap();
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
    <Button disabled={isLoading} onClick={changePasswordHandler}>
      Reset Password
    </Button>
  );
};

export default ResetPasswordForm;

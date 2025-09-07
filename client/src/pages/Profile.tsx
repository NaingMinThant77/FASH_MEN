import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  useCurrentUserQuery,
  useUploadAvatarMutation,
} from "@/store/slices/userApi";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import EmailUpdateForm from "@/components/profile/EmailUpdateForm";
import Loader from "@/components/Loader";

const Profile = () => {
  const {
    data: userInfo,
    refetch,
    isLoading: gettingUserInfo,
  } = useCurrentUserQuery();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [uploadAvatarMutation, { isLoading }] = useUploadAvatarMutation();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const imageOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result as string);
      }
    };

    reader.readAsDataURL(e.target.files![0]);
  };

  const avatarUploadHandler = async () => {
    if (!avatar) {
      toast.warning("Please select your avatar first.");
      return;
    }
    try {
      const result = await uploadAvatarMutation({ image_url: avatar });
      setAvatar(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      refetch();
      toast.success(result.data.message);
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
    <>
      {gettingUserInfo ? (
        <Loader />
      ) : (
        <section className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-4">
          <Card className="mt-6 shadow-md rounded-2xl">
            <CardHeader className="text-center md:text-left">
              <CardTitle className="text-2xl font-semibold">
                Account Settings
              </CardTitle>
              <CardDescription className="text-gray-500">
                Upload your avatar and edit your personal information
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* User Info */}
              <div className="text-center md:text-left space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <p className="font-bold text-lg text-blue-600">
                    {userInfo?.name}
                  </p>
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                    {userInfo?.role}
                  </span>
                </div>
                <p className="text-gray-600">{userInfo?.email}</p>
              </div>

              {/* Avatar + Upload */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Avatar className="w-28 h-28 ring-2 ring-gray-200 shadow-sm">
                  <AvatarImage
                    src={avatar ?? userInfo?.avatar?.[0].url ?? ""}
                  />
                  {!userInfo?.avatar?.[0].url && (
                    <AvatarFallback className="text-lg font-bold bg-gray-100">
                      {userInfo?.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>

                <div className="flex md:flex-col items-center  gap-2">
                  <div>
                    <Input
                      type="file"
                      accept="image/*"
                      className="cursor-pointer"
                      ref={inputRef}
                      onChange={imageOnChangeHandler}
                    />
                    <p className="ml-3 text-xs text-gray-600">
                      Please upload png image
                    </p>
                  </div>
                  <Button disabled={isLoading} onClick={avatarUploadHandler}>
                    Upload
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Address</CardTitle>
              <CardDescription>
                You can view or edit your email address here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EmailUpdateForm email={userInfo?.email ?? ""} />
            </CardContent>
          </Card>
        </section>
      )}
    </>
  );
};

export default Profile;

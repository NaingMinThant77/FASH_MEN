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

const Profile = () => {
  const { data: userInfo, refetch } = useCurrentUserQuery();
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
      toast.error(error?.message);
    }
  };

  return (
    <section className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
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
          {/* Avatar + Upload */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="w-28 h-28 ring-2 ring-gray-200 shadow-sm">
              <AvatarImage src={avatar ?? userInfo?.avatar?.[0].url ?? ""} />
              {!userInfo?.avatar?.[0].url && (
                <AvatarFallback className="text-lg font-bold bg-gray-100">
                  {userInfo?.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>

            <div className="flex md:flex-col items-center  gap-2">
              <Input
                type="file"
                accept="image/*"
                className="cursor-pointer"
                ref={inputRef}
                onChange={imageOnChangeHandler}
              />
              <Button disabled={isLoading} onClick={avatarUploadHandler}>
                Upload
              </Button>
            </div>
          </div>

          {/* User Info */}
          <div className="text-center md:text-right space-y-1">
            <p className="font-bold text-lg">{userInfo?.name}</p>
            <p className="text-gray-600">{userInfo?.email}</p>
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
              {userInfo?.role}
            </span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Profile;

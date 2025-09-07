import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";

const Profile = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  return (
    <section className="max-w-6xl mx-auto space-y-3">
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>
            You can upload own avator and edit your information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-bold">name - {userInfo?.name}</p>
          <p>email - {userInfo?.email}</p>
          <p>role - {userInfo?.role}</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Profile;

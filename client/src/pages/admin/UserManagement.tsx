import UserTable from "@/components/admin/UserTable";
import Loader from "@/components/Loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetAllUsersQuery } from "@/store/slices/userApi";
import type { User } from "@/types/user";

const UserManagement = () => {
  const { data, isLoading, isError } = useGetAllUsersQuery() as {
    data: User[];
    isLoading: boolean;
    isError: boolean;
  };

  if (isLoading) return <Loader />;

  if (isError) return <div>Failed to load users</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Inventory</CardTitle>
        <CardDescription>Manage and sort your users inventory</CardDescription>
      </CardHeader>
      <CardContent>
        <UserTable data={data ?? []} />
      </CardContent>
    </Card>
  );
};

export default UserManagement;

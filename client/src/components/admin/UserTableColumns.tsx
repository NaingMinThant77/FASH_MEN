import type { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

import type { User } from "@/types/user";
import TableHeaderWithSortIcon from "../products/TableHeaderWithSortIcon";

function useUserColumes(): ColumnDef<User>[] {
  return [
    {
      accessorKey: "avatar",
      header: "Avatar",
      cell: ({ row }) => {
        const user = row.original;
        const avatarUrl =
          Array.isArray(user.avatar) && user.avatar.length > 0
            ? user.avatar[0].url
            : "";

        return (
          <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
            <Avatar>
              <AvatarImage src={avatarUrl} alt={user.name} />
              <AvatarFallback>
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "name",
      header: "User Name",
      cell: ({ row }) => {
        const user = row.original;
        return <div className="font-medium">{user.name}</div>;
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        const user = row.original;
        return <div className="font-medium">{user.name}</div>;
      },
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <Badge variant={"secondary"} className="capitalize">
            {user.role}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <TableHeaderWithSortIcon
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            text="Created"
          />
        );
      },
      cell: ({ getValue }) => {
        const date = new Date(getValue() as string);
        return (
          <div className="text-sm text-right">{date.toLocaleDateString()}</div>
        );
      },
    },
  ];
}

export default useUserColumes;

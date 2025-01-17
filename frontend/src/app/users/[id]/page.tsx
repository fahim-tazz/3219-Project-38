"use client";

import { BookMarked, Link } from "lucide-react";
import { useSelector } from "react-redux";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { selectAuthData } from "@/features/auth";
import { EditUserProfileForm } from "@/features/users";

import { useGetUserByIdQuery } from "@/services/userApi";

const page = ({ params }: { params: { id: number } }) => {
  const auth = useSelector(selectAuthData);
  const { data: user, isLoading, isError } = useGetUserByIdQuery(params.id);

  if (isError) {
    throw new Error("User not found");
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="w-full max-w-screen-xl">
      <div className="flex h-96 w-full gap-x-8">
        <Card className="grow items-start p-3">
          <CardContent className="flex flex-col items-start gap-4 p-5">
            <div className="flex  w-full flex-row items-center justify-start gap-6">
              <h1 className="text-lg">{user?.name}</h1>
              {auth.currentUser && auth.currentUser.email === user!.email ? (
                <EditUserProfileForm userId={params.id} />
              ) : null}
            </div>
            <Separator className="mb-3" />
            <div className="mb-3 flex gap-3">
              <Link href="#/" />
              <p>{user?.url || "User has yet to provide a url"}</p>
            </div>
            <div className="mb-3 flex gap-3">
              <BookMarked />
              <p>{user?.bio || "User has yet to provide a bio"}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="grow-[8]">
          <CardTitle>History</CardTitle>
        </Card>
      </div>
    </div>
  );
};

export default page;

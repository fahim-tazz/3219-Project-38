"use client";

import React, { use, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserSchema } from "../types/user.schema";
import * as z from "zod";
import { useSelector, useDispatch } from "react-redux";
import { selectUserData } from "../state/UserSelectors";
import { Textarea } from "@/components/ui/textarea";
import { fetchUserData } from "../state/UserAsyncOperations";

function UserProfileForm({ userId }) {
  const user = useSelector(selectUserData);
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    values: user,
  });

  useEffect(() => {
    dispatch(fetchUserData(userId));
  }, [userId, dispatch]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof UserSchema>) {
    // console.log(values);
    console.log(
      "🚀 ~ file: UserProfileForm.tsx:26 ~ UserProfileForm ~ user:",
      user
    );
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-screen-xl">
        <div className="flex flex-row justify-between">
          <h1 className="mb-8 flex text-2xl">Profile Page</h1>
          <Button
            onClick={() => {
              console.log(
                "🚀 ~ file: UserProfileForm.tsx:26 ~ UserProfileForm ~ user:",
                user
              );
            }}
          >
            Edit
          </Button>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="This is your public display name."
                      disabled={isEditable}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name. Please avoid putting your
                    real name!
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the email your account is associated with.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com"
                      disabled={isEditable}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea disabled={isEditable} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}

export default UserProfileForm;

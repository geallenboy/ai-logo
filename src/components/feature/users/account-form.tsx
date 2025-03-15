"use client";

import React, { useId } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { AIUser } from "@/drizzle/schema";

const accountFormSchema = z.object({
  name: z.string().min(1).max(36),
  email: z.string().email(),
});

const AccountForm = ({ user }: { user: AIUser | null }) => {
  const toastId = useId();
  const form = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });

  const accountFormT = useTranslations("account.accountForm");
  console.log(user, "--->");
  return (
    <Card>
      <CardHeader>
        <CardTitle>{accountFormT("name")}</CardTitle>
        <CardDescription>{accountFormT("desc")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{accountFormT("name")}</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{accountFormT("email")}</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormDescription>{accountFormT("emailDesc")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled type="submit">
              {accountFormT("button")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AccountForm;

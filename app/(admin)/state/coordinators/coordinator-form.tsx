"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { createUser, updateUser } from "../api/coordinator";
import { User } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDistricts } from "@/lib/api/common";
import { coordinatorFormSchema } from "../validation/coordinator";

interface CoordinatorFormProps {
  mode: "create" | "edit";
  coordinator?: User | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function CoordinatorForm({
  mode,
  coordinator,
  onSuccess,
  onCancel,
}: CoordinatorFormProps) {
  const [districts, setDistricts] = useState<{ _id: string; name: string }[]>(
    []
  );
  const form = useForm<z.infer<typeof coordinatorFormSchema>>({
    resolver: zodResolver(coordinatorFormSchema),
    defaultValues: {
      name: coordinator?.name || "",
      email: coordinator?.email || "",
      role: coordinator?.role || "district_coordinator",
      phone: coordinator?.phone || "",
      district: coordinator?.address?.district || "",
      isVolunteer: coordinator?.isVolunteer || true,
    },
  });

  useEffect(() => {
    getDistricts()
      .then(setDistricts)
      .catch(() => toast.error("Failed to load districts"));
  }, []);

  const isEditing = mode === "edit";

  // Handle form submission with Server Actions
  const handleSubmit = async (
    values: z.infer<typeof coordinatorFormSchema>
  ) => {
    const data = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      role: values.role,
      district: values.district,
      isVolunteer: values.isVolunteer || true,
    };

    if (!isEditing) {
      await createUser(data);
    } else {
      await updateUser(coordinator?._id as string, data);
    }
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
                {form.formState?.errors?.name && (
                  <p className="text-sm text-red-500">
                    {form.formState?.errors?.name.message}
                  </p>
                )}
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
                  <Input placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
                {form.formState?.errors.email && (
                  <p className="text-sm text-red-500">
                    {form.formState?.errors?.email.message}
                  </p>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="1234567890" {...field} />
                </FormControl>
                <FormMessage />
                {form.formState?.errors?.phone && (
                  <p className="text-sm text-red-500">
                    {form.formState?.errors.phone.message}
                  </p>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input placeholder="role" disabled {...field} />
                </FormControl>
                <FormMessage />
                {form.formState?.errors?.role && (
                  <p className="text-sm text-red-500">
                    {form.formState?.errors?.role.message}
                  </p>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {districts.map((district) => (
                      <SelectItem key={district._id} value={district.name}>
                        {district.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {mode === "create" ? "Create Coordinator" : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

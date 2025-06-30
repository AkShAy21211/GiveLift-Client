"use client";
import React, { useEffect, useActionState } from "react";
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
import {
  CountrySelect,
  StateSelect,
  CitySelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { createCoordinator, updateCoordinator, Coordinator } from "./actions";

const coordinatorFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  role: z.string().min(2, {
    message: "Role must be at least 2 characters.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  country: z.any(),
  state: z.any(),
  district: z.any(),
});

interface CoordinatorFormProps {
  mode: "create" | "edit";
  coordinator?: Coordinator | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function CoordinatorForm({
  mode,
  coordinator,
  onSuccess,
  onCancel,
}: CoordinatorFormProps) {
  const form = useForm<z.infer<typeof coordinatorFormSchema>>({
    resolver: zodResolver(coordinatorFormSchema),
    defaultValues: {
      name: coordinator?.name || "",
      email: coordinator?.email || "",
      role: coordinator?.role || "district_coordinator",
      phone: coordinator?.phone || "",
      country: coordinator?.country || "",
      state: coordinator?.state || "",
      district: coordinator?.district || "",
    },
  });

  // Server Actions for form submission
  const [createState, createAction] = useActionState(createCoordinator, null);
  const [updateState, updateAction] = useActionState(
    coordinator
      ? updateCoordinator.bind(null, coordinator._id)
      : createCoordinator,
    null
  );

  const currentAction = mode === "create" ? createAction : updateAction;
  const currentState = mode === "create" ? createState : updateState;

  // Handle successful form submission
  useEffect(() => {
    if (currentState?.success) {
      toast.success(currentState.message);
      form.reset();
      onSuccess();
    } else if (currentState?.message && !currentState?.success) {
      toast.error(currentState.message);
    }
  }, [currentState, form, onSuccess]);

  // Handle form submission with Server Actions
  const handleSubmit = (values: z.infer<typeof coordinatorFormSchema>) => {
    const data = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      role: values.role,
      country: values.country,
      state: values.state,
      district: values.district.name,
    };

    currentAction(data as any);
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
                {currentState?.errors?.name && (
                  <p className="text-sm text-red-500">
                    {currentState.errors.name[0]}
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
                {currentState?.errors?.email && (
                  <p className="text-sm text-red-500">
                    {currentState.errors.email[0]}
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
                {currentState?.errors?.phone && (
                  <p className="text-sm text-red-500">
                    {currentState.errors.phone[0]}
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
                {currentState?.errors?.role && (
                  <p className="text-sm text-red-500">
                    {currentState.errors.role[0]}
                  </p>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <CountrySelect
                    defaultValue={coordinator?.country.id}
                    containerClassName="form-group"
                    inputClassName=""
                    onChange={(e: any) =>
                      field.onChange({
                        id: e.id,
                        name: e.name,
                      })
                    }
                    value={field.value}
                    onTextChange={(_txt) => console.log(_txt)}
                    placeHolder="Select Country"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <StateSelect
                    defaultValue={
                      form.getValues("state" as any)?.id ||
                      coordinator?.state.id
                    }
                    countryid={
                      form.getValues("country" as any)?.id ||
                      coordinator?.country.id
                    }
                    containerClassName="form-group"
                    inputClassName=""
                    value={field.value}
                    onChange={(e: any) =>
                      field.onChange({
                        id: e.id,
                        name: e.name,
                      })
                    }
                    onTextChange={(_txt) => console.log(_txt)}
                    placeHolder="Select State"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel>District</FormLabel>
                <FormControl>
                  <CitySelect
                    defaultValue={coordinator?.district as any}
                    countryid={
                      form.getValues("country" as any)?.id ||
                      coordinator?.country.id
                    }
                    stateid={
                      form.getValues("state" as any)?.id ||
                      coordinator?.state.id
                    }
                    containerClassName="form-group"
                    inputClassName=""
                    value={field.value}
                    onChange={(e: any) =>
                      field.onChange({
                        id: e.id,
                        name: e.name,
                      })
                    }
                    onTextChange={(_txt) => console.log(_txt)}
                    placeHolder="Select District"
                  />
                </FormControl>
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

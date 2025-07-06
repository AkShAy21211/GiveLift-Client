"use client";
import React, { useEffect, useActionState, useState } from "react";
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
import { createCoordinator, updateCoordinator } from "@/lib/api/coordinator";
import { User } from "@/lib/types";

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
  country: z.string().min(1, {
    message: "Please select a country.",
  }),
  state: z.string().min(1, {
    message: "Please select a state.",
  }),
  district: z.string().min(1, {
    message: "Please select a district.",
  }),
});

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
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedState, setSelectedState] = useState<any>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);

  const form = useForm<z.infer<typeof coordinatorFormSchema>>({
    resolver: zodResolver(coordinatorFormSchema),
    defaultValues: {
      name: coordinator?.name || "",
      email: coordinator?.email || "",
      role: coordinator?.role || "district_coordinator",
      phone: coordinator?.phone || "",
      country: coordinator?.address?.country || "",
      state: coordinator?.address?.state || "",
      district: coordinator?.address?.district || "",
    },
  });

  // Initialize selected values from coordinator data
  useEffect(() => {
    if (coordinator) {
      if (coordinator.address?.country) {
        setSelectedCountry({
          id: (coordinator?.address?.country as any)?.id,
          name: coordinator?.address?.country,
        });
      }
      if (coordinator.address?.state) {
        setSelectedState({
          id: (coordinator?.address?.state as any)?.id,
          name: coordinator?.address.state,
        });
      }
      if (coordinator.address?.district) {
        setSelectedDistrict({
          id: (coordinator?.address?.district as any)?.id,
          name: coordinator.address?.district,
        });
      }
    }
  }, [coordinator]);

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
      country: values.country,
      state: values.state,
      district: values.district,
    };

    try {
      if (!isEditing) {
        const response = await createCoordinator(data);
        if (response) {
          form.reset();
          toast.success("Coordinator created successfully");
        }
      } else {
        const response = await updateCoordinator(
          coordinator?._id as string,
          data
        );
        if (response) {
          form.reset();
          toast.success("Coordinator updated successfully");
        }
      }
    } catch (error) {
      console.log(error);

      toast.error("Error creating coordinator");
    }
  };

  const handleCountryChange = (country: any) => {
    setSelectedCountry(country);
    setSelectedState(null);
    setSelectedDistrict(null);
    form.setValue("country", country?.name || "");
    form.setValue("state", "");
    form.setValue("district", "");
  };

  const handleStateChange = (state: any) => {
    setSelectedState(state);
    setSelectedDistrict(null);
    form.setValue("state", state?.name || "");
    form.setValue("district", "");
  };

  const handleDistrictChange = (district: any) => {
    setSelectedDistrict(district);
    form.setValue("district", district?.name || "");
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
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <CountrySelect
                    defaultValue={selectedCountry}
                    containerClassName="form-group"
                    inputClassName=""
                    onChange={handleCountryChange}
                    value={selectedCountry}
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
                    defaultValue={selectedState}
                    countryid={selectedCountry?.id}
                    containerClassName="form-group"
                    inputClassName=""
                    value={selectedState}
                    onChange={handleStateChange}
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
                    defaultValue={selectedDistrict}
                    countryid={selectedCountry?.id}
                    stateid={selectedState?.id}
                    containerClassName="form-group"
                    inputClassName=""
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
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

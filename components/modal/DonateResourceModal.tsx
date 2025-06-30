"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { clientApi } from "@/lib/api/client";

// Define Zod schema
const donationSchema = z.object({
  resourceType: z.enum(
    ["Food", "Water", "Clothing", "Shelter", "Medicine", "Others"],
    {
      required_error: "Please select a resource type",
    }
  ),
  quantity: z.string().min(1, "Quantity is required"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  note: z.string().optional(),
});

type DonationFormData = z.infer<typeof donationSchema>;

export function DonationModal() {
  const [open, setOpen] = React.useState(false);

  const form = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      resourceType: undefined,
      quantity: "",
      address: "",
      note: "",
    },
  });

  async function onSubmit(data: DonationFormData) {
    try {
      const response = await clientApi.post("/donation/create", data);

      toast.success(response.data.message, {
        description: "Thank you for your contribution.",
      });

      form.reset();
      setOpen(false);
    } catch (error) {
      toast.error("Failed to submit donation", {
        description: "Please try again later.",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-500 hover:bg-yellow-600" variant="default">
          Make a Donation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Submit Resource Donation</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Resource Type */}
            <FormField
              control={form.control}
              name="resourceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resource Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a resource type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Food">Food</SelectItem>
                      <SelectItem value="Water">Water</SelectItem>
                      <SelectItem value="Clothing">Clothing</SelectItem>
                      <SelectItem value="Shelter">Shelter</SelectItem>
                      <SelectItem value="Medicine">Medicine</SelectItem>
                      <SelectItem value="Others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Quantity */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., 10 packets, 5 blankets"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Availability/Pickup Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Where the donation can be picked up"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Optional Notes */}
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Optional Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Special instructions or details (e.g., 'Vegetarian food only')"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Submit Donation</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

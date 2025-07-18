"use client"
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Package, MapPin, Phone, Calendar, Send } from "lucide-react";
import { ResourcePledgeForm, resourcePledgeSchema } from '../validation/index';
import { RESOURCE_TYPES, ResourceType } from "@/lib/types";

const PledgeResourcesPage = () => {
  const form = useForm<ResourcePledgeForm>({
    resolver: zodResolver(resourcePledgeSchema),
    defaultValues: {
      resourceType: undefined,
      quantity: 0,
      unit: "",
      locationName: "",
      contactInfo: "",
      availableFrom: "",
      notes: "",
    },
  });

  const onSubmit = async (data: ResourcePledgeForm) => {
    try {
      console.log("Submitting resource pledge:", data);
      // API call would go here
      alert("Resource pledge submitted successfully!");
      form.reset();
    } catch (error) {
      console.error("Error submitting pledge:", error);
      alert("Error submitting pledge. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Heart className="w-8 h-8 text-green-500" />
          Pledge Resources
        </h1>
        <p className="text-gray-600 mt-2">
          Help disaster victims by pledging resources from your community
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Resource Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Resource Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="resourceType" className="mb-2 block">Resource Type *</Label>
                <Select onValueChange={(value) => form.setValue("resourceType", value as ResourceType)}>
                  <SelectTrigger className={form.formState.errors.resourceType ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select resource type" />
                  </SelectTrigger>
                  <SelectContent>
                    {RESOURCE_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.resourceType && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.resourceType.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity" className="mb-2 block">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    {...form.register("quantity", { valueAsNumber: true })}
                    placeholder="Enter quantity"
                    className={form.formState.errors.quantity ? "border-red-500" : ""}
                  />
                  {form.formState.errors.quantity && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.quantity.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="unit" className="mb-2 block">Unit *</Label>
                  <Input
                    id="unit"
                    {...form.register("unit")}
                    placeholder="e.g., pieces, liters, kg"
                    className={form.formState.errors.unit ? "border-red-500" : ""}
                  />
                  {form.formState.errors.unit && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.unit.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Location and Contact */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="locationName" className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4" />
                  Pickup Location *
                </Label>
                <Input
                  id="locationName"
                  {...form.register("locationName")}
                  placeholder="Where can the resources be collected?"
                  className={form.formState.errors.locationName ? "border-red-500" : ""}
                />
                {form.formState.errors.locationName && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.locationName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="contactInfo" className="flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4" />
                  Contact Information *
                </Label>
                <Input
                  id="contactInfo"
                  {...form.register("contactInfo")}
                  placeholder="Phone number or email"
                  className={form.formState.errors.contactInfo ? "border-red-500" : ""}
                />
                {form.formState.errors.contactInfo && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.contactInfo.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="availableFrom" className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4" />
                  Available From *
                </Label>
                <Input
                  id="availableFrom"
                  type="date"
                  {...form.register("availableFrom")}
                  className={form.formState.errors.availableFrom ? "border-red-500" : ""}
                />
                {form.formState.errors.availableFrom && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.availableFrom.message}</p>
                )}
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <Label htmlFor="notes" className="mb-2 block">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                {...form.register("notes")}
                placeholder="Any additional information about the resources..."
                rows={3}
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex items-center gap-2" disabled={form.formState.isSubmitting}>
                <Send className="w-4 h-4" />
                {form.formState.isSubmitting ? "Submitting..." : "Pledge Resources"}
              </Button>
              <Button type="button" variant="outline" onClick={() => form.reset()}>
                Reset Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PledgeResourcesPage;
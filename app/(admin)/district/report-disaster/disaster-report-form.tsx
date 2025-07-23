"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { AlertTriangle, Package, Loader2 } from "lucide-react";
import { updateDisasterReport } from "../api/disaster";
import {
  DISASTER_TYPES,
  DisasterReport,
  DisasterType,
  RESOURCE_TYPES,
  Severity,
  SEVERITY_LEVELS,
} from "@/lib/types";
import { disasterReportSchema } from "../validation";
import { createDisasterReport, getDistricts } from "@/lib/api/common";

interface DisasterReportFormProps {
  mode: "create" | "edit";
  disaster?: DisasterReport | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function DisasterReportForm({
  mode,
  disaster,
  onSuccess,
  onCancel,
}: DisasterReportFormProps) {
  const [selectedResources, setSelectedResources] = useState<string[]>(
    disaster?.resourcesNeeded || []
  );
  const [submitting, setSubmitting] = useState(false);
  const [autocomplete, setAutocomplete] = useState<any>(null);
  const [districts, setDistricts] = useState<{ _id: string; name: string }[]>(
    []
  );
  const placeInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof disasterReportSchema>>({
    resolver: zodResolver(disasterReportSchema),
    defaultValues: {
      address: disaster?.address || ("" as any),
      districtId: disaster?.districtId || "",
      disasterType: (disaster?.disasterType as DisasterType) || undefined,
      severity: disaster?.severity || undefined,
      description: disaster?.description || "",
      resourcesNeeded: disaster?.resourcesNeeded || [],
    },
  });

  useEffect(() => {
    getDistricts()
      .then(setDistricts)
      .catch(() => toast.error("Failed to load districts"));
  }, []);

  // Initialize Google Places Autocomplete
  useEffect(() => {
    const initializeAutocomplete = () => {
      if (window.google && placeInputRef.current) {
        const options = {
          types: ["establishment", "geocode"],
          componentRestrictions: {
            country: "in",
          },
          fields: ["place_id", "formatted_address", "name", "geometry"],
        };

        const autocompleteInstance = new window.google.maps.places.Autocomplete(
          placeInputRef.current,
          options
        );

        autocompleteInstance.addListener("place_changed", () => {
          const place = autocompleteInstance.getPlace();
          if (place && place.formatted_address) {
            form.setValue("address", place.formatted_address);
          }
        });

        setAutocomplete(autocompleteInstance);
      }
    };

    // Load Google Maps API if not already loaded
    if (!window.google && !window._googleMapsLoaded) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        window._googleMapsLoaded = true;
        initializeAutocomplete();
      };

      document.head.appendChild(script);
    } else if (window.google) {
      initializeAutocomplete();
    }

    return () => {
      if (autocomplete) {
        window.google.maps.event.clearInstanceListeners(autocomplete);
        setAutocomplete(null);
      }
    };
  }, [form]);

  const isEditing = mode === "edit";

  // Handle resource selection
  const handleResourceToggle = (resource: string) => {
    setSelectedResources((prev) => {
      const updated = prev.includes(resource)
        ? prev.filter((r) => r !== resource)
        : [...prev, resource];

      form.setValue("resourcesNeeded", updated);
      return updated;
    });
  };

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof disasterReportSchema>) => {
    try {
      if (!isEditing) {
        await createDisasterReport(data as any);
      } else {
        await updateDisasterReport(disaster?._id as string, data as any);
      }

      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          {mode === "create"
            ? "Create Disaster Report"
            : "Edit Disaster Report"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Disaster Information Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                <h3 className="text-lg font-semibold">Disaster Information</h3>
              </div>
              <FormField
                control={form.control}
                name="districtId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District</FormLabel>
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
                          <SelectItem key={district._id} value={district._id}>
                            {district.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="disasterType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Disaster Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select disaster type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DISASTER_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specific Location/Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="off"
                        ref={placeInputRef}
                        placeholder="Search for specific location, street, or landmark..."
                      />
                    </FormControl>
                    <FormDescription>
                      Start typing to search for specific places
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="severity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Severity Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select severity level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SEVERITY_LEVELS.map((level: Severity) => (
                          <SelectItem key={level.label} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Situation Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the current situation and immediate concerns..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide detailed information about what happened and
                      current conditions
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Resources Needed Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <h3 className="text-lg font-semibold">Resources Needed</h3>
              </div>

              <FormField
                control={form.control}
                name="resourcesNeeded"
                render={() => (
                  <FormItem>
                    <FormLabel>Select required resources</FormLabel>
                    <div className="grid grid-cols-2 gap-4">
                      {RESOURCE_TYPES.map((resource) => (
                        <div
                          key={resource}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={resource}
                            checked={selectedResources.includes(resource)}
                            onCheckedChange={() =>
                              handleResourceToggle(resource)
                            }
                          />
                          <label
                            htmlFor={resource}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {resource.charAt(0).toUpperCase() +
                              resource.slice(1)}
                          </label>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {selectedResources.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedResources.map((resource) => (
                    <Badge key={resource} variant="secondary">
                      {resource}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1"
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {mode === "create" ? "Submitting..." : "Updating..."}
                  </>
                ) : mode === "create" ? (
                  "Submit Report"
                ) : (
                  "Update Report"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

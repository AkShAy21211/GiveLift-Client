"use client";
import React, { useEffect, useActionState, useState } from "react";
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
import { Users, AlertTriangle, Package, Loader2 } from "lucide-react";
import "react-country-state-city/dist/react-country-state-city.css";
import {
  createDisasterReport,
  // updateDisasterReport,
  DISASTER_TYPES,
  SEVERITY_LEVELS,
  RESOURCE_TYPES,
  DisasterReport,
  updateeDisasterReport,
  disasterReportSchema,
} from "./actions";
import { SEVERITY } from "@/lib/types";

// Google Places API types
declare global {
  interface Window {
    google: any;
    initAutocomplete: () => void;
  }
}



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
  const [countryId, setCountryId] = useState<number>(
    disaster?.country?.id || 0
  );
  const [stateId, setStateId] = useState<number>(disaster?.state?.id || 0);
  const [autocomplete, setAutocomplete] = useState<any>(null);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const placeInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof disasterReportSchema>>({
    resolver: zodResolver(disasterReportSchema),
    defaultValues: {
      place: disaster?.place || "",
      country: disaster?.country || undefined,
      state: disaster?.state || undefined,
      district: disaster?.district || undefined,
      disasterType: disaster?.disasterType || undefined,
      severityLevel: disaster?.severityLevel || undefined,
      peopleAffected: disaster?.peopleAffected || 0,
      situationDescription: disaster?.situationDescription || "",
      resourcesNeeded: disaster?.resourcesNeeded || [],
    },
  });

  // Initialize Google Places Autocomplete
  useEffect(() => {
    const initializeAutocomplete = () => {
      if (window.google && placeInputRef.current) {
        const options = {
          types: ["establishment", "geocode"],
          componentRestrictions: {
            country:"in"
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
            setSelectedPlace(place);
            form.setValue("place", place.formatted_address);
          }
        });

        setAutocomplete(autocompleteInstance);
      }
    };

    // Load Google Maps API if not already loaded
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = initializeAutocomplete;
      document.head.appendChild(script);
    } else {
      initializeAutocomplete();
    }

    return () => {
      if (autocomplete) {
        window.google.maps.event.clearInstanceListeners(autocomplete);
      }
    };
  }, [stateId, countryId, form]);

  // Server Action for form submission
    const [createState, createAction] = useActionState(createDisasterReport, null);
    const [updateState, updateAction] = useActionState(
      disaster
        ? updateeDisasterReport.bind(null, disaster._id)
        : createDisasterReport,
      null
    );

    
  const currentAction = mode === "create" ? createAction : updateAction;
  const currentState = mode === "create" ? createState : updateState;

  // Handle successful form submission
  useEffect(() => {
    if (currentState?.success) {
      toast.success(currentState.message);
      if (mode === "create") {
        form.reset();
        setSelectedResources([]);
        setCountryId(0);
        setStateId(0);
        setSelectedPlace(null);
      }
      setSubmitting(false);
      onSuccess();
    } else if (currentState?.message && !currentState?.success) {
      toast.error(currentState.message);
      setSubmitting(false);
    }
  }, [currentState, form, onSuccess, mode]);

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
    setSubmitting(true);
    currentAction(data as any);
  };

  // Set initial country/state IDs when editing
  useEffect(() => {
    if (mode === "edit" && disaster) {
      if (disaster.country) {
        setCountryId(disaster.country.id);
      }
      if (disaster.state) {
        setStateId(disaster.state.id);
      }
    }
  }, [mode, disaster]);

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
            {/* Location Section */}
            <div className="space-y-4"></div>

            {/* Disaster Information Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                <h3 className="text-lg font-semibold">Disaster Information</h3>
              </div>

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
                name="place"
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
                      {!stateId || !countryId
                        ? "Please select country and state first to enable location search"
                        : "Start typing to search for specific places within the selected district"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="severityLevel"
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
                        {SEVERITY_LEVELS.map((level: SEVERITY) => (
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
                name="peopleAffected"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Number of People Affected
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="situationDescription"
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

"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Shield,
  Flag,
  Camera,
  MapPin,
  AlertTriangle,
  Send,
} from "lucide-react";
import { RumorReportForm, rumorReportSchema } from "../validation/index";
import { getDistricts } from "@/lib/api/common";
import { toast } from "sonner";
import { useGooglePlacesAutocomplete } from "@/hooks/useGooglePlacesAutocomplete";
import { reportRumor } from "../api";
import Link from "next/link";

const ReportRumorPage = () => {
  const [districts, setDistricts] = useState<{ _id: string; name: string }[]>(
    []
  );

  const form = useForm<RumorReportForm>({
    resolver: zodResolver(rumorReportSchema),
    defaultValues: {
      content: "",
      sourceSeen: "",
      screenshotUrl: "",
      location: "",
      districtId: "",
      additionalInfo: "",
    },
  });
  useEffect(() => {
    getDistricts()
      .then(setDistricts)
      .catch(() => toast.error("Failed to load districts"));
  }, []);

  // Use the Google Places Autocomplete hook
  const {
    inputRef: placeInputRef,
    isLoaded,
    isLoading,
    error,
  } = useGooglePlacesAutocomplete({
    onPlaceSelect: (place) => {
      if (place.formatted_address) {
        form.setValue("location", place.formatted_address);
      }
    },
    options: {
      types: ["establishment", "geocode"],
      componentRestrictions: {
        country: "in",
      },
      fields: ["place_id", "formatted_address", "name", "geometry"],
    },
  });
  const onSubmit = async (data: RumorReportForm) => {
    try {
      await reportRumor(data);
      form.reset();
    } catch (error) {
      console.error("Error submitting rumor report:", error);
      alert("Error submitting report. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Shield className="w-8 h-8 text-orange-500" />
          Report Rumor
        </h1>
        <p className="text-gray-600 mt-2">
          Help combat misinformation by reporting false or misleading
          information
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-orange-800 mb-1">
                Important Guidelines
              </h3>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>
                  • Only report information you believe to be false or
                  misleading
                </li>
                <li>
                  • Provide as much detail as possible about where you saw the
                  information
                </li>
                <li>
                  • Include screenshots if available (avoid sharing personal
                  information)
                </li>
                <li>
                  • Our fact-checking team will review and verify your report
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="w-5 h-5" />
            Rumor Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Rumor Content */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rumor Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the false or misleading information you encountered..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide details about the misinformation you encountered
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Source Information */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="sourceSeen"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Where did you see this?</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., WhatsApp group, Facebook, Twitter, News website"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Help us track the source of misinformation
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="screenshotUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Camera className="w-4 h-4" />
                        Evidence URL (optional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Upload screenshot to image hosting service and paste URL here"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Screenshots help our team verify and debunk false
                        information
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Location Information */}
              <FormField
                control={form.control}
                name="location"
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

              {/* Additional Information */}
              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any other details that might help our fact-checking team..."
                        className="min-h-[75px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                   <Link
                  href={"/home"}
                  type="button"
                  className="
                w-auto flex-1 border border-gray-300 py-2 px-4 rounded-md text-center
                "
                >
                  cancel
                </Link>
                <Button
                  type="submit"
                  className="flex items-center gap-2 flex-1"
                  disabled={form.formState.isSubmitting}
                >
                  <Send className="w-4 h-4" />
                  {form.formState.isSubmitting
                    ? "Submitting..."
                    : "Submit Report"}
                </Button>
             
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">
            Need Help Identifying Misinformation?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <p>
                Check if the information comes from a reliable, official source
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <p>Look for emotional language or sensational claims</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <p>Verify with multiple sources before sharing</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <p>
                Be cautious of information that seems too good or bad to be true
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportRumorPage;

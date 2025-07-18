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
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, MapPin, FileText, Send } from "lucide-react";
import { DisasterReportFormData, disasterReportSchema } from '../../(admin)/district/validation/index';
import { DISASTER_TYPES, DisasterSeverity, DisasterType, RESOURCE_TYPES, SEVERITY_LEVELS } from "@/lib/types";

const ReportDisasterPage = () => {
  const form = useForm<DisasterReportFormData>({
    resolver: zodResolver(disasterReportSchema),
    defaultValues: {
      address: "",
      districtId: "",
      disasterType: undefined,
      severity: undefined,
      description: "",
      resourcesNeeded: [],
    },
  });

  const onSubmit = async (data: DisasterReportFormData) => {
    try {
      console.log("Submitting disaster report:", data);
      // API call would go here
      alert("Disaster report submitted successfully!");
      form.reset();
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Error submitting report. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <AlertTriangle className="w-8 h-8 text-red-500" />
          Report Disaster
        </h1>
        <p className="text-gray-600 mt-2">
          Help your community by reporting disasters in your area
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Disaster Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Location Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="address" className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4" />
                  Address/Location *
                </Label>
                <Input
                  id="address"
                  {...form.register("address")}
                  placeholder="Enter the exact location of the disaster"
                  className={form.formState.errors.address ? "border-red-500" : ""}
                />
                {form.formState.errors.address && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.address.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="districtId" className="mb-2 block">District *</Label>
                <Select onValueChange={(value) => form.setValue("districtId", value)}>
                  <SelectTrigger className={form.formState.errors.districtId ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="central">Central District</SelectItem>
                    <SelectItem value="north">North District</SelectItem>
                    <SelectItem value="south">South District</SelectItem>
                    <SelectItem value="east">East District</SelectItem>
                    <SelectItem value="west">West District</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.districtId && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.districtId.message}</p>
                )}
              </div>
            </div>

            {/* Disaster Details */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="disasterType" className="mb-2 block">Disaster Type *</Label>
                <Select onValueChange={(value) => form.setValue("disasterType", value as DisasterType)}>
                  <SelectTrigger className={form.formState.errors.disasterType ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select disaster type" />
                  </SelectTrigger>
                  <SelectContent>
                    {DISASTER_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.disasterType && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.disasterType.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="severity" className="mb-2 block">Severity Level *</Label>
                <Select onValueChange={(value) => form.setValue("severity", value as DisasterSeverity)}>
                  <SelectTrigger className={form.formState.errors.severity ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select severity level" />
                  </SelectTrigger>
                  <SelectContent>
                    {SEVERITY_LEVELS.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${level.color}`} />
                          {level.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.severity && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.severity.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description" className="mb-2 block">Description *</Label>
                <Textarea
                  id="description"
                  {...form.register("description")}
                  placeholder="Provide detailed information about the disaster..."
                  rows={4}
                  className={form.formState.errors.description ? "border-red-500" : ""}
                />
                {form.formState.errors.description && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.description.message}</p>
                )}
              </div>
            </div>

            {/* Resources Needed */}
            <div>
              <Label className="mb-3 block">Resources Needed (Optional)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {RESOURCE_TYPES.map((resource) => (
                  <div key={resource} className="flex items-center space-x-2">
                    <Checkbox
                      id={resource}
                      onCheckedChange={(checked) => {
                        const currentResources = form.getValues("resourcesNeeded") || [];
                        if (checked) {
                          form.setValue("resourcesNeeded", [...currentResources, resource]);
                        } else {
                          form.setValue("resourcesNeeded", currentResources.filter(r => r !== resource));
                        }
                      }}
                    />
                    <Label htmlFor={resource} className="text-sm font-normal cursor-pointer">
                      {resource}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex items-center gap-2" disabled={form.formState.isSubmitting}>
                <Send className="w-4 h-4" />
                {form.formState.isSubmitting ? "Submitting..." : "Submit Report"}
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

export default ReportDisasterPage;
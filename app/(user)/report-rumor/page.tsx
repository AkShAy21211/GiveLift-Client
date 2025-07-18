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
import { Shield, Flag, Camera, MapPin, AlertTriangle, Send } from "lucide-react";
import { RumorReportForm, rumorReportSchema } from '../validation/index';

const ReportRumorPage = () => {
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

  const onSubmit = async (data: RumorReportForm) => {
    try {
      console.log("Submitting rumor report:", data);
      // API call would go here
      alert("Rumor report submitted successfully! Our team will review it.");
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
          Help combat misinformation by reporting false or misleading information
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-orange-800 mb-1">Important Guidelines</h3>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Only report information you believe to be false or misleading</li>
                <li>• Provide as much detail as possible about where you saw the information</li>
                <li>• Include screenshots if available (avoid sharing personal information)</li>
                <li>• Our fact-checking team will review and verify your report</li>
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Rumor Content */}
            <div>
              <Label htmlFor="content" className="mb-2 block">Rumor Content *</Label>
              <Textarea
                id="content"
                {...form.register("content")}
                placeholder="Describe the false or misleading information you encountered..."
                rows={4}
                className={form.formState.errors.content ? "border-red-500" : ""}
              />
              {form.formState.errors.content && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.content.message}</p>
              )}
            </div>

            {/* Source Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="sourceSeen" className="mb-2 block">Where did you see this? (Optional)</Label>
                <Input
                  id="sourceSeen"
                  {...form.register("sourceSeen")}
                  placeholder="e.g., WhatsApp group, Facebook, Twitter, News website"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Help us track the source of misinformation
                </p>
              </div>

              <div>
                <Label htmlFor="screenshotUrl" className="flex items-center gap-2 mb-2">
                  <Camera className="w-4 h-4" />
                  Screenshot/Evidence URL (Optional)
                </Label>
                <Input
                  id="screenshotUrl"
                  {...form.register("screenshotUrl")}
                  placeholder="Upload screenshot to image hosting service and paste URL here"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Screenshots help our team verify and debunk false information
                </p>
              </div>
            </div>

            {/* Location Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="location" className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4" />
                  Location Referenced (Optional)
                </Label>
                <Input
                  id="location"
                  {...form.register("location")}
                  placeholder="If the rumor mentions a specific location"
                />
              </div>

              <div>
                <Label htmlFor="districtId" className="mb-2 block">District (Optional)</Label>
                <Select onValueChange={(value) => form.setValue("districtId", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select district if applicable" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="central">Central District</SelectItem>
                    <SelectItem value="north">North District</SelectItem>
                    <SelectItem value="south">South District</SelectItem>
                    <SelectItem value="east">East District</SelectItem>
                    <SelectItem value="west">West District</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <Label htmlFor="additionalInfo" className="mb-2 block">Additional Information (Optional)</Label>
              <Textarea
                id="additionalInfo"
                {...form.register("additionalInfo")}
                placeholder="Any other details that might help our fact-checking team..."
                rows={3}
              />
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

      {/* Additional Resources */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Need Help Identifying Misinformation?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <p>Check if the information comes from a reliable, official source</p>
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
              <p>Be cautious of information that seems too good or bad to be true</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportRumorPage;
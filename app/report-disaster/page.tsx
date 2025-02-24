"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { disasterReportValidationSchema } from "@/lib/validation";
import { DisasterReport } from "@/lib/types";
import { reportDisasters } from "@/lib/api/disaster";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
function ReportDisaster() {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,

    formState: { errors, isSubmitting },
  } = useForm<DisasterReport>({
    resolver: yupResolver(disasterReportValidationSchema as any),
    defaultValues: {
      title: "",
      description: "",
      type: "",
      location: {
        coordinates: [11.0732, 76.074],
        district: "",
        city: "",
        pincode: "",
      },
      severity: "",
      peopleEffected:0,
      image: [],
    },
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setValue("location.coordinates", [
          position.coords.latitude,
          position.coords.longitude,
        ]);
      });
    }
  }, [setValue]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  const onSubmit = async (data: DisasterReport) => {
    console.log(data);
    
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("type", data.type);
    formData.append("description", data.description);
    formData.append("location[district]", data.location.district);
    formData.append("location[city]", data.location.city);
    formData.append("location[pincode]", data.location.pincode);
    formData.append("severity", data.severity);
    formData.append("peopleEffected", data.peopleEffected.toString());

    data.location.coordinates.forEach((coord, index) => {
      formData.append(`location[coordinates][${index}]`, coord.toString());
    });

    if (data.image && data.image.length > 0) {
      Array.from(data.image).forEach((file) => {
        formData.append("image", file as any);
      });
    }

    try {
      const response = await reportDisasters(formData);
      if (response.data) {
        toast.success(response.data.message);
        reset();
        setImagePreviews([]);
        return;
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto h-auto mt-20">
      <h2 className="text-xl  font-serif mb-4 pt-5">Report Disaster</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white shadow-lg rounded-lg p-6 "
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            register={register}
            label="Title"
            name="title"
            type="text"
            error={errors.title?.message}
            className="w-full p-2 border rounded"
          />

          <Input
            register={register}
            className="w-full p-2 border rounded"
            name="location.district"
            label="District"
            type="text"
            error={errors.location?.district?.message}
          />

          <Input
            className="w-full p-2 border rounded"
            name="location.city"
            label="City"
            type="text"
            error={errors.location?.city?.message}
            register={register}
          />

          <Input
            className="w-full p-2 border rounded"
            name="location.pincode"
            label="Pin Code"
            type="text"
            error={errors.location?.pincode?.message}
            register={register}
          />
          <Input
            className="w-full p-2 border rounded"
            name="peopleEffected"
            label="Number of people effected"
            type="number"
            error={errors.peopleEffected?.message}
            register={register}
          />
          <div>
            <label
              className="mb-1 text-sm font-medium text-gray-500"
              htmlFor="type"
            >
              Type of disaster
            </label>
            <select {...register("type")} className="w-full p-2 border rounded">
              <option value="">Select a disaster type</option>
              <option value="Flood">Flood</option>
              <option value="Landslide">Landslide</option>
              <option value="Cyclone">Cyclone</option>
              <option value="Drought">Drought</option>
              <option value="Earthquake">Earthquake</option>
              <option value="Tsunami">Tsunami</option>
              <option value="Coastal Erosion">Coastal Erosion</option>
              <option value="Fire">Fire</option>
              <option value="Lightning Strike">Lightning Strike</option>
              <option value="Industrial Accident">Industrial Accident</option>
              <option value="Others">Others</option>
            </select>
            <p className="mt-1 text-sm text-red-500">{errors.type?.message}</p>
          </div>

          <div>
            <label
              className="mb-1 text-sm font-medium text-gray-500"
              htmlFor="severity"
            >
              Severity
            </label>
            <select
              {...register("severity")}
              className="w-full p-2 border rounded"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <p className="mt-1 text-sm text-red-500">
              {errors.severity?.message}
            </p>
          </div>

          <div>
            <label
              className="mb-1 text-sm font-medium text-gray-500"
              htmlFor="image"
            >
              Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              {...register("image")}
              className="w-full p-2 border rounded"
              onChange={handleImageChange}
            />
            <p className="mt-1 text-sm text-red-500">{errors.image?.message}</p>

            {/* Image Preview */}
            {imagePreviews.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {imagePreviews.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-md border"
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <label
              className="mb-1 text-sm font-medium text-gray-500"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              {...register("description", { required: true })}
              placeholder="Description"
              className="w-full p-2 border rounded"
              name="description"
            />
            <p className="mt-1 text-sm text-red-500">
              {errors.description?.message}
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          {isSubmitting ? (
            <Loader className="animate-spin  w-full" size={20} color="#fff" />
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
}

export default ReportDisaster;

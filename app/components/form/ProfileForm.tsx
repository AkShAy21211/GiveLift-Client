"use client";
import { User } from "@/libs/types";
import { updateUserProfileSchema } from "@/libs/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

type ProfileProps = {
  userData: User;
  onSubmit: (data: User) => Promise<void>;
};
const ProfileForm = ({ userData, onSubmit }: ProfileProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<User>({
    defaultValues: userData,
    resolver: yupResolver<any>(updateUserProfileSchema),
  });

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg">
      {/* Avatar */}
      <div className="flex items-center gap-4 justify-center">
        <img
          src={userData.avatar || "/img/avatar.jpg"}
          alt="Avatar"
          className="w-32 h-32 rounded-full border object-cover"
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
        {/* Grid Layout for Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Name */}
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              defaultValue={userData.name}
              {...register("name", { required: "Name is required" })}
              className="border p-2 rounded-md w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium">Email</label>
            <input
              defaultValue={userData.email}
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/,
                  message: "Invalid email",
                },
              })}
              className="border p-2 rounded-md w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium">Phone</label>
            <input
              defaultValue={userData.phone}
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid phone number",
                },
              })}
              className="border p-2 rounded-md w-full"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          {/* Volunteer Status */}
          {/* <div className="flex items-center gap-2 mt-2">
            <input type="checkbox" {...register("isVolunteer")} />
            <label>Are you a volunteer?</label>
          </div> */}
        </div>

        {/* Address Section */}
        <h3 className="font-semibold mt-4">Address</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <input
              defaultValue={userData.address?.district}
              type="text"
              {...register("address.district")}
              placeholder="District"
              className="border p-2 rounded-md w-full"
            />
            {errors.address?.district && (
              <p className="text-red-500 text-sm">
                {errors.address?.district?.message}
              </p>
            )}
          </div>
          <div>
            <input
              defaultValue={userData.address?.city}
              type="text"
              {...register("address.city")}
              placeholder="City"
              className="border p-2 rounded-md w-full"
            />
            {errors.address?.city && (
              <p className="text-red-500 text-sm">
                {errors.address?.city?.message}
              </p>
            )}
          </div>

          <div>
            <input
              defaultValue={userData.address?.pincode}
              type="number"
              {...register("address.pincode")}
              placeholder="Pincode"
              className="border p-2 rounded-md w-full"
            />
            {errors.address?.pincode && (
              <p className="text-red-500 text-sm">
                {errors.address?.pincode?.message}
              </p>
            )}
          </div>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full disabled:opacity-50"
          disabled={!isDirty}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;

"use client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  checkoutSchema,
  CheckoutFormData,
} from "@/validations/checkoutValidation";
import { useAppDispatch } from "@/store/hooks";
import { setShippingAddress, resetShippingAddress } from "../checkoutSlice";

export default function ShippingForm() {
  const dispatch = useAppDispatch();
  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",

    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "United States",
    },
  });

  const formValues = watch();

  useEffect(() => {
    if (isValid) {
      dispatch(setShippingAddress(formValues as CheckoutFormData));
    } else {
      dispatch(resetShippingAddress());
    }
  }, [formValues, isValid, dispatch]);

  return (
    <div className="rounded-3xl border p-6 lg:p-8">
      <h2 className="text-3xl font-bold">Shipping Details</h2>

      <p className="mt-2 text-sm text-gray-500">
        Enter your delivery information.
      </p>

      <form className="mt-8 space-y-5">
        {/* FULL NAME */}
        <div>
          <label className="mb-2 block text-sm font-medium">Full Name</label>

          <input
            {...register("fullName")}
            placeholder="John Doe"
            className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-black"
          />

          {errors.fullName && (
            <p className="mt-2 text-sm text-red-500">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Email Address
          </label>

          <input
            {...register("email")}
            placeholder="john@example.com"
            className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-black"
          />

          {errors.email && (
            <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* PHONE */}
        <div>
          <label className="mb-2 block text-sm font-medium">Phone Number</label>

          <input
            {...register("phone")}
            placeholder="+1 234 567 890"
            className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-black"
          />

          {errors.phone && (
            <p className="mt-2 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* ADDRESS */}
        <div>
          <label className="mb-2 block text-sm font-medium">Address</label>

          <input
            {...register("address")}
            placeholder="Street address"
            className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-black"
          />

          {errors.address && (
            <p className="mt-2 text-sm text-red-500">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* CITY + POSTAL */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">City</label>

            <input
              {...register("city")}
              placeholder="New York"
              className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-black"
            />

            {errors.city && (
              <p className="mt-2 text-sm text-red-500">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Postal Code
            </label>

            <input
              {...register("postalCode")}
              placeholder="10001"
              className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-black"
            />

            {errors.postalCode && (
              <p className="mt-2 text-sm text-red-500">
                {errors.postalCode.message}
              </p>
            )}
          </div>
        </div>

        {/* COUNTRY */}
        <div>
          <label className="mb-2 block text-sm font-medium">Country</label>

          <select
            {...register("country")}
            className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-black"
          >
            <option>United States</option>

            <option>Canada</option>

            <option>United Kingdom</option>

            <option>India</option>
          </select>

          {errors.country && (
            <p className="mt-2 text-sm text-red-500">
              {errors.country.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

"use server";

import { redirect } from "next/navigation";

const { connectDB } = require("@/config/database");
const { default: Property } = require("@/models/property");
const { getSessionUser } = require("@/utils/getSessionUser");
const { revalidatePath } = require("next/cache");

async function updateProperty(propertyId, formData) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const existingProperty = await Property.findById(propertyId);

  // verify ownership
  if (existingProperty.owner.toString() !== userId) {
    throw new Error("Current user does not own this property");
  }

  const propertyData = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.street"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities: formData.getAll("amenities"),
    rates: {
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
      nightly: formData.get("rates.nightly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
  };

  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    propertyData,
  );

  revalidatePath("/", "layout");

  redirect(`/properties/${updatedProperty._id}`);
}

export default updateProperty;

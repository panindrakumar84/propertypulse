import BookmarkButton from "@/components/BookmarkButton";
import PropertyContactForm from "@/components/PropertyContactForm";
import PropertyDetails from "@/components/PropertyDetail";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyImages from "@/components/PropertyImages";
import ShareButtons from "@/components/ShareButtons";
import { connectDB } from "@/config/database";
import Property from "@/models/property";
import { convertToSerializableObject } from "@/utils/convertToObject";
import { getSessionUser } from "@/utils/getSessionUser";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const PropertyPage = async ({ params }) => {
  await connectDB();
  const { id } = await params;
  const propertyDoc = await Property.findOne({ _id: id }).lean();
  const { userId } = await getSessionUser();

  const property = convertToSerializableObject(propertyDoc);

  if (!property) {
    return <div>Property not found</div>;
  }
  const isUserProperty = userId === property.owner;

  return (
    <>
      {/* header image */}
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        {/* go back */}
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
      {/* property details */}
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div
            className={`grid grid-cols-1 ${!isUserProperty ? "md:grid-cols-70/30" : "max-w-4xl mx-auto"} w-full gap-6`}
          >
            <PropertyDetails property={property} />
            {!isUserProperty && (
              <aside className="space-y-4">
                <BookmarkButton property={property} />
                <ShareButtons property={property} />
                <PropertyContactForm property={property} />
              </aside>
            )}
          </div>
        </div>
      </section>

      <PropertyImages images={property.images} />
    </>
  );
};

export default PropertyPage;

import Pagination from "@/components/Pagination";
import PropertyCard from "@/components/PropertyCard";
import { connectDB } from "@/config/database";
import Property from "@/models/property";

const PropertiesPage = async ({ searchParams }) => {
  const { page = "1", pageSize = "9" } = await searchParams;

  const skip = (page - 1) * pageSize;

  await connectDB();

  const totalProperties = await Property.countDocuments({});

  const totalPages = Math.ceil(totalProperties / parseInt(pageSize));
  console.log();

  const properties = await Property.find({}).skip(skip).limit(pageSize);

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <Pagination page={parseInt(page)} totalPages={totalPages} />
      )}
    </section>
  );
};

export default PropertiesPage;

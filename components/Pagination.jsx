import Link from "next/link";

const Pagination = ({ page, pageSize, totalPages }) => {
  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <Link
        href={`/properties?page=${page - 1}`}
        className={` ${page === 1 && "pointer-events-none cursor-default opacity-50 "} mr-2 px-2 py-2 border border-gray-300 rounded`}
      >
        Previous
      </Link>

      <span className="mx-2">
        Page {page} of {totalPages}
      </span>

      <Link
        href={`/properties?page=${page + 1}`}
        className={` ${page === totalPages && "pointer-events-none cursor-default opacity-50 "} ml-2 px-2 py-2 border border-gray-300 rounded`}
      >
        Next
      </Link>
    </section>
  );
};

export default Pagination;

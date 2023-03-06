import Link from "next/link";
export default function Index() {
  return (
    <section class="bg-white min-h-screen mx-auto dark:bg-gray-900">
      <div class="container px-6 py-40 mx-auto text-center">
        <div class="max-w-lg mx-auto">
          <h1 class="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
            Food facts{" "}
          </h1>
          <p className="mt-6 text-gray-500 dark:text-gray-300">
            Scan any products barcode and get detailed information about the
            product including name, ingredients, labels, and image..
          </p>
          <Link href="/scan">
            <button class="px-5 py-2 mt-6 text-sm font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg hover:bg-blue-500 lg:mx-0 lg:w-auto focus:outline-none">
              Scan Barcode
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

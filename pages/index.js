import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="w-full bg-white shadow-lg py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <Link href="/">
            <h1 className="text-lg font-bold text-gray-800 cursor-pointer">
              Quaggar Barcode Scanner
            </h1>
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/about">
                  <a className="text-gray-800 hover:text-gray-600">About</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-800 hover:text-gray-600">Contact</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-gray-800 leading-tight mb-8">
          Quaggar Barcode Scanner
        </h1>
        <p className="text-lg md:text-xl text-center text-gray-700 mb-8">
          Scan any product's barcode and get detailed information about the product including name, ingredients, labels, and image.
        </p>
        <form className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full max-w-md">
          <input
            type="text"
            placeholder="Enter barcode"
            className="w-full border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 rounded-md px-4 py-2"
          />
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md"
          >
            Scan
          </button>
        </form>
      </main>
      <footer className="w-full bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto text-center text-gray-500">
          <p>&copy; 2023 Quaggar Barcode Scanner. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

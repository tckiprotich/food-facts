// import { useRouter } from "next/router";

// const ScanResultPage = () => {
//   const router = useRouter();
//   const { code } = router.query;

//   return (
//     <div>
//       <h1>Scan Result</h1>
//       <p>Barcode code: {code}</p>
//     </div>
//   );
// };

// export default ScanResultPage;


import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const ScanResultPage = () => {
  const router = useRouter();
  const { code } = router.query;
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    if (!code) {
      return;
    }

    const searchUrl = `https://world.openfoodfacts.org/api/v0/product/${code}.json`;

    fetch(searchUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSearchResults(data.product);
      })
      .catch((error) => console.error(error));
  }, [code]);

  return (
    <div>
      <h1>Scan Result</h1>
      <p>Barcode code: {code}</p>
      {searchResults && (
        <div>
          <h2>Search Results</h2>
          <p>Name: {searchResults.product_name}</p>
          <p>Brand: {searchResults.brands}</p>
          <p>Ingredients: {searchResults.ingredients_text}</p>
        </div>
      )}
    </div>
  );
};

export default ScanResultPage;

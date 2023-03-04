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


import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const ScanResultPage = () => {
  const router = useRouter();
  const { code } = router.query;
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (code) {
      axios
        .get(`https://world.openfoodfacts.org/api/v0/product/${code}.json`)
        .then((response) => {
          const product = response.data.product;
          if (product) {
            setProduct(product);
            setError(null);
          } else {
            searchNutritionix(code);
          }
        })
        .catch((error) => {
          console.error(error);
          setError(error.message);
        });
    }
  }, [code]);

  const searchNutritionix = (code) => {
    axios
      .get(
        `https://api.nutritionix.com/v1_1/item?upc=${code}&appId=fbbe6262&appKey=0e5ce13d54b2ae6cd7d8acd0c1972cf7`
      )
      .then((response) => {
        const product = {
          product_name: response.data.item_name,
          generic_name: null,
          ingredients_text: response.data.nf_ingredient_statement,
          image_url: null,
        };
        setProduct(product);
        setError(null);
      })
      .catch((error) => {
        console.error(error);
        setError("Product not found.");
      });
  };

  if (!code) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{product.product_name}</h1>
      <p>{product.generic_name}</p>
      <p>{product.ingredients_text}</p>
      <img src={product.image_url} alt={product.product_name} />
    </div>
  );
};

export default ScanResultPage;

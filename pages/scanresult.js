import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { config } from "dotenv";
config();

const ScanResultPage = () => {
  const router = useRouter();
  const { code } = router.query;
  const [product, setProduct] = useState(null);
  const [nutrients, setNutrients] = useState(null);

  useEffect(() => {
    if (code) {
      // Search Open Food Facts API for product data
      axios
        .get(`https://world.openfoodfacts.org/api/v0/product/${code}.json`)
        .then((response) => {
          const product = response.data.product;
          setProduct(product);

          // If product not found, search USDA National Nutrient Database
          if (!product) {
            axios
              .get(
                `https://api.nal.usda.gov/fdc/v1/foods/search?query=${code}&pageSize=1&api_key=${process.env.USDA_API_KEY}`
              )
              .then((response) => {
                const food = response.data.foods[0];
                setNutrients(food.foodNutrients);
              })
              .catch((error) => {
                console.error(error);
              });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [code]);

  if (!code) {
    return <p>Loading...</p>;
  }

  if (!product && !nutrients) {
    return <p>No product found for barcode {code}.</p>;
  }

  return (
    <div>
      {product && (
        <>
          <h1>{product.product_name}</h1>
          <p>{product.generic_name}</p>
          <p>{product.ingredients_text}</p>
          <img src={product.image_url} alt={product.product_name} />
        </>
      )}
      {nutrients && (
        <>
          <h1>{nutrients.name}</h1>
          {nutrients.foodNutrient.map((nutrient) => (
            <p key={nutrient.nutrient.name}>
              {nutrient.nutrient.name}: {nutrient.amount}{nutrient.nutrient.unitName}
            </p>
          ))}
        </>
      )}
    </div>
  );
};

export default ScanResultPage;

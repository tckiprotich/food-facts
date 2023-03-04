import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const ScanResultPage = () => {
  const router = useRouter();
  const { code } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (code) {
      axios
        .get(`https://world.openfoodfacts.org/api/v0/product/${code}.json`)
        .then((response) => {
          const product = response.data.product;
          setProduct(product);
        })
        .catch((error) => {
          console.error(error);
          axios
            .get(
              `https://api.nal.usda.gov/fdc/v1/foods/search?query=${code}&pageSize=1&api_key=8xHruEEQncI7q81n2BheQHqvTq4snh46rRGud6cj`
            )
            .then((response) => {
              const product = response.data.foods[0];
              setProduct(product);
            })
            .catch((error) => {
              console.error(error);
            });
        });
    }
  }, [code]);

  if (!code) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>No product found for barcode {code}.</p>;
  }

  if (product.brands === "USDA") {
    return (
      <div>
        <h1>{product.description}</h1>
        <p>{product.foodNutrients[3].nutrientName}: {product.foodNutrients[3].value}{product.foodNutrients[3].unitName}</p>
        <p>{product.foodNutrients[1].nutrientName}: {product.foodNutrients[1].value}{product.foodNutrients[1].unitName}</p>
        <p>{product.foodNutrients[2].nutrientName}: {product.foodNutrients[2].value}{product.foodNutrients[2].unitName}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>{product.product_name}</h1>
      {/* // product label */}
    <h3>{product.product_label}</h3>
      {/* <p>{product.generic_name}</p> */}
      <p>{product.ingredients_text}</p>
      <img src={product.image_url} alt={product.product_name} />
    </div>
  );
};

export default ScanResultPage;

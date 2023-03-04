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
        });
    }
  }, [code]);

  if (!code) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>No product found for barcode {code}.</p>;
  }

  const name = product.product_name;
  const ingredients = product.ingredients_text;
  const labels = product.labels_tags;
  const image = product.image_url;

  return (
    <div>
      <h1>{name}</h1>
      <img src={image} alt={name} />
      <p>Ingredients: {ingredients}</p>
      <p>Labels: {labels.join(", ")}</p>
    </div>
  );
};

export default ScanResultPage;

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

  const labels = product.labels_tags;

  return (
    <div>
      <h1>{product.product_name}</h1>
      <p>Ingredients: {ingredients.join(", ")}</p>
      <img src={product.image_url} alt={product.product_name} />
      <p>Labels: {labels.join(", ")}</p>
    </div>
  );
};

export default ScanResultPage;

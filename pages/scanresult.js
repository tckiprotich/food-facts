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

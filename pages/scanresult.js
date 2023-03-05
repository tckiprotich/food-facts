import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

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

  // iterate over the following array and display the values in a list

  const name = product.product_name;
  const ingredients = product.ingredients_text;
  const labels = product.labels_tags;
  const image = product.image_url;

  return (
    // <div>
    //    // iterate over the following array and display the values in a list





    //   <h1>{name}</h1>
    //   <img src={image} alt={name} />
    //   <p>Ingredients: {ingredients}</p>
    //   <p>Labels: {labels.join(", ")}</p>
    // </div>

    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
        {product_name}
      </h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 md:pr-8">
          {image_url && (
            <Image
              src={image_url}
              alt={product_name}
              width={500}
              height={500}
              className="rounded-md mb-8"
            />
          )}
        </div>
        <div className="md:w-1/2">
          {ingredients_text && (
            <div className="mb-8">
              <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
                Ingredients
              </h2>
              <p className="text-gray-700">{ingredients_text}</p>
            </div>
          )}
          {labels_tags && (
            <div>
              <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
                Labels
              </h2>
              <ul className="list-disc list-inside">
                {labels_tags.map((label) => (
                  <li key={label} className="text-gray-700">
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScanResultPage;

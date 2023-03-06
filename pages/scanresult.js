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
    <div>
      <section className="min-h-screen">
      

        <figure class="bg-slate-100 rounded-xl p-8 dark:bg-slate-800">
        <div class="text-slate-700 dark:text-slate-500">
        {/* display the product name */}
        <h1 className="center mx-auto py-10 text-2xl decoration-4">{name}</h1>
      </div>
           <img class="w-32 h-32 rounded-full mx-auto" src={image} alt="" width="384" height="512" /> 
          {/* <img
            class=" rounded-full mx-auto"
            src={image}
            alt=""
            width="384"
            height="512"
          /> */}
          
          <div class="pt-6 text-center space-y-4">
            <blockquote>
              <ul class="text-lg font-medium">
                {/* loop through the ingredients and display them in a list */}
                <li>Ingredients: {ingredients}</li>
              </ul>
            </blockquote>
            <figcaption class="font-medium">
              <div class="text-sky-500 dark:text-sky-400 pt-20">
                {/* labels */}
                Labels: {labels.join(", ")}
              </div>
              {/* <div class="text-slate-700 dark:text-slate-500">
        Staff Engineer, Algolia
      </div> */}
            </figcaption>
          </div>
        </figure>
      </section>
      {/* // iterate over the following array and display the values in a list */}
      <h1 className="center mx-auto py-10 maroon">{name}</h1>
      {/* <img src={image} alt={name} />
      <p>Ingredients: {ingredients}</p>
      <p>Labels: {labels.join(", ")}</p> */}
    </div>
  );
};

export default ScanResultPage;

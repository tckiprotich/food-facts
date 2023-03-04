import BarcodeScanner from "../components/BarcodeScanner";
import Link from "next/link";

const IndexPage = () => {
  return (
    <>
      <div>
        <h1>Barcode Scanner</h1>

        {/* <BarcodeScanner /> */}
      </div>
       {/* use link to navigate to scan page */}
      <Link href="/scan">
        Scan
      </Link>



    </>
  );
};

export default IndexPage;

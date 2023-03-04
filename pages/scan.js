import BarcodeScanner from "../components/BarcodeScanner";

const HomePage = () => {
  const handleBarcodeDetected = (barcode) => {
    console.log("Barcode detected:", barcode);
  };

  return (
    <div>
      <h1>Barcode Scanner</h1>
      <BarcodeScanner onDetected={handleBarcodeDetected} />
    </div>
  );
};

export default HomePage;

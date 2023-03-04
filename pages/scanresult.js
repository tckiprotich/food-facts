import { useRouter } from "next/router";

const ScanResultPage = () => {
  const router = useRouter();
  const { code } = router.query;

  return (
    <div>
      <h1>Scan Result</h1>
      <p>Barcode code: {code}</p>
    </div>
  );
};

export default ScanResultPage;

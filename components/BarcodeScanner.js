import React, { useEffect } from "react";
import Quagga from "quagga";
import Router from "next/router";

const BarcodeScanner = () => {
  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#scanner-container"),
        },
        decoder: {
          readers: ["ean_reader"],
        },
      },
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("QuaggaJS is ready to start scanning.");
        Quagga.start();
      }
    );

    Quagga.onDetected((result) => {
      const code = result.codeResult.code;
      console.log("Barcode detected:", code);
      Quagga.stop();
      Router.push(`/scanresult?code=${code}`);
    });

    return () => {
      Quagga.offDetected();
      Quagga.stop();
    };
  }, []);

  return <div id="scanner-container" />;
};

export default BarcodeScanner;

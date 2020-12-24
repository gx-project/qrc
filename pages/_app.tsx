import "../styles/globals.css";
import QrScanner from "qr-scanner";
import qrScannerWorkerSource from "!!raw-loader!../node_modules/qr-scanner/qr-scanner-worker.min.js";

if (typeof Blob !== "undefined") {
  QrScanner.WORKER_PATH = URL.createObjectURL(
    new Blob([qrScannerWorkerSource])
  );
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

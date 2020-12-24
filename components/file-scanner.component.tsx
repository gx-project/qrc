import { createRef } from "preact";
import { useEffect, useState } from "preact/hooks";
import QrScanner from "qr-scanner";
import mainStore from "../stores/main.store";
import styles from "../styles/main.module.css";

const defaultButtonText = "Scanear arquivo";
const scanningButtonText = "Scaneando...";

const Icon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="file-upload"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    className={styles.fileScanButtonIcon}
  >
    <path d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48zm32-48h224V288l-23.5-23.5c-4.7-4.7-12.3-4.7-17 0L176 352l-39.5-39.5c-4.7-4.7-12.3-4.7-17 0L80 352v64zm48-240c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z"></path>
  </svg>
);

export function FileScanner() {
  const fileReader = createRef<HTMLInputElement>();
  const [isScanning, setScanning] = useState(false);

  useEffect(() => {
    if (!fileReader.current) return;

    fileReader.current.addEventListener("change", (event) => {
      const element = event.target as HTMLInputElement;
      const [file] = element.files;

      setScanning(true);

      QrScanner.scanImage(file)
        .then((result) => {
          mainStore.setDecodedValue(result);
        })
        .catch(() => {
          mainStore.decodeError();
        })
        .finally(() => {
          element.value = "";
          setScanning(false);
        });
    });
  }, [fileReader.current]);

  function openFileReader() {
    if (!fileReader.current) return;

    fileReader.current.click();
  }

  return (
    <>
      <input
        style={{ width: 1, height: 1, opacity: 0, position: "absolute" }}
        ref={fileReader}
        type="file"
        accept="image/*"
      />
      <button
        onClick={() => openFileReader()}
        className={styles.fileScanButton}
      >
        {isScanning ? (
          scanningButtonText
        ) : (
          <>
            {defaultButtonText}
            <Icon />
          </>
        )}
      </button>
    </>
  );
}

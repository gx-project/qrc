import { createRef } from "preact";
import { useEffect } from "preact/hooks";
import QrScanner from "qr-scanner";
import mainStore from "../stores/main.store";
import styles from "../styles/main.module.css";

export function CamScanner() {
  const videoRef = createRef<HTMLVideoElement>();
  useEffect(() => {
    const qrScanner = new QrScanner(videoRef.current, (result) => {
      if (!mainStore.modalOpenState) mainStore.setDecodedValue(result);
    });

    qrScanner.start();
  }, [videoRef.current]);

  return <video className={styles.video} ref={videoRef}></video>;
}

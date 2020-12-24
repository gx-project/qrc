import Head from "next/head";
import { observer } from "mobx-react-lite";
import styles from "../styles/main.module.css";
import MainStore, { EDecodeResultTypes } from "../stores/main.store";
import {
  Modal,
  CamScanner,
  FileScanner,
  UrlType,
  EmailType,
  SocialUsernameType,
  UnknownType,
  DecodeError,
} from "../components";
import { TypeHandlerComponent } from "../types";

const None: TypeHandlerComponent = () => <></>;

const TypeHandlerComponentMap = {
  [EDecodeResultTypes.URL]: UrlType,
  [EDecodeResultTypes.Email]: EmailType,
  [EDecodeResultTypes.SocialUsername]: SocialUsernameType,
  [EDecodeResultTypes.Unknown]: UnknownType,
  [EDecodeResultTypes.Error]: DecodeError,
  [EDecodeResultTypes.None]: None,
};

const Index = observer(() => {
  const ContentComponent = TypeHandlerComponentMap[MainStore.decodedResultType];
  console.log(MainStore.decodeValue);
  return (
    <>
      <Head>
        <title>Leitor de QRCode</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Leitor de QRCode no navegador."
        ></meta>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/icons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/icons/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#000000"></meta>
      </Head>
      <div className={styles.container}>
        <Modal>
          <ContentComponent value={MainStore.decodeValue} />
        </Modal>
        <FileScanner />
        {MainStore.useCameraScan ? <CamScanner /> : null}
      </div>
    </>
  );
});

export default Index;

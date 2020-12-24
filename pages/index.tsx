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
        <meta name="theme-color" content="#000"></meta>
        <meta
          name="description"
          content="Leitor de QRCode no navegador."
        ></meta>
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

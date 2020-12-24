import { createRef, RefObject } from "preact";
import { TypeHandlerComponent } from "../../types";
import { Title, ButtonContainer, CopyButton } from "./components";
import styles from "../../styles/modal.module.css";

export const UrlType: TypeHandlerComponent = ({ value }) => {
  const inputRef = createRef<HTMLInputElement>() as RefObject<HTMLInputElement>;

  return (
    <>
      <Title>Link encontrado:</Title>
      <input
        ref={inputRef}
        type="text"
        readOnly={true}
        className={styles.input}
        value={value}
      />
      <ButtonContainer>
        <CopyButton inputRefObject={inputRef}>Copiar</CopyButton>
        <a className={styles.button} href={value} target="_blank">
          Abrir
        </a>
      </ButtonContainer>
    </>
  );
};

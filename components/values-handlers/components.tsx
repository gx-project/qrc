import { RefObject } from "preact";
import { FC } from "react";
import styles from "../../styles/modal.module.css";

export const Title: FC = ({ children }) => (
  <h3 className={styles.title}>{children}</h3>
);

export const Input: FC<{ children: string }> = ({ children }) => (
  <input
    onFocus={(event) => {
      console.log("asd");
      (event.target as HTMLInputElement).select();
    }}
    type="text"
    className={styles.input}
    value={children}
  />
);

export const ButtonContainer: FC = ({ children }) => {
  return <div className={styles.buttonContainer}>{children}</div>;
};

export const CopyButton: FC<{
  inputRefObject: RefObject<HTMLInputElement>;
}> = ({ inputRefObject }) => {
  return (
    <button
      className={styles.button}
      onClick={() => {
        if (!inputRefObject.current) return;

        inputRefObject.current.select();
        document.execCommand("copy");
      }}
    >
      Copiar
    </button>
  );
};

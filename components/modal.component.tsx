import { observer } from "mobx-react-lite";
import styles from "../styles/modal.module.css";
import mainStore from "../stores/main.store";

export const Modal = observer(({ children }) => {
  const isOpen = mainStore.modalOpenState;
  const containerClasses = `${styles.container} ${isOpen ? styles.open : ""}`;

  return (
    <div className={containerClasses}>
      <div
        onClick={() => mainStore.setModalState(false)}
        className={styles.containerClick}
      ></div>
      <div className={styles.content}>{children}</div>
    </div>
  );
});

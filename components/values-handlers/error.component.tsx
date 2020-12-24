import { useEffect } from "preact/hooks";
import mainStore from "../../stores/main.store";
import { TypeHandlerComponent } from "../../types";

export const DecodeError: TypeHandlerComponent = () => {
  useEffect(() => {
    setTimeout(() => mainStore.setModalState(false), 3000);
  }, []);
  return <>Não possível decodificar</>;
};

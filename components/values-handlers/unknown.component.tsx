import { TypeHandlerComponent } from "../../types";

export const UnknownType: TypeHandlerComponent = ({ value }) => {
  return <>{value}</>;
};

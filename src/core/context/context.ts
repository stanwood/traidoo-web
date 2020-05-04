import React from "react";
import { ContextProps } from "./types";

const Context = React.createContext<ContextProps>({} as ContextProps);

export default Context;

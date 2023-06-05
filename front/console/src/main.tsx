import ReactDOM from "react-dom/client";
import { start } from "qiankun";
import "antd/dist/antd.min.css";
import RouterWrapper from "./RouterWrapper";
export * from "./GlobalContext";
export * from "./RouterWrapper";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterWrapper />
);

start();

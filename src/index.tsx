import { createRoot } from "react-dom/client";

import "./styles.scss";

import App from "./App";

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

root.render(<App />);

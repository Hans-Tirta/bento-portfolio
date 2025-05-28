import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";
import CustomCursor from "./components/CustomCursor";
import SmoothScroller from "./components/SmoothScroller";
import ThemedApp from "./components/ThemedApp";

export default function App() {
  return (
    <ThemeProvider>
      <CustomCursor />
      {/* <SmoothScroller> */}
      <ThemedApp />
      {/* </SmoothScroller> */}
    </ThemeProvider>
  );
}

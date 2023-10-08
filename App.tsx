import Nav from "./Components/Nav";
import GeneralContextProvider from "./utils/GeneralContext";

export default function App() {
  return (
    <GeneralContextProvider>
      <Nav />
    </GeneralContextProvider>
  );
}

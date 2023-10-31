import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Main from "./components/layout/Main";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { QueryClientProvider, QueryClient } from "react-query";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

function App() {
  const queryClient = new QueryClient();
  return (
    <RecoilRoot>
      <div className="App">
        <QueryClientProvider client={queryClient}>
          <Main>
            <Routes>
              <Route exact path="/dashboard" element={<Home />} />
              <Route exact path="/tables" element={<Tables />} />
            </Routes>
          </Main>
        </QueryClientProvider>
      </div>
    </RecoilRoot>
  );
}

export default App;

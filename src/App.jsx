import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./store/AuthCtx";
import Wrapper from "./components/Ul/Wrapper";
import ProtectedAdminRoutes from "./pages/ProtectedAdminRoutes";
import toast, { Toaster } from "react-hot-toast";
import AddIdea from "./pages/AddIdea";
import IdeasList from "./pages/IdeasList";

function App() {
  const { isUserLoggedIn, role } = useAuthContext();

  return (
    <Wrapper>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} children={<Route path="/page/:pageId" element={<HomePage />} />} />
        <Route path="/login" element={isUserLoggedIn ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/addIdea" element={<AddIdea />} />
        <Route element={<ProtectedAdminRoutes role={role} />}>
          <Route path="/ideasList" element={<IdeasList />} />
        </Route>
      </Routes>
    </Wrapper>
  );
}

export default App;

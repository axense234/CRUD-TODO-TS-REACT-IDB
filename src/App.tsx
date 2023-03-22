// React Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Context
import { AppProvider } from "./context";
// Pages
import Home from "./pages/Home";
import CreateTodo from "./pages/CreateTodo";
import SharedLayout from "./components/Other/SharedLayout";
import EditTodo from "./pages/EditTodo";
import ViewTodo from "./pages/ViewTodo";
import AboutUs from "./pages/AboutUs";

const App: React.FC = () => {
  return (
    <Router>
      <AppProvider>
        <Routes>
          <Route path='/' element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path='create' element={<CreateTodo />} />
            <Route path='edit' element={<EditTodo />} />
            <Route path='view' element={<ViewTodo />} />
            <Route path='about-us' element={<AboutUs />} />
          </Route>
        </Routes>
      </AppProvider>
    </Router>
  );
};

export default App;

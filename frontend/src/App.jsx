import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation.jsx";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { Toaster } from 'react-hot-toast';
import Footer from "./components/footer.jsx";
const App = () => {
  return (
    <>
      {/* <ToastContainer /> */}
      <Toaster />
      <Navigation />
      <main className="py-3 bg-black">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
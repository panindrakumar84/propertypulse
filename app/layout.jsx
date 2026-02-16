import "@/assets/styles/globals.css";
import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { MessagesProvider } from "@/context/messageContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Property Pulse",
  keywords: "rental, property, real estate",
  description: "Find the perfect rental property",
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <MessagesProvider>
        <html>
          <body>
            <Navbar />
            <main>{children}</main>
            <ToastContainer />
            <Footer />
          </body>
        </html>
      </MessagesProvider>
    </AuthProvider>
  );
};

export default MainLayout;

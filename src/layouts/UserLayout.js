import Header from "../components/user/Header";
import Menu from "../components/user/Menu";
import Footer from "../components/user/Footer";
import "./layout.css";

export default function UserLayout({
  children,
}) {
  return (
    <div>
      <Header />
      <Menu />
      <div className="row" id="path">
      </div>
      {children}
      <Footer />
    </div>
  );
}

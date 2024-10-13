import Footer from "../blocks/navigation/footer";
import Header from "../blocks/navigation/header";
import Meta from "../meta";

export default function Layout({ children, header }) {
  return (
    <>
      <Meta />
      {header && <Header menu={header} />}
      {children}
      <Footer />
    </>
  );
}

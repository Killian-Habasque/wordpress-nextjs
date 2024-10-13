import Footer from "../blocks/navigation/footer";
import Header from "../blocks/navigation/header";
import Meta from "../seo/meta";

export default function AppLayout({ children, header }) {
  return (
    <>
      <Meta />
      {header && <Header menu={header} />}
      {children}
      <Footer />
    </>
  );
}

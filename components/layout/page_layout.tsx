import Alert from "../alert";

export default function PageLayout({ preview, children }) {
  return (
    <>
      <div className="min-h-screen">
        <Alert preview={preview} />
        <main>{children}</main>
      </div>
    </>
  );
}

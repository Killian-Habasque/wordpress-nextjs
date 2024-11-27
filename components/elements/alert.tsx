import Container from "../layouts/container";
import cn from "classnames";
import { EXAMPLE_PATH } from "../../lib/constants";

export default function Alert({ preview }) {
  if (!preview) {
    return null;
  }

  return (
    <div
      className={cn("border-b fixed w-full z-50", {
        "bg-accent-7 border-accent-7 text-white": preview,
        "bg-accent-1 border-accent-2": !preview,
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          This is a page preview.{" "}
          <a
            href="/api/exit-preview"
            className="underline hover:text-cyan duration-200 transition-colors"
          >
            Click here
          </a>{" "}
          to exit preview mode.
        </div>
      </Container>
    </div>
  );
}

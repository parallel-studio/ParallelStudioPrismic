import * as React from "react";
import { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const SvgComponent = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    width="1em"
    height="1em"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="currentColor"
      d="m435.3 267.3 11.3-11.3-11.3-11.3-168-168L256 65.4 233.4 88l11.3 11.3L385.4 240H0v32h385.4L244.7 412.7 233.4 424l22.6 22.6 11.3-11.3 168-168z"
    />
  </svg>
);
export { SvgComponent as ArrowRight };

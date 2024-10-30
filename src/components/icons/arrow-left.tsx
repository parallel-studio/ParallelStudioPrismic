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
      d="M12.7 244.7L1.4 256l11.3 11.3 168 168L192 446.6 214.6 424l-11.3-11.3L62.6 272 432 272l16 0 0-32-16 0L62.6 240 203.3 99.3 214.6 88 192 65.4 180.7 76.7l-168 168z"
    />
  </svg>
);
export { SvgComponent as ArrowLeft };

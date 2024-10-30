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
    width="1em"
    height="1em"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <defs>
      <filter id="whiteBackgroundFilter" width="100%" height="100%" x={0} y={0}>
        <feFlood floodColor="#fff" floodOpacity={0.3} result="bg" />
        <feComposite in="bg" in2="SourceGraphic" />
      </filter>
    </defs>
  </svg>
);
export { SvgComponent as BackdropFilter };

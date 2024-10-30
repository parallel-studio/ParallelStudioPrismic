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
            d="m224 374.6 11.3-11.3 160-160 11.3-11.3-22.6-22.6-11.3 11.3L224 329.4 75.3 180.7 64 169.4 41.4 192l11.3 11.3 160 160 11.3 11.3z"
        />
    </svg>
);
export { SvgComponent as AngleDown };

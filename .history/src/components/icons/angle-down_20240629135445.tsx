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
            d="m224 371.3 5.7-5.7 176-176 5.7-5.7-11.4-11.2-5.7 5.7L224 348.7 53.7 178.3l-5.7-5.6L36.7 184l5.7 5.7 176 176 5.7 5.7z"
        />
    </svg>
);
export { SvgComponent as AngleDown };

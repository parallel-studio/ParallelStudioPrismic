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
        viewBox="0 0 22.5 23.5" // Add the viewBox attribute
        fill="currentColor"
        aria-labelledby={titleId}
        {...props}
    >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
            stroke="#fff"
            strokeLinecap="square"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M6.758 17.243 12.001 12m0 0 5.243-5.243M12 12 6.758 6.757M12.001 12l5.243 5.243"
        />
    </svg>
);
export { SvgComponent as Close };

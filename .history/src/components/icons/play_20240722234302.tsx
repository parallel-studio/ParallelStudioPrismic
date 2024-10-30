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
}: SVGProps<SVGSVGElement> & SVGRProps) => {
    const pathRef = React.useRef<SVGPathElement>(null);
    const [viewBox, setViewBox] = React.useState<string>("0 0 16 16");

    React.useEffect(() => {
        if (pathRef.current) {
            const pathBBox = pathRef.current.getBBox();
            const newViewBox = `${pathBBox.x} ${pathBBox.y} ${pathBBox.width} ${pathBBox.height}`;
            setViewBox(newViewBox);
        }
    }, []);

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox={viewBox}
            preserveAspectRatio="xMidYMid meet"
            fill="none"
            aria-labelledby={titleId}
            {...props}
        >
            {title ? <title id={titleId}>{title}</title> : null}
            <path
                ref={pathRef}
                fill="currentColor"
                d="m11 7-8.25 4.764V2.236L11 7Z"
            />
        </svg>
    );
};
export { SvgComponent as Play };

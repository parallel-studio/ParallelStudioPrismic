import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import StandoutComponent from "@/components/standout";

/**
 * Props for `Standout`.
 */
export type StandoutProps = SliceComponentProps<Content.StandoutSlice>;

/**
 * Component for "Standout" Slices.
 */
const Standout = (props: StandoutProps): JSX.Element => {
    const { slice } = props;
    const { text, link, link_label, color } = slice.primary;

    return (
        <StandoutComponent
            text={text}
            link={link}
            linkLabel={link_label}
            color={color}
            as={"section"}
        />
    );
};

export default Standout;

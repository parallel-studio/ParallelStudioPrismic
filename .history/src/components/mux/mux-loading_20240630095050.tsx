import { CSSProperties, FC } from "react";

type MuxLoadingProps = {
    className?: string;
    style?: CSSProperties;
};

export const MuxLoading: FC<MuxLoadingProps> = ({ className, style }) => {
    return (
        <div
            className={className}
            style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
            }}
        ></div>
    );
};

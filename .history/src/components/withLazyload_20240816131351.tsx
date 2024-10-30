// withLazyLoad.tsx
import useIntersectionObserver from "@/lib/useIntersectionObserver";
import React, { ComponentType, useEffect, useState } from "react";

const withLazyLoad = <P extends object>(
    WrappedComponent: ComponentType<P>,
    threshold = 0.5
): React.FC<P> => {
    return (props: P) => {
        const [isInView, ref] = useIntersectionObserver(threshold);
        const [hasLoaded, setHasLoaded] = useState(false);
        useEffect(() => {
            if (isInView && !hasLoaded) {
                setHasLoaded(true);
            }
        }, [isInView, hasLoaded]);
        return (
            <div ref={ref}>
                {hasLoaded ? (
                    <WrappedComponent {...props} />
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        );
    };
};
export default withLazyLoad;

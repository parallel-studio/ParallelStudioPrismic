"use client";

import { SliceZone } from "@prismicio/react";
import { SliceSimulator } from "@slicemachine/adapter-next/simulator";

import { components } from "@/slices";

export default function SliceSimulatorPage() {
    console.log("CMPOONENTS", components);
    return (
        <SliceSimulator
            sliceZone={(props) => {
                console.log(props);
                return (
                    <SliceZone
                        {...props}
                        components={components}
                        context={{ clientOnly: true }}
                    />
                );
            }}
        />
    );
}

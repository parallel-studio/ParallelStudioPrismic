import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(useGSAP, ScrollToPlugin);

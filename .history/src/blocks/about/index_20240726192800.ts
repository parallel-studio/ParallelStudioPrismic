import dynamic from "next/dynamic";

const About = dynamic(() => import("./about").then((mod) => mod.About));

export default About;

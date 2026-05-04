"use client";
import AOS from "aos";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import "aos/dist/aos.css";
export function AosInit() {
    const pathname = usePathname();
    useEffect(() => {
        AOS.init({
            duration: 750,
            easing: "ease-out-cubic",
            once: true,
            offset: 60,
            delay: 0,
        });
    }, []);
    useEffect(() => {
        queueMicrotask(() => {
            AOS.refresh();
        });
    }, [pathname]);
    return null;
}

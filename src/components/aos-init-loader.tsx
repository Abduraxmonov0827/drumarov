"use client";
import dynamic from "next/dynamic";
const AosInitClient = dynamic(() => import("@/components/aos-init").then((m) => ({ default: m.AosInit })), { ssr: false, loading: () => null });
export function AosInitLoader() {
    return <AosInitClient />;
}

"use client";
import { useEffect } from "react";
export function LocaleHtmlLang({ locale }: {
    locale: string;
}) {
    useEffect(() => {
        document.documentElement.lang = "uz";
    }, [locale]);
    return null;
}

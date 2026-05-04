export const mainNavPaths = [
    { href: "/", key: "home" },
    { href: "/klinika-haqida", key: "about" },
    { href: "/xizmatlar", key: "services" },
    { href: "/bolimlar", key: "departments" },
    { href: "/shifokorlar", key: "doctors" },
    { href: "/blog", key: "blog" },
    { href: "/aloqa", key: "contact" },
] as const;
export type NavKey = (typeof mainNavPaths)[number]["key"];

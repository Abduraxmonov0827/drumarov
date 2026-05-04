function escapeTelegramHtml(text: string) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
export type AppointmentTelegramPayload = {
    name: string;
    email: string;
    phone: string;
    departmentName: string;
    preferredDate: string;
    preferredTime: string;
    message?: string | null;
};
function formatAppointmentHtml(p: AppointmentTelegramPayload) {
    const msg = p.message?.trim();
    const lines = [
        "<b>🔔 Yangi qabul so‘rovi</b>",
        `<b>Klinika:</b> ${escapeTelegramHtml(process.env.NEXT_PUBLIC_SITE_NAME ?? "MedFit")}`,
        "",
        `<b>Ism:</b> ${escapeTelegramHtml(p.name)}`,
        `<b>Telefon:</b> ${escapeTelegramHtml(p.phone)}`,
        `<b>Email:</b> ${escapeTelegramHtml(p.email)}`,
        `<b>Bo‘lim:</b> ${escapeTelegramHtml(p.departmentName)}`,
        `<b>Sana:</b> ${escapeTelegramHtml(p.preferredDate)}`,
        `<b>Vaqt:</b> ${escapeTelegramHtml(p.preferredTime)}`,
    ];
    if (msg) {
        lines.push("", `<b>Xabar:</b> ${escapeTelegramHtml(msg)}`);
    }
    return lines.join("\n");
}
export async function sendAppointmentTelegramNotice(payload: AppointmentTelegramPayload) {
    const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
    const chatsRaw = process.env.TELEGRAM_CHAT_ID?.trim() ?? process.env.TELEGRAM_CHAT_IDS?.trim();
    if (!token || !chatsRaw)
        return;
    const chatIds = chatsRaw
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean);
    const text = formatAppointmentHtml(payload);
    await Promise.allSettled(chatIds.map(async (chatId) => {
        const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text,
                parse_mode: "HTML",
                disable_web_page_preview: true,
            }),
        });
        if (!res.ok) {
            const body = await res.text().catch(() => "");
            throw new Error(`Telegram ${res.status}: ${body}`);
        }
    }));
}

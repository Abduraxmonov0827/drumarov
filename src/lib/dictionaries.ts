export type Dictionary = typeof uz;
const uz = {
    nav: {
        home: "Bosh sahifa",
        about: "Klinika haqida",
        services: "Xizmatlar",
        departments: "Bo‘limlar",
        doctors: "Shifokorlar",
        blog: "Blog",
        contact: "Aloqa",
        book: "Qabulga yozilish",
    },
    mobile: {
        menu: "Menyu",
        open: "Menyuni ochish",
        close: "Yopish",
        closeOverlay: "Menyuni yopish",
    },
    footer: {
        quick: "Tezkor havolalar",
        contact: "Aloqa",
        rights: "Barcha huquqlar himoyalangan.",
    },
    social: {
        heading: "Ijtimoiy tarmoq",
        telegramChannel: "Telegram kanal",
        telegramAdmin: "Admin @medfituz",
        instagram: "Instagram",
    },
    logo: {
        homeAria: "MedFit — bosh sahifa",
        subtitle: "salomatlik markazi",
    },
    forms: {
        contact: {
            name: "Ism",
            email: "Email",
            phone: "Telefon",
            subject: "Mavzu",
            message: "Xabar",
            submit: "Yuborish",
            sending: "Yuborilmoqda…",
            okTitle: "Xabaringiz yuborildi.",
            okHint: "Tez orada javob beramiz.",
        },
        appointment: {
            name: "Ism",
            email: "Email",
            phone: "Telefon",
            department: "Bo‘lim",
            date: "Sana",
            time: "Vaqt",
            notesOptional: "Qo‘shimcha (ixtiyoriy)",
            choose: "Tanlang",
            submit: "Yuborish",
            sending: "Yuborilmoqda…",
            okTitle: "So‘rovingiz qabul qilindi.",
            okHint: "Tez orada siz bilan bog‘lanamiz.",
        },
    },
    pages: {
        contact: {
            title: "Aloqa",
            intro: "Savollar va takliflar uchun biz bilan bog‘laning. Ijtimoiy tarmoqlar orqali ham kuzatib boring.",
            phone: "Telefon",
            email: "Email",
            address: "Manzil",
            sendMessage: "Xabar yuborish",
            map: "Xarita",
            mapTitle: "Google xarita — MedFit manzili",
            mapPlaceholder: "Google Maps embed URL ni .env da NEXT_PUBLIC_MAPS_EMBED_URL orqali qo‘shing.",
        },
        appointment: {
            title: "Qabulga yozilish",
            intro: "Quyidagi formani to‘ldiring. Mutaxassislarimiz siz bilan bog‘lanishadi.",
        },
        services: {
            title: "Tibbiy xizmatlar",
            intro: "Kardiologiya, diagnostika, jarrohlik, dermatologiya va boshqa yo‘nalishlarda xizmat ko‘rsatamiz. Yangi bo‘limlar admin panel orqali saytga qo‘shilishi mumkin.",
        },
        about: {
            title: "Klinika haqida",
            p1: "{name} — hijoma (xijoma) muolajasiga ixtisoslashgan markaz. Bizning maqsadimiz — an’anaviy usullarni zamonaviy sanitariya va gigiena talablari bilan birlashtirib, har bir bemorga individual yondashuv ko‘rsatish.",
            mission: "Missiyamiz",
            missionP: "Sog‘liqni saqlash bo‘yicha ishonchli hamkor bo‘lish, shaffof maslahat va qulay muhit yaratish.",
            direction: "Yo‘nalish",
            directionP: "Hijoma sessiyalari, konsultatsiya va sog‘lomlashtirish bo‘yicha tavsiyalar — barchasi malakali mutaxassislar nazorati ostida.",
            trust: "Yutuqlar va ishonch",
            trust1: "Tajribali hijoma mutaxassislari",
            trust2: "Toza inventar va bir martalik sarflab chiqiladigan materiallar",
            trust3: "Qabul va yozilishning qulay onlayn shakli",
        },
        blog: {
            title: "Blog",
            heading: "Yangiliklar va blog",
            intro: "Klinika yangiliklari va foydali maqolalar. Yangi yozuvlar admin panel orqali qo‘shiladi.",
            empty: "Hozircha nashr etilgan maqolalar yo‘q.",
        },
        departments: {
            title: "Bo‘limlar",
            intro: "Har bir bo‘lim o‘z yo‘nalishi bo‘yicha ish yuritadi. Batafsil ma’lumot uchun bo‘lim sahifasiga o‘ting.",
        },
        doctors: {
            title: "Shifokorlar",
            intro: "Professional portret kartochkalari — ism va mutaxassislik rasmda pastki chapda. Batafsil uchun kartani bosing.",
            detail: "Batafsil",
            experience: "Tajriba",
            years: "yil",
        },
        doctorDetail: {
            back: "← Barcha shifokorlar",
            book: "Qabulga yozilish",
            department: "Bo‘lim",
            experience: "Ish tajribasi",
            moreTitle: "Batafsil",
            treatmentTitle: "Davolash yo‘nalishlari",
            fallbackTitle: "Shifokor",
        },
        departmentDetail: {
            back: "← Barcha bo‘limlar",
            servicesHeading: "Xizmatlar",
            doctorsHeading: "Shifokorlar",
            fallbackTitle: "Bo‘lim",
        },
        blogPost: {
            back: "← Blog",
        },
        home: {
            tagline: "Hijoma (xijoma) va salomatlik markazi",
            heroSpecialtyFallback: "Hijoma mutaxassisi",
            specialistShort: "Mutaxassis",
            heroBadge: "Hijoma markazi · MedFit",
            heroLead: "MedFit — an’anaviy hijoma texnikasi va zamonaviy gigiena standartlari bilan yurak-qon tomir tizimi, umumiy holat va stress bo‘yicha qo‘llab-quvvatlash.",
            heroSvgAlt: "MedFit — xonaga mos yorug‘likli akril yozuv namunasi",
            book: "Qabulga yozilish",
            directionsTitle: "Yo‘nalishlar",
            directionsSub: "Klinika bo‘limlari va xizmatlar tizimi",
            directionsHijoma: "Hijoma va bog‘liq xizmatlar",
            allDepartments: "Barcha bo‘limlar",
            allServices: "Barcha xizmatlar",
            doctorsTitle: "Shifokorlarimiz",
            doctorsIntro: "Rasmdagi kartochka — katta yumaloq burchaklar va pastki chapda ism (professional portret uslubi).",
            doctorsAll: "Barchasi",
            portraitPlaceholder: "Dr Umarov portreti uchun rasmni ../images ga qo‘ying (masalan umarov.jpg), keyin npm run sync-images ishga tushiring yoki admin panelda unga rasm URL qo‘shing.",
        },
    },
} as const;
export function getDictionary(locale: string): Dictionary {
    void locale;
    return uz;
}
export function siteDescription(): string {
    return "MedFit — hijoma (xijoma) muolajasi va salomatlik markazi. Professional jamoa, qabulga yozilish va yangiliklar.";
}

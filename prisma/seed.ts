import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
const databaseUrl = process.env.DATABASE_URL ?? "file:./prisma/dev.db";
const adapter = new PrismaBetterSqlite3({ url: databaseUrl });
const prisma = new PrismaClient({ adapter });
async function main() {
    const hash = await bcrypt.hash("admin123", 10);
    await prisma.adminUser.upsert({
        where: { email: "admin@klinika.uz" },
        update: {},
        create: {
            email: "admin@klinika.uz",
            passwordHash: hash,
            name: "Administrator",
        },
    });
    const deps = [
        {
            name: "Kardiologiya",
            slug: "kardiologiya",
            shortDescription: "Yurak-qon tomir tizimi kasalliklari diagnostikasi va davolash.",
            description: "Kardiologiya bo‘limi zamonaviy EKG, EXK, xolter monitoring va boshqa usullar bilan yurak faoliyatini baholaydi. Arterial bosim, ishemik kasallik, aritmiya va boshqa holatlarda individual reja tuziladi.",
            icon: "Heart",
            sortOrder: 1,
        },
        {
            name: "Diagnostika",
            slug: "diagnostika",
            shortDescription: "Aniq tashxis uchun laboratoriya va instrument tekshiruvlar.",
            description: "Laboratoriya tahlillari, ultratovush, rentgen va boshqa tekshiruvlar bir joyda. Natijalar tezkor va shifokor bilan maslahatlashuv imkoniyati mavjud.",
            icon: "Microscope",
            sortOrder: 2,
        },
        {
            name: "Jarrohlik",
            slug: "jarrohlik",
            shortDescription: "Rejalashtirilgan va favqulodda jarrohlik yordami.",
            description: "Malakali jarrohlar jamoasi zamonaviy operatsion xonalarda xavfsiz jarrohlik amaliyotlarini olib boradi. Reabilitatsiya bo‘yicha tavsiyalar beriladi.",
            icon: "Scissors",
            sortOrder: 3,
        },
        {
            name: "Dermatologiya",
            slug: "dermatologiya",
            shortDescription: "Teri, tirnoq va soch kasalliklari.",
            description: "Dermatovenerolog teri holatini ko‘rib chiqadi, dermatoskopiya va boshqa usullarni qo‘llaydi. Kosmetik dermatologiya xizmatlari ham mavjud.",
            icon: "Sparkles",
            sortOrder: 4,
        },
    ];
    for (const d of deps) {
        await prisma.department.upsert({
            where: { slug: d.slug },
            update: d,
            create: d,
        });
    }
    const kardio = await prisma.department.findUniqueOrThrow({
        where: { slug: "kardiologiya" },
    });
    const diag = await prisma.department.findUniqueOrThrow({
        where: { slug: "diagnostika" },
    });
    const services = [
        {
            name: "Konsultatsiya",
            slug: "konsultatsiya",
            description: "Mutaxassis bilan dastlabki qabul va tavsiyalar.",
            sortOrder: 1,
            departmentId: kardio.id,
        },
        {
            name: "EKG va yurak monitoringi",
            slug: "ekg-monitoring",
            description: "Yurak ritmi va o‘tkazuvchanlikni baholash.",
            sortOrder: 2,
            departmentId: kardio.id,
        },
        {
            name: "Laboratoriya tahlillari",
            slug: "laboratoriya",
            description: "Qon, siydik va boshqa namunalarning to‘liq spektri.",
            sortOrder: 3,
            departmentId: diag.id,
        },
        {
            name: "Ultratovush tekshiruvi",
            slug: "uzi",
            description: "Ichki organlarning noinvaziv vizualizatsiyasi.",
            sortOrder: 4,
            departmentId: diag.id,
        },
    ];
    for (const s of services) {
        await prisma.service.upsert({
            where: { slug: s.slug },
            update: s,
            create: s,
        });
    }
    const doctors = [
        {
            name: "Dr. Azimov Sardor",
            slug: "azimov-sardor",
            specialty: "Kardiolog",
            bio: "15 yillik tajriba, yurak kasalliklari bo‘yicha EKG va EXK mutaxassisi.",
            bioDetailed: "Dr. Azimov respublika va xalqaro konferensiyalar ishtirokchisi. Ishemik yurak kasalligi, aritmiya va yurak yetishmovchiligi bo‘yicha davolash rejalarini tuzadi.",
            imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
            email: "s.azimov@klinika.uz",
            phone: "+998 90 000 00 01",
            experienceYears: 15,
            treatmentAreas: "Ishemik kasallik, arterial gipertoniya, aritmiya",
            departmentId: kardio.id,
            sortOrder: 1,
        },
        {
            name: "Dr. Karimova Dilnoza",
            slug: "karimova-dilnoza",
            specialty: "Dermatolog",
            bio: "Teri kasalliklari, allergik reaksiyalar va kosmetik dermatologiya.",
            bioDetailed: "Dr. Karimova dermatoskopiya va zamonaviy terapiya usullaridan foydalanadi. Psoriasis, ekzema va akne davolashda keng tajribaga ega.",
            imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
            email: "d.karimova@klinika.uz",
            phone: "+998 90 000 00 02",
            experienceYears: 12,
            treatmentAreas: "Akne, psoriaz, allergik dermatit",
            departmentId: (await prisma.department.findUniqueOrThrow({ where: { slug: "dermatologiya" } }))
                .id,
            sortOrder: 2,
        },
    ];
    for (const doc of doctors) {
        await prisma.doctor.upsert({
            where: { slug: doc.slug },
            update: doc,
            create: doc,
        });
    }
    await prisma.blogPost.upsert({
        where: { slug: "klinikada-yangi-diagnostika" },
        update: {},
        create: {
            title: "Klinikada yangi diagnostika liniyasi ishga tushdi",
            slug: "klinikada-yangi-diagnostika",
            excerpt: "Tezroq va aniqroq natijalar uchun zamonaviy uskunalar o‘rnatildi.",
            content: "Bizning klinikamizda yangi avlod laboratoriya va diagnostika jihozlari ishga tushirildi. Bu bemorlarga tekshiruv vaqti qisqarishi va tashxis aniqligi oshishini ta’minlaydi.\n\nBatafsil ma’lumot uchun qabulxonamizga murojaat qiling.",
            imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&fit=crop",
            status: "PUBLISHED",
            publishedAt: new Date(),
        },
    });
}
main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});

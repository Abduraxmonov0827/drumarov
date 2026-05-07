import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL o‘rnatilmagan (seed uchun Neon / Postgres URL kerak).",
  );
}
const adapter = new PrismaPg({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter });

async function main() {
  const hash = await bcrypt.hash("admin123", 10);
  await prisma.adminUser.upsert({
    where: { email: "admin@klinika.uz" },
    update: {
      passwordHash: hash,
      name: "Administrator",
    },
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
      shortDescription:
        "Yurak-qon tomir tizimi kasalliklari diagnostikasi va davolash.",
      description:
        "Kardiologiya bo‘limi zamonaviy EKG, EXK, xolter monitoring va boshqa usullar bilan yurak faoliyatini baholaydi. Arterial bosim, ishemik kasallik, aritmiya va boshqa holatlarda individual reja tuziladi.",
      icon: "Heart",
      sortOrder: 1,
    },
    {
      name: "Diagnostika",
      slug: "diagnostika",
      shortDescription:
        "Aniq tashxis uchun laboratoriya va instrument tekshiruvlar.",
      description:
        "Laboratoriya tahlillari, ultratovush, rentgen va boshqa tekshiruvlar bir joyda. Natijalar tezkor va shifokor bilan maslahatlashuv imkoniyati mavjud.",
      icon: "Microscope",
      sortOrder: 2,
    },
    {
      name: "Jarrohlik",
      slug: "jarrohlik",
      shortDescription: "Rejalashtirilgan va favqulodda jarrohlik yordami.",
      description:
        "Malakali jarrohlar jamoasi zamonaviy operatsion xonalarda xavfsiz jarrohlik amaliyotlarini olib boradi. Reabilitatsiya bo‘yicha tavsiyalar beriladi.",
      icon: "Scissors",
      sortOrder: 3,
    },
    {
      name: "Dermatologiya",
      slug: "dermatologiya",
      shortDescription: "Teri, tirnoq va soch kasalliklari.",
      description:
        "Dermatovenerolog teri holatini ko‘rib chiqadi, dermatoskopiya va boshqa usullarni qo‘llaydi. Kosmetik dermatologiya xizmatlari ham mavjud.",
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
  const jarroh = await prisma.department.findUniqueOrThrow({
    where: { slug: "jarrohlik" },
  });
  const dermat = await prisma.department.findUniqueOrThrow({
    where: { slug: "dermatologiya" },
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
    {
      name: "Tana korreksiyasi",
      slug: "tana-korreksiyasi",
      description:
        "Qomat va tana holatini yaxshilashga qaratilgan kompleks dastur.",
      sortOrder: 5,
      departmentId: diag.id,
    },
    {
      name: "Manual terapiya",
      slug: "manual-terapiya",
      description:
        "Mushak va bo‘g‘im funksiyalarini tiklash uchun qo‘l bilan davolash usullari.",
      sortOrder: 6,
      departmentId: diag.id,
    },
    {
      name: "LFK (davolovchi jismoniy mashqlar)",
      slug: "lfk-davolovchi-jismoniy-mashqlar",
      description:
        "Shifokor nazorati ostida individual davolovchi mashqlar majmuasi.",
      sortOrder: 7,
      departmentId: diag.id,
    },
    {
      name: "Diyetologiya",
      slug: "diyetologiya",
      description:
        "Sog‘lom ovqatlanish va vazn nazorati bo‘yicha shaxsiy reja.",
      sortOrder: 8,
      departmentId: diag.id,
    },
    {
      name: "Zuluk terapiyasi",
      slug: "zuluk-terapiyasi",
      description:
        "An’anaviy zuluk terapiyasi orqali qon aylanishini qo‘llab-quvvatlash.",
      sortOrder: 9,
      departmentId: kardio.id,
    },
    {
      name: "Igla terapiya",
      slug: "igla-terapiya",
      description:
        "Nuqtaviy igna qo‘yish usuli bilan sog‘lomlashtirish seanslari.",
      sortOrder: 10,
      departmentId: kardio.id,
    },
    {
      name: "Fizioterapiya",
      slug: "fizioterapiya",
      description:
        "Tok, ultratovush va boshqa fizioterapevtik usullar bilan tiklanish.",
      sortOrder: 11,
      departmentId: diag.id,
    },
    {
      name: "Sportivniy massaj",
      slug: "sportivniy-massaj",
      description:
        "Sport yuklamalaridan keyingi tiklanish uchun professional massaj.",
      sortOrder: 12,
      departmentId: diag.id,
    },
    {
      name: "Fiziologiya",
      slug: "fiziologiya",
      description:
        "Organizm funksional holatini baholash va sog‘lomlashtirish tavsiyalari.",
      sortOrder: 13,
      departmentId: diag.id,
    },
    {
      name: "Nutritsiologiya",
      slug: "nutritsiologiya",
      description:
        "Ovqatlanish odatlarini tahlil qilish va individual nutritsion yondashuv.",
      sortOrder: 14,
      departmentId: diag.id,
    },
    {
      name: "Xijama",
      slug: "xijama",
      description: "An’anaviy xijama muolajasi gigiena standartlari asosida.",
      sortOrder: 15,
      departmentId: kardio.id,
    },
    {
      name: "Giyohlar bilan davolash",
      slug: "giyohlar-bilan-davolash",
      description:
        "Tabiiy giyohlar asosidagi qo‘llab-quvvatlovchi sog‘lomlashtirish yondashuvi.",
      sortOrder: 16,
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
      specialty: "Kardiolog va fiziolog",
      bio: "Yurak-qon tomir tizimi hamda organizm funksional holatini kompleks baholaydi.",
      bioDetailed:
        "Dr. Azimov kardiologik tekshiruvlar bilan birga fiziologik yuklama ko‘rsatkichlarini tahlil qiladi. Yurak faoliyati, arterial bosim va umumiy tiklanish ko‘rsatkichlari asosida davolash rejasini tuzadi.",
      imageUrl:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
      email: "s.azimov@klinika.uz",
      phone: "+998 90 000 00 01",
      experienceYears: 15,
      treatmentAreas: "Kardiologiya, fiziologiya, EKG/EXK, aritmiya",
      departmentId: kardio.id,
      sortOrder: 1,
    },
    {
      name: "Dr. Karimova Dilnoza",
      slug: "karimova-dilnoza",
      specialty: "Diyetolog va nutritsiolog",
      bio: "Ovqatlanish, vazn nazorati va metabolik muvozanat bo‘yicha mutaxassis.",
      bioDetailed:
        "Dr. Karimova bemorning laborator ko‘rsatkichlari va kunlik ratsionini tahlil qilib, individual ovqatlanish dasturini ishlab chiqadi. Diyetologiya va nutritsiologiya yo‘nalishida uzoq yillik amaliy tajribaga ega.",
      imageUrl:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
      email: "d.karimova@klinika.uz",
      phone: "+998 90 000 00 02",
      experienceYears: 12,
      treatmentAreas: "Diyetologiya, nutritsiologiya, tana korreksiyasi",
      departmentId: dermat.id,
      sortOrder: 2,
    },
    {
      name: "Dr. Ismoilov Bekzod",
      slug: "ismoilov-bekzod",
      specialty: "Xijama va zuluk terapiyasi mutaxassisi",
      bio: "An’anaviy xijama hamda zuluk terapiyasi bo‘yicha amaliy mutaxassis.",
      bioDetailed:
        "Dr. Ismoilov xijama va zuluk terapiyasi seanslarini bemorning holatiga moslashtirib olib boradi. Muolajalar steril sharoitda va klinik protokollar asosida bajariladi.",
      imageUrl:
        "https://images.unsplash.com/photo-1612277795421-9bc7706a4a41?w=400&h=400&fit=crop",
      email: "b.ismoilov@klinika.uz",
      phone: "+998 90 000 00 03",
      experienceYears: 11,
      treatmentAreas:
        "Xijama, zuluk terapiyasi, qon aylanishini qo‘llab-quvvatlash",
      departmentId: kardio.id,
      sortOrder: 3,
    },
    {
      name: "Dr. Saidova Malika",
      slug: "saidova-malika",
      specialty: "Manual terapevt",
      bio: "Bo‘g‘im va mushak tizimidagi funksional cheklovlarni qo‘l usullari bilan davolaydi.",
      bioDetailed:
        "Dr. Saidova manual terapiya yordamida mushak spazmlari, bo‘yin-bel og‘riqlari va postural muammolarni bartaraf etish bo‘yicha individual yondashuv qo‘llaydi.",
      imageUrl:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
      email: "m.saidova@klinika.uz",
      phone: "+998 90 000 00 04",
      experienceYears: 9,
      treatmentAreas: "Manual terapiya, tana korreksiyasi, postural tiklash",
      departmentId: diag.id,
      sortOrder: 4,
    },
    {
      name: "Dr. Qodirov Jasur",
      slug: "qodirov-jasur",
      specialty: "LFK shifokori",
      bio: "Davolovchi jismoniy mashqlar orqali harakat faoliyatini tiklashga ixtisoslashgan.",
      bioDetailed:
        "Dr. Qodirov jarohat yoki surunkali og‘riqlardan keyin LFK dasturlarini ishlab chiqadi. Mashqlar bosqichma-bosqich, xavfsiz yuklama asosida olib boriladi.",
      imageUrl:
        "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop",
      email: "j.qodirov@klinika.uz",
      phone: "+998 90 000 00 05",
      experienceYears: 14,
      treatmentAreas: "LFK, reabilitatsiya, harakat funksiyasini tiklash",
      departmentId: jarroh.id,
      sortOrder: 5,
    },
    {
      name: "Dr. To‘xtayeva Mohira",
      slug: "tokhtayeva-mohira",
      specialty: "Fizioterapevt",
      bio: "Fizioterapiya muolajalari orqali tiklanish jarayonini tezlashtiradi.",
      bioDetailed:
        "Dr. To‘xtayeva tok, ultratovush va boshqa fizioterapevtik usullarni bemor holatiga moslashtirib qo‘llaydi. Surunkali og‘riqlar va mushak zo‘riqishida samarali dasturlar tuzadi.",
      imageUrl:
        "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=400&fit=crop",
      email: "m.tokhtayeva@klinika.uz",
      phone: "+998 90 000 00 06",
      experienceYears: 10,
      treatmentAreas: "Fizioterapiya, mushak og‘rig‘i, tiklanish protokollari",
      departmentId: dermat.id,
      sortOrder: 6,
    },
    {
      name: "Dr. Mirzayev Alisher",
      slug: "mirzayev-alisher",
      specialty: "Igla terapiya mutaxassisi",
      bio: "Nuqtaviy igla terapiya orqali og‘riq va funksional muammolarni kamaytiradi.",
      bioDetailed:
        "Dr. Mirzayev refleks nuqtalar bilan ishlash asosida igla terapiya seanslarini olib boradi. Muolaja asab tizimi balansini tiklash va mushak zo‘riqishini kamaytirishga qaratiladi.",
      imageUrl:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop",
      email: "a.mirzayev@klinika.uz",
      phone: "+998 90 000 00 07",
      experienceYears: 8,
      treatmentAreas: "Igla terapiya, refleksoterapiya, mushak bo‘shashtirish",
      departmentId: kardio.id,
      sortOrder: 7,
    },
    {
      name: "Dr. Rahimova Sevara",
      slug: "rahimova-sevara",
      specialty: "Sport massaji mutaxassisi",
      bio: "Sportivniy massaj va tiklanish seanslari bo‘yicha mutaxassis.",
      bioDetailed:
        "Dr. Rahimova sport yuklamalari va mushak charchoqlarida individual massaj protokollarini qo‘llaydi. Harakat amplitudasini yaxshilash va tiklanishni tezlashtirishga e’tibor qaratadi.",
      imageUrl:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
      email: "s.rahimova@klinika.uz",
      phone: "+998 90 000 00 08",
      experienceYears: 7,
      treatmentAreas: "Sportivniy massaj, mushak tiklanishi, spazm kamaytirish",
      departmentId: diag.id,
      sortOrder: 8,
    },
    {
      name: "Dr. Yo‘ldoshev Kamol",
      slug: "yuldoshev-kamol",
      specialty: "Tana korreksiyasi mutaxassisi",
      bio: "Tana biomekhanikasi va qomatni to‘g‘rilash bo‘yicha kompleks yondashuv.",
      bioDetailed:
        "Dr. Yo‘ldoshev tana korreksiyasi dasturlarini manual usullar, mashqlar va funksional baholash bilan birlashtirib olib boradi.",
      imageUrl:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
      email: "k.yuldoshev@klinika.uz",
      phone: "+998 90 000 00 09",
      experienceYears: 13,
      treatmentAreas: "Tana korreksiyasi, posture, funksional reabilitatsiya",
      departmentId: jarroh.id,
      sortOrder: 9,
    },
    {
      name: "Dr. Nabieva Shahnoza",
      slug: "nabieva-shahnoza",
      specialty: "Nutritsiolog",
      bio: "Ratsion, mikroelementlar balansi va ovqatlanish odatlarini optimallashtiradi.",
      bioDetailed:
        "Dr. Nabieva nutritsiologiya yo‘nalishida individual ovqatlanish strategiyalarini ishlab chiqadi. Maqsad — energiya, metabolizm va umumiy sog‘lomlikni yaxshilash.",
      imageUrl:
        "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=400&fit=crop",
      email: "sh.nabieva@klinika.uz",
      phone: "+998 90 000 00 10",
      experienceYears: 9,
      treatmentAreas:
        "Nutritsiologiya, ovqatlanish rejasi, metabolik qo‘llab-quvvatlash",
      departmentId: dermat.id,
      sortOrder: 10,
    },
    {
      name: "Dr. Tursunov Aziz",
      slug: "tursunov-aziz",
      specialty: "Xijama mutaxassisi",
      bio: "Xijama amaliyotida klinik gigiena va xavfsizlik protokollariga qat’iy amal qiladi.",
      bioDetailed:
        "Dr. Tursunov xijama muolajalarini individual ko‘rsatkichlar asosida rejalashtiradi. Seanslar oldidan va keyin holat nazorati orqali samaradorlikni oshiradi.",
      imageUrl:
        "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400&h=400&fit=crop",
      email: "a.tursunov@klinika.uz",
      phone: "+998 90 000 00 11",
      experienceYears: 10,
      treatmentAreas: "Xijama, umumiy sog‘lomlashtirish, tiklanish seanslari",
      departmentId: kardio.id,
      sortOrder: 11,
    },
    {
      name: "Dr. Abdullayeva Nargiza",
      slug: "abdullayeva-nargiza",
      specialty: "Fitoterapevt",
      bio: "Giyohlar bilan davolash va tabiiy sog‘lomlashtirish yondashuvlari bo‘yicha mutaxassis.",
      bioDetailed:
        "Dr. Abdullayeva fitoterapiya protokollarini bemorning umumiy holati, ovqatlanish va turmush tarzi bilan uyg‘unlashtiradi.",
      imageUrl:
        "https://images.unsplash.com/photo-1598257006458-087169a1f08d?w=400&h=400&fit=crop",
      email: "n.abdullayeva@klinika.uz",
      phone: "+998 90 000 00 12",
      experienceYears: 8,
      treatmentAreas:
        "Giyohlar bilan davolash, fitoterapiya, tabiiy qo‘llab-quvvatlash",
      departmentId: diag.id,
      sortOrder: 12,
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
      excerpt:
        "Tezroq va aniqroq natijalar uchun zamonaviy uskunalar o‘rnatildi.",
      content:
        "Bizning klinikamizda yangi avlod laboratoriya va diagnostika jihozlari ishga tushirildi. Bu bemorlarga tekshiruv vaqti qisqarishi va tashxis aniqligi oshishini ta’minlaydi.\n\nBatafsil ma’lumot uchun qabulxonamizga murojaat qiling.",
      imageUrl:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&fit=crop",
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

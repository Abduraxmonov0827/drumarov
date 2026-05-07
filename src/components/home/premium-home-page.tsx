"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarCheck,
  Clock3,
  Filter,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UsersRound,
} from "lucide-react";
import { LocalizedLink } from "@/components/localized-link";

type Doctor = {
  id: string;
  slug: string;
  name: string;
  specialty: string;
  bio: string | null;
  experienceYears: number | null;
  departmentId: string | null;
  schedule?: string | null;
};

type Service = {
  id: string;
  name: string;
  description: string | null;
};

type Department = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string | null;
  servicesCount: number;
  doctorsCount: number;
};

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  imageUrl: string | null;
};

type HomeDict = {
  tagline: string;
  heroLead: string;
  book: string;
  heroSpecialtyFallback: string;
  directionsSub: string;
};

type AppointmentDict = {
  name: string;
  phone: string;
  email: string;
  submit: string;
};

type Props = {
  dict: HomeDict;
  appointmentDict: AppointmentDict;
  doctors: Doctor[];
  services: Service[];
  departments: Department[];
  posts: Post[];
  heroPortraitSrc: string;
  doctorImages: Record<string, string>;
};

const timeline = [
  {
    title: "Asos solingan",
    subtitle: "2000",
    desc: "Xususiy amaliyotdan zamonaviy integratsiyalashgan tibbiy platformagacha.",
  },
  {
    title: "Klinik standartlar",
    subtitle: "Dalillarga asoslangan",
    desc: "Yagona protokollar, shaffof diagnostika va bemor markazidagi yondashuv.",
  },
  {
    title: "Hududiy ishonch",
    subtitle: "Barqaror o‘sish",
    desc: "Minglab davolangan bemorlar va oilalar bilan uzoq muddatli hamkorlik.",
  },
];

const revealInitial = { opacity: 0, y: 28, filter: "blur(12px)" };
const revealInView = { opacity: 1, y: 0, filter: "blur(0px)" };

export function PremiumHomePage({
  dict,
  appointmentDict,
  doctors,
  services,
  departments,
  posts,
  heroPortraitSrc,
  doctorImages,
}: Props) {
  const [serviceQuery, setServiceQuery] = useState("");
  const [doctorQuery, setDoctorQuery] = useState("");
  const [doctorAvailability, setDoctorAvailability] = useState<"all" | "today">(
    "all",
  );
  const [newsQuery, setNewsQuery] = useState("");
  const [newsCategory, setNewsCategory] = useState<
    "Barchasi" | "Davolash" | "Profilaktika" | "Yangilik"
  >("Barchasi");

  const filteredServices = useMemo(() => {
    const q = serviceQuery.trim().toLowerCase();
    if (!q) return services;
    return services.filter((service) =>
      `${service.name} ${service.description ?? ""}`.toLowerCase().includes(q),
    );
  }, [serviceQuery, services]);

  const filteredDoctors = useMemo(() => {
    const q = doctorQuery.trim().toLowerCase();
    return doctors.filter((doc) => {
      const matchesQuery =
        q.length === 0 ||
        `${doc.name} ${doc.specialty} ${doc.bio ?? ""}`.toLowerCase().includes(q);
      const matchesAvailability =
        doctorAvailability === "all" ? true : Boolean(doc.schedule);
      return matchesQuery && matchesAvailability;
    });
  }, [doctorAvailability, doctorQuery, doctors]);

  const getPostCategory = (post: Post) => {
    const text = `${post.title} ${post.excerpt ?? ""}`.toLowerCase();
    if (
      text.includes("davol") ||
      text.includes("terapi") ||
      text.includes("hijoma")
    ) {
      return "Davolash";
    }
    if (
      text.includes("profilakt") ||
      text.includes("sog'lom") ||
      text.includes("soglom")
    ) {
      return "Profilaktika";
    }
    return "Yangilik";
  };

  const filteredPosts = useMemo(() => {
    const q = newsQuery.trim().toLowerCase();
    return posts.filter((post) => {
      const category = getPostCategory(post);
      const matchesCategory = newsCategory === "Barchasi" || category === newsCategory;
      const matchesQuery =
        q.length === 0 ||
        `${post.title} ${post.excerpt ?? ""} ${category}`
          .toLowerCase()
          .includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [posts, newsCategory, newsQuery]);

  return (
    <div className="relative overflow-hidden pb-24">
      <section className="mx-auto grid max-w-7xl gap-8 px-4 pt-8 sm:px-6 lg:grid-cols-[1.04fr_0.96fr] lg:pt-14">
        <motion.div
          initial={revealInitial}
          whileInView={revealInView}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65 }}
          className="glass-card glass-border-layer rounded-3xl p-7 sm:p-9"
        >
          <span className="glass-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-sky-100">
            <ShieldCheck className="h-4 w-4" />
            Premium tibbiy xizmat
          </span>
          <h1 className="mt-5 text-balance text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            {dict.tagline}
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-sm leading-7 text-sky-100/90 sm:text-base">
            {dict.heroLead}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <LocalizedLink
                href="/qabul"
                className="btn-premium inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-slate-900"
              >
                <CalendarCheck className="h-4 w-4" />
                {dict.book}
              </LocalizedLink>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <LocalizedLink
                href="/aloqa"
                className="btn-outline inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
              >
                Aloqa markazi
                <ArrowUpRight className="h-4 w-4" />
              </LocalizedLink>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={revealInitial}
          whileInView={revealInView}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          className="relative rounded-3xl border border-white/25 bg-white/10 p-5 backdrop-blur-xl"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute -right-4 top-5 glass-chip rounded-2xl px-4 py-3 text-xs text-white"
          >
            <p className="font-medium">24/7 muvofiqlashtirish</p>
            <p className="mt-1 text-sky-100/80">10 daqiqagacha javob</p>
          </motion.div>
          <Image
            src={heroPortraitSrc}
            alt="Lead clinic doctor"
            width={640}
            height={760}
            className="h-[24rem] w-full rounded-[1.6rem] object-cover sm:h-[30rem]"
            priority
          />
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/35 bg-slate-900/40 p-4 backdrop-blur-xl"
          >
            <p className="text-sm font-semibold text-white">
              {doctors[0]?.name ?? "Dr. Umarov"}
            </p>
            <p className="text-xs text-sky-100/85">
              {doctors[0]?.specialty ?? dict.heroSpecialtyFallback}
            </p>
          </motion.div>
        </motion.div>
      </section>

      <section className="mx-auto mt-6 grid max-w-7xl grid-cols-2 gap-4 px-4 sm:px-6 lg:grid-cols-4">
        {[
          { n: "8.3k+", t: "Mamnun bemorlar" },
          { n: `${doctors.length}+`, t: "Tajribali shifokorlar" },
          { n: `${departments.length}+`, t: "Tibbiy bo‘limlar" },
          { n: "10+", t: "Ishonch yillari" },
        ].map((item, idx) => (
          <motion.article
            key={item.t}
            initial={revealInitial}
            whileInView={revealInView}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: idx * 0.08, duration: 0.6 }}
            whileHover={{ y: -6 }}
            className="glass-soft rounded-3xl p-5 text-center"
          >
            <p className="text-3xl font-semibold text-white">{item.n}</p>
            <p className="mt-1 text-xs text-sky-100/85">{item.t}</p>
          </motion.article>
        ))}
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={revealInitial}
          whileInView={revealInView}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          className="relative rounded-[2rem] border border-white/25 bg-gradient-to-br from-slate-900/60 via-blue-900/40 to-cyan-900/30 p-7 sm:p-8"
        >
          <div className="absolute left-6 top-1/2 hidden h-px w-[calc(100%-3rem)] -translate-y-1/2 border-t border-dashed border-white/30 lg:block" />
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Tarix va missiya
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-sky-100/85">{dict.directionsSub}</p>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {timeline.map((item, idx) => (
              <motion.article
                key={item.title}
                whileHover={{ y: -6 }}
                className="glass-soft relative rounded-3xl p-5"
              >
                <span className="absolute -top-3 left-5 rounded-full border border-white/30 bg-slate-900/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-sky-100">
                  0{idx + 1}
                </span>
                <p className="mt-3 text-lg font-semibold text-white">{item.title}</p>
                <p className="text-xs uppercase tracking-[0.16em] text-cyan-200">
                  {item.subtitle}
                </p>
                <p className="mt-3 text-sm leading-6 text-sky-100/85">{item.desc}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-3xl font-semibold text-white">Services</h2>
          <label className="glass-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-sky-100">
            <Search className="h-4 w-4" />
            <input
              value={serviceQuery}
              onChange={(e) => setServiceQuery(e.target.value)}
              placeholder="Xizmat qidirish"
              className="w-40 bg-transparent text-sm text-white placeholder:text-sky-100/70 focus:outline-none"
            />
          </label>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {filteredServices.map((service, idx) => (
            <motion.article
              key={service.id}
              initial={revealInitial}
              whileInView={revealInView}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.07, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="glass-soft rounded-3xl p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xl font-semibold text-white">{service.name}</p>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-sky-100/85">
                    {service.description}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/25 bg-white/10 p-3">
                  <Stethoscope className="h-5 w-5 text-cyan-200" />
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <span className="glass-chip rounded-full px-3 py-1 text-xs text-white">
                  ${120 + idx * 20} dan
                </span>
                <LocalizedLink
                  href="/xizmatlar"
                  className="btn-outline rounded-full px-4 py-2 text-xs font-semibold text-white"
                >
                  Xizmatga yozilish
                </LocalizedLink>
              </div>
            </motion.article>
          ))}
        </div>
        {filteredServices.length === 0 ? (
          <p className="mt-4 text-sm text-sky-100/80">
            Qidiruv bo‘yicha xizmat topilmadi.
          </p>
        ) : null}
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6">
        <h2 className="text-3xl font-semibold text-white">Bo‘limlar</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {departments.map((dep, idx) => (
            <motion.article
              key={dep.id}
              initial={revealInitial}
              whileInView={revealInView}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.06, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="glass-soft rounded-3xl p-5"
            >
              <p className="text-lg font-semibold text-white">{dep.name}</p>
              <p className="mt-2 line-clamp-2 text-sm text-sky-100/85">
                {dep.shortDescription}
              </p>
              <div className="mt-4 flex items-center justify-between text-xs text-cyan-100">
                <span>{dep.doctorsCount} Shifokor</span>
                <span>{dep.servicesCount} Xizmat</span>
              </div>
              <LocalizedLink
                href={`/bolimlar/${dep.slug}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-cyan-100"
              >
                Bo‘limni ko‘rish
                <ArrowUpRight className="h-4 w-4" />
              </LocalizedLink>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-3xl font-semibold text-white">Shifokorlar</h2>
          <div className="flex flex-wrap gap-2">
            <label className="glass-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs text-sky-100">
              <Search className="h-4 w-4" />
              <input
                value={doctorQuery}
                onChange={(e) => setDoctorQuery(e.target.value)}
                placeholder="Shifokor qidirish"
                className="w-40 bg-transparent text-xs text-white placeholder:text-sky-100/70 focus:outline-none"
              />
            </label>
            <button
              type="button"
              onClick={() =>
                setDoctorAvailability((prev) => (prev === "all" ? "today" : "all"))
              }
              className="glass-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs text-sky-100"
            >
              <Filter className="h-4 w-4" />
              {doctorAvailability === "all" ? "Faqat mavjudlar" : "Barchasi"}
            </button>
          </div>
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {filteredDoctors.map((doc, idx) => {
            const src = doctorImages[doc.id] ?? "/images/doctors/doctor-placeholder.jpg";
            return (
              <motion.article
                key={doc.id}
                initial={revealInitial}
                whileInView={revealInView}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: idx * 0.05, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="glass-soft rounded-3xl p-5"
              >
                <div className="flex gap-4">
                  <Image
                    src={src}
                    alt={doc.name}
                    width={112}
                    height={112}
                    className="h-24 w-24 rounded-2xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-lg font-semibold text-white">{doc.name}</p>
                    <p className="text-sm text-cyan-100">{doc.specialty}</p>
                    <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                      <span className="glass-chip rounded-full px-3 py-1 text-sky-100">
                        <UsersRound className="mr-1 inline h-3 w-3" />
                        {doc.experienceYears ?? 5}+ yil tajriba
                      </span>
                      <span className="glass-chip rounded-full px-3 py-1 text-sky-100">
                        <Clock3 className="mr-1 inline h-3 w-3" />
                        {doc.schedule ?? "Dush-Shan 09:00-19:00"}
                      </span>
                      <span className="rounded-full border border-emerald-300/45 bg-emerald-300/15 px-3 py-1 text-emerald-100">
                        Bugun mavjud
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-4 line-clamp-2 text-sm leading-6 text-sky-100/85">{doc.bio}</p>
                <div className="mt-4 flex gap-3">
                  <LocalizedLink
                    href={`/shifokorlar/${doc.slug}`}
                    className="btn-outline flex-1 rounded-full px-4 py-2 text-center text-sm text-white"
                  >
                    Profilni ko‘rish
                  </LocalizedLink>
                  <LocalizedLink
                    href="/qabul"
                    className="btn-premium flex-1 rounded-full px-4 py-2 text-center text-sm font-semibold text-slate-900"
                  >
                    Qabulga yozilish
                  </LocalizedLink>
                </div>
              </motion.article>
            );
          })}
        </div>
        {filteredDoctors.length === 0 ? (
          <p className="mt-4 text-sm text-sky-100/80">
            Tanlangan filter bo‘yicha shifokor topilmadi.
          </p>
        ) : null}
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-4 sm:px-6">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_1fr]">
          <motion.article
            initial={revealInitial}
            whileInView={revealInView}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
            className="glass-card rounded-[2rem] p-6 sm:p-8"
          >
            <h3 className="text-2xl font-semibold text-white">Qabulga yozilish</h3>
            <p className="mt-2 text-sm text-sky-100/85">
              Tezkor javob, qulay vaqt tanlovi va bemor uchun sodda jarayon.
            </p>
            <div className="mt-5 space-y-3">
              <label className="floating-field">
                <input disabled placeholder=" " />
                <span>{appointmentDict.name}</span>
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="floating-field">
                  <input disabled placeholder=" " />
                  <span>{appointmentDict.phone}</span>
                </label>
                <label className="floating-field">
                  <input disabled placeholder=" " />
                  <span>{appointmentDict.email}</span>
                </label>
              </div>
              <label className="floating-field">
                <input disabled placeholder=" " />
                <span>Sana va vaqt</span>
              </label>
              <LocalizedLink
                href="/qabul"
                className="btn-premium mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-slate-900"
              >
                <Sparkles className="h-4 w-4" />
                {appointmentDict.submit}
              </LocalizedLink>
            </div>
          </motion.article>

          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-2xl font-semibold text-white">Yangiliklar</h3>
              <label className="glass-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs text-sky-100">
                <Search className="h-4 w-4" />
                <input
                  value={newsQuery}
                  onChange={(e) => setNewsQuery(e.target.value)}
                  placeholder="Yangilik qidirish"
                  className="w-36 bg-transparent text-xs text-white placeholder:text-sky-100/70 focus:outline-none"
                />
              </label>
            </div>
            <div className="mb-4 flex flex-wrap gap-2 text-xs">
              {(["Barchasi", "Davolash", "Profilaktika", "Yangilik"] as const).map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setNewsCategory(tag)}
                  className={`glass-chip rounded-full px-3 py-1 text-sky-100 ${newsCategory === tag ? "border-cyan-200/80 bg-cyan-400/20" : ""}`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredPosts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={revealInitial}
                  whileInView={revealInView}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: idx * 0.06, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="group overflow-hidden rounded-3xl border border-white/20 bg-slate-950/35"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={post.imageUrl ?? "/images/blog/placeholder.jpg"}
                      alt={post.title}
                      width={640}
                      height={360}
                      className="h-40 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/90 to-transparent" />
                  </div>
                  <div className="p-4">
                    <p className="line-clamp-1 text-base font-semibold text-white">
                      {post.title}
                    </p>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-sky-100/80">
                      {post.excerpt}
                    </p>
                    <LocalizedLink
                      href={`/blog/${post.slug}`}
                      className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-cyan-100"
                    >
                      Maqolani o‘qish
                      <ArrowUpRight className="h-4 w-4" />
                    </LocalizedLink>
                  </div>
                </motion.article>
              ))}
            </div>
            {filteredPosts.length === 0 ? (
              <p className="mt-4 text-sm text-sky-100/80">
                Tanlangan bo‘yicha yangilik topilmadi.
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}

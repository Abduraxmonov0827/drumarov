import { PremiumHomePage } from "@/components/home/premium-home-page";
import { getDictionary } from "@/lib/dictionaries";
import {
  getPublicGalleryImages,
  pickHeroUmarovPortraitSrc,
  pickPortraitSrc,
} from "@/lib/local-images";
import { prisma } from "@/lib/prisma";
import { site } from "@/lib/site";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const h = dict.pages.home;

  const [doctors, services, departments, galleryImages, posts] =
    await Promise.all([
      prisma.doctor.findMany({
        orderBy: { sortOrder: "asc" },
        include: { department: true },
      }),
      prisma.service.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.department.findMany({
        orderBy: { sortOrder: "asc" },
        include: { services: true },
      }),
      Promise.resolve(getPublicGalleryImages()),
      prisma.blogPost.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
      }),
    ]);

  const heroPortraitSrc = pickHeroUmarovPortraitSrc(doctors, galleryImages);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: site.name,
    url: "https://drumarov-wskx.vercel.app/uz",
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressCountry: "UZ",
    },
  };

  const doctorImages = Object.fromEntries(
    doctors.map((doctor, idx) => [
      doctor.id,
      pickPortraitSrc(doctor, galleryImages, idx) ??
        "/images/doctors/doctor-placeholder.jpg",
    ]),
  );

  const preparedDoctors = doctors.map((doc) => ({
    id: doc.id,
    slug: doc.slug,
    name: doc.name,
    specialty: doc.specialty,
    bio: doc.bio,
    experienceYears: doc.experienceYears,
    departmentId: doc.departmentId,
  }));

  const preparedServices = services.map((service) => ({
    id: service.id,
    name: service.name,
    description: service.description,
  }));

  const preparedDepartments = departments.map((dep) => ({
    id: dep.id,
    slug: dep.slug,
    name: dep.name,
    shortDescription: dep.shortDescription,
    servicesCount: dep.services.length,
    doctorsCount: doctors.filter((d) => d.departmentId === dep.id).length,
  }));

  const preparedPosts = posts.map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    imageUrl: post.imageUrl,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PremiumHomePage
        dict={h}
        appointmentDict={dict.forms.appointment}
        doctors={preparedDoctors}
        services={preparedServices}
        departments={preparedDepartments}
        posts={preparedPosts}
        heroPortraitSrc={heroPortraitSrc ?? "/images/doctors/doctor-placeholder.jpg"}
        doctorImages={doctorImages}
      />
    </>
  );
}

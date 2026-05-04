import Image from "next/image";
import { saveDoctor } from "@/app/actions/admin-mutations";
import { isLocalUploadPath } from "@/lib/save-uploaded-image";
import { prisma } from "@/lib/prisma";
type DoctorRow = NonNullable<
  Awaited<ReturnType<typeof prisma.doctor.findUnique>>
>;
export async function DoctorForm({ doctor }: { doctor?: DoctorRow | null }) {
  const departments = await prisma.department.findMany({
    orderBy: { sortOrder: "asc" },
  });
  const imageUrlDefault =
    doctor?.imageUrl && !isLocalUploadPath(doctor.imageUrl)
      ? doctor.imageUrl
      : "";
  return (
    <form action={saveDoctor} className="mx-auto max-w-2xl space-y-4">
      {doctor ? <input type="hidden" name="id" value={doctor.id} /> : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-slate-700">F.I.Sh</label>
          <input
            name="name"
            required
            defaultValue={doctor?.name}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">
            Sahifa manzili (slug)
          </label>
          <p className="mt-0.5 text-xs leading-snug text-slate-500">
            Saytdagi havola oxiridagi qisqa nom, masalan{" "}
            <span className="font-mono text-slate-600">
              /shifokorlar/dr-umarov
            </span>
            . Bo‘sh qoldirsangiz, ism asosida avtomatik yaratiladi.
          </p>
          <input
            name="slug"
            defaultValue={doctor?.slug}
            placeholder="Masalan: dr-umarov yoki bo‘sh"
            className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">
            Mutaxassislik
          </label>
          <input
            name="specialty"
            required
            defaultValue={doctor?.specialty}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Bo‘lim</label>
          <select
            name="departmentId"
            defaultValue={doctor?.departmentId ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="">—</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">
            Tajriba (yil)
          </label>
          <input
            name="experienceYears"
            type="number"
            min={0}
            defaultValue={doctor?.experienceYears ?? ""}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div className="sm:col-span-2 space-y-2 rounded-lg border border-slate-200 bg-slate-50/80 p-4">
          <label className="text-sm font-medium text-slate-700">Rasm</label>
          <p className="text-xs text-slate-500">
            Hozircha faqat tashqi rasm havolasi (URL) qo‘llab-quvvatlanadi.
          </p>
          {doctor?.imageUrl ? (
            <div className="relative h-28 w-full max-w-[11rem] overflow-hidden rounded-lg border border-slate-200 shadow-sm">
              <Image
                src={doctor.imageUrl}
                alt=""
                fill
                className="object-cover object-top"
                sizes="176px"
                unoptimized
              />
            </div>
          ) : null}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Tashqi rasm havolasi (ixtiyoriy)
            </label>
            <input
              name="imageUrl"
              type="url"
              placeholder="https://..."
              defaultValue={imageUrlDefault}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
            />
          </div>
          {doctor?.imageUrl ? (
            <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                name="removeImage"
                value="1"
                className="rounded border-slate-300"
              />
              <span>Rasmni olib tashlash</span>
            </label>
          ) : null}
        </div>
        <div className="sm:col-span-2 space-y-3 rounded-lg border border-slate-200 bg-slate-50/80 p-4">
          <div>
            <p className="text-sm font-medium text-slate-700">
              Aloqa (ochiq sahifada)
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              Shifokor kartasida ko‘rinadi va bosilganda pochta / qo‘ng‘iroq
              ochiladi. Ixtiyoriy — bo‘sh qoldirsangiz, saytda chiqmaydi.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="masalan@klinika.uz"
                defaultValue={doctor?.email ?? ""}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Telefon
              </label>
              <input
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+998 …"
                defaultValue={doctor?.phone ?? ""}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-slate-700">
            Qisqa bio
          </label>
          <textarea
            name="bio"
            required
            rows={3}
            defaultValue={doctor?.bio}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-slate-700">Batafsil</label>
          <textarea
            name="bioDetailed"
            required
            rows={6}
            defaultValue={doctor?.bioDetailed}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-slate-700">
            Davolash yo‘nalishlari (matn)
          </label>
          <textarea
            name="treatmentAreas"
            required
            rows={2}
            defaultValue={doctor?.treatmentAreas}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">
            Tartib raqami
          </label>
          <input
            name="sortOrder"
            type="number"
            defaultValue={doctor?.sortOrder ?? 0}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
      </div>
      <button
        type="submit"
        className="rounded-lg bg-brand-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-accent/90"
      >
        Saqlash
      </button>
    </form>
  );
}

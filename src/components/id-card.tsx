import QRCode from "qrcode";

export async function IdCard({
  name,
  studentNumber,
  school,
  className,
}: {
  name: string;
  studentNumber: string;
  school: string;
  className: string;
}) {
  const qr = await QRCode.toDataURL(studentNumber, { margin: 1, width: 280 });
  return (
    <article className="max-w-sm rounded-[1.6rem] border bg-white p-5">
      <p className="text-xs font-bold uppercase tracking-widest text-primary">School Quest</p>
      <h2 className="font-display text-3xl mt-1">{name}</h2>
      <p className="text-sm text-muted-foreground">{school} · {className}</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={qr} alt="" className="mt-4 h-40 w-40" />
      <p className="mt-2 font-black tracking-widest">{studentNumber}</p>
    </article>
  );
}

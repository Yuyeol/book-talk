import Image from "next/image";

export default function ResponsiveImage({
  src,
  alt,
  aspectRatio,
  objectFit = "cover",
}: {
  src: string;
  alt: string;
  aspectRatio?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}) {
  return (
    <div className="relative" style={{ aspectRatio }}>
      <Image fill src={src} alt={alt} style={{ objectFit: objectFit }} />
    </div>
  );
}

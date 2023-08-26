import Image from "next/image";

export default function ResponsiveImage({
  src,
  alt,
  aspectRatio,
  objectFit = "cover",
  priority = false,
}: {
  src: string;
  alt: string;
  aspectRatio: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  priority?: boolean;
}) {
  return (
    <div className="relative" style={{ aspectRatio }}>
      <Image
        fill
        sizes="100%"
        src={src}
        alt={alt}
        style={{ objectFit: objectFit }}
        priority={priority}
      />
    </div>
  );
}

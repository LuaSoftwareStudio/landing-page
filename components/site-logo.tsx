import Image from "next/image";
import { site } from "@/lib/site";

const sources = {
  "on-light": "/brand/logo-on-light.png",
  "on-dark": "/brand/logo-on-dark.png",
} as const;

const sizes = {
  header: {
    width: 148,
    height: 55,
    className: "h-9 w-auto max-w-[118px] object-contain object-left sm:h-11 sm:max-w-[148px]",
    sizes: "148px",
  },
  footer: {
    width: 188,
    height: 70,
    className: "h-[70px] w-auto max-w-[188px] object-contain",
    sizes: "188px",
  },
} as const;

type SiteLogoProps = {
  variant?: keyof typeof sources;
  size?: keyof typeof sizes;
  priority?: boolean;
};

export function SiteLogo({
  variant = "on-light",
  size = "header",
  priority = false,
}: SiteLogoProps) {
  const frame = sizes[size];

  return (
    <a
      href="#topo"
      className="inline-flex min-h-11 items-center rounded-sm"
      aria-label={`${site.name}, ir para o início`}
    >
      <Image
        src={sources[variant]}
        alt=""
        width={frame.width}
        height={frame.height}
        priority={priority}
        className={frame.className}
        sizes={frame.sizes}
        style={{ width: "auto" }}
      />
    </a>
  );
}

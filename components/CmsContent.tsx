import { PortableText, type PortableTextBlock } from "@portabletext/react";
import Image from "next/image";
import { imageCaption, imageUrl } from "@/lib/images";
import { safeHref, isExternal, type CmsImage } from "@/lib/site-types";

export type RichBlock = PortableTextBlock | (CmsImage & { _type: "image"; _key: string });
export function CmsContent({ value }: { value?: RichBlock[] }) {
  if (!value?.length) return null;
  return (
    <div className="space-y-4 leading-8 text-brand-muted">
      <PortableText
        value={value}
        components={{
          block: {
            h2: ({ children }) => <h2 className="text-2xl font-semibold text-brand-ink">{children}</h2>,
            h3: ({ children }) => <h3 className="text-xl font-semibold text-brand-ink">{children}</h3>
          },
          list: {
            bullet: ({ children }) => <ul className="list-disc space-y-2 pl-6">{children}</ul>,
            number: ({ children }) => <ol className="list-decimal space-y-2 pl-6">{children}</ol>
          },
          marks: {
            link: ({ value, children }) => {
              const href = safeHref(value?.href);
              return href ? (
                <a
                  className="font-medium text-brand-forest underline"
                  href={href}
                  target={isExternal(href) ? "_blank" : undefined}
                  rel={isExternal(href) ? "noopener noreferrer" : undefined}
                >
                  {children}
                </a>
              ) : (
                <>{children}</>
              );
            }
          },
          types: {
            image: ({ value }) => {
              const src = imageUrl(value);
              return src ? (
                <figure>
                  <Image src={src} alt={value.alt} width={1400} height={900} sizes="(min-width: 1024px) 960px, 100vw" className="h-auto w-full rounded-md" />
                  {imageCaption(value) && (
                    <figcaption className="bg-brand-evergreen p-3 text-sm text-white">{imageCaption(value)}</figcaption>
                  )}
                </figure>
              ) : null;
            }
          }
        }}
      />
    </div>
  );
}

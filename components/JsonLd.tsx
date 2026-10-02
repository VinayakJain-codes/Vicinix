export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vicinix",
    legalName: "Vicinix Technologies",
    url: "https://vicinix.co.in",
    logo: "https://vicinix.co.in/favicon.ico",
    description:
      "Sovereign technology company engineering software across Security Operations, Modern Finance, and IT Enterprise Logistics.",
    founder: {
      "@type": "Person",
      name: "Vinayak Jain",
      url: "https://linkedin.com/in/vinayak-jain-1786b9357/",
    },
    sameAs: [
      "https://linkedin.com/company/vicinix",
      "https://github.com/VinayakJain-codes",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductJsonLd({
  name,
  description,
  url,
  category,
  price,
}: {
  name: string;
  description: string;
  url: string;
  category: string;
  price?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${name} by Vicinix`,
    applicationCategory: category,
    operatingSystem: "Web, Cloud, Android, iOS",
    description: description,
    url: url,
    brand: {
      "@type": "Brand",
      name: "Vicinix",
    },
    offers: {
      "@type": "Offer",
      price: price ? price.replace(/[^0-9]/g, "") || "0" : "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

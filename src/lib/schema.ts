export interface LocalBusinessSchema {
  name: string;
  url: string;
  telephone: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  openingHours: string[];
}

export interface WebPageSchema {
  name: string;
  description: string;
  url: string;
}

export interface BlogPostingSchema {
  headline: string;
  author: string;
  datePublished: string;
  dateModified: string;
  image: string;
  url?: string;
  description?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export function localBusinessSchema(data: LocalBusinessSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: data.name,
    url: data.url,
    telephone: data.telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: data.address.streetAddress,
      addressLocality: data.address.addressLocality,
      addressRegion: data.address.addressRegion,
      postalCode: data.address.postalCode,
      addressCountry: data.address.addressCountry,
    },
    openingHoursSpecification: data.openingHours.map((hours) => ({
      '@type': 'OpeningHoursSpecification',
      description: hours,
    })),
  };
}

export function webPageSchema(data: WebPageSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: data.name,
    description: data.description,
    url: data.url,
  };
}

export function blogPostingSchema(data: BlogPostingSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: data.headline,
    author: {
      '@type': 'Person',
      name: data.author,
    },
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    image: data.image,
    ...(data.url && { url: data.url }),
    ...(data.description && { description: data.description }),
  };
}

export function faqPageSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
  robots?: string;
}

export function SEO({
  title = 'Seasons - Alternative, Onchain Yield Platform | Solana DeFi',
  description = 'Seasons is a Solana-based yield platform offering real-time portfolio tracking, governance participation, and onchain rewards for $SEAS token holders. Track your DeFi holdings with advanced analytics.',
  keywords = 'Solana, DeFi, yield farming, cryptocurrency, $SEAS token, blockchain, portfolio management, Solana yield, crypto rewards, governance, onchain yield',
  author = 'Seasons Team',
  ogTitle,
  ogDescription,
  ogImage = 'https://seasons.finance/og-image.jpg',
  ogUrl = 'https://seasons.finance',
  twitterCard = 'summary_large_image',
  twitterTitle,
  twitterDescription,
  twitterImage,
  canonical,
  robots = 'index, follow',
}: SEOProps) {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper function to set or update meta tags
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}=\"${name}\"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Helper function to set link tags
    const setLinkTag = (rel: string, href: string, attributes?: Record<string, string>) => {
      let element = document.querySelector(`link[rel=\"${rel}\"][href=\"${href}\"]`);
      
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        element.setAttribute('href', href);
        document.head.appendChild(element);
      }
      
      // Always update attributes (for existing and new elements)
      if (attributes) {
        Object.entries(attributes).forEach(([key, value]) => {
          element!.setAttribute(key, value);
        });
      }
    };

    // Basic meta tags
    setMetaTag('charset', 'UTF-8');
    setMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=5.0');
    setMetaTag('description', description);
    setMetaTag('keywords', keywords);
    setMetaTag('author', author);
    setMetaTag('robots', robots);

    // Additional SEO meta tags
    setMetaTag('format-detection', 'telephone=no');
    setMetaTag('apple-mobile-web-app-capable', 'yes');
    setMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');
    setMetaTag('apple-mobile-web-app-title', 'Seasons');

    // Theme color for mobile browsers
    setMetaTag('theme-color', '#1A1A1A');
    setMetaTag('msapplication-TileColor', '#1A1A1A');
    setMetaTag('msapplication-navbutton-color', '#1A1A1A');

    // Open Graph meta tags
    setMetaTag('og:type', 'website', true);
    setMetaTag('og:site_name', 'Seasons', true);
    setMetaTag('og:title', ogTitle || title, true);
    setMetaTag('og:description', ogDescription || description, true);
    setMetaTag('og:image', ogImage, true);
    setMetaTag('og:image:width', '1200', true);
    setMetaTag('og:image:height', '630', true);
    setMetaTag('og:image:alt', 'Seasons - Alternative, Onchain Yield Platform', true);
    setMetaTag('og:url', ogUrl, true);
    setMetaTag('og:locale', 'en_US', true);

    // Twitter Card meta tags
    setMetaTag('twitter:card', twitterCard);
    setMetaTag('twitter:title', twitterTitle || ogTitle || title);
    setMetaTag('twitter:description', twitterDescription || ogDescription || description);
    setMetaTag('twitter:image', twitterImage || ogImage);
    setMetaTag('twitter:image:alt', 'Seasons - Alternative, Onchain Yield Platform');
    setMetaTag('twitter:site', '@SeasonsFinance');
    setMetaTag('twitter:creator', '@SeasonsFinance');

    // Canonical URL
    if (canonical) {
      setLinkTag('canonical', canonical);
    } else {
      setLinkTag('canonical', ogUrl);
    }

    // Favicon
    setLinkTag('icon', '/favicon.ico');
    setLinkTag('apple-touch-icon', '/apple-touch-icon.png');
    
    // PWA Manifest
    setLinkTag('manifest', '/manifest.json');

    // Preconnect to external domains for performance with proper crossorigin
    setLinkTag('preconnect', 'https://fonts.googleapis.com', { crossorigin: 'anonymous' });
    setLinkTag('preconnect', 'https://fonts.gstatic.com', { crossorigin: 'anonymous' });

    // DNS prefetch for faster resource loading
    setLinkTag('dns-prefetch', 'https://api.seasons.finance');

    // Load fonts with proper crossorigin attribute to avoid CORS issues
    const fontUrls = [
      'https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600&display=swap',
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
    ];
    
    // Remove ALL existing font stylesheets to force clean reload
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href.includes('fonts.googleapis.com') || href.includes('fonts.gstatic.com'))) {
        link.remove();
      }
    });
    
    // Add fonts with proper crossorigin and media attributes to prevent blocking
    fontUrls.forEach((url, index) => {
      const element = document.createElement('link');
      element.setAttribute('rel', 'stylesheet');
      element.setAttribute('href', url);
      element.setAttribute('crossorigin', 'anonymous');
      element.setAttribute('media', 'print');
      element.setAttribute('onload', "this.media='all'");
      
      // Insert at the beginning of head to load early
      if (document.head.firstChild) {
        document.head.insertBefore(element, document.head.firstChild);
      } else {
        document.head.appendChild(element);
      }
    });

    // Structured Data (JSON-LD) for rich snippets
    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        // Organization Schema
        {
          '@type': 'Organization',
          '@id': 'https://seasons.finance/#organization',
          name: 'Seasons',
          url: 'https://seasons.finance',
          logo: {
            '@type': 'ImageObject',
            url: 'https://seasons.finance/logo.png',
            width: 512,
            height: 512,
          },
          sameAs: [
            'https://x.com/SEAS_onchain',
            'https://t.me/SeasonsCommunity',
            'https://www.linkedin.com/company/seasons-seas',
            'https://www.youtube.com/@SEAS_onchain',
            'https://medium.com/seasons-blog',
            'https://seasons.gitbook.io/seasons-docs',
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Support',
            url: 'https://seasons.finance/faq',
          },
        },
        // WebSite Schema
        {
          '@type': 'WebSite',
          '@id': 'https://seasons.finance/#website',
          url: 'https://seasons.finance',
          name: 'Seasons',
          description: description,
          publisher: {
            '@id': 'https://seasons.finance/#organization',
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: 'https://seasons.finance/?s={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
          },
        },
        // WebApplication Schema
        {
          '@type': 'WebApplication',
          '@id': 'https://seasons.finance/#webapp',
          name: 'Seasons Dashboard',
          url: ogUrl,
          description: description,
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'Web Browser, iOS, Android',
          browserRequirements: 'Requires JavaScript. Requires HTML5.',
          offers: {
            '@type': 'Offer',
            category: 'DeFi Platform',
            price: '0',
            priceCurrency: 'USD',
          },
          author: {
            '@id': 'https://seasons.finance/#organization',
          },
          featureList: [
            'Real-time portfolio tracking',
            'Yield node management',
            'Governance participation',
            'Asset composition monitoring',
            'Onchain rewards distribution',
          ],
        },
        // BreadcrumbList Schema
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://seasons.finance',
            },
          ],
        },
      ],
    };

    let scriptElement = document.querySelector('script[type=\"application/ld+json\"]');
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptElement);
    }
    scriptElement.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, author, ogTitle, ogDescription, ogImage, ogUrl, twitterCard, twitterTitle, twitterDescription, twitterImage, canonical, robots]);

  return null;
}
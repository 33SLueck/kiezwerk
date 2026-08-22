export interface NavItem {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: NavItem[];
}

export const navigationConfig = {
  business: {
    navItems: [
      { label: 'Start', href: '/' },
      { label: 'Leistungen', href: '/leistungen' },
      { label: 'Projekte', href: '/projekte' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Anfrage', href: '/anfrage' },
      { label: 'Kontakt', href: '/kontakt' },
    ] as NavItem[],
    footerColumns: [
      {
        title: 'Angebot',
        links: [
          { label: 'Leistungen', href: '/leistungen' },
          { label: 'Projekte', href: '/projekte' },
          { label: 'Anfrage stellen', href: '/anfrage' },
        ],
      },
      {
        title: 'Info',
        links: [
          { label: 'FAQ', href: '/faq' },
          { label: 'Kontakt', href: '/kontakt' },
          { label: 'Impressum (Demo)', href: '/impressum' },
          { label: 'Datenschutz (Demo)', href: '/datenschutz' },
        ],
      },
    ] as FooterColumn[],
  },
  shop: {
    navItems: [] as NavItem[],
    footerColumns: [] as FooterColumn[],
  },
  portfolio: {
    navItems: [] as NavItem[],
    footerColumns: [] as FooterColumn[],
  },
};

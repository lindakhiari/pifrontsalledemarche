export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  path?: string;
}

export const NavigationItems: NavigationItem[] = [
 
  
  {
    id: 'utilities',
    title: 'Gestions',
    type: 'group',
    icon: 'icon-navigation',
    children: [
     
      {
        id: 'typography',
        title: 'Evenement',
        type: 'item',
        classes: 'nav-item',
        url: '/Evenement',
        icon: 'font-size'
      },
      {
        id: 'color',
        title: 'Formation',
        type: 'item',
        classes: 'nav-item',
        url: '/Formation',
        icon: 'bg-colors'
      },
      {
        id: 'tabler',
        title: 'recommendation-chart',
        type: 'item',
        classes: 'nav-item',
        url: '/recommendation-chart',
        icon: 'dashboard',
        breadcrumbs: false
      },
      {
        id: 'tabler',
        title: 'review-chart',
        type: 'item',
        classes: 'nav-item',
        url: '/review-chart',
        icon: 'dashboard',
        breadcrumbs: false
      },
      {
        id: 'tabler',
        title: 'liste-user',
        type: 'item',
        classes: 'nav-item',
        url: '/liste-user',
        icon: 'dashboard',
        breadcrumbs: false
      },

    ]
  },

  {
    id: 'other',
    title: 'Other',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'chrome'
      },
      {
        id: 'document',
        title: 'Document',
        type: 'item',
        classes: 'nav-item',
        url: 'https://codedthemes.gitbook.io/mantis-angular/',
        icon: 'question',
        target: true,
        external: true
      }
    ]
  }
];

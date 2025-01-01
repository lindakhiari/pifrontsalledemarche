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
    title: '',
    type: 'group',
    icon: 'icon-navigation',
    children: [

      {
        id: 'Accueil',
        title: 'Accueil',
        type: 'item',
        classes: 'nav-item',
        url: 'dashboard/default',
      },
     
      {
        id: 'typography',
        title: 'Evenement',
        type: 'item',
        classes: 'nav-item',
        url: '/evenements',
      },
    
      {
        id: 'color',
        title: 'Formation',
        type: 'item',
        classes: 'nav-item',
        url: '/formations',
      },
     
      {
        id: 'tabler',
        title: 'liste-user',
        type: 'item',
        classes: 'nav-item',
        url: '/liste-user',
        breadcrumbs: false
      },

    ]
  },

 
];

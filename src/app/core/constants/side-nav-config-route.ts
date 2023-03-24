export const sideNavRoutes: Array<ISideNavRoutes> = [
  {
    title: 'Profile',
    route: '',
    isMatIcon: true,
    isSvg: false,
    icon: 'person',
    svg: ''
  },
  {
    title: 'My Points',
    route: '',
    isMatIcon: true,
    isSvg: false,
    icon: 'attach_money',
    svg: ''
  },
  {
    title: 'Bidding History',
    route: '',
    isMatIcon: true,
    isSvg: false,
    icon: 'history',
    svg: ''
  },
  {
    title: 'Game Results',
    route: '',
    isMatIcon: true,
    isSvg: false,
    icon: 'receipt_long',
    svg: ''
  },
  {
    title: 'Logout',
    route: '',
    isMatIcon: true,
    isSvg: false,
    icon: 'logout',
    svg: ''
  }
];

export interface ISideNavRoutes {
  title: string;
  route: string;
  isMatIcon: boolean;
  isSvg: boolean;
  icon: string;
  svg: string;
}

import { AppNavigation, type NavigationItem } from '@/components/app-navigation';
const links: NavigationItem[] = [
  { href: '/', label: 'Home', icon: 'dashboard' },
  { href: '/dashboard/learn', label: 'Learn', icon: 'learn' },
  { href: '/dashboard/library', label: 'Library', icon: 'library' },
  { href: '/login', label: 'Profile', icon: 'profile' },
];
export function PublicMobileNav() { return <AppNavigation items={links} />; }

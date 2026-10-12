import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Navbar from '../components/Navbar';
import CartDrawer from '../components/CartDrawer';
import Footer from '../components/Footer';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
export const metadata = { title: 'MiTech — Tecnología para lo que sigue', description: 'Tecnología seleccionada para trabajar, crear y disfrutar.' };
export default function RootLayout({ children }) {
  return <html lang="es" className={inter.variable} suppressHydrationWarning><body><Providers><Navbar /><main>{children}</main><Footer /><CartDrawer /></Providers></body></html>;
}

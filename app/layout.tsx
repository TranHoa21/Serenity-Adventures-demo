'use client';
import { usePathname } from 'next/navigation';
import { Inter } from "next/font/google";
import SideNav from '@/app/components/layout/navbar';
import Footer from '@/app/components/layout/footer';
import { Provider } from 'react-redux';
import store from './store/store'; // Import Redux store
import { useEffect } from "react"

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isChatPage = usePathname().startsWith("/chat");



  return (
    <Provider store={store}>
      <html lang="en">
        <body className={inter.className}>
          <SideNav />
          {children}
          {isChatPage ? null : <Footer />}
        </body>
      </html>
    </Provider>

  );
}

RootLayout.metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
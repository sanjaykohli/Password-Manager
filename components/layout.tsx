import React, { ReactNode } from 'react';
import Head from 'next/head';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'Password Manager'
}) => {
  return (
    <div className="min-h-screen bg-dark-bg text-dark-text">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Secure Password Manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="text-center py-4 text-dark-text opacity-50">
        © {new Date().getFullYear()} Secure Password Manager
      </footer>
    </div>
  );
};

export default Layout;

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import {
  getTranslations
} from 'next-intl/server';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
  params: {locale: string};
};

export async function generateMetadata({
  params: {locale}
}: Omit<Props, 'children'>): Promise<Metadata> {
  try {
    const t = await getTranslations({locale, namespace: 'index'});

    return {
      title: t('title'),
      description: t('desc'),
    };
  } catch (error) {
    console.error(`Failed to load translations for locale "${locale}":`, error);
    return {
      title: 'Next-Admin',
      description: 'Admin Dashboard',
    };
  }
}

export default function BasicLayout({children, params: {locale}}: Readonly<Props>) {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}

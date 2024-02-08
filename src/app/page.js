import Image from "next/image";
import '@/scss/home.scss';
import LicenseScanner from '@/components/scanner';

export default function Home() {
  return (
    <main className="container">
      <LicenseScanner></LicenseScanner>
    </main>
  );
}

import Image from "next/image";
import '@/scss/home.scss';
import Webcam from '@/components/webcam';

export default function Home() {
  return (
    <main className="container">
      <h1>License Scanner</h1>
      <Webcam></Webcam>
    </main>
  );
}

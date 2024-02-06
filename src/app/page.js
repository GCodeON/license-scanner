import Image from "next/image";
import '@/scss/home.scss';
import Webcam from '@/components/webcam';

export default function Home() {
  return (
    <main>
      <Webcam></Webcam>
    </main>
  );
}

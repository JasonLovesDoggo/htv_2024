import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="">
      <div className="mx-auto flex max-w-5xl items-center px-4">
        <div className="relative aspect-video">
          <Image
            src="/man-working-on-laptop.png"
            alt="Man working on laptop"
            width={500}
            height={500}
            className="absolute bottom-0 right-0 w-[450px] -scale-x-100 rounded-lg object-contain"
          />
          <div className="relative">
            <h1 className="mb-4 text-7xl font-bold">
              Secure, lightning-fast file storage
            </h1>
            <p className="mb-8 max-w-md text-xl">
              The power of your personal S3 bucket, with the ease of Google
              Drive.
            </p>
            <Link
              href="/files"
              className="rounded-md bg-blue-500 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-600"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;

import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="">
      <div className="mx-auto flex w-full items-center px-4">
        <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-gradient-to-r from-gray-100 to-gray-300 p-12">
          {/* <Image
            src="/gradient.webp"
            alt="idk"
            fill
            className="absolute inset-0"
          /> */}
          <Image
            src="/man-working-on-laptop.png"
            alt="Man working on laptop"
            width={500}
            height={500}
            className="absolute bottom-0 right-12 w-[450px] -scale-x-100 rounded-lg object-contain"
          />
          <div className="relative">
            <h1 className="mb-4 text-7xl font-bold">
              Secure, lightning-fast
              <br />
              file storage
            </h1>
            <p className="mb-8 text-xl">
              Unmatched speed and security—file storage made easier than ever!
            </p>
            <Link
              href="/files"
              className="rounded-md bg-zinc-800 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-zinc-900"
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

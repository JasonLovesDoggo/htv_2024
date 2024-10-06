import { Chrome, FileIcon, Terminal } from "lucide-react";

const Services = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-4xl font-bold">Management dashboard</h2>
        <p className="mb-12 text-xl">
          Easily upload and manage files from your personal S3 bucket
        </p>
        <div className="grid grid-cols-3 gap-8">
          <div className="rounded-lg border p-6">
            <FileIcon className="mb-4 h-12 w-12 text-blue-500" />
            <h3 className="mb-2 text-2xl font-semibold">
              Management dashboard
            </h3>
            <p className="text-gray-600">
              Easily upload and manage files from your personal S3 bucket
            </p>
          </div>
          <div className="rounded-lg border p-6">
            <Terminal className="mb-4 h-12 w-12 text-blue-500" />
            <h3 className="mb-2 text-2xl font-semibold">CLI tool</h3>
            <p className="text-gray-600">
              Use our CLI to upload files from your terminal
            </p>
          </div>
          <div className="rounded-lg border p-6">
            <Chrome className="mb-4 h-12 w-12 text-blue-500" />
            <h3 className="mb-2 text-2xl font-semibold">Chrome extension</h3>
            <p className="text-gray-600">
              Use our Chrome extension to upload files from your browser
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Services;

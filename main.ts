import { listObjects } from "./lib/s3";

const main = async () => {
  const results = await listObjects();

  console.log(results);
};

main();

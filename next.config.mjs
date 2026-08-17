import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Monorepo/Parent-`package-lock.json`: sonst kann Next den falschen Root wählen und Build/Styles abbrechen. */
const nextConfig = {
  outputFileTracingRoot: __dirname,
};

export default nextConfig;


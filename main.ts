import { flags } from "deno_pdf2pic/deps.ts";
import { convert } from "deno_pdf2pic/lib/pdf2pic/mod.ts";

if (import.meta.main) {
  await main()
    .then(() => Deno.exit(0))
    .catch((error) => {
      console.error(error);
      Deno.exit(1);
    });
}

async function main() {
  const parsedArgs = parseArgs(Deno.args);
  const data = await convert(parsedArgs.input, { format: parsedArgs.format });
  await Deno.writeFile(parsedArgs.output, data);
}

function parseArgs(args: string[]) {
  const parsedArgs = flags.parse(args, {
    string: ["input", "format", "output"],
  });
  if (!parsedArgs.input) {
    throw new Error("Missing input file name.");
  }

  if (
    parsedArgs.format &&
    !["jpeg", "png", "webp"].includes(parsedArgs.format.toLowerCase())
  ) {
    throw new Error("Invalid format.");
  }

  if (!parsedArgs.output) {
    throw new Error("Missing output file name.");
  }

  return {
    input: parsedArgs.input,
    format: parsedArgs.format?.toLowerCase() as "jpeg" | "png" | "webp",
    output: parsedArgs.output,
  };
}

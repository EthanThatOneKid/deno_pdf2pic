import { launch, type Page } from "deno_pdf2pic/deps.ts";

/**
 * ScreenshotOptions are the options of a screenshot.
 */
type ScreenshotOptions = Exclude<Parameters<Page["screenshot"]>[0], undefined>;

/**
 * convert converts a PDF file to a picture.
 */
export function convert(
  pdfURI: string,
  options?: ScreenshotOptions,
): Promise<Uint8Array> {
  return new Promise(
    (resolve, reject) =>
      launch()
        .then(async (browser) => {
          const page = await browser.newPage();
          await page.goto(pdfURI, { waitUntil: "load" });
          const screenshot = await page.screenshot(options);
          resolve(screenshot);
        })
        .catch((error) => reject(error)),
  );
}

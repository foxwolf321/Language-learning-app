const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const http = require("node:http");
const path = require("node:path");
const { chromium } = require("playwright");

const repoRoot = path.resolve(__dirname, "..");
const mimeTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".webmanifest", "application/manifest+json; charset=utf-8"],
]);

function startServer() {
  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, "http://127.0.0.1");
      const pathname = decodeURIComponent(url.pathname === "/" ? "/app-v36-clean-fsrs.html" : url.pathname);
      const filePath = path.normalize(path.join(repoRoot, pathname));

      if (!filePath.startsWith(path.normalize(repoRoot))) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
      }

      const data = await fs.readFile(filePath);
      res.writeHead(200, { "Content-Type": mimeTypes.get(path.extname(filePath)) || "application/octet-stream" });
      res.end(data);
    } catch (error) {
      res.writeHead(404);
      res.end(String(error && error.message ? error.message : error));
    }
  });

  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

(async () => {
  const server = await startServer();
  const { port } = server.address();
  let browser = null;
  const errors = [];

  try {
    browser = await chromium.launch({
      headless: true,
      ...(process.env.BROWSER_EXECUTABLE_PATH ? { executablePath: process.env.BROWSER_EXECUTABLE_PATH } : {}),
    });
    const page = await browser.newPage();

  page.on("console", (message) => {
    if (message.type() === "error" && !message.text().startsWith("Failed to load resource")) {
      errors.push(message.text());
    }
  });
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto(`http://127.0.0.1:${port}/app-v36-clean-fsrs.html`, { waitUntil: "networkidle" });
    await page.waitForFunction(
      () => window.__APP_V36_CLEAN_FSRS__ && window.__APP_V36_CLEAN_FSRS__.cardCount > 0,
      null,
      { timeout: 15000 },
    );

    const result = await page.evaluate(() => ({
      engineReady: window.__APP_V36_CLEAN_FSRS__.engineReady,
      engineError: window.__APP_V36_CLEAN_FSRS__.engineError,
      cardCount: window.__APP_V36_CLEAN_FSRS__.cardCount,
      engineStatus: document.getElementById("engineStatus")?.textContent || "",
    }));

    assert.equal(result.engineReady, true, result.engineError);
    assert.equal(result.engineError, "");
    assert.ok(result.cardCount > 0);
    assert.equal(errors.length, 0, errors.join("\n"));

    console.log(`v36 browser smoke: engine ready with ${result.cardCount} cards`);
  } finally {
    if (browser) await browser.close();
    server.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the GenOffice carousel at the root route", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /GenOffice 카드 뉴스/);
  assert.match(html, /genoffice-card-01-of-08\.webp/);
  assert.match(html, /genoffice-card-08-of-08\.webp/);
  assert.match(html, /방향키·스페이스키·Home·End 키로 카드를 이동/);
  assert.match(html, /이전 GenOffice 카드/);
  assert.match(html, /다음 GenOffice 카드/);
  assert.match(html, /MS Office 형식 호환 범위와 제한/);
});

test("packages all eight GenOffice web card images", async () => {
  const imageAccessChecks = Array.from({ length: 8 }, (_, index) => {
    const cardNumber = String(index + 1).padStart(2, "0");
    return access(
      new URL(
        `public/genoffice/genoffice-card-${cardNumber}-of-08.webp`,
        templateRoot,
      ),
    );
  });

  await Promise.all(imageAccessChecks);
});

test("packages the favicon requested by the root page", async () => {
  await access(new URL("public/favicon.ico", templateRoot));
});

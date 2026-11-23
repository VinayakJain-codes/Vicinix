const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

// Load the actual TypeScript with isolated environment variables and a fake SDK.
// These tests never contact EmailJS or send a message.
function loadEmail(env = {}, send = async () => ({ status: 200 })) {
  const cache = new Map();
  function load(file) {
    if (cache.has(file)) return cache.get(file);
    const source = fs.readFileSync(path.join(__dirname, "..", file), "utf8");
    const compiled = ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
    }).outputText;
    const exports = {};
    cache.set(file, exports);
    vm.runInNewContext(compiled, {
      exports,
      process: { env },
      require: (id) => {
        if (id === "@emailjs/browser") return { send };
        if (id.startsWith("@/lib/")) return load(id.replace("@/", "") + ".ts");
        throw new Error(`Unexpected dependency: ${id}`);
      },
    }, { filename: file });
    return exports;
  }
  return { ...load("lib/emailjs.ts"), ...load("lib/social-email.ts") };
}

const configured = {
  NEXT_PUBLIC_EMAILJS_SERVICE_ID: "test-service",
  NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: "test-public-key",
  NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: "test-default-template",
};
const contact = { name: "QA Example", email: "qa@example.com", department: "General Inquiry", subject: "Form test", message: "Synthetic test message." };
const enquiry = { fullName: "QA Example", email: "qa@example.com", projectType: "Business Website", budgetRange: "Flexible", timeline: "1–3 months", scopeDescription: "Synthetic project scope." };
const social = { name: "QA Example", businessName: "Sample Business", phone: "+919999999999", instagram: "", needs: "Synthetic marketing request.", budget: "" };

for (const [method, payload] of [["sendContactEmail", contact], ["sendEnquiryEmail", enquiry], ["sendSocialQuote", social]]) {
  test(`${method}: incomplete configuration never reports success or calls the SDK`, async () => {
    for (const missing of Object.keys(configured)) {
      const env = { ...configured, [missing]: "" };
      let calls = 0;
      const api = loadEmail(env, async () => { calls++; return { status: 200 }; });
      const result = await api[method](payload);
      assert.equal(result.success, false);
      assert.ok(result.error);
      assert.equal(calls, 0);
    }
  });

  test(`${method}: only SDK acceptance reports success; submitted content is included`, async () => {
    let args;
    const api = loadEmail(configured, async (...values) => { args = values; return { status: 200 }; });
    assert.equal((await api[method](payload)).success, true);
    assert.equal(args[0], "test-service");
    assert.equal(args[1], "test-default-template");
    assert.match(args[2].message, /Synthetic/);
    assert.equal(args[3].publicKey, "test-public-key");
  });

  test(`${method}: failures, network errors and rate limits never report success`, async () => {
    for (const failure of [{ status: 500 }, new Error("Network failed"), { status: 429 }]) {
      const api = loadEmail(configured, async () => { throw failure; });
      const result = await api[method](payload);
      assert.equal(result.success, false);
      if (failure.status === 429) assert.match(result.error, /minute/);
    }
    const api = loadEmail(configured, async () => ({ status: 400 }));
    assert.equal((await api[method](payload)).success, false);
  });
}

test("each form selects its dedicated template and keeps reply details", async () => {
  const calls = [];
  const api = loadEmail({ ...configured,
    NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID: "contact",
    NEXT_PUBLIC_EMAILJS_CUSTOM_SOFTWARE_TEMPLATE_ID: "enquiry",
    NEXT_PUBLIC_EMAILJS_SOCIAL_TEMPLATE_ID: "social",
  }, async (...args) => { calls.push(args); return { status: 200 }; });
  await api.sendContactEmail(contact);
  await api.sendEnquiryEmail(enquiry);
  await api.sendSocialQuote(social);
  assert.deepEqual(calls.map(args => args[1]), ["contact", "enquiry", "social"]);
  assert.equal(calls[0][2].reply_to, contact.email);
  assert.equal(calls[1][2].reply_to, enquiry.email);
  assert.equal(calls[2][2].phone, social.phone);
});

test("whitespace-only required fields are rejected before sending", async () => {
  let calls = 0;
  const api = loadEmail(configured, async () => { calls++; return { status: 200 }; });
  assert.equal((await api.sendContactEmail({ ...contact, name: "   " })).success, false);
  assert.equal((await api.sendEnquiryEmail({ ...enquiry, scopeDescription: "   " })).success, false);
  assert.equal((await api.sendSocialQuote({ ...social, needs: "   " })).success, false);
  assert.equal(calls, 0);
});

test("an enquiry template alone cannot enable the contact form", async () => {
  const api = loadEmail({ ...configured, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: "", NEXT_PUBLIC_EMAILJS_ENQUIRE_TEMPLATE_ID: "enquiry" });
  assert.equal((await api.sendContactEmail(contact)).success, false);
  assert.equal((await api.sendEnquiryEmail(enquiry)).success, true);
});

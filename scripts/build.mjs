import { execSync } from "node:child_process";

const env = { ...process.env };

function run(command) {
  execSync(command, { stdio: "inherit", env, shell: true });
}

// Workers Builds runs `npm run build`, then `npx wrangler deploy`.
// OpenNext's deploy step needs `.open-next`, which `next build` alone does not create.
// OpenNext itself calls `npm run build` for the Next.js step, so that inner call
// must stay a plain `next build` or the two commands recurse.
if (env.OPENNEXT_BUILD_PHASE === "next") {
  run("next build");
} else if (env.WORKERS_CI === "1") {
  env.OPENNEXT_BUILD_PHASE = "next";
  run("opennextjs-cloudflare build");
} else {
  run("next build");
}

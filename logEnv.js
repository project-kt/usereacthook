console.log("Build-time Environment Variables:");
Object.keys(process.env).forEach((key) => {
  console.log(`${key}=${process.env[key]}`);
});

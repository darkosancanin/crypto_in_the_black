let env = process.env.REACT_APP_ENV_PREFIX;

// if no env is specified or its explicitly set to prod then dont append any prefix
// and just use the prod api
let envPrefix = env && env !== "prod" && env !== "production" ? env : "";

export const API_BASE_URL = `https://${envPrefix}api.cryptointheblack.com`;

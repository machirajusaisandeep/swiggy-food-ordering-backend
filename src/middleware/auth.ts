import { auth } from "express-oauth2-jwt-bearer";

export const jwtCheck = auth({
  audience: process.env.AUTH0_JWT_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_JWT_BASE_URL,
  tokenSigningAlg: "RS256",
});

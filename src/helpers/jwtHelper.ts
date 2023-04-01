export function extractJwtToken(tokenString: string) {
  const tokenStart = tokenString.indexOf("_auth=") + "_auth=".length;
  const tokenEnd =
    tokenString.indexOf("; _auth_type=Bearer") !== -1
      ? tokenString.indexOf("; _auth_type=Bearer")
      : tokenString.length;
  const token = tokenString.slice(tokenStart, tokenEnd);
  return token;
}

export function baseUrl(): string {
  return (process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    ""
  );
}

export function splashUrl(slug: string): string {
  return `${baseUrl()}/e/${slug}`;
}

export function manageUrl(slug: string, token: string): string {
  return `${baseUrl()}/e/${slug}/manage/${token}`;
}

// Chrome DevTools richiede questo path quando le DevTools sono aperte.
// Rispondiamo con JSON vuoto per evitare 500 in console.
export async function GET() {
  return Response.json({}, { status: 200 });
}

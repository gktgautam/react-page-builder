import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>Welcome</h1>
      <Link href="/editor">Open Editor</Link>
    </main>
  );
}

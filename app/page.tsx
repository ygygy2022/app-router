import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <main>
        <h1 style={{ color: "white", textAlign: "center" }}>Exercise</h1>
        <h3>Create three routs</h3>
        <p>
          <Link href="/meals">/meals</Link>
        </p>
        <p>
          <Link href="/meals/share">/meals/share</Link>
        </p>
        <p>
          <Link href="/community">/community</Link>
        </p>
        <h3>Create a dynamic routs</h3>
        <p>
          <Link href="/meals/opop">/meals/some slug</Link>
        </p>
      </main>
    </>
  );
}

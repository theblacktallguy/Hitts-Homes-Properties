import Image from "next/image";

export default function MobileMenuHero() {
  return (
    <section
      className="w-full bg-center bg-no-repeat"
      style={{
        height: "300px",
        backgroundImage: "url('/heros-bg/menu-hero.jpg')",
        backgroundSize: "100% 100%",
      }}
      aria-label="Hitts Homes and Properties"
    />
  );
}
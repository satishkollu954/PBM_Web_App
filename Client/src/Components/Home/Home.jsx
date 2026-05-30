import Whatwebelive from "../Whatwebelive/whatwebelive";
import Hero from "../Hero/Hero";

export function Home() {
  return (
    <div>
      <Hero />
      {/* Section Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent" />
      <Whatwebelive />
    </div>
  );
}

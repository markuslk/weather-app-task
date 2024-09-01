// import { Architects_Daughter } from "next/font/google";

const Logo = () => {
  return (
    <div className="text-gold h-51 flex w-fit flex-shrink-0 flex-col items-start justify-center gap-y-6">
      <div className="rotate-logo-sm text-2xl/4.5 relative">
        Where is Waldo
        <span className="border-gold absolute -right-3.5 top-2.5 w-[85px] rotate-[5.6deg] border-[1.5px]" />
      </div>
      <div style={{ fontFamily: "ArchitectsDaughter" }}>
        <div className="rotate-logo-lg text-[55px]/4.5">the sun</div>
      </div>
    </div>
  );
};
export default Logo;

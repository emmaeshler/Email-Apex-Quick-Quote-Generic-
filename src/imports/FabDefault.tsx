import svgPaths from "./svg-urv4s3p1b4";

function LogoDrak() {
  return (
    <div className="col-1 h-[26.513px] ml-0 mt-0 relative row-1 w-[24px]" data-name="Logo Drak">
      <div className="absolute inset-[0_-8.33%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 26.5131">
          <g id="Logo Drak">
            <rect fill="var(--fill-0, white)" height="26.5131" rx="7.10071" width="24" x="2" />
            <path d={svgPaths.p17352e80} fill="url(#paint0_linear_31_2201)" id="Vector 39" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_31_2201" x1="15.6821" x2="7.01486" y1="3.75655" y2="19.5818">
              <stop stopColor="#FF8F1C" />
              <stop offset="1" stopColor="#9B4C13" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function IconWhite() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] ml-0 mt-0 relative row-1" data-name="icon white">
      <LogoDrak />
    </div>
  );
}

function Group() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] ml-0 mt-0 relative row-1">
      <IconWhite />
      <div className="col-1 h-[9px] ml-[14px] mt-[8px] relative row-1 w-[10px]" data-name="Vector">
        <div className="absolute inset-[-7.83%_-7.05%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.41 10.41">
            <path d={svgPaths.p3607c400} id="Vector" stroke="var(--stroke-0, #00446A)" strokeWidth="1.41" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
      <Group />
    </div>
  );
}

function UnstyledFab() {
  return (
    <div className="content-stretch flex items-center overflow-clip px-[15px] py-[12px] relative rounded-[64px] shrink-0 w-[52px]" data-name="UnstyledFab">
      <Group1 />
    </div>
  );
}

export default function FabDefault() {
  return (
    <div className="bg-[#fffefd] content-stretch flex items-center justify-center overflow-clip relative rounded-[64px] shadow-[0px_3px_5px_-1px_rgba(0,0,0,0.2),0px_6px_10px_0px_rgba(0,0,0,0.14),0px_1px_18px_0px_rgba(0,0,0,0.12)] size-full" data-name="Fab/Default">
      <UnstyledFab />
    </div>
  );
}
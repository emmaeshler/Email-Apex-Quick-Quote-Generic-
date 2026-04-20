import svgPaths from "./svg-quvoj5htcl";

function Title() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative" data-name="Title">
      <p className="css-4hzbpn flex-[1_0_0] font-['Roboto:Bold',sans-serif] font-bold leading-[1.5] min-h-px min-w-px relative text-[#303030] text-[16px] tracking-[0.15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Title
      </p>
    </div>
  );
}

function TitleBar() {
  return (
    <div className="bg-[#f3f3f3] relative shrink-0 w-full" data-name="Title bar">
      <div aria-hidden="true" className="absolute border-[#e3e3e3] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[16px] pr-[12px] py-[12px] relative w-full">
          <Title />
        </div>
      </div>
    </div>
  );
}

function Slot() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Slot">
      <div aria-hidden="true" className="absolute border border-[#a8d8ff] border-dashed inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[4px] items-center justify-center p-[2px] relative w-full">
          <div className="css-g0mm18 flex flex-col font-['Inter:Medium',sans-serif] font-[450] justify-center leading-[0] not-italic relative shrink-0 text-[#002133] text-[13px] text-center">
            <p className="css-ew64yg leading-[20px]">Content</p>
          </div>
          <div className="absolute bg-[#91d0ff] inset-0 opacity-35" data-name="background" />
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="content-stretch flex items-start p-[16px] relative w-full">
        <Slot />
      </div>
    </div>
  );
}

function UnstyledButton() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[8px] py-[6px] relative shrink-0" data-name="UnstyledButton">
      <p className="css-ew64yg font-['Roboto:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#00446a] text-[14px] tracking-[0.4px] uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
        Medium
      </p>
    </div>
  );
}

function ButtonText() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[4px] shrink-0" data-name="Button/Text">
      <UnstyledButton />
    </div>
  );
}

function UnstyledButton1() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[16px] py-[6px] relative shrink-0" data-name="UnstyledButton">
      <p className="css-ew64yg font-['Roboto:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[14px] text-white tracking-[0.4px] uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
        button
      </p>
    </div>
  );
}

function ButtonContained() {
  return (
    <div className="bg-[#c97000] content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[4px] shadow-[0px_2px_4px_-1px_rgba(0,0,0,0.2),0px_4px_5px_0px_rgba(0,0,0,0.14),0px_1px_10px_0px_rgba(0,0,0,0.12)] shrink-0" data-name="Button/Contained">
      <UnstyledButton1 />
    </div>
  );
}

function ButtonMain() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Button/Main">
      <ButtonContained />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[27px] items-start relative shrink-0">
      <ButtonText />
      <ButtonMain />
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-white h-[60px] relative shrink-0 w-full" data-name="Footer">
      <div aria-hidden="true" className="absolute border-[#e3e3e3] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end p-[16px] relative size-full">
          <Frame />
        </div>
      </div>
    </div>
  );
}

function X() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[20px] top-1/2" data-name="X">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="X">
          <path d={svgPaths.p217bd780} fill="var(--fill-0, #4A4A4A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[16px] relative shrink-0 w-[20px]" data-name="Icon">
      <X />
    </div>
  );
}

function CancelButton() {
  return (
    <div className="absolute content-stretch flex items-center justify-center px-[4px] py-[6px] right-[12px] rounded-[8px] top-[8px]" data-name="Cancel button">
      <Icon />
    </div>
  );
}

export default function BaseDialog() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-[6px] shadow-[0px_20px_20px_-8px_rgba(26,26,26,0.28)] size-full" data-name="Base Dialog">
      <TitleBar />
      <Content />
      <Footer />
      <CancelButton />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_1px_0px_0px_0px_rgba(0,0,0,0.13),inset_-1px_0px_0px_0px_rgba(0,0,0,0.17),inset_0px_-1px_0px_0px_rgba(0,0,0,0.17),inset_0px_1px_0px_0px_rgba(204,204,204,0.5)]" />
    </div>
  );
}
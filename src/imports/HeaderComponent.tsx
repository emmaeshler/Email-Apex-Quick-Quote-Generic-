import svgPaths from "./svg-nojd9ckuue";

function SpaceDashboardOutlined() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SpaceDashboardOutlined">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SpaceDashboardOutlined">
          <g id="Ellipse 1"></g>
          <path d={svgPaths.pca9b700} fill="var(--fill-0, black)" fillOpacity="0.38" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
      <SpaceDashboardOutlined />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <p className="css-ew64yg font-['Roboto:Medium',sans-serif] font-medium leading-[1.57] relative shrink-0 text-[12px] text-black tracking-[0.1px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Breadcrumb
      </p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[9px] items-center px-[10px] py-[4px] relative shrink-0">
      <Icon />
      <div className="h-[5.838px] relative shrink-0 w-[3.605px]" data-name="Vector">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.6051 5.83823">
            <path d={svgPaths.p17817280} fill="var(--fill-0, black)" fillOpacity="0.54" id="Vector" />
          </svg>
        </div>
      </div>
      <Frame6 />
    </div>
  );
}

function BreadcrumbsBar() {
  return (
    <div className="bg-[rgba(0,0,0,0.04)] content-stretch flex flex-col items-start relative rounded-[12px] shrink-0" data-name="Breadcrumbs Bar">
      <Frame7 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="css-ew64yg font-['Roboto:Regular',sans-serif] font-normal leading-[1.235] relative shrink-0 text-[#00446a] text-[34px] tracking-[0.25px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Page Title
      </p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <Frame2 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <Frame1 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <Frame />
    </div>
  );
}

function ArrowBackFilled() {
  return (
    <div className="absolute left-[-6px] size-[24px] top-[-1px]" data-name="ArrowBackFilled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="ArrowBackFilled">
          <path d={svgPaths.p1d45ae00} fill="var(--fill-0, black)" fillOpacity="0.87" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function MaskedIcon() {
  return (
    <div className="h-[22px] relative shrink-0 w-[18px]" data-name="Masked Icon">
      <ArrowBackFilled />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Content">
      <MaskedIcon />
      <p className="css-ew64yg font-['Roboto:Medium',sans-serif] font-medium leading-[26px] relative shrink-0 text-[#a0490b] text-[15px] tracking-[0.46px] uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
        export
      </p>
    </div>
  );
}

function UnstyledButton() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip px-[22px] py-[8px] relative shrink-0" data-name="UnstyledButton">
      <Content />
    </div>
  );
}

function Export() {
  return (
    <div className="relative rounded-[4px] shrink-0" data-name="Export">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit]">
        <UnstyledButton />
      </div>
      <div aria-hidden="true" className="absolute border border-[#a0490b] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-[1375px]">
      <Frame4 />
      <Export />
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10px] h-[116px] items-start left-[18px] top-[14px]">
      <BreadcrumbsBar />
      <Frame5 />
      <p className="css-ew64yg font-['Roboto:Medium',sans-serif] font-medium leading-[1.57] relative shrink-0 text-[14px] text-[rgba(0,68,137,0.5)] tracking-[0.1px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Page Subtitle
      </p>
    </div>
  );
}

export default function HeaderComponent() {
  return (
    <div className="bg-[rgba(0,0,0,0.04)] relative size-full" data-name="Header Component">
      <Frame3 />
    </div>
  );
}
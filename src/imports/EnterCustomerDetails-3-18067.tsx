import svgPaths from "./svg-22c8q3it5m";
import imgWebBrowser from "figma:asset/fc67aefe1d29b3b89a042e28295775a12ed76d2d.png";

function WebBrowser() {
  return (
    <div className="h-[54px] relative shrink-0 w-[1440px]" data-name="Web Browser">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgWebBrowser} />
    </div>
  );
}

function MenuFilled() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="MenuFilled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="MenuFilled">
          <path d={svgPaths.p21672c80} fill="var(--fill-0, #00446A)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex h-[18px] items-center relative shrink-0">
      <p className="css-4hzbpn font-['Roboto:Regular',sans-serif] font-normal h-[10px] leading-[normal] relative shrink-0 text-[9px] text-[rgba(0,0,0,0.38)] tracking-[0.18px] uppercase w-[77px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Insight2Profit
      </p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Frame7 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-white content-stretch flex gap-[10px] h-[20px] items-end pl-[15px] relative shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] shrink-0 w-[1440px]">
      <MenuFilled />
      <Frame9 />
    </div>
  );
}

function AppBarBrowser() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-0 w-[1440px]" data-name="App Bar+Browser">
      <WebBrowser />
      <Frame8 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="css-ew64yg font-['Roboto:Regular',sans-serif] font-normal leading-[1.235] relative shrink-0 text-[#00446a] text-[34px] tracking-[0.25px]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Review Quote | Q1024  `}</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <Frame3 />
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

function Frame5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <Frame />
    </div>
  );
}

function AddFilled() {
  return (
    <div className="absolute left-[-6px] size-[24px] top-[-1px]" data-name="AddFilled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="AddFilled">
          <path d={svgPaths.p21cef280} fill="var(--fill-0, #B26413)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function MaskedIcon() {
  return (
    <div className="h-[22px] relative shrink-0 w-[18px]" data-name="Masked Icon">
      <AddFilled />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Content">
      <MaskedIcon />
      <p className="css-ew64yg font-['Roboto:Medium',sans-serif] font-medium leading-[26px] relative shrink-0 text-[#a0490b] text-[15px] tracking-[0.46px] uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
        Add new quote
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

function Frame6() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-[1375px]">
      <Frame5 />
      <Export />
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10px] h-[116px] items-start left-[18px] top-[14px]">
      <Frame6 />
    </div>
  );
}

function HeaderComponent() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.04)] h-[76px] left-[-7px] overflow-clip top-[74px] w-[1441px]" data-name="Header Component">
      <Frame4 />
    </div>
  );
}

function StepperTitles() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Stepper Titles">
      <p className="css-4hzbpn font-['Roboto:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[14px] text-black tracking-[0.17px] w-[218px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Customer Details
      </p>
    </div>
  );
}

function SubStepperComponents() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-[140px]" data-name="Sub Stepper Components">
      <div className="flex h-[27px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "0", "--transform-inner-height": "43.1875" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[27px]">
            <div className="absolute inset-[-1px_-3.7%]" style={{ "--fill-0": "rgba(0, 68, 106, 1)", "--stroke-0": "rgba(0, 68, 106, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29 2">
                <path d="M1 1H28" id="Vector 10" stroke="var(--stroke-0, #00446A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <StepperTitles />
    </div>
  );
}

function Active() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="active">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="active">
          <path d={svgPaths.p3da80400} fill="var(--fill-0, #0288D1)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Typography() {
  return (
    <div className="content-stretch flex flex-col items-start px-[6px] relative shrink-0" data-name="Typography">
      <p className="css-ew64yg font-['Roboto:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#0288d1] text-[13px] tracking-[0.16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        AI Added
      </p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex items-center px-[4px] py-[3px] relative rounded-[16px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(2,136,209,0.5)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Active />
      <Typography />
    </div>
  );
}

function ChipActive() {
  return (
    <div className="bg-[rgba(192,233,255,0.5)] content-stretch flex flex-col h-[27px] items-start justify-center relative rounded-[100px] shrink-0" data-name="Chip/active">
      <Container />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0">
      <SubStepperComponents />
      <ChipActive />
    </div>
  );
}

function StepperTitles1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Stepper Titles">
      <p className="css-4hzbpn font-['Roboto:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[14px] text-[rgba(0,0,0,0.38)] tracking-[0.17px] w-[218px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Billing Address
      </p>
    </div>
  );
}

function SubStepperComponents1() {
  return (
    <div className="content-stretch flex items-center pl-[12px] relative shrink-0" data-name="Sub Stepper Components">
      <StepperTitles1 />
    </div>
  );
}

function StepperTitles2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Stepper Titles">
      <p className="css-4hzbpn font-['Roboto:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[14px] text-[rgba(0,0,0,0.38)] tracking-[0.17px] w-[218px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Shipping Information
      </p>
    </div>
  );
}

function SubStepperComponents2() {
  return (
    <div className="content-stretch flex items-center pl-[12px] relative shrink-0" data-name="Sub Stepper Components">
      <StepperTitles2 />
    </div>
  );
}

function StepperTitles3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Stepper Titles">
      <p className="css-4hzbpn font-['Roboto:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[14px] text-[rgba(0,0,0,0.38)] tracking-[0.17px] w-[218px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Contact Details
      </p>
    </div>
  );
}

function SubStepperComponents3() {
  return (
    <div className="content-stretch flex items-center pl-[12px] relative shrink-0" data-name="Sub Stepper Components">
      <StepperTitles3 />
    </div>
  );
}

function SubStepper() {
  return (
    <div className="content-stretch flex flex-col gap-[21px] items-start relative shrink-0" data-name="Sub Stepper">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.38)] border-l-[0.5px] border-solid inset-0 pointer-events-none" />
      <Frame22 />
      <SubStepperComponents1 />
      <SubStepperComponents2 />
      <SubStepperComponents3 />
    </div>
  );
}

function SubStepper1() {
  return (
    <div className="bg-[#f8f8f8] content-stretch flex flex-col items-start p-[10px] relative rounded-[6px] shrink-0" data-name="Sub Stepper">
      <SubStepper />
    </div>
  );
}

function Typography1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Typography">
      <p className="css-ew64yg font-['Roboto:Bold',sans-serif] font-bold leading-[1.5] relative shrink-0 text-[16px] text-[rgba(0,0,0,0.87)] tracking-[0.15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Customer Details
      </p>
    </div>
  );
}

function TextWithDescription() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[20px] items-start relative shrink-0" data-name="Text With Description">
      <Typography1 />
    </div>
  );
}

function LabelContainer() {
  return (
    <div className="bg-white content-stretch flex h-[2px] items-center px-[4px] relative shrink-0" data-name="Label Container">
      <div className="css-g0mm18 flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.6)] tracking-[0.15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="css-ew64yg leading-[12px]">Customer Name</p>
      </div>
    </div>
  );
}

function ArrowDropDownFilled() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="ArrowDropDownFilled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="ArrowDropDownFilled">
          <path d="M7 9.5L12 14.5L17 9.5H7Z" fill="var(--fill-0, black)" fillOpacity="0.54" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Arrow() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Arrow">
      <ArrowDropDownFilled />
    </div>
  );
}

function Active1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip py-[15px] relative shrink-0 w-full" data-name="Active">
      <div className="flex flex-[1_0_0] flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative text-[16px] text-[rgba(0,0,0,0.87)] tracking-[0.15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="css-4hzbpn leading-[24px]">Customer 001</p>
      </div>
      <Arrow />
    </div>
  );
}

function Input() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.23)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col items-start px-[12px] relative w-full">
        <LabelContainer />
        <Active1 />
      </div>
    </div>
  );
}

function SelectOutlined() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[420px]" data-name="Select/Outlined">
      <Input />
    </div>
  );
}

function LabelContainer1() {
  return (
    <div className="bg-white content-stretch flex h-[2px] items-center px-[4px] relative shrink-0" data-name="Label Container">
      <div className="css-g0mm18 flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.6)] tracking-[0.15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="css-ew64yg leading-[12px]">Hubspot Opportunity ID</p>
      </div>
    </div>
  );
}

function ArrowDropDownFilled1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="ArrowDropDownFilled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="ArrowDropDownFilled"></g>
      </svg>
    </div>
  );
}

function Arrow1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Arrow">
      <ArrowDropDownFilled1 />
    </div>
  );
}

function Active2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip py-[15px] relative shrink-0 w-full" data-name="Active">
      <div className="flex flex-[1_0_0] flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative text-[16px] text-[rgba(0,0,0,0.87)] tracking-[0.15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="css-4hzbpn leading-[24px]">1234</p>
      </div>
      <Arrow1 />
    </div>
  );
}

function Input1() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.23)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col items-start px-[12px] relative w-full">
        <LabelContainer1 />
        <Active2 />
      </div>
    </div>
  );
}

function SelectOutlined1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[420px]" data-name="Select/Outlined">
      <Input1 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[235px] items-start relative shrink-0 w-full">
      <TextWithDescription />
      <SelectOutlined />
      <SelectOutlined1 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col h-[656px] items-start overflow-x-clip overflow-y-auto relative shrink-0 w-full">
      <Frame10 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col h-[156px] items-start relative shrink-0 w-full">
      <Frame14 />
    </div>
  );
}

function Typography2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Typography">
      <p className="css-ew64yg font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-[rgba(0,0,0,0.87)] tracking-[0.15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Select Level Of Urgency
      </p>
    </div>
  );
}

function TextWithDescription1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[20px] items-start relative shrink-0" data-name="Text With Description">
      <Typography2 />
    </div>
  );
}

function SliderRail() {
  return <div className="-translate-y-1/2 absolute bg-[#00446a] h-[4px] left-0 opacity-38 right-0 rounded-[12px] top-1/2" data-name="Slider Rail" />;
}

function SliderTrack() {
  return <div className="-translate-y-1/2 absolute bg-[#00446a] h-[6px] left-0 rounded-[12px] top-1/2 w-[136px]" data-name="Slider Track" />;
}

function SliderThumb() {
  return (
    <div className="-translate-y-1/2 absolute left-[136.5px] size-[20px] top-1/2" data-name="Slider Thumb">
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(0, 68, 106, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <g id="Slider Thumb">
            <g clipPath="url(#clip0_3_18075)">
              <rect fill="var(--fill-0, #00446A)" height="20" rx="10" width="20" />
              <g filter="url(#filter0_ddd_3_18075)" id="Color">
                <circle cx="10" cy="10" fill="var(--fill-0, #00446A)" r="10" />
              </g>
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="30" id="filter0_ddd_3_18075" width="30" x="-5" y="-4">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="2.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_3_18075" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="2" />
              <feGaussianBlur stdDeviation="1" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0" />
              <feBlend in2="effect1_dropShadow_3_18075" mode="normal" result="effect2_dropShadow_3_18075" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feMorphology in="SourceAlpha" operator="erode" radius="2" result="effect3_dropShadow_3_18075" />
              <feOffset dy="3" />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
              <feBlend in2="effect2_dropShadow_3_18075" mode="normal" result="effect3_dropShadow_3_18075" />
              <feBlend in="SourceGraphic" in2="effect3_dropShadow_3_18075" mode="normal" result="shape" />
            </filter>
            <clipPath id="clip0_3_18075">
              <rect fill="white" height="20" rx="10" width="20" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function SliderHorizontal() {
  return (
    <div className="h-[44px] overflow-clip relative shrink-0 w-[293px]" data-name="Slider/Horizontal">
      <SliderRail />
      <SliderTrack />
      <SliderThumb />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex gap-[18px] items-center relative shrink-0">
      <SliderHorizontal />
      <div className="css-g0mm18 flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[0px] text-black tracking-[0.15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="css-ew64yg font-['Roboto:Bold',sans-serif] font-bold leading-[24px] text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Selected : Medium
        </p>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0">
      <TextWithDescription1 />
      <Frame18 />
    </div>
  );
}

function LabelContainer2() {
  return (
    <div className="bg-white content-stretch flex h-[2px] items-center px-[4px] relative shrink-0" data-name="Label Container">
      <div className="css-g0mm18 flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.6)] tracking-[0.15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="css-ew64yg leading-[12px]">Client Size</p>
      </div>
    </div>
  );
}

function ArrowDropDownFilled2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="ArrowDropDownFilled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="ArrowDropDownFilled">
          <path d="M7 9.5L12 14.5L17 9.5H7Z" fill="var(--fill-0, black)" fillOpacity="0.54" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Arrow2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Arrow">
      <ArrowDropDownFilled2 />
    </div>
  );
}

function Active3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip py-[15px] relative shrink-0 w-full" data-name="Active">
      <div className="flex flex-[1_0_0] flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative text-[16px] text-[rgba(0,0,0,0.87)] tracking-[0.15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="css-4hzbpn leading-[24px]">1500 Employees</p>
      </div>
      <Arrow2 />
    </div>
  );
}

function Input2() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.23)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col items-start px-[12px] relative w-full">
        <LabelContainer2 />
        <Active3 />
      </div>
    </div>
  );
}

function SelectOutlined2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[420px]" data-name="Select/Outlined">
      <Input2 />
    </div>
  );
}

function LabelContainer3() {
  return (
    <div className="bg-white content-stretch flex h-[2px] items-center px-[4px] relative shrink-0" data-name="Label Container">
      <div className="css-g0mm18 flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.6)] tracking-[0.15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="css-ew64yg leading-[12px]">Buyer</p>
      </div>
    </div>
  );
}

function ArrowDropDownFilled3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="ArrowDropDownFilled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="ArrowDropDownFilled">
          <path d="M7 9.5L12 14.5L17 9.5H7Z" fill="var(--fill-0, black)" fillOpacity="0.54" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Arrow3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Arrow">
      <ArrowDropDownFilled3 />
    </div>
  );
}

function Active4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip py-[15px] relative shrink-0 w-full" data-name="Active">
      <div className="flex flex-[1_0_0] flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative text-[16px] text-[rgba(0,0,0,0.87)] tracking-[0.15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="css-4hzbpn leading-[24px]">CISO</p>
      </div>
      <Arrow3 />
    </div>
  );
}

function Input3() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.23)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col items-start px-[12px] relative w-full">
        <LabelContainer3 />
        <Active4 />
      </div>
    </div>
  );
}

function SelectOutlined3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[420px]" data-name="Select/Outlined">
      <Input3 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center leading-[0] min-h-px min-w-px relative text-black w-[205px]">
      <div className="flex flex-[1_0_0] flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center min-h-px min-w-px relative text-[12px] tracking-[1px] uppercase w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="css-4hzbpn leading-[2.66]">Ownership structure</p>
      </div>
      <div className="css-g0mm18 flex flex-[1_0_0] flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center min-h-px min-w-px overflow-hidden relative text-[16px] text-ellipsis tracking-[0.15px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="css-g0mm18 leading-[1.5] overflow-hidden">Series C</p>
      </div>
    </div>
  );
}

function InfoBarCard() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[64px] items-start justify-center px-[16px] py-[10px] relative rounded-[4px] shrink-0 w-[420px]" data-name="Info Bar Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Frame2 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[420px]">
      <InfoBarCard />
    </div>
  );
}

function LabelContainer4() {
  return (
    <div className="bg-white content-stretch flex h-[2px] items-center px-[4px] relative shrink-0" data-name="Label Container">
      <div className="css-g0mm18 flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.6)] tracking-[0.15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="css-ew64yg leading-[12px]">Industry</p>
      </div>
    </div>
  );
}

function ArrowDropDownFilled4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="ArrowDropDownFilled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="ArrowDropDownFilled">
          <path d="M7 9.5L12 14.5L17 9.5H7Z" fill="var(--fill-0, black)" fillOpacity="0.54" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Arrow4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Arrow">
      <ArrowDropDownFilled4 />
    </div>
  );
}

function Active5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip py-[15px] relative shrink-0 w-full" data-name="Active">
      <div className="flex flex-[1_0_0] flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative text-[16px] text-[rgba(0,0,0,0.87)] tracking-[0.15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="css-4hzbpn leading-[24px]">Financial Services</p>
      </div>
      <Arrow4 />
    </div>
  );
}

function Input4() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.23)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col items-start px-[12px] relative w-full">
        <LabelContainer4 />
        <Active5 />
      </div>
    </div>
  );
}

function SelectOutlined4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[420px]" data-name="Select/Outlined">
      <Input4 />
    </div>
  );
}

function LabelContainer5() {
  return (
    <div className="bg-white content-stretch flex h-[2px] items-center px-[4px] relative shrink-0" data-name="Label Container">
      <div className="css-g0mm18 flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[12px] text-[rgba(0,0,0,0.6)] tracking-[0.15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="css-ew64yg leading-[12px]">Contract Length</p>
      </div>
    </div>
  );
}

function ArrowDropDownFilled5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="ArrowDropDownFilled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="ArrowDropDownFilled">
          <path d="M7 9.5L12 14.5L17 9.5H7Z" fill="var(--fill-0, black)" fillOpacity="0.54" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Arrow5() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Arrow">
      <ArrowDropDownFilled5 />
    </div>
  );
}

function Active6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip py-[15px] relative shrink-0 w-full" data-name="Active">
      <div className="flex flex-[1_0_0] flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative text-[16px] text-[rgba(0,0,0,0.87)] tracking-[0.15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="css-4hzbpn leading-[24px]">3 Years</p>
      </div>
      <Arrow5 />
    </div>
  );
}

function Input5() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.23)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col items-start px-[12px] relative w-full">
        <LabelContainer5 />
        <Active6 />
      </div>
    </div>
  );
}

function SelectOutlined5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[420px]" data-name="Select/Outlined">
      <Input5 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[510px] items-start relative shrink-0 w-full">
      <div className="css-g0mm18 flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.6)] tracking-[0.15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="css-ew64yg leading-[1.5]">Willingness to Pay</p>
      </div>
      <Frame21 />
      <SelectOutlined2 />
      <SelectOutlined3 />
      <Frame19 />
      <div className="css-g0mm18 flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.6)] tracking-[0.15px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="css-ew64yg leading-[1.5]">Lifetime Value</p>
      </div>
      <SelectOutlined2 />
      <SelectOutlined4 />
      <SelectOutlined5 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Frame12 />
      <Frame11 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col h-[324px] items-start relative shrink-0 w-full">
      <Frame20 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame16 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col h-[156px] items-start relative shrink-0 w-[536px]">
      <Frame13 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex gap-[180px] h-[626px] items-start overflow-clip relative shrink-0 w-[1146px]">
      <SubStepper1 />
      <Frame15 />
    </div>
  );
}

function CustomerHistory() {
  return (
    <div className="absolute content-stretch flex flex-col h-[630px] items-start left-[16px] overflow-clip pb-[8px] pl-[12px] pr-[8px] pt-[12px] top-[204px] w-[1365px]" data-name="Customer History">
      <Frame17 />
    </div>
  );
}

export default function EnterCustomerDetails() {
  return (
    <div className="bg-[#f8f8f8] relative size-full" data-name="Enter Customer Details">
      <div className="absolute bg-white border border-[rgba(0,0,0,0.12)] border-solid h-[634px] left-[15px] rounded-[12px] top-[200px] w-[1384px]" />
      <AppBarBrowser />
      <HeaderComponent />
      <CustomerHistory />
    </div>
  );
}
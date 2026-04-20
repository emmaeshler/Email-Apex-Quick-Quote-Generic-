import svgPaths from "./svg-qhnazesk4r";
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

function Frame59() {
  return (
    <div className="content-stretch flex h-[18px] items-center relative shrink-0">
      <p className="css-4hzbpn font-['Roboto:Regular',sans-serif] font-normal h-[10px] leading-[normal] relative shrink-0 text-[9px] text-[rgba(0,0,0,0.38)] tracking-[0.18px] uppercase w-[77px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Insight2Profit
      </p>
    </div>
  );
}

function Frame61() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Frame59 />
    </div>
  );
}

function Frame60() {
  return (
    <div className="bg-white content-stretch flex gap-[10px] h-[20px] items-end pl-[15px] relative shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] shrink-0 w-[1440px]">
      <MenuFilled />
      <Frame61 />
    </div>
  );
}

function AppBarBrowser() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-0 w-[1440px]" data-name="App Bar+Browser">
      <WebBrowser />
      <Frame60 />
    </div>
  );
}

function Frame50() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="css-ew64yg font-['Roboto:Regular',sans-serif] font-normal leading-[1.235] relative shrink-0 text-[#00446a] text-[34px] tracking-[0.25px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Quote Dashboard
      </p>
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <Frame50 />
    </div>
  );
}

function Frame48() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <Frame49 />
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <Frame48 />
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

function Frame53() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-[1375px]">
      <Frame52 />
      <Export />
    </div>
  );
}

function Frame51() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10px] h-[116px] items-start left-[18px] top-[14px]">
      <Frame53 />
    </div>
  );
}

function HeaderComponent() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.04)] h-[76px] left-[-7px] overflow-clip top-[74px] w-[1441px]" data-name="Header Component">
      <Frame51 />
    </div>
  );
}

function FilterList() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Filter list">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_3_6577)" id="Filter list">
          <g id="Vector"></g>
          <path d={svgPaths.p306ba380} fill="var(--fill-0, #00446A)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_3_6577">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Icon">
      <FilterList />
    </div>
  );
}

function Frame54() {
  return (
    <div className="bg-white content-stretch flex h-[30px] items-start pb-[10px] pl-[5px] pr-[7px] pt-[3px] relative rounded-[4px] shrink-0 w-[34px]">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Icon />
    </div>
  );
}

function Dfdadfadf() {
  return (
    <div className="content-stretch flex flex-col h-[54px] items-start justify-end relative shrink-0 w-[34px]" data-name="dfdadfadf">
      <Frame54 />
    </div>
  );
}

function ViewColumn() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="View column">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_3_6573)" id="View column">
          <g id="Vector"></g>
          <path d={svgPaths.p19bdea00} fill="var(--fill-0, #00446A)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_3_6573">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Icon">
      <ViewColumn />
    </div>
  );
}

function Frame55() {
  return (
    <div className="bg-white content-stretch flex h-[30px] items-start pb-[10px] pl-[5px] pr-[7px] pt-[3px] relative rounded-[4px] shrink-0 w-[34px]">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Icon1 />
    </div>
  );
}

function Frame63() {
  return (
    <div className="content-stretch flex flex-col h-[54px] items-start justify-end relative shrink-0 w-[34px]">
      <Frame55 />
    </div>
  );
}

function TableChart() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Table chart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_3_6556)" id="Table chart">
          <g id="Vector"></g>
          <path d={svgPaths.p2cffb5c0} fill="var(--fill-0, #00446A)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_3_6556">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Icon">
      <TableChart />
    </div>
  );
}

function Frame56() {
  return (
    <div className="bg-white content-stretch flex h-[30px] items-start pb-[10px] pl-[5px] pr-[7px] pt-[3px] relative rounded-[4px] shrink-0 w-[34px]">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Icon2 />
    </div>
  );
}

function Frame62() {
  return (
    <div className="content-stretch flex flex-col h-[54px] items-start justify-end relative shrink-0 w-[34px]">
      <Frame56 />
    </div>
  );
}

function TableRows() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Table rows">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Vector"></g>
          <path d={svgPaths.p168cac00} fill="var(--fill-0, #00446A)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Icon3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Icon">
      <TableRows />
    </div>
  );
}

function Frame57() {
  return (
    <div className="bg-white content-stretch flex h-[30px] items-start pb-[10px] pl-[5px] pr-[7px] pt-[3px] relative rounded-[4px] shrink-0 w-[34px]">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Icon3 />
    </div>
  );
}

function Frame64() {
  return (
    <div className="content-stretch flex flex-col h-[54px] items-start justify-end relative shrink-0 w-[34px]">
      <Frame57 />
    </div>
  );
}

function Frame65() {
  return (
    <div className="content-stretch flex gap-[5px] items-start relative shrink-0">
      <Dfdadfadf />
      <Frame63 />
      <Frame62 />
      <Frame64 />
    </div>
  );
}

function Frame66() {
  return (
    <div className="content-stretch flex items-end relative shrink-0">
      <Frame65 />
    </div>
  );
}

function Frame68() {
  return (
    <div className="flex-[1_0_0] h-[30px] min-h-px min-w-px relative">
      <div className="flex flex-row items-end justify-end size-full">
        <div className="size-full" />
      </div>
    </div>
  );
}

function SettingsOverscanFill0Wght400Grad0Opsz() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="settings_overscan_FILL0_wght400_GRAD0_opsz24 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="settings_overscan_FILL0_wght400_GRAD0_opsz24 1">
          <path d={svgPaths.p69e2e00} fill="var(--fill-0, black)" fillOpacity="0.6" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Icon4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Icon">
      <SettingsOverscanFill0Wght400Grad0Opsz />
    </div>
  );
}

function Frame58() {
  return (
    <div className="bg-white content-stretch flex h-[30px] items-start pb-[10px] pl-[5px] pr-[7px] pt-[3px] relative rounded-[4px] shrink-0 w-[34px]">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Icon4 />
    </div>
  );
}

function Component() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[34px]" data-name="Component 2">
      <Frame58 />
    </div>
  );
}

function Frame67() {
  return (
    <div className="content-stretch flex gap-[5px] items-end relative shrink-0 w-[1322px]">
      <Frame66 />
      <Frame68 />
      <Component />
    </div>
  );
}

function ActionRibbon() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[66px] items-start relative shrink-0 w-[1373px]" data-name="Action Ribbon">
      <Frame67 />
    </div>
  );
}

function TableHeaderCellQuoteId() {
  return (
    <div className="relative shrink-0 w-full" data-name="🏛️ Table Header Cell (Quote ID)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Quote ID</p>
        </div>
      </div>
    </div>
  );
}

function Frame69() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[49px] relative shrink-0 w-[206px]">
      <TableHeaderCellQuoteId />
    </div>
  );
}

function TableHeaderCellSourceType() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Header Cell (Source Type)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Source Type</p>
        </div>
      </div>
    </div>
  );
}

function TableHeaderCellCustomerContact() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Header Cell (Customer / Contact)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Customer / Contact</p>
        </div>
      </div>
    </div>
  );
}

function TableHeaderCellQuoteSummary() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Header Cell (Quote Summary)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Quote Summary</p>
        </div>
      </div>
    </div>
  );
}

function TableHeaderCellAmountUsd() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Header Cell (Amount (USD))">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Amount (USD)</p>
        </div>
      </div>
    </div>
  );
}

function TableHeaderCellStatus() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Header Cell (Status)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">{`Approval `}</p>
        </div>
      </div>
    </div>
  );
}

function TableHeaderCellDateCreated() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Header Cell (Date Created)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Date Created</p>
        </div>
      </div>
    </div>
  );
}

function TableHeaderCellNotes() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Header Cell (Notes)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Notes</p>
        </div>
      </div>
    </div>
  );
}

function TableHeaderComponent() {
  return (
    <div className="content-stretch flex gap-[8px] items-center py-[8px] relative shrink-0 w-full" data-name="🚣 Table Header (Component)">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <Frame69 />
      <TableHeaderCellSourceType />
      <TableHeaderCellCustomerContact />
      <TableHeaderCellQuoteSummary />
      <TableHeaderCellAmountUsd />
      <TableHeaderCellStatus />
      <TableHeaderCellDateCreated />
      <TableHeaderCellNotes />
    </div>
  );
}

function CheckBoxOutlineBlankOutlined() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="CheckBoxOutlineBlankOutlined">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="CheckBoxOutlineBlankOutlined">
          <path d={svgPaths.p12c0c180} fill="var(--fill-0, black)" fillOpacity="0.6" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Padding() {
  return (
    <div className="content-stretch flex items-start p-[9px] relative rounded-[21px] shrink-0" data-name="Padding">
      <CheckBoxOutlineBlankOutlined />
    </div>
  );
}

function Checkbox() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-name="Checkbox">
      <Padding />
    </div>
  );
}

function TableCellQuoteId() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Quote ID)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Q-001</p>
        </div>
      </div>
    </div>
  );
}

function TableCellSourceType() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Source Type)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">AI Extractor</p>
        </div>
      </div>
    </div>
  );
}

function TableCellCustomerContact() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Customer / Contact)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Acme Corp</p>
        </div>
      </div>
    </div>
  );
}

function TableCellQuoteSummary() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Quote Summary)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Renewal of software license (12 months)</p>
        </div>
      </div>
    </div>
  );
}

function TableCellAmountUsd() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Amount (USD))">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">12,500</p>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="h-[11px] relative shrink-0 w-[6.583px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.58295 11">
        <g id="Frame 3">
          <circle cx="3.29147" cy="5.5" fill="var(--fill-0, #00446A)" id="Ellipse 1" r="3.29147" />
        </g>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex items-center pr-[6px] relative shrink-0">
      <p className="css-ew64yg font-['Roboto:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.54)] tracking-[0.16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Pending Approval
      </p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Frame2 />
      <Frame4 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex h-[10px] items-center relative shrink-0">
      <Frame5 />
    </div>
  );
}

function Typography() {
  return (
    <div className="content-stretch flex flex-col h-[10px] items-start relative shrink-0" data-name="Typography">
      <Frame />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0">
      <Typography />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex h-[18px] items-center pt-px relative shrink-0">
      <Frame3 />
    </div>
  );
}

function StatusChips() {
  return (
    <div className="bg-[rgba(0,0,0,0.04)] content-stretch flex h-[24px] items-center pb-[4px] pl-[7px] pr-[4px] pt-[3px] relative rounded-[16px] shrink-0" data-name="Status Chips">
      <Frame1 />
    </div>
  );
}

function TableCellStatus() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Status)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <StatusChips />
        </div>
      </div>
    </div>
  );
}

function TableCellDateCreated() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Date Created)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">2024-05-10</p>
        </div>
      </div>
    </div>
  );
}

function TableCellNotes() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Notes)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Extracted from customer email</p>
        </div>
      </div>
    </div>
  );
}

function TableRowInstance() {
  return (
    <div className="bg-[#f8f8f8] content-stretch flex gap-[8px] items-center py-[8px] relative shrink-0 w-full" data-name="🚣 Table Row (Instance)">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <Checkbox />
      <TableCellQuoteId />
      <TableCellSourceType />
      <TableCellCustomerContact />
      <TableCellQuoteSummary />
      <TableCellAmountUsd />
      <TableCellStatus />
      <TableCellDateCreated />
      <TableCellNotes />
    </div>
  );
}

function CheckBoxOutlineBlankOutlined1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="CheckBoxOutlineBlankOutlined">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="CheckBoxOutlineBlankOutlined">
          <path d={svgPaths.p12c0c180} fill="var(--fill-0, black)" fillOpacity="0.6" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Padding1() {
  return (
    <div className="content-stretch flex items-start p-[9px] relative rounded-[21px] shrink-0" data-name="Padding">
      <CheckBoxOutlineBlankOutlined1 />
    </div>
  );
}

function Checkbox1() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-name="Checkbox">
      <Padding1 />
    </div>
  );
}

function TableCellQuoteId1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Quote ID)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Q-002</p>
        </div>
      </div>
    </div>
  );
}

function TableCellSourceType1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Source Type)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Manual Entry</p>
        </div>
      </div>
    </div>
  );
}

function TableCellCustomerContact1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Customer / Contact)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Brightwave Studios</p>
        </div>
      </div>
    </div>
  );
}

function TableCellQuoteSummary1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Quote Summary)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Custom web app development</p>
        </div>
      </div>
    </div>
  );
}

function TableCellAmountUsd1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Amount (USD))">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">48,000</p>
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="h-[11px] relative shrink-0 w-[6.583px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.58295 11">
        <g id="Frame 3">
          <circle cx="3.29147" cy="5.5" fill="var(--fill-0, #00446A)" id="Ellipse 1" r="3.29147" />
        </g>
      </svg>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex items-center pr-[6px] relative shrink-0">
      <p className="css-ew64yg font-['Roboto:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.54)] tracking-[0.16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Sent To Customer
      </p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Frame6 />
      <Frame7 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex h-[10px] items-center relative shrink-0">
      <Frame8 />
    </div>
  );
}

function Typography1() {
  return (
    <div className="content-stretch flex flex-col h-[10px] items-start relative shrink-0" data-name="Typography">
      <Frame9 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0">
      <Typography1 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex h-[18px] items-center pt-px relative shrink-0">
      <Frame10 />
    </div>
  );
}

function StatusChips1() {
  return (
    <div className="bg-[rgba(0,0,0,0.04)] content-stretch flex h-[24px] items-center pb-[4px] pl-[7px] pr-[4px] pt-[3px] relative rounded-[16px] shrink-0" data-name="Status Chips">
      <Frame11 />
    </div>
  );
}

function TableCellStatus1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Status)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <StatusChips1 />
        </div>
      </div>
    </div>
  );
}

function TableCellDateCreated1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Date Created)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">2024-05-11</p>
        </div>
      </div>
    </div>
  );
}

function TableCellNotes1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Notes)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Created by Sales Rep - JD</p>
        </div>
      </div>
    </div>
  );
}

function TableRowInstance1() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center py-[8px] relative shrink-0 w-full" data-name="🚣 Table Row (Instance)">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <Checkbox1 />
      <TableCellQuoteId1 />
      <TableCellSourceType1 />
      <TableCellCustomerContact1 />
      <TableCellQuoteSummary1 />
      <TableCellAmountUsd1 />
      <TableCellStatus1 />
      <TableCellDateCreated1 />
      <TableCellNotes1 />
    </div>
  );
}

function CheckBoxOutlineBlankOutlined2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="CheckBoxOutlineBlankOutlined">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="CheckBoxOutlineBlankOutlined">
          <path d={svgPaths.p12c0c180} fill="var(--fill-0, black)" fillOpacity="0.6" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Padding2() {
  return (
    <div className="content-stretch flex items-start p-[9px] relative rounded-[21px] shrink-0" data-name="Padding">
      <CheckBoxOutlineBlankOutlined2 />
    </div>
  );
}

function Checkbox2() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-name="Checkbox">
      <Padding2 />
    </div>
  );
}

function TableCellQuoteId2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Quote ID)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Q-003</p>
        </div>
      </div>
    </div>
  );
}

function TableCellSourceType2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Source Type)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">AI Extractor</p>
        </div>
      </div>
    </div>
  );
}

function TableCellCustomerContact2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Customer / Contact)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">GreenLeaf Energy</p>
        </div>
      </div>
    </div>
  );
}

function TableCellQuoteSummary2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Quote Summary)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Solar panel maintenance subscription</p>
        </div>
      </div>
    </div>
  );
}

function TableCellAmountUsd2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Amount (USD))">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">3,200</p>
        </div>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="h-[11px] relative shrink-0 w-[6.583px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.58295 11">
        <g id="Frame 3">
          <circle cx="3.29147" cy="5.5" fill="var(--fill-0, white)" id="Ellipse 1" r="3.29147" />
        </g>
      </svg>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex items-center pr-[6px] relative shrink-0">
      <p className="css-ew64yg font-['Roboto:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[13px] text-white tracking-[0.16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Approved
      </p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Frame12 />
      <Frame13 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex h-[10px] items-center relative shrink-0">
      <Frame14 />
    </div>
  );
}

function Typography2() {
  return (
    <div className="content-stretch flex flex-col h-[10px] items-start relative shrink-0" data-name="Typography">
      <Frame15 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0">
      <Typography2 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex h-[18px] items-center pt-px relative shrink-0">
      <Frame16 />
    </div>
  );
}

function StatusChips2() {
  return (
    <div className="bg-[#4caf50] content-stretch flex h-[24px] items-center pb-[4px] pl-[7px] pr-[4px] pt-[3px] relative rounded-[16px] shrink-0" data-name="Status Chips">
      <Frame17 />
    </div>
  );
}

function TableCellStatus2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Status)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <StatusChips2 />
        </div>
      </div>
    </div>
  );
}

function TableCellDateCreated2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Date Created)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">2024-05-12</p>
        </div>
      </div>
    </div>
  );
}

function TableCellNotes2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Notes)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Parsed from CRM communication</p>
        </div>
      </div>
    </div>
  );
}

function TableRowInstance2() {
  return (
    <div className="bg-[#f8f8f8] content-stretch flex gap-[8px] items-center py-[8px] relative shrink-0 w-full" data-name="🚣 Table Row (Instance)">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <Checkbox2 />
      <TableCellQuoteId2 />
      <TableCellSourceType2 />
      <TableCellCustomerContact2 />
      <TableCellQuoteSummary2 />
      <TableCellAmountUsd2 />
      <TableCellStatus2 />
      <TableCellDateCreated2 />
      <TableCellNotes2 />
    </div>
  );
}

function CheckBoxOutlineBlankOutlined3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="CheckBoxOutlineBlankOutlined">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="CheckBoxOutlineBlankOutlined">
          <path d={svgPaths.p12c0c180} fill="var(--fill-0, black)" fillOpacity="0.6" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Padding3() {
  return (
    <div className="content-stretch flex items-start p-[9px] relative rounded-[21px] shrink-0" data-name="Padding">
      <CheckBoxOutlineBlankOutlined3 />
    </div>
  );
}

function Checkbox3() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-name="Checkbox">
      <Padding3 />
    </div>
  );
}

function TableCellQuoteId3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Quote ID)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Q-004</p>
        </div>
      </div>
    </div>
  );
}

function TableCellSourceType3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Source Type)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Manual Entry</p>
        </div>
      </div>
    </div>
  );
}

function TableCellCustomerContact3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Customer / Contact)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Alpha Technologies</p>
        </div>
      </div>
    </div>
  );
}

function TableCellQuoteSummary3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Quote Summary)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Hardware supply and installation</p>
        </div>
      </div>
    </div>
  );
}

function TableCellAmountUsd3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Amount (USD))">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">26,500</p>
        </div>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="h-[11px] relative shrink-0 w-[6.583px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.58295 11">
        <g id="Frame 3">
          <circle cx="3.29147" cy="5.5" fill="var(--fill-0, black)" fillOpacity="0.54" id="Ellipse 1" r="3.29147" />
        </g>
      </svg>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex items-center pr-[6px] relative shrink-0">
      <p className="css-ew64yg font-['Roboto:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.54)] tracking-[0.16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Draft
      </p>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Frame18 />
      <Frame19 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex h-[10px] items-center relative shrink-0">
      <Frame20 />
    </div>
  );
}

function Typography3() {
  return (
    <div className="content-stretch flex flex-col h-[10px] items-start relative shrink-0" data-name="Typography">
      <Frame21 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0">
      <Typography3 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex h-[18px] items-center pt-px relative shrink-0">
      <Frame22 />
    </div>
  );
}

function StatusChips3() {
  return (
    <div className="bg-[rgba(0,0,0,0.04)] content-stretch flex h-[24px] items-center pb-[4px] pl-[7px] pr-[4px] pt-[3px] relative rounded-[16px] shrink-0" data-name="Status Chips">
      <Frame23 />
    </div>
  );
}

function TableCellStatus3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Status)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <StatusChips3 />
        </div>
      </div>
    </div>
  );
}

function TableCellDateCreated3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Date Created)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">2024-05-13</p>
        </div>
      </div>
    </div>
  );
}

function TableCellNotes3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Notes)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Waiting for tech specs</p>
        </div>
      </div>
    </div>
  );
}

function TableRowInstance3() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center py-[8px] relative shrink-0 w-full" data-name="🚣 Table Row (Instance)">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <Checkbox3 />
      <TableCellQuoteId3 />
      <TableCellSourceType3 />
      <TableCellCustomerContact3 />
      <TableCellQuoteSummary3 />
      <TableCellAmountUsd3 />
      <TableCellStatus3 />
      <TableCellDateCreated3 />
      <TableCellNotes3 />
    </div>
  );
}

function CheckBoxOutlineBlankOutlined4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="CheckBoxOutlineBlankOutlined">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="CheckBoxOutlineBlankOutlined">
          <path d={svgPaths.p12c0c180} fill="var(--fill-0, black)" fillOpacity="0.6" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Padding4() {
  return (
    <div className="content-stretch flex items-start p-[9px] relative rounded-[21px] shrink-0" data-name="Padding">
      <CheckBoxOutlineBlankOutlined4 />
    </div>
  );
}

function Checkbox4() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-name="Checkbox">
      <Padding4 />
    </div>
  );
}

function TableCellQuoteId4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Quote ID)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Q-005</p>
        </div>
      </div>
    </div>
  );
}

function TableCellSourceType4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Source Type)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">AI Extractor</p>
        </div>
      </div>
    </div>
  );
}

function TableCellCustomerContact4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Customer / Contact)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Horizon Retail</p>
        </div>
      </div>
    </div>
  );
}

function TableCellQuoteSummary4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Quote Summary)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">POS terminal replacement request</p>
        </div>
      </div>
    </div>
  );
}

function TableCellAmountUsd4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Amount (USD))">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">8,900</p>
        </div>
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="h-[11px] relative shrink-0 w-[6.583px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.58295 11">
        <g id="Frame 3">
          <circle cx="3.29147" cy="5.5" fill="var(--fill-0, #00446A)" id="Ellipse 1" r="3.29147" />
        </g>
      </svg>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex items-center pr-[6px] relative shrink-0">
      <p className="css-ew64yg font-['Roboto:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.54)] tracking-[0.16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Sent To Customer
      </p>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Frame24 />
      <Frame25 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex h-[10px] items-center relative shrink-0">
      <Frame26 />
    </div>
  );
}

function Typography4() {
  return (
    <div className="content-stretch flex flex-col h-[10px] items-start relative shrink-0" data-name="Typography">
      <Frame27 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0">
      <Typography4 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex h-[18px] items-center pt-px relative shrink-0">
      <Frame28 />
    </div>
  );
}

function StatusChips4() {
  return (
    <div className="bg-[rgba(0,0,0,0.04)] content-stretch flex h-[24px] items-center pb-[4px] pl-[7px] pr-[4px] pt-[3px] relative rounded-[16px] shrink-0" data-name="Status Chips">
      <Frame29 />
    </div>
  );
}

function TableCellStatus4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Status)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <StatusChips4 />
        </div>
      </div>
    </div>
  );
}

function TableCellDateCreated4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Date Created)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">2024-05-14</p>
        </div>
      </div>
    </div>
  );
}

function TableCellNotes4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Notes)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Extracted from ticket email</p>
        </div>
      </div>
    </div>
  );
}

function TableRowInstance4() {
  return (
    <div className="bg-[#f8f8f8] content-stretch flex gap-[8px] items-center py-[8px] relative shrink-0 w-full" data-name="🚣 Table Row (Instance)">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <Checkbox4 />
      <TableCellQuoteId4 />
      <TableCellSourceType4 />
      <TableCellCustomerContact4 />
      <TableCellQuoteSummary4 />
      <TableCellAmountUsd4 />
      <TableCellStatus4 />
      <TableCellDateCreated4 />
      <TableCellNotes4 />
    </div>
  );
}

function CheckBoxOutlineBlankOutlined5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="CheckBoxOutlineBlankOutlined">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="CheckBoxOutlineBlankOutlined">
          <path d={svgPaths.p12c0c180} fill="var(--fill-0, black)" fillOpacity="0.6" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Padding5() {
  return (
    <div className="content-stretch flex items-start p-[9px] relative rounded-[21px] shrink-0" data-name="Padding">
      <CheckBoxOutlineBlankOutlined5 />
    </div>
  );
}

function Checkbox5() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-name="Checkbox">
      <Padding5 />
    </div>
  );
}

function TableCellQuoteId5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Quote ID)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Q-006</p>
        </div>
      </div>
    </div>
  );
}

function TableCellSourceType5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Source Type)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Manual Entry</p>
        </div>
      </div>
    </div>
  );
}

function TableCellCustomerContact5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Customer / Contact)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Urban Build Co.</p>
        </div>
      </div>
    </div>
  );
}

function TableCellQuoteSummary5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Quote Summary)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Structural consulting services</p>
        </div>
      </div>
    </div>
  );
}

function TableCellAmountUsd5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Amount (USD))">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">15,750</p>
        </div>
      </div>
    </div>
  );
}

function Frame30() {
  return (
    <div className="h-[11px] relative shrink-0 w-[6.583px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.58295 11">
        <g id="Frame 3">
          <circle cx="3.29147" cy="5.5" fill="var(--fill-0, #B26413)" id="Ellipse 1" r="3.29147" />
        </g>
      </svg>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex items-center pr-[6px] relative shrink-0">
      <p className="css-ew64yg font-['Roboto:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[13px] text-[rgba(0,0,0,0.54)] tracking-[0.16px]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Negotiating `}</p>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Frame30 />
      <Frame31 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex h-[10px] items-center relative shrink-0">
      <Frame32 />
    </div>
  );
}

function Typography5() {
  return (
    <div className="content-stretch flex flex-col h-[10px] items-start relative shrink-0" data-name="Typography">
      <Frame33 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0">
      <Typography5 />
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex h-[18px] items-center pt-px relative shrink-0">
      <Frame34 />
    </div>
  );
}

function StatusChips5() {
  return (
    <div className="bg-[rgba(0,0,0,0.04)] content-stretch flex h-[24px] items-center pb-[4px] pl-[7px] pr-[4px] pt-[3px] relative rounded-[16px] shrink-0" data-name="Status Chips">
      <Frame35 />
    </div>
  );
}

function TableCellStatus5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Status)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <StatusChips5 />
        </div>
      </div>
    </div>
  );
}

function TableCellDateCreated5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Date Created)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">2024-05-15</p>
        </div>
      </div>
    </div>
  );
}

function TableCellNotes5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Notes)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Client requested discount</p>
        </div>
      </div>
    </div>
  );
}

function TableRowInstance5() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center py-[8px] relative shrink-0 w-full" data-name="🚣 Table Row (Instance)">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <Checkbox5 />
      <TableCellQuoteId5 />
      <TableCellSourceType5 />
      <TableCellCustomerContact5 />
      <TableCellQuoteSummary5 />
      <TableCellAmountUsd5 />
      <TableCellStatus5 />
      <TableCellDateCreated5 />
      <TableCellNotes5 />
    </div>
  );
}

function CheckBoxOutlineBlankOutlined6() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="CheckBoxOutlineBlankOutlined">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="CheckBoxOutlineBlankOutlined">
          <path d={svgPaths.p12c0c180} fill="var(--fill-0, black)" fillOpacity="0.6" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Padding6() {
  return (
    <div className="content-stretch flex items-start p-[9px] relative rounded-[21px] shrink-0" data-name="Padding">
      <CheckBoxOutlineBlankOutlined6 />
    </div>
  );
}

function Checkbox6() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-name="Checkbox">
      <Padding6 />
    </div>
  );
}

function TableCellQuoteId6() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Quote ID)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Q-007</p>
        </div>
      </div>
    </div>
  );
}

function TableCellSourceType6() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Source Type)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">AI Extractor</p>
        </div>
      </div>
    </div>
  );
}

function TableCellCustomerContact6() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Customer / Contact)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">CloudSync LLC</p>
        </div>
      </div>
    </div>
  );
}

function TableCellQuoteSummary6() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Quote Summary)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Expansion of existing support plan</p>
        </div>
      </div>
    </div>
  );
}

function TableCellAmountUsd6() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Amount (USD))">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">4,500</p>
        </div>
      </div>
    </div>
  );
}

function Frame36() {
  return (
    <div className="h-[11px] relative shrink-0 w-[6.583px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.58295 11">
        <g id="Frame 3">
          <circle cx="3.29147" cy="5.5" fill="var(--fill-0, white)" id="Ellipse 1" r="3.29147" />
        </g>
      </svg>
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex items-center pr-[6px] relative shrink-0">
      <p className="css-ew64yg font-['Roboto:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[13px] text-white tracking-[0.16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Approved
      </p>
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Frame36 />
      <Frame37 />
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex h-[10px] items-center relative shrink-0">
      <Frame38 />
    </div>
  );
}

function Typography6() {
  return (
    <div className="content-stretch flex flex-col h-[10px] items-start relative shrink-0" data-name="Typography">
      <Frame39 />
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0">
      <Typography6 />
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex h-[18px] items-center pt-px relative shrink-0">
      <Frame40 />
    </div>
  );
}

function StatusChips6() {
  return (
    <div className="bg-[#4caf50] content-stretch flex h-[24px] items-center pb-[4px] pl-[7px] pr-[4px] pt-[3px] relative rounded-[16px] shrink-0" data-name="Status Chips">
      <Frame41 />
    </div>
  );
}

function TableCellStatus6() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Status)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <StatusChips6 />
        </div>
      </div>
    </div>
  );
}

function TableCellDateCreated6() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Date Created)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">2024-05-16</p>
        </div>
      </div>
    </div>
  );
}

function TableCellNotes6() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Notes)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Auto-extracted - high confidence</p>
        </div>
      </div>
    </div>
  );
}

function TableRowInstance6() {
  return (
    <div className="bg-[#f8f8f8] content-stretch flex gap-[8px] items-center py-[8px] relative shrink-0 w-full" data-name="🚣 Table Row (Instance)">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <Checkbox6 />
      <TableCellQuoteId6 />
      <TableCellSourceType6 />
      <TableCellCustomerContact6 />
      <TableCellQuoteSummary6 />
      <TableCellAmountUsd6 />
      <TableCellStatus6 />
      <TableCellDateCreated6 />
      <TableCellNotes6 />
    </div>
  );
}

function CheckBoxOutlineBlankOutlined7() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="CheckBoxOutlineBlankOutlined">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="CheckBoxOutlineBlankOutlined">
          <path d={svgPaths.p12c0c180} fill="var(--fill-0, black)" fillOpacity="0.6" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Padding7() {
  return (
    <div className="content-stretch flex items-start p-[9px] relative rounded-[21px] shrink-0" data-name="Padding">
      <CheckBoxOutlineBlankOutlined7 />
    </div>
  );
}

function Checkbox7() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-name="Checkbox">
      <Padding7 />
    </div>
  );
}

function TableCellQuoteId7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Quote ID)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Q-008</p>
        </div>
      </div>
    </div>
  );
}

function TableCellSourceType7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Source Type)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Manual Entry</p>
        </div>
      </div>
    </div>
  );
}

function TableCellCustomerContact7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Customer / Contact)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Stellar Marketing</p>
        </div>
      </div>
    </div>
  );
}

function TableCellQuoteSummary7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Quote Summary)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Campaign design and analytics package</p>
        </div>
      </div>
    </div>
  );
}

function TableCellAmountUsd7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Amount (USD))">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">9,000</p>
        </div>
      </div>
    </div>
  );
}

function Frame42() {
  return (
    <div className="h-[11px] relative shrink-0 w-[6.583px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.58295 11">
        <g id="Frame 3">
          <circle cx="3.29147" cy="5.5" fill="var(--fill-0, white)" id="Ellipse 1" r="3.29147" />
        </g>
      </svg>
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex items-center pr-[6px] relative shrink-0">
      <p className="css-ew64yg font-['Roboto:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[13px] text-white tracking-[0.16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Rejected
      </p>
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Frame42 />
      <Frame43 />
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex h-[10px] items-center relative shrink-0">
      <Frame44 />
    </div>
  );
}

function Typography7() {
  return (
    <div className="content-stretch flex flex-col h-[10px] items-start relative shrink-0" data-name="Typography">
      <Frame45 />
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0">
      <Typography7 />
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex h-[18px] items-center pt-px relative shrink-0">
      <Frame46 />
    </div>
  );
}

function StatusChips7() {
  return (
    <div className="bg-[#ff585d] content-stretch flex h-[24px] items-center pb-[4px] pl-[7px] pr-[4px] pt-[3px] relative rounded-[16px] shrink-0" data-name="Status Chips">
      <Frame47 />
    </div>
  );
}

function TableCellStatus7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Status)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <StatusChips7 />
        </div>
      </div>
    </div>
  );
}

function TableCellDateCreated7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Date Created)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">2024-05-17</p>
        </div>
      </div>
    </div>
  );
}

function TableCellNotes7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Notes)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Follow-up in 3 days</p>
        </div>
      </div>
    </div>
  );
}

function TableRowInstance7() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center py-[8px] relative shrink-0 w-full" data-name="🚣 Table Row (Instance)">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <Checkbox7 />
      <TableCellQuoteId7 />
      <TableCellSourceType7 />
      <TableCellCustomerContact7 />
      <TableCellQuoteSummary7 />
      <TableCellAmountUsd7 />
      <TableCellStatus7 />
      <TableCellDateCreated7 />
      <TableCellNotes7 />
    </div>
  );
}

function CheckBoxOutlineBlankOutlined8() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="CheckBoxOutlineBlankOutlined">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="CheckBoxOutlineBlankOutlined">
          <path d={svgPaths.p12c0c180} fill="var(--fill-0, black)" fillOpacity="0.6" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Padding8() {
  return (
    <div className="content-stretch flex items-start p-[9px] relative rounded-[21px] shrink-0" data-name="Padding">
      <CheckBoxOutlineBlankOutlined8 />
    </div>
  );
}

function Checkbox8() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-name="Checkbox">
      <Padding8 />
    </div>
  );
}

function TableCellQuoteId8() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Quote ID)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Q-009</p>
        </div>
      </div>
    </div>
  );
}

function TableCellSourceType8() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Source Type)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">AI Extractor</p>
        </div>
      </div>
    </div>
  );
}

function TableCellCustomerContact8() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Customer / Contact)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">HealthPlus Systems</p>
        </div>
      </div>
    </div>
  );
}

function TableCellQuoteSummary8() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Quote Summary)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">API integration enhancement</p>
        </div>
      </div>
    </div>
  );
}

function TableCellAmountUsd8() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Amount (USD))">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">6,800</p>
        </div>
      </div>
    </div>
  );
}

function TableCellStatus8() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Status)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Draft</p>
        </div>
      </div>
    </div>
  );
}

function TableCellDateCreated8() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Date Created)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">2024-05-18</p>
        </div>
      </div>
    </div>
  );
}

function TableCellNotes8() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Notes)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Parsed from emailed RFP</p>
        </div>
      </div>
    </div>
  );
}

function TableRowInstance8() {
  return (
    <div className="bg-[#f8f8f8] content-stretch flex gap-[8px] items-center py-[8px] relative shrink-0 w-full" data-name="🚣 Table Row (Instance)">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <Checkbox8 />
      <TableCellQuoteId8 />
      <TableCellSourceType8 />
      <TableCellCustomerContact8 />
      <TableCellQuoteSummary8 />
      <TableCellAmountUsd8 />
      <TableCellStatus8 />
      <TableCellDateCreated8 />
      <TableCellNotes8 />
    </div>
  );
}

function TableCellQuoteId9() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Quote ID)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Q-010</p>
        </div>
      </div>
    </div>
  );
}

function TableCellSourceType9() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Source Type)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Manual Entry</p>
        </div>
      </div>
    </div>
  );
}

function TableCellCustomerContact9() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Customer / Contact)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Nova Logistics</p>
        </div>
      </div>
    </div>
  );
}

function TableCellQuoteSummary9() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Quote Summary)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Fleet management solution (annual)</p>
        </div>
      </div>
    </div>
  );
}

function TableCellAmountUsd9() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Amount (USD))">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">32,000</p>
        </div>
      </div>
    </div>
  );
}

function TableCellStatus9() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Status)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Approved</p>
        </div>
      </div>
    </div>
  );
}

function TableCellDateCreated9() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Date Created)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">2024-05-19</p>
        </div>
      </div>
    </div>
  );
}

function TableCellNotes9() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Notes)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Manual input - verified totals</p>
        </div>
      </div>
    </div>
  );
}

function TableRowInstance9() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center py-[8px] relative shrink-0 w-full" data-name="🚣 Table Row (Instance)">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <TableCellQuoteId9 />
      <TableCellSourceType9 />
      <TableCellCustomerContact9 />
      <TableCellQuoteSummary9 />
      <TableCellAmountUsd9 />
      <TableCellStatus9 />
      <TableCellDateCreated9 />
      <TableCellNotes9 />
    </div>
  );
}

function ImportedTableTableEf7899E7A5Ce40679E596223Fa7B8F0044650Ba7260A449A9E87C381744D7Cdd2Csv() {
  return (
    <div className="bg-white h-[522px] relative rounded-[12px] shrink-0 w-full" data-name="🪑 Imported Table (table-ef7899e7-a5ce-4067-9e59-6223fa7b8f00-44650ba7-260a-449a-9e87-c381744d7cdd-2.csv)">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <TableHeaderComponent />
        <TableRowInstance />
        <TableRowInstance1 />
        <TableRowInstance2 />
        <TableRowInstance3 />
        <TableRowInstance4 />
        <TableRowInstance5 />
        <TableRowInstance6 />
        <TableRowInstance7 />
        <TableRowInstance8 />
        <TableRowInstance9 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function CustomerHistory() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[630px] items-start left-[16px] overflow-clip pb-[8px] pl-[12px] pr-[8px] pt-[12px] top-[169px] w-[1365px]" data-name="Customer History">
      <ActionRibbon />
      <ImportedTableTableEf7899E7A5Ce40679E596223Fa7B8F0044650Ba7260A449A9E87C381744D7Cdd2Csv />
    </div>
  );
}

export default function EnterCustomerDetails() {
  return (
    <div className="bg-[#f8f8f8] relative size-full" data-name="Enter Customer Details">
      <div className="absolute bg-white border border-[rgba(0,0,0,0.12)] border-solid h-[634px] left-[14px] rounded-[12px] top-[169px] w-[1384px]" />
      <AppBarBrowser />
      <HeaderComponent />
      <CustomerHistory />
    </div>
  );
}
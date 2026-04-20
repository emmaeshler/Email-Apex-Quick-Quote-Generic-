import svgPaths from "./svg-cf8m1lgrtc";
import { imgVector2 } from "./svg-1n9rm";

function Container() {
  return <div className="bg-[#fb2c36] rounded-[26843500px] shrink-0 size-[12px]" data-name="Container" />;
}

function Container1() {
  return <div className="bg-[#f0b100] rounded-[26843500px] shrink-0 size-[12px]" data-name="Container" />;
}

function Container2() {
  return <div className="bg-[#00c950] flex-[1_0_0] h-[12px] min-h-px min-w-px rounded-[26843500px]" data-name="Container" />;
}

function Container3() {
  return (
    <div className="h-[12px] relative shrink-0 w-[52px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-start relative size-full">
        <Container />
        <Container1 />
        <Container2 />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[83.875px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="css-ew64yg font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px]">Google Chrome</p>
      </div>
    </div>
  );
}

function Container4() {
  return <div className="h-0 shrink-0 w-[64px]" data-name="Container" />;
}

function Container5() {
  return (
    <div className="bg-[#e5e7eb] h-[23.988px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[8px] relative size-full">
          <Container3 />
          <Text />
          <Container4 />
        </div>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p1aca3780} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p2b92b800} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-ew64yg font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] top-[-1.2px]">Inbox - Outlook</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-[#e5e7eb] h-[36px] relative rounded-tl-[10px] rounded-tr-[10px] shrink-0 w-[200px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[16px] relative size-full">
        <Icon />
        <Text1 />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p1aca3780} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p2b92b800} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute css-4hzbpn font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] top-[-1.2px] w-[207px]">Quote Dashboard - Insight2Profit</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.16667 8.16667">
            <path d={svgPaths.p755a300} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.16667 8.16667">
            <path d={svgPaths.p4618fa0} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[22px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[4px] px-[4px] relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-white h-[38px] relative rounded-tl-[10px] rounded-tr-[10px] shrink-0 w-[250px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center px-[16px] relative size-full">
        <Icon1 />
        <Text2 />
        <Button />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.67px_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 1.33333">
            <path d="M0.666667 0.666667H10" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[20.83%] left-1/2 right-1/2 top-[20.83%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.33333 10.6667">
            <path d="M0.666667 0.666667V10" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="relative rounded-tl-[10px] rounded-tr-[10px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] px-[8px] relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[#d1d5dc] h-[46px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-end size-full">
        <div className="content-stretch flex items-end pl-[8px] relative size-full">
          <Container6 />
          <Container7 />
          <Button1 />
        </div>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 10.5">
            <path d={svgPaths.p2f6c2dd6} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[26px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[4px] px-[4px] relative size-full">
        <Icon4 />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 10.5">
            <path d={svgPaths.p14141680} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="flex-[1_0_0] h-[26px] min-h-px min-w-px relative rounded-[4px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[4px] px-[4px] relative size-full">
        <Icon5 />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
            <path d={svgPaths.p3c9c9080} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_12.5%_66.67%_66.67%]" data-name="Vector">
        <div className="absolute inset-[-20%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.66667 4.66667">
            <path d="M4 0.666667V4H0.666667" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[4px] px-[4px] relative size-full">
        <Icon6 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[26px] relative shrink-0 w-[84px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Button2 />
        <Button3 />
        <Button4 />
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p1aca3780} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p2b92b800} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[187.137px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-[-1.2px]">app.insight2profit.com/quotes</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-[#f3f4f6] flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[26843500px]" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pl-[16px] relative size-full">
          <Icon7 />
          <Text3 />
        </div>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-white h-[48.8px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-b-[0.8px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pb-[0.8px] px-[16px] relative size-full">
          <Container9 />
          <Container10 />
        </div>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex flex-col h-[118.787px] items-start left-0 top-0 w-[1730.4px]" data-name="Container">
      <Container5 />
      <Container8 />
      <Container11 />
    </div>
  );
}

function Container13() {
  return <div className="absolute bg-white border-[0.8px] border-[rgba(0,0,0,0.12)] border-solid h-[786px] left-[14px] rounded-[12px] top-[90px] w-[1693px]" data-name="Container" />;
}

function Paragraph() {
  return (
    <div className="absolute content-stretch flex h-[41.987px] items-start left-0 top-0 w-[267.3px]" data-name="Paragraph">
      <p className="css-ew64yg font-['Roboto:Regular',sans-serif] font-normal leading-[41.99px] relative shrink-0 text-[#00446a] text-[34px] tracking-[0.25px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Quote Dashboard
      </p>
    </div>
  );
}

function AddFilled() {
  return (
    <div className="absolute contents inset-[20.83%]" data-name="AddFilled">
      <div className="absolute inset-[20.83%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <path d={svgPaths.p38adf480} fill="var(--fill-0, #B26413)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <AddFilled />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[-6px] size-[24px] top-px" data-name="Container">
      <Icon8 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[26px] left-[26px] top-0 w-[123.037px]" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Roboto:Medium',sans-serif] font-medium leading-[26px] left-0 text-[#a0490b] text-[15px] top-[-0.8px] tracking-[0.46px] uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
        Add new quote
      </p>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute h-[26px] left-[22px] top-[8px] w-[149.038px]" data-name="Container">
      <Container14 />
      <Paragraph1 />
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute h-[42px] left-0 overflow-clip top-0 w-[193.038px]" data-name="Container">
      <Container15 />
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute h-[42px] left-0 overflow-clip rounded-[4px] top-0 w-[193.038px]" data-name="Container">
      <Container16 />
    </div>
  );
}

function Container18() {
  return <div className="absolute border-[#a0490b] border-[0.8px] border-solid h-[42px] left-0 rounded-[4px] top-0 w-[193.038px]" data-name="Container" />;
}

function Container19() {
  return (
    <div className="absolute h-[42px] left-[1496px] rounded-[4px] top-0 w-[193.038px]" data-name="Container">
      <Container17 />
      <Container18 />
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Container">
      <Paragraph />
      <Container19 />
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.04)] content-stretch flex flex-col h-[76px] items-start left-0 overflow-clip pl-[18px] pr-[48px] pt-[14px] top-[0.21px] w-[1730px]" data-name="Container">
      <Container20 />
    </div>
  );
}

function Container22() {
  return <div className="absolute border-[0.8px] border-[rgba(0,0,0,0.12)] border-solid h-[30px] left-0 rounded-[4px] top-0 w-[34px]" data-name="Container" />;
}

function FilterList() {
  return (
    <div className="absolute bottom-1/4 contents left-[12.5%] right-[12.5%] top-1/4" data-name="Filter list">
      <div className="absolute bottom-1/4 left-[12.5%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3px_-6px] mask-size-[24px_24px] right-[12.5%] top-1/4" data-name="Vector_2" style={{ maskImage: `url('${imgVector2}')` }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 12">
          <path d={svgPaths.pd8d1e00} fill="var(--fill-0, #00446A)" id="Vector_2" />
        </svg>
      </div>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <FilterList />
    </div>
  );
}

function Icon9() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <ClipPathGroup />
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[5px] size-[24px] top-[3px]" data-name="Container">
      <Icon9 />
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute bg-white h-[30px] left-0 rounded-[4px] top-[24px] w-[34px]" data-name="Container">
      <Container22 />
      <Container23 />
    </div>
  );
}

function Container25() {
  return <div className="absolute border-[0.8px] border-[rgba(0,0,0,0.12)] border-solid h-[30px] left-0 rounded-[4px] top-0 w-[34px]" data-name="Container" />;
}

function ViewColumn() {
  return (
    <div className="absolute bottom-1/4 contents left-[16.67%] right-[12.5%] top-[20.83%]" data-name="View column">
      <div className="absolute bottom-1/4 left-[16.67%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4px_-5px] mask-size-[24px_24px] right-[12.5%] top-[20.83%]" data-name="Vector_2" style={{ maskImage: `url('${imgVector2}')` }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 13">
          <path d={svgPaths.p1bcff500} fill="var(--fill-0, #00446A)" id="Vector_2" />
        </svg>
      </div>
    </div>
  );
}

function ClipPathGroup1() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <ViewColumn />
    </div>
  );
}

function Icon10() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <ClipPathGroup1 />
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[5px] size-[24px] top-[3px]" data-name="Container">
      <Icon10 />
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute bg-white h-[30px] left-[39px] rounded-[4px] top-[24px] w-[34px]" data-name="Container">
      <Container25 />
      <Container26 />
    </div>
  );
}

function Container28() {
  return <div className="absolute border-[0.8px] border-[rgba(0,0,0,0.12)] border-solid h-[30px] left-0 rounded-[4px] top-0 w-[34px]" data-name="Container" />;
}

function TableChart() {
  return (
    <div className="absolute contents inset-[12.5%_8.33%_12.5%_12.5%]" data-name="Table chart">
      <div className="absolute inset-[12.5%_8.33%_12.5%_12.5%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-3px_-3px] mask-size-[24px_24px]" data-name="Vector_2" style={{ maskImage: `url('${imgVector2}')` }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 18">
          <path d={svgPaths.p8d1ebb0} fill="var(--fill-0, #00446A)" id="Vector_2" />
        </svg>
      </div>
    </div>
  );
}

function ClipPathGroup2() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <TableChart />
    </div>
  );
}

function Icon11() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <ClipPathGroup2 />
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[5px] size-[24px] top-[3px]" data-name="Container">
      <Icon11 />
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute bg-white h-[30px] left-[78px] rounded-[4px] top-[24px] w-[34px]" data-name="Container">
      <Container28 />
      <Container29 />
    </div>
  );
}

function Container31() {
  return <div className="absolute border-[0.8px] border-[rgba(0,0,0,0.12)] border-solid h-[30px] left-0 rounded-[4px] top-0 w-[34px]" data-name="Container" />;
}

function Group() {
  return (
    <div className="absolute contents inset-[21.98%]" data-name="Group">
      <div className="absolute inset-[21.98%]" data-name="Vector_2">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.4476 13.4476">
          <path d={svgPaths.p8ce5340} fill="var(--fill-0, #00446A)" id="Vector_2" />
        </svg>
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Group />
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[5px] overflow-clip size-[24px] top-[3px]" data-name="Container">
      <Icon12 />
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute bg-white h-[30px] left-[117px] rounded-[4px] top-[24px] w-[34px]" data-name="Container">
      <Container31 />
      <Container32 />
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute h-[54px] left-0 top-0 w-[151px]" data-name="Container">
      <Container24 />
      <Container27 />
      <Container30 />
      <Container33 />
    </div>
  );
}

function Container35() {
  return <div className="absolute h-[30px] left-[156px] top-[24px] w-[1127px]" data-name="Container" />;
}

function Container36() {
  return <div className="absolute border-[0.8px] border-[rgba(0,0,0,0.12)] border-solid h-[30px] left-0 rounded-[4px] top-0 w-[34px]" data-name="Container" />;
}

function SettingsOverscanFill0Wght400Grad0Opsz() {
  return (
    <div className="absolute contents inset-[16.67%_8.33%]" data-name="settings_overscan_FILL0_wght400_GRAD0_opsz24 1">
      <div className="absolute inset-[16.67%_8.33%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
          <path d={svgPaths.p2b545580} fill="var(--fill-0, black)" fillOpacity="0.6" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <SettingsOverscanFill0Wght400Grad0Opsz />
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[5px] size-[24px] top-[3px]" data-name="Container">
      <Icon13 />
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute bg-white h-[30px] left-[1288px] rounded-[4px] top-[24px] w-[34px]" data-name="Container">
      <Container36 />
      <Container37 />
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute h-[54px] left-[12px] top-[12px] w-[1322px]" data-name="Container">
      <Container34 />
      <Container35 />
      <Container38 />
    </div>
  );
}

function Container40() {
  return <div className="absolute border-[#eee] border-b-[0.8px] border-solid h-[39.2px] left-0 top-0 w-[1345px]" data-name="Container" />;
}

function Paragraph2() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[141px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Quote ID</p>
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute h-[23.2px] left-[49px] overflow-clip top-[8px] w-[157px]" data-name="Container">
      <Paragraph2 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.713px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Source Type</p>
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute h-[23.2px] left-[214px] overflow-clip top-[8px] w-[154.713px]" data-name="Container">
      <Paragraph3 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.713px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Customer / Contact</p>
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute h-[23.2px] left-[376.71px] overflow-clip top-[8px] w-[154.713px]" data-name="Container">
      <Paragraph4 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.713px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Quote Summary</p>
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute h-[23.2px] left-[539.42px] overflow-clip top-[8px] w-[154.713px]" data-name="Container">
      <Paragraph5 />
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.713px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Amount (USD)</p>
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute h-[23.2px] left-[702.14px] overflow-clip top-[8px] w-[154.713px]" data-name="Container">
      <Paragraph6 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.713px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Approval</p>
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute h-[23.2px] left-[864.85px] overflow-clip top-[8px] w-[154.713px]" data-name="Container">
      <Paragraph7 />
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.713px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Date Created</p>
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute h-[23.2px] left-[1027.56px] overflow-clip top-[8px] w-[154.713px]" data-name="Container">
      <Paragraph8 />
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.713px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Notes</p>
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute h-[23.2px] left-[1190.28px] overflow-clip top-[8px] w-[154.713px]" data-name="Container">
      <Paragraph9 />
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute h-[39.2px] left-0 top-0 w-[1345px]" data-name="Container">
      <Container40 />
      <Container41 />
      <Container42 />
      <Container43 />
      <Container44 />
      <Container45 />
      <Container46 />
      <Container47 />
      <Container48 />
    </div>
  );
}

function Container50() {
  return <div className="absolute border-[#eee] border-b-[0.8px] border-solid h-[58px] left-0 top-0 w-[1345px]" data-name="Container" />;
}

function CheckBoxOutlineBlankOutlined() {
  return (
    <div className="absolute contents inset-[12.5%]" data-name="CheckBoxOutlineBlankOutlined">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <path d={svgPaths.p3370a680} fill="var(--fill-0, black)" fillOpacity="0.6" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <CheckBoxOutlineBlankOutlined />
    </div>
  );
}

function Container51() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[9px] size-[24px] top-[9px]" data-name="Container">
      <Icon14 />
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute left-0 overflow-clip rounded-[21px] size-[42px] top-[8px]" data-name="Container">
      <Container51 />
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Q-001</p>
    </div>
  );
}

function Container53() {
  return (
    <div className="absolute h-[23.2px] left-[50px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph10 />
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">AI Extractor</p>
    </div>
  );
}

function Container54() {
  return (
    <div className="absolute h-[23.2px] left-[212.88px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph11 />
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Acme Corp</p>
    </div>
  );
}

function Container55() {
  return (
    <div className="absolute h-[23.2px] left-[375.75px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph12 />
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="absolute h-[30.4px] left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-0 not-italic text-[12px] text-black top-0 w-[117px]">Renewal of software license (12 months)</p>
    </div>
  );
}

function Container56() {
  return (
    <div className="absolute h-[38.4px] left-[538.63px] overflow-clip top-[9.8px] w-[154.875px]" data-name="Container">
      <Paragraph13 />
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">12,500</p>
    </div>
  );
}

function Container57() {
  return (
    <div className="absolute h-[23.2px] left-[701.5px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph14 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute contents inset-[20.08%_0]">
      <div className="absolute inset-[20.08%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.57499 6.58294">
          <path d={svgPaths.p76ec500} fill="var(--fill-0, #00446A)" id="Ellipse 1" />
        </svg>
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="h-[11px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Frame />
    </div>
  );
}

function Container58() {
  return (
    <div className="absolute content-stretch flex flex-col h-[11px] items-start left-0 top-[3.5px] w-[6.575px]" data-name="Container">
      <Icon15 />
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="absolute h-[18px] left-[10.58px] top-0 w-[104.063px]" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Roboto:Regular',sans-serif] font-normal leading-[18px] left-0 text-[13px] text-[rgba(0,0,0,0.54)] top-[-0.2px] tracking-[0.16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Pending Approval
      </p>
    </div>
  );
}

function Container59() {
  return (
    <div className="absolute h-[18px] left-[7px] top-[3px] w-[120.638px]" data-name="Container">
      <Container58 />
      <Paragraph15 />
    </div>
  );
}

function Container60() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.04)] h-[24px] left-[8px] rounded-[16px] top-[4px] w-[131.637px]" data-name="Container">
      <Container59 />
    </div>
  );
}

function Container61() {
  return (
    <div className="absolute h-[32px] left-[864.38px] overflow-clip top-[13px] w-[154.875px]" data-name="Container">
      <Container60 />
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">2024-05-10</p>
    </div>
  );
}

function Container62() {
  return (
    <div className="absolute h-[23.2px] left-[1027.25px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph16 />
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="absolute h-[30.4px] left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-0 not-italic text-[12px] text-black top-0 w-[87px]">Extracted from customer email</p>
    </div>
  );
}

function Container63() {
  return (
    <div className="absolute h-[38.4px] left-[1190.13px] overflow-clip top-[9.8px] w-[154.875px]" data-name="Container">
      <Paragraph17 />
    </div>
  );
}

function Container64() {
  return (
    <div className="absolute bg-[#f8f8f8] h-[58px] left-0 top-[39.2px] w-[1345px]" data-name="Container">
      <Container50 />
      <Container52 />
      <Container53 />
      <Container54 />
      <Container55 />
      <Container56 />
      <Container57 />
      <Container61 />
      <Container62 />
      <Container63 />
    </div>
  );
}

function Container65() {
  return <div className="absolute border-[#eee] border-b-[0.8px] border-solid h-[58px] left-0 top-0 w-[1345px]" data-name="Container" />;
}

function CheckBoxOutlineBlankOutlined1() {
  return (
    <div className="absolute contents inset-[12.5%]" data-name="CheckBoxOutlineBlankOutlined">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <path d={svgPaths.p3370a680} fill="var(--fill-0, black)" fillOpacity="0.6" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon16() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <CheckBoxOutlineBlankOutlined1 />
    </div>
  );
}

function Container66() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[9px] size-[24px] top-[9px]" data-name="Container">
      <Icon16 />
    </div>
  );
}

function Container67() {
  return (
    <div className="absolute left-0 overflow-clip rounded-[21px] size-[42px] top-[8px]" data-name="Container">
      <Container66 />
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Q-002</p>
    </div>
  );
}

function Container68() {
  return (
    <div className="absolute h-[23.2px] left-[50px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph18 />
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Manual Entry</p>
    </div>
  );
}

function Container69() {
  return (
    <div className="absolute h-[23.2px] left-[212.88px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph19 />
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Brightwave Studios</p>
    </div>
  );
}

function Container70() {
  return (
    <div className="absolute h-[23.2px] left-[375.75px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph20 />
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="absolute h-[30.4px] left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-0 not-italic text-[12px] text-black top-0 w-[96px]">Custom web app development</p>
    </div>
  );
}

function Container71() {
  return (
    <div className="absolute h-[38.4px] left-[538.63px] overflow-clip top-[9.8px] w-[154.875px]" data-name="Container">
      <Paragraph21 />
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">48,000</p>
    </div>
  );
}

function Container72() {
  return (
    <div className="absolute h-[23.2px] left-[701.5px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph22 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute contents inset-[20.08%_0]">
      <div className="absolute inset-[20.08%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.57499 6.58294">
          <path d={svgPaths.p76ec500} fill="var(--fill-0, #00446A)" id="Ellipse 1" />
        </svg>
      </div>
    </div>
  );
}

function Icon17() {
  return (
    <div className="h-[11px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Frame1 />
    </div>
  );
}

function Container73() {
  return (
    <div className="absolute content-stretch flex flex-col h-[11px] items-start left-0 top-[3.5px] w-[6.575px]" data-name="Container">
      <Icon17 />
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="absolute h-[18px] left-[10.58px] top-0 w-[105.925px]" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Roboto:Regular',sans-serif] font-normal leading-[18px] left-0 text-[13px] text-[rgba(0,0,0,0.54)] top-[-0.2px] tracking-[0.16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Sent To Customer
      </p>
    </div>
  );
}

function Container74() {
  return (
    <div className="absolute h-[18px] left-[7px] top-[3px] w-[122.5px]" data-name="Container">
      <Container73 />
      <Paragraph23 />
    </div>
  );
}

function Container75() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.04)] h-[24px] left-[8px] rounded-[16px] top-[4px] w-[133.5px]" data-name="Container">
      <Container74 />
    </div>
  );
}

function Container76() {
  return (
    <div className="absolute h-[32px] left-[864.38px] overflow-clip top-[13px] w-[154.875px]" data-name="Container">
      <Container75 />
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">2024-05-11</p>
    </div>
  );
}

function Container77() {
  return (
    <div className="absolute h-[23.2px] left-[1027.25px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph24 />
    </div>
  );
}

function Paragraph25() {
  return (
    <div className="absolute h-[30.4px] left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-0 not-italic text-[12px] text-black top-0 w-[131px]">Created by Sales Rep - JD</p>
    </div>
  );
}

function Container78() {
  return (
    <div className="absolute h-[38.4px] left-[1190.13px] overflow-clip top-[9.8px] w-[154.875px]" data-name="Container">
      <Paragraph25 />
    </div>
  );
}

function Container79() {
  return (
    <div className="absolute bg-white h-[58px] left-0 top-[97.2px] w-[1345px]" data-name="Container">
      <Container65 />
      <Container67 />
      <Container68 />
      <Container69 />
      <Container70 />
      <Container71 />
      <Container72 />
      <Container76 />
      <Container77 />
      <Container78 />
    </div>
  );
}

function Container80() {
  return <div className="absolute border-[#eee] border-b-[0.8px] border-solid h-[69.6px] left-0 top-0 w-[1345px]" data-name="Container" />;
}

function CheckBoxOutlineBlankOutlined2() {
  return (
    <div className="absolute contents inset-[12.5%]" data-name="CheckBoxOutlineBlankOutlined">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <path d={svgPaths.p3370a680} fill="var(--fill-0, black)" fillOpacity="0.6" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <CheckBoxOutlineBlankOutlined2 />
    </div>
  );
}

function Container81() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[9px] size-[24px] top-[9px]" data-name="Container">
      <Icon18 />
    </div>
  );
}

function Container82() {
  return (
    <div className="absolute left-0 overflow-clip rounded-[21px] size-[42px] top-[13.8px]" data-name="Container">
      <Container81 />
    </div>
  );
}

function Paragraph26() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Q-003</p>
    </div>
  );
}

function Container83() {
  return (
    <div className="absolute h-[23.2px] left-[50px] overflow-clip top-[23.2px] w-[154.875px]" data-name="Container">
      <Paragraph26 />
    </div>
  );
}

function Paragraph27() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">AI Extractor</p>
    </div>
  );
}

function Container84() {
  return (
    <div className="absolute h-[23.2px] left-[212.88px] overflow-clip top-[23.2px] w-[154.875px]" data-name="Container">
      <Paragraph27 />
    </div>
  );
}

function Paragraph28() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">GreenLeaf Energy</p>
    </div>
  );
}

function Container85() {
  return (
    <div className="absolute h-[23.2px] left-[375.75px] overflow-clip top-[23.2px] w-[154.875px]" data-name="Container">
      <Paragraph28 />
    </div>
  );
}

function Paragraph29() {
  return (
    <div className="absolute h-[45.6px] left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-0 not-italic text-[12px] text-black top-0 w-[73px]">Solar panel maintenance subscription</p>
    </div>
  );
}

function Container86() {
  return (
    <div className="absolute h-[53.6px] left-[538.63px] overflow-clip top-[8px] w-[154.875px]" data-name="Container">
      <Paragraph29 />
    </div>
  );
}

function Paragraph30() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">3,200</p>
    </div>
  );
}

function Container87() {
  return (
    <div className="absolute h-[23.2px] left-[701.5px] overflow-clip top-[23.2px] w-[154.875px]" data-name="Container">
      <Paragraph30 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute contents inset-[20.08%_0]">
      <div className="absolute inset-[20.08%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.57499 6.58294">
          <path d={svgPaths.p76ec500} fill="var(--fill-0, white)" id="Ellipse 1" />
        </svg>
      </div>
    </div>
  );
}

function Icon19() {
  return (
    <div className="h-[11px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Frame2 />
    </div>
  );
}

function Container88() {
  return (
    <div className="absolute content-stretch flex flex-col h-[11px] items-start left-0 top-[3.5px] w-[6.575px]" data-name="Container">
      <Icon19 />
    </div>
  );
}

function Paragraph31() {
  return (
    <div className="absolute h-[18px] left-[10.58px] top-0 w-[56.4px]" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Roboto:Regular',sans-serif] font-normal leading-[18px] left-0 text-[13px] text-white top-[-0.2px] tracking-[0.16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Approved
      </p>
    </div>
  );
}

function Container89() {
  return (
    <div className="absolute h-[18px] left-[7px] top-[3px] w-[72.975px]" data-name="Container">
      <Container88 />
      <Paragraph31 />
    </div>
  );
}

function Container90() {
  return (
    <div className="absolute bg-[#4caf50] h-[24px] left-[8px] rounded-[16px] top-[4px] w-[83.975px]" data-name="Container">
      <Container89 />
    </div>
  );
}

function Container91() {
  return (
    <div className="absolute h-[32px] left-[864.38px] overflow-clip top-[18.8px] w-[154.875px]" data-name="Container">
      <Container90 />
    </div>
  );
}

function Paragraph32() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">2024-05-12</p>
    </div>
  );
}

function Container92() {
  return (
    <div className="absolute h-[23.2px] left-[1027.25px] overflow-clip top-[23.2px] w-[154.875px]" data-name="Container">
      <Paragraph32 />
    </div>
  );
}

function Paragraph33() {
  return (
    <div className="absolute h-[30.4px] left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-0 not-italic text-[12px] text-black top-0 w-[100px]">Parsed from CRM communication</p>
    </div>
  );
}

function Container93() {
  return (
    <div className="absolute h-[38.4px] left-[1190.13px] overflow-clip top-[15.6px] w-[154.875px]" data-name="Container">
      <Paragraph33 />
    </div>
  );
}

function Container94() {
  return (
    <div className="absolute bg-[#f8f8f8] h-[69.6px] left-0 top-[155.2px] w-[1345px]" data-name="Container">
      <Container80 />
      <Container82 />
      <Container83 />
      <Container84 />
      <Container85 />
      <Container86 />
      <Container87 />
      <Container91 />
      <Container92 />
      <Container93 />
    </div>
  );
}

function Container95() {
  return <div className="absolute border-[#eee] border-b-[0.8px] border-solid h-[58px] left-0 top-0 w-[1345px]" data-name="Container" />;
}

function CheckBoxOutlineBlankOutlined3() {
  return (
    <div className="absolute contents inset-[12.5%]" data-name="CheckBoxOutlineBlankOutlined">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <path d={svgPaths.p3370a680} fill="var(--fill-0, black)" fillOpacity="0.6" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon20() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <CheckBoxOutlineBlankOutlined3 />
    </div>
  );
}

function Container96() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[9px] size-[24px] top-[9px]" data-name="Container">
      <Icon20 />
    </div>
  );
}

function Container97() {
  return (
    <div className="absolute left-0 overflow-clip rounded-[21px] size-[42px] top-[8px]" data-name="Container">
      <Container96 />
    </div>
  );
}

function Paragraph34() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Q-004</p>
    </div>
  );
}

function Container98() {
  return (
    <div className="absolute h-[23.2px] left-[50px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph34 />
    </div>
  );
}

function Paragraph35() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Manual Entry</p>
    </div>
  );
}

function Container99() {
  return (
    <div className="absolute h-[23.2px] left-[212.88px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph35 />
    </div>
  );
}

function Paragraph36() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Alpha Technologies</p>
    </div>
  );
}

function Container100() {
  return (
    <div className="absolute h-[23.2px] left-[375.75px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph36 />
    </div>
  );
}

function Paragraph37() {
  return (
    <div className="absolute h-[30.4px] left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-0 not-italic text-[12px] text-black top-0 w-[121px]">Hardware supply and installation</p>
    </div>
  );
}

function Container101() {
  return (
    <div className="absolute h-[38.4px] left-[538.63px] overflow-clip top-[9.8px] w-[154.875px]" data-name="Container">
      <Paragraph37 />
    </div>
  );
}

function Paragraph38() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">26,500</p>
    </div>
  );
}

function Container102() {
  return (
    <div className="absolute h-[23.2px] left-[701.5px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph38 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute contents inset-[20.08%_0]">
      <div className="absolute inset-[20.08%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.57499 6.58294">
          <path d={svgPaths.p76ec500} fill="var(--fill-0, black)" fillOpacity="0.54" id="Ellipse 1" />
        </svg>
      </div>
    </div>
  );
}

function Icon21() {
  return (
    <div className="h-[11px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Frame3 />
    </div>
  );
}

function Container103() {
  return (
    <div className="absolute content-stretch flex flex-col h-[11px] items-start left-0 top-[3.5px] w-[6.575px]" data-name="Container">
      <Icon21 />
    </div>
  );
}

function Paragraph39() {
  return (
    <div className="absolute h-[18px] left-[10.58px] top-0 w-[29.337px]" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Roboto:Regular',sans-serif] font-normal leading-[18px] left-0 text-[13px] text-[rgba(0,0,0,0.54)] top-[-0.2px] tracking-[0.16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Draft
      </p>
    </div>
  );
}

function Container104() {
  return (
    <div className="absolute h-[18px] left-[7px] top-[3px] w-[45.913px]" data-name="Container">
      <Container103 />
      <Paragraph39 />
    </div>
  );
}

function Container105() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.04)] h-[24px] left-[8px] rounded-[16px] top-[4px] w-[56.913px]" data-name="Container">
      <Container104 />
    </div>
  );
}

function Container106() {
  return (
    <div className="absolute h-[32px] left-[864.38px] overflow-clip top-[13px] w-[154.875px]" data-name="Container">
      <Container105 />
    </div>
  );
}

function Paragraph40() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">2024-05-13</p>
    </div>
  );
}

function Container107() {
  return (
    <div className="absolute h-[23.2px] left-[1027.25px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph40 />
    </div>
  );
}

function Paragraph41() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Waiting for tech specs</p>
    </div>
  );
}

function Container108() {
  return (
    <div className="absolute h-[23.2px] left-[1190.13px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph41 />
    </div>
  );
}

function Container109() {
  return (
    <div className="absolute bg-white h-[58px] left-0 top-[224.8px] w-[1345px]" data-name="Container">
      <Container95 />
      <Container97 />
      <Container98 />
      <Container99 />
      <Container100 />
      <Container101 />
      <Container102 />
      <Container106 />
      <Container107 />
      <Container108 />
    </div>
  );
}

function Container110() {
  return <div className="absolute border-[#eee] border-b-[0.8px] border-solid h-[58px] left-0 top-0 w-[1345px]" data-name="Container" />;
}

function CheckBoxOutlineBlankOutlined4() {
  return (
    <div className="absolute contents inset-[12.5%]" data-name="CheckBoxOutlineBlankOutlined">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <path d={svgPaths.p3370a680} fill="var(--fill-0, black)" fillOpacity="0.6" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon22() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <CheckBoxOutlineBlankOutlined4 />
    </div>
  );
}

function Container111() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[9px] size-[24px] top-[9px]" data-name="Container">
      <Icon22 />
    </div>
  );
}

function Container112() {
  return (
    <div className="absolute left-0 overflow-clip rounded-[21px] size-[42px] top-[8px]" data-name="Container">
      <Container111 />
    </div>
  );
}

function Paragraph42() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Q-005</p>
    </div>
  );
}

function Container113() {
  return (
    <div className="absolute h-[23.2px] left-[50px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph42 />
    </div>
  );
}

function Paragraph43() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">AI Extractor</p>
    </div>
  );
}

function Container114() {
  return (
    <div className="absolute h-[23.2px] left-[212.88px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph43 />
    </div>
  );
}

function Paragraph44() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Horizon Retail</p>
    </div>
  );
}

function Container115() {
  return (
    <div className="absolute h-[23.2px] left-[375.75px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph44 />
    </div>
  );
}

function Paragraph45() {
  return (
    <div className="absolute h-[30.4px] left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-0 not-italic text-[12px] text-black top-0 w-[118px]">POS terminal replacement request</p>
    </div>
  );
}

function Container116() {
  return (
    <div className="absolute h-[38.4px] left-[538.63px] overflow-clip top-[9.8px] w-[154.875px]" data-name="Container">
      <Paragraph45 />
    </div>
  );
}

function Paragraph46() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">8,900</p>
    </div>
  );
}

function Container117() {
  return (
    <div className="absolute h-[23.2px] left-[701.5px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph46 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute contents inset-[20.08%_0]">
      <div className="absolute inset-[20.08%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.57499 6.58294">
          <path d={svgPaths.p76ec500} fill="var(--fill-0, #00446A)" id="Ellipse 1" />
        </svg>
      </div>
    </div>
  );
}

function Icon23() {
  return (
    <div className="h-[11px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Frame4 />
    </div>
  );
}

function Container118() {
  return (
    <div className="absolute content-stretch flex flex-col h-[11px] items-start left-0 top-[3.5px] w-[6.575px]" data-name="Container">
      <Icon23 />
    </div>
  );
}

function Paragraph47() {
  return (
    <div className="absolute h-[18px] left-[10.58px] top-0 w-[105.925px]" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Roboto:Regular',sans-serif] font-normal leading-[18px] left-0 text-[13px] text-[rgba(0,0,0,0.54)] top-[-0.2px] tracking-[0.16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Sent To Customer
      </p>
    </div>
  );
}

function Container119() {
  return (
    <div className="absolute h-[18px] left-[7px] top-[3px] w-[122.5px]" data-name="Container">
      <Container118 />
      <Paragraph47 />
    </div>
  );
}

function Container120() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.04)] h-[24px] left-[8px] rounded-[16px] top-[4px] w-[133.5px]" data-name="Container">
      <Container119 />
    </div>
  );
}

function Container121() {
  return (
    <div className="absolute h-[32px] left-[864.38px] overflow-clip top-[13px] w-[154.875px]" data-name="Container">
      <Container120 />
    </div>
  );
}

function Paragraph48() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">2024-05-14</p>
    </div>
  );
}

function Container122() {
  return (
    <div className="absolute h-[23.2px] left-[1027.25px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph48 />
    </div>
  );
}

function Paragraph49() {
  return (
    <div className="absolute h-[30.4px] left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-0 not-italic text-[12px] text-black top-0 w-[120px]">Extracted from ticket email</p>
    </div>
  );
}

function Container123() {
  return (
    <div className="absolute h-[38.4px] left-[1190.13px] overflow-clip top-[9.8px] w-[154.875px]" data-name="Container">
      <Paragraph49 />
    </div>
  );
}

function Container124() {
  return (
    <div className="absolute bg-[#f8f8f8] h-[58px] left-0 top-[282.8px] w-[1345px]" data-name="Container">
      <Container110 />
      <Container112 />
      <Container113 />
      <Container114 />
      <Container115 />
      <Container116 />
      <Container117 />
      <Container121 />
      <Container122 />
      <Container123 />
    </div>
  );
}

function Container125() {
  return <div className="absolute border-[#eee] border-b-[0.8px] border-solid h-[58px] left-0 top-0 w-[1345px]" data-name="Container" />;
}

function CheckBoxOutlineBlankOutlined5() {
  return (
    <div className="absolute contents inset-[12.5%]" data-name="CheckBoxOutlineBlankOutlined">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <path d={svgPaths.p3370a680} fill="var(--fill-0, black)" fillOpacity="0.6" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon24() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <CheckBoxOutlineBlankOutlined5 />
    </div>
  );
}

function Container126() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[9px] size-[24px] top-[9px]" data-name="Container">
      <Icon24 />
    </div>
  );
}

function Container127() {
  return (
    <div className="absolute left-0 overflow-clip rounded-[21px] size-[42px] top-[8px]" data-name="Container">
      <Container126 />
    </div>
  );
}

function Paragraph50() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Q-006</p>
    </div>
  );
}

function Container128() {
  return (
    <div className="absolute h-[23.2px] left-[50px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph50 />
    </div>
  );
}

function Paragraph51() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Manual Entry</p>
    </div>
  );
}

function Container129() {
  return (
    <div className="absolute h-[23.2px] left-[212.88px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph51 />
    </div>
  );
}

function Paragraph52() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Urban Build Co.</p>
    </div>
  );
}

function Container130() {
  return (
    <div className="absolute h-[23.2px] left-[375.75px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph52 />
    </div>
  );
}

function Paragraph53() {
  return (
    <div className="absolute h-[30.4px] left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-0 not-italic text-[12px] text-black top-0 w-[118px]">Structural consulting services</p>
    </div>
  );
}

function Container131() {
  return (
    <div className="absolute h-[38.4px] left-[538.63px] overflow-clip top-[9.8px] w-[154.875px]" data-name="Container">
      <Paragraph53 />
    </div>
  );
}

function Paragraph54() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">15,750</p>
    </div>
  );
}

function Container132() {
  return (
    <div className="absolute h-[23.2px] left-[701.5px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph54 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute contents inset-[20.08%_0]">
      <div className="absolute inset-[20.08%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.57499 6.58294">
          <path d={svgPaths.p76ec500} fill="var(--fill-0, #B26413)" id="Ellipse 1" />
        </svg>
      </div>
    </div>
  );
}

function Icon25() {
  return (
    <div className="h-[11px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Frame5 />
    </div>
  );
}

function Container133() {
  return (
    <div className="absolute content-stretch flex flex-col h-[11px] items-start left-0 top-[3.5px] w-[6.575px]" data-name="Container">
      <Icon25 />
    </div>
  );
}

function Paragraph55() {
  return (
    <div className="absolute h-[18px] left-[10.58px] top-0 w-[69.025px]" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Roboto:Regular',sans-serif] font-normal leading-[18px] left-0 text-[13px] text-[rgba(0,0,0,0.54)] top-[-0.2px] tracking-[0.16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Negotiating
      </p>
    </div>
  );
}

function Container134() {
  return (
    <div className="absolute h-[18px] left-[7px] top-[3px] w-[85.6px]" data-name="Container">
      <Container133 />
      <Paragraph55 />
    </div>
  );
}

function Container135() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.04)] h-[24px] left-[8px] rounded-[16px] top-[4px] w-[96.6px]" data-name="Container">
      <Container134 />
    </div>
  );
}

function Container136() {
  return (
    <div className="absolute h-[32px] left-[864.38px] overflow-clip top-[13px] w-[154.875px]" data-name="Container">
      <Container135 />
    </div>
  );
}

function Paragraph56() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">2024-05-15</p>
    </div>
  );
}

function Container137() {
  return (
    <div className="absolute h-[23.2px] left-[1027.25px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph56 />
    </div>
  );
}

function Paragraph57() {
  return (
    <div className="absolute h-[30.4px] left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-0 not-italic text-[12px] text-black top-0 w-[94px]">Client requested discount</p>
    </div>
  );
}

function Container138() {
  return (
    <div className="absolute h-[38.4px] left-[1190.13px] overflow-clip top-[9.8px] w-[154.875px]" data-name="Container">
      <Paragraph57 />
    </div>
  );
}

function Container139() {
  return (
    <div className="absolute bg-white h-[58px] left-0 top-[340.8px] w-[1345px]" data-name="Container">
      <Container125 />
      <Container127 />
      <Container128 />
      <Container129 />
      <Container130 />
      <Container131 />
      <Container132 />
      <Container136 />
      <Container137 />
      <Container138 />
    </div>
  );
}

function Container140() {
  return <div className="absolute border-[#eee] border-b-[0.8px] border-solid h-[58px] left-0 top-0 w-[1345px]" data-name="Container" />;
}

function CheckBoxOutlineBlankOutlined6() {
  return (
    <div className="absolute contents inset-[12.5%]" data-name="CheckBoxOutlineBlankOutlined">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <path d={svgPaths.p3370a680} fill="var(--fill-0, black)" fillOpacity="0.6" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon26() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <CheckBoxOutlineBlankOutlined6 />
    </div>
  );
}

function Container141() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[9px] size-[24px] top-[9px]" data-name="Container">
      <Icon26 />
    </div>
  );
}

function Container142() {
  return (
    <div className="absolute left-0 overflow-clip rounded-[21px] size-[42px] top-[8px]" data-name="Container">
      <Container141 />
    </div>
  );
}

function Paragraph58() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Q-007</p>
    </div>
  );
}

function Container143() {
  return (
    <div className="absolute h-[23.2px] left-[50px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph58 />
    </div>
  );
}

function Paragraph59() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">AI Extractor</p>
    </div>
  );
}

function Container144() {
  return (
    <div className="absolute h-[23.2px] left-[212.88px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph59 />
    </div>
  );
}

function Paragraph60() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">CloudSync LLC</p>
    </div>
  );
}

function Container145() {
  return (
    <div className="absolute h-[23.2px] left-[375.75px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph60 />
    </div>
  );
}

function Paragraph61() {
  return (
    <div className="absolute h-[30.4px] left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-0 not-italic text-[12px] text-black top-0 w-[121px]">Expansion of existing support plan</p>
    </div>
  );
}

function Container146() {
  return (
    <div className="absolute h-[38.4px] left-[538.63px] overflow-clip top-[9.8px] w-[154.875px]" data-name="Container">
      <Paragraph61 />
    </div>
  );
}

function Paragraph62() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">4,500</p>
    </div>
  );
}

function Container147() {
  return (
    <div className="absolute h-[23.2px] left-[701.5px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph62 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute contents inset-[20.08%_0]">
      <div className="absolute inset-[20.08%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.57499 6.58294">
          <path d={svgPaths.p76ec500} fill="var(--fill-0, white)" id="Ellipse 1" />
        </svg>
      </div>
    </div>
  );
}

function Icon27() {
  return (
    <div className="h-[11px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Frame6 />
    </div>
  );
}

function Container148() {
  return (
    <div className="absolute content-stretch flex flex-col h-[11px] items-start left-0 top-[3.5px] w-[6.575px]" data-name="Container">
      <Icon27 />
    </div>
  );
}

function Paragraph63() {
  return (
    <div className="absolute h-[18px] left-[10.58px] top-0 w-[56.4px]" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Roboto:Regular',sans-serif] font-normal leading-[18px] left-0 text-[13px] text-white top-[-0.2px] tracking-[0.16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Approved
      </p>
    </div>
  );
}

function Container149() {
  return (
    <div className="absolute h-[18px] left-[7px] top-[3px] w-[72.975px]" data-name="Container">
      <Container148 />
      <Paragraph63 />
    </div>
  );
}

function Container150() {
  return (
    <div className="absolute bg-[#4caf50] h-[24px] left-[8px] rounded-[16px] top-[4px] w-[83.975px]" data-name="Container">
      <Container149 />
    </div>
  );
}

function Container151() {
  return (
    <div className="absolute h-[32px] left-[864.38px] overflow-clip top-[13px] w-[154.875px]" data-name="Container">
      <Container150 />
    </div>
  );
}

function Paragraph64() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">2024-05-16</p>
    </div>
  );
}

function Container152() {
  return (
    <div className="absolute h-[23.2px] left-[1027.25px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph64 />
    </div>
  );
}

function Paragraph65() {
  return (
    <div className="absolute h-[30.4px] left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-0 not-italic text-[12px] text-black top-0 w-[123px]">Auto-extracted - high confidence</p>
    </div>
  );
}

function Container153() {
  return (
    <div className="absolute h-[38.4px] left-[1190.13px] overflow-clip top-[9.8px] w-[154.875px]" data-name="Container">
      <Paragraph65 />
    </div>
  );
}

function Container154() {
  return (
    <div className="absolute bg-[#f8f8f8] h-[58px] left-0 top-[398.8px] w-[1345px]" data-name="Container">
      <Container140 />
      <Container142 />
      <Container143 />
      <Container144 />
      <Container145 />
      <Container146 />
      <Container147 />
      <Container151 />
      <Container152 />
      <Container153 />
    </div>
  );
}

function Container155() {
  return <div className="absolute border-[#eee] border-b-[0.8px] border-solid h-[58px] left-0 top-0 w-[1345px]" data-name="Container" />;
}

function CheckBoxOutlineBlankOutlined7() {
  return (
    <div className="absolute contents inset-[12.5%]" data-name="CheckBoxOutlineBlankOutlined">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <path d={svgPaths.p3370a680} fill="var(--fill-0, black)" fillOpacity="0.6" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon28() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <CheckBoxOutlineBlankOutlined7 />
    </div>
  );
}

function Container156() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[9px] size-[24px] top-[9px]" data-name="Container">
      <Icon28 />
    </div>
  );
}

function Container157() {
  return (
    <div className="absolute left-0 overflow-clip rounded-[21px] size-[42px] top-[8px]" data-name="Container">
      <Container156 />
    </div>
  );
}

function Paragraph66() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Q-008</p>
    </div>
  );
}

function Container158() {
  return (
    <div className="absolute h-[23.2px] left-[50px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph66 />
    </div>
  );
}

function Paragraph67() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Manual Entry</p>
    </div>
  );
}

function Container159() {
  return (
    <div className="absolute h-[23.2px] left-[212.88px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph67 />
    </div>
  );
}

function Paragraph68() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Stellar Marketing</p>
    </div>
  );
}

function Container160() {
  return (
    <div className="absolute h-[23.2px] left-[375.75px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph68 />
    </div>
  );
}

function Paragraph69() {
  return (
    <div className="absolute h-[30.4px] left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-0 not-italic text-[12px] text-black top-0 w-[124px]">Campaign design and analytics package</p>
    </div>
  );
}

function Container161() {
  return (
    <div className="absolute h-[38.4px] left-[538.63px] overflow-clip top-[9.8px] w-[154.875px]" data-name="Container">
      <Paragraph69 />
    </div>
  );
}

function Paragraph70() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">9,000</p>
    </div>
  );
}

function Container162() {
  return (
    <div className="absolute h-[23.2px] left-[701.5px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph70 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute contents inset-[20.08%_0]">
      <div className="absolute inset-[20.08%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.57499 6.58294">
          <path d={svgPaths.p76ec500} fill="var(--fill-0, white)" id="Ellipse 1" />
        </svg>
      </div>
    </div>
  );
}

function Icon29() {
  return (
    <div className="h-[11px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Frame7 />
    </div>
  );
}

function Container163() {
  return (
    <div className="absolute content-stretch flex flex-col h-[11px] items-start left-0 top-[3.5px] w-[6.575px]" data-name="Container">
      <Icon29 />
    </div>
  );
}

function Paragraph71() {
  return (
    <div className="absolute h-[18px] left-[10.58px] top-0 w-[51.475px]" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Roboto:Regular',sans-serif] font-normal leading-[18px] left-0 text-[13px] text-white top-[-0.2px] tracking-[0.16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Rejected
      </p>
    </div>
  );
}

function Container164() {
  return (
    <div className="absolute h-[18px] left-[7px] top-[3px] w-[68.05px]" data-name="Container">
      <Container163 />
      <Paragraph71 />
    </div>
  );
}

function Container165() {
  return (
    <div className="absolute bg-[#ff585d] h-[24px] left-[8px] rounded-[16px] top-[4px] w-[79.05px]" data-name="Container">
      <Container164 />
    </div>
  );
}

function Container166() {
  return (
    <div className="absolute h-[32px] left-[864.38px] overflow-clip top-[13px] w-[154.875px]" data-name="Container">
      <Container165 />
    </div>
  );
}

function Paragraph72() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">2024-05-17</p>
    </div>
  );
}

function Container167() {
  return (
    <div className="absolute h-[23.2px] left-[1027.25px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph72 />
    </div>
  );
}

function Paragraph73() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Follow-up in 3 days</p>
    </div>
  );
}

function Container168() {
  return (
    <div className="absolute h-[23.2px] left-[1190.13px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph73 />
    </div>
  );
}

function Container169() {
  return (
    <div className="absolute bg-white h-[58px] left-0 top-[456.8px] w-[1345px]" data-name="Container">
      <Container155 />
      <Container157 />
      <Container158 />
      <Container159 />
      <Container160 />
      <Container161 />
      <Container162 />
      <Container166 />
      <Container167 />
      <Container168 />
    </div>
  );
}

function Container170() {
  return <div className="absolute border-[#eee] border-b-[0.8px] border-solid h-[58px] left-0 top-0 w-[1345px]" data-name="Container" />;
}

function CheckBoxOutlineBlankOutlined8() {
  return (
    <div className="absolute contents inset-[12.5%]" data-name="CheckBoxOutlineBlankOutlined">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <path d={svgPaths.p3370a680} fill="var(--fill-0, black)" fillOpacity="0.6" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon30() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <CheckBoxOutlineBlankOutlined8 />
    </div>
  );
}

function Container171() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[9px] size-[24px] top-[9px]" data-name="Container">
      <Icon30 />
    </div>
  );
}

function Container172() {
  return (
    <div className="absolute left-0 overflow-clip rounded-[21px] size-[42px] top-[8px]" data-name="Container">
      <Container171 />
    </div>
  );
}

function Paragraph74() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Q-009</p>
    </div>
  );
}

function Container173() {
  return (
    <div className="absolute h-[23.2px] left-[50px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph74 />
    </div>
  );
}

function Paragraph75() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">AI Extractor</p>
    </div>
  );
}

function Container174() {
  return (
    <div className="absolute h-[23.2px] left-[212.88px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph75 />
    </div>
  );
}

function Paragraph76() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">HealthPlus Systems</p>
    </div>
  );
}

function Container175() {
  return (
    <div className="absolute h-[23.2px] left-[375.75px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph76 />
    </div>
  );
}

function Paragraph77() {
  return (
    <div className="absolute h-[30.4px] left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-0 not-italic text-[12px] text-black top-0 w-[84px]">API integration enhancement</p>
    </div>
  );
}

function Container176() {
  return (
    <div className="absolute h-[38.4px] left-[538.63px] overflow-clip top-[9.8px] w-[154.875px]" data-name="Container">
      <Paragraph77 />
    </div>
  );
}

function Paragraph78() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">6,800</p>
    </div>
  );
}

function Container177() {
  return (
    <div className="absolute h-[23.2px] left-[701.5px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph78 />
    </div>
  );
}

function Paragraph79() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Draft</p>
    </div>
  );
}

function Container178() {
  return (
    <div className="absolute h-[23.2px] left-[864.38px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph79 />
    </div>
  );
}

function Paragraph80() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">2024-05-18</p>
    </div>
  );
}

function Container179() {
  return (
    <div className="absolute h-[23.2px] left-[1027.25px] overflow-clip top-[17.4px] w-[154.875px]" data-name="Container">
      <Paragraph80 />
    </div>
  );
}

function Paragraph81() {
  return (
    <div className="absolute h-[30.4px] left-[8px] top-[4px] w-[138.875px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-0 not-italic text-[12px] text-black top-0 w-[117px]">Parsed from emailed RFP</p>
    </div>
  );
}

function Container180() {
  return (
    <div className="absolute h-[38.4px] left-[1190.13px] overflow-clip top-[9.8px] w-[154.875px]" data-name="Container">
      <Paragraph81 />
    </div>
  );
}

function Container181() {
  return (
    <div className="absolute bg-[#f8f8f8] h-[58px] left-0 top-[514.8px] w-[1345px]" data-name="Container">
      <Container170 />
      <Container172 />
      <Container173 />
      <Container174 />
      <Container175 />
      <Container176 />
      <Container177 />
      <Container178 />
      <Container179 />
      <Container180 />
    </div>
  );
}

function Container182() {
  return <div className="absolute border-[#eee] border-b-[0.8px] border-solid h-[54.4px] left-0 top-0 w-[1345px]" data-name="Container" />;
}

function Paragraph82() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[145.125px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Q-010</p>
    </div>
  );
}

function Container183() {
  return (
    <div className="absolute h-[23.2px] left-0 overflow-clip top-[15.6px] w-[161.125px]" data-name="Container">
      <Paragraph82 />
    </div>
  );
}

function Paragraph83() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[145.125px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Manual Entry</p>
    </div>
  );
}

function Container184() {
  return (
    <div className="absolute h-[23.2px] left-[169.13px] overflow-clip top-[15.6px] w-[161.125px]" data-name="Container">
      <Paragraph83 />
    </div>
  );
}

function Paragraph84() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[145.125px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Nova Logistics</p>
    </div>
  );
}

function Container185() {
  return (
    <div className="absolute h-[23.2px] left-[338.25px] overflow-clip top-[15.6px] w-[161.125px]" data-name="Container">
      <Paragraph84 />
    </div>
  );
}

function Paragraph85() {
  return (
    <div className="absolute h-[30.4px] left-[8px] top-[4px] w-[145.125px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-0 not-italic text-[12px] text-black top-0 w-[106px]">Fleet management solution (annual)</p>
    </div>
  );
}

function Container186() {
  return (
    <div className="absolute h-[38.4px] left-[507.38px] overflow-clip top-[8px] w-[161.125px]" data-name="Container">
      <Paragraph85 />
    </div>
  );
}

function Paragraph86() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[145.125px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">32,000</p>
    </div>
  );
}

function Container187() {
  return (
    <div className="absolute h-[23.2px] left-[676.5px] overflow-clip top-[15.6px] w-[161.125px]" data-name="Container">
      <Paragraph86 />
    </div>
  );
}

function Paragraph87() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[145.125px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">Approved</p>
    </div>
  );
}

function Container188() {
  return (
    <div className="absolute h-[23.2px] left-[845.63px] overflow-clip top-[15.6px] w-[161.125px]" data-name="Container">
      <Paragraph87 />
    </div>
  );
}

function Paragraph88() {
  return (
    <div className="absolute content-stretch flex h-[15.2px] items-start left-[8px] top-[4px] w-[145.125px]" data-name="Paragraph">
      <p className="css-4hzbpn flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-h-px min-w-px not-italic relative text-[12px] text-black">2024-05-19</p>
    </div>
  );
}

function Container189() {
  return (
    <div className="absolute h-[23.2px] left-[1014.75px] overflow-clip top-[15.6px] w-[161.125px]" data-name="Container">
      <Paragraph88 />
    </div>
  );
}

function Paragraph89() {
  return (
    <div className="absolute h-[30.4px] left-[8px] top-[4px] w-[145.125px]" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-0 not-italic text-[12px] text-black top-0 w-[128px]">Manual input - verified totals</p>
    </div>
  );
}

function Container190() {
  return (
    <div className="absolute h-[38.4px] left-[1183.88px] overflow-clip top-[8px] w-[161.125px]" data-name="Container">
      <Paragraph89 />
    </div>
  );
}

function Container191() {
  return (
    <div className="absolute bg-white h-[54.4px] left-0 top-[572.8px] w-[1345px]" data-name="Container">
      <Container182 />
      <Container183 />
      <Container184 />
      <Container185 />
      <Container186 />
      <Container187 />
      <Container188 />
      <Container189 />
      <Container190 />
    </div>
  );
}

function Container192() {
  return (
    <div className="absolute h-[522px] left-0 overflow-clip rounded-[12px] top-0 w-[1345px]" data-name="Container">
      <Container49 />
      <Container64 />
      <Container79 />
      <Container94 />
      <Container109 />
      <Container124 />
      <Container139 />
      <Container154 />
      <Container169 />
      <Container181 />
      <Container191 />
    </div>
  );
}

function Container193() {
  return <div className="absolute border-[0.8px] border-[rgba(0,0,0,0.12)] border-solid h-[522px] left-0 rounded-[12px] top-0 w-[1654px]" data-name="Container" />;
}

function Container194() {
  return (
    <div className="absolute bg-white h-[522px] left-[12px] rounded-[12px] top-[82px] w-[1631px]" data-name="Container">
      <Container192 />
      <Container193 />
    </div>
  );
}

function Container195() {
  return (
    <div className="absolute h-[630px] left-[16px] overflow-clip top-[89px] w-[1669px]" data-name="Container">
      <Container39 />
      <Container194 />
    </div>
  );
}

function Container196() {
  return (
    <div className="absolute bg-[#f8f8f8] h-[898.813px] left-0 overflow-clip top-[119px] w-[1730.4px]" data-name="Container">
      <Container13 />
      <Container21 />
      <Container195 />
    </div>
  );
}

export default function EmailToolPrototype() {
  return (
    <div className="bg-white relative size-full" data-name="Email Tool Prototype">
      <Container12 />
      <Container196 />
    </div>
  );
}
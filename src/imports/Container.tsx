import svgPaths from "./svg-bd5t51d1nt";

function Heading() {
  return (
    <div className="h-[28px] relative shrink-0 w-[128.938px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Arial:Bold',sans-serif] leading-[28px] left-0 not-italic text-[18px] text-white top-[-1.4px]">Quote Extractor</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
            <path d={svgPaths.p354ab980} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
            <path d={svgPaths.p2a4db200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[4px] px-[4px] relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#00446a] h-[60.8px] relative shrink-0 w-[383.2px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b-[0.8px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[0.8px] px-[16px] relative size-full">
        <Heading />
        <Button />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute css-ew64yg font-['Arial:Bold',sans-serif] leading-[20px] left-0 not-italic text-[#00446a] text-[14px] top-[-1.2px]">Email Information</p>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute content-stretch flex h-[18.4px] items-start left-0 top-[0.8px] w-[35px]" data-name="Text">
      <p className="css-ew64yg font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px]">From:</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute content-stretch flex h-[18.4px] items-start left-[43px] top-[0.8px] w-[68.013px]" data-name="Text">
      <p className="css-ew64yg font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px]">David Park</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <Text />
      <Text1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute content-stretch flex h-[18.4px] items-start left-0 top-[0.8px] w-[48.55px]" data-name="Text">
      <p className="css-ew64yg font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px]">Subject:</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute content-stretch flex h-[18.4px] items-start left-[56.55px] top-[0.8px] w-[144.775px]" data-name="Text">
      <p className="css-ew64yg font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px]">Invoice #INV-2026-001</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <Text2 />
      <Text3 />
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute content-stretch flex h-[18.4px] items-start left-0 top-[0.8px] w-[32.05px]" data-name="Text">
      <p className="css-ew64yg font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px]">Date:</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute content-stretch flex h-[18.4px] items-start left-[40.05px] top-[0.8px] w-[78.662px]" data-name="Text">
      <p className="css-ew64yg font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px]">Jan 26, 2026</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <Text4 />
      <Text5 />
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[#f9fafb] h-[100px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start pt-[12px] px-[12px] relative size-full">
        <Container1 />
        <Container2 />
        <Container3 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[128px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Container4 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute css-ew64yg font-['Arial:Bold',sans-serif] leading-[20px] left-0 not-italic text-[#00446a] text-[14px] top-[-1.2px]">Extracted Quote Details</p>
    </div>
  );
}

function Label() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[5.6px] w-[88.287px]" data-name="Label">
      <p className="css-ew64yg font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px]">Customer Name</p>
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute h-[37.6px] left-0 rounded-[8px] top-[28px] w-[327.2px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[12px] py-[8px] relative rounded-[inherit] size-full">
        <p className="css-ew64yg font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px]">David Park</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[65.6px] relative shrink-0 w-full" data-name="Container">
      <Label />
      <TextInput />
    </div>
  );
}

function Label1() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[5.6px] w-[62.7px]" data-name="Label">
      <p className="css-ew64yg font-['Arial:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px]">Quote Date</p>
    </div>
  );
}

function TextInput1() {
  return (
    <div className="absolute h-[37.6px] left-0 rounded-[8px] top-[28px] w-[327.2px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[12px] py-[8px] relative rounded-[inherit] size-full">
        <p className="css-ew64yg font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px]">Jan 26, 2026</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[65.6px] relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <TextInput1 />
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[#f9fafb] h-[167.2px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start pt-[12px] px-[12px] relative size-full">
        <Container6 />
        <Container7 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[195.2px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Container8 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute css-ew64yg font-['Arial:Bold',sans-serif] leading-[20px] left-0 not-italic text-[#00446a] text-[14px] top-[-1.2px]">{`AI Will Quote These Products ( If Available) `}</p>
    </div>
  );
}

function TableHeaderCellProductName() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Header Cell (Product Name)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Product Name</p>
        </div>
      </div>
    </div>
  );
}

function TableHeaderCellSku() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Header Cell (SKU)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">SKU</p>
        </div>
      </div>
    </div>
  );
}

function TableHeaderCellQuantity() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Header Cell (Quantity)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Quantity</p>
        </div>
      </div>
    </div>
  );
}

function TableCellProductName() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Product Name)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Enterprise Cloud Storage - 5TB</p>
        </div>
      </div>
    </div>
  );
}

function TableCellSku() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (SKU)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">ECS-5TB</p>
        </div>
      </div>
    </div>
  );
}

function TableCellQuantity() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Quantity)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">10</p>
        </div>
      </div>
    </div>
  );
}

function TableRowInstance() {
  return (
    <div className="bg-[#f8f8f8] content-stretch flex gap-[8px] items-center py-[8px] relative shrink-0 w-full" data-name="🚣 Table Row (Instance)">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <TableCellProductName />
      <TableCellSku />
      <TableCellQuantity />
    </div>
  );
}

function TableCellProductName1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Product Name)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Advanced Analytics Dashboard</p>
        </div>
      </div>
    </div>
  );
}

function TableCellSku1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (SKU)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">AAD-01</p>
        </div>
      </div>
    </div>
  );
}

function TableCellQuantity1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Quantity)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">5</p>
        </div>
      </div>
    </div>
  );
}

function TableRowInstance1() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center py-[8px] relative shrink-0 w-full" data-name="🚣 Table Row (Instance)">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <TableCellProductName1 />
      <TableCellSku1 />
      <TableCellQuantity1 />
    </div>
  );
}

function TableCellProductName2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Product Name)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Premium Support Package</p>
        </div>
      </div>
    </div>
  );
}

function TableCellSku2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (SKU)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">PSP-247</p>
        </div>
      </div>
    </div>
  );
}

function TableCellQuantity2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Quantity)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">1</p>
        </div>
      </div>
    </div>
  );
}

function TableRowInstance2() {
  return (
    <div className="bg-[#f8f8f8] content-stretch flex gap-[8px] items-center py-[8px] relative shrink-0 w-full" data-name="🚣 Table Row (Instance)">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <TableCellProductName2 />
      <TableCellSku2 />
      <TableCellQuantity2 />
    </div>
  );
}

function TableCellProductName3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Product Name)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Business Collaboration Suite</p>
        </div>
      </div>
    </div>
  );
}

function TableCellSku3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (SKU)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">BCS-ENT</p>
        </div>
      </div>
    </div>
  );
}

function TableCellQuantity3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Quantity)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">1</p>
        </div>
      </div>
    </div>
  );
}

function TableRowInstance3() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center py-[8px] relative shrink-0 w-full" data-name="🚣 Table Row (Instance)">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <TableCellProductName3 />
      <TableCellSku3 />
      <TableCellQuantity3 />
    </div>
  );
}

function TableCellProductName4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Product Name)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">Standard Email Security</p>
        </div>
      </div>
    </div>
  );
}

function TableCellSku4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (SKU)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">SES-STD</p>
        </div>
      </div>
    </div>
  );
}

function TableCellQuantity4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="🏛️ Table Cell (Quantity)">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[8px] py-[4px] relative w-full">
          <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-black w-full">1</p>
        </div>
      </div>
    </div>
  );
}

function TableRowInstance4() {
  return (
    <div className="bg-[#f8f8f8] content-stretch flex gap-[8px] items-center py-[8px] relative shrink-0 w-full" data-name="🚣 Table Row (Instance)">
      <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
      <TableCellProductName4 />
      <TableCellSku4 />
      <TableCellQuantity4 />
    </div>
  );
}

function ImportedTableTableEf7899E7A5Ce40679E596223Fa7B8F00C6Cc1626809147DcBd572Fc2C628F9D72Csv() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-[351px]" data-name="🪑 Imported Table (table-ef7899e7-a5ce-4067-9e59-6223fa7b8f00-c6cc1626-8091-47dc-bd57-2fc2c628f9d7-2.csv)">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="content-stretch flex gap-[8px] items-center py-[8px] relative shrink-0 w-full" data-name="🚣 Table Header (Component)">
          <div aria-hidden="true" className="absolute border-[#eee] border-b border-solid inset-0 pointer-events-none" />
          <TableHeaderCellProductName />
          <TableHeaderCellSku />
          <TableHeaderCellQuantity />
        </div>
        <TableRowInstance />
        <TableRowInstance1 />
        <TableRowInstance2 />
        <TableRowInstance3 />
        <TableRowInstance4 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[214px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading3 />
      <ImportedTableTableEf7899E7A5Ce40679E596223Fa7B8F00C6Cc1626809147DcBd572Fc2C628F9D72Csv />
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute css-ew64yg font-['Arial:Bold',sans-serif] leading-[20px] left-0 not-italic text-[#00446a] text-[14px] top-[-1.2px]">AI Will Use This Info In Your Quote</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[260px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Arial:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-[-1.2px] w-[282px]">
        Hi,
        <br aria-hidden="true" />
        <br aria-hidden="true" />
        I'm reaching out to request a comprehensive quote for our enterprise infrastructure upgrade at Acme Corporation.
        <br aria-hidden="true" />
        <br aria-hidden="true" />
        As an existing customer, we currently have your Business Collaboration Suite and Standard Email Security package. We'd like to renew both of these for another year.
        <br aria-hidden="true" />
        <br aria-hidden="true" />
        Additionally, we need to expand our cloud storage capacity. We're looking at approximately 10 units of your Enterprise Cloud Storage - 5TB solution.
        <br aria-hidden="true" />
        <br aria-hidden="true" />
        We're also looking for real-time analytics. We need about 5 Advanced Analytics Dashboard licenses.
        <br aria-hidden="true" />
        <br aria-hidden="true" />
        Best regards,
        <br aria-hidden="true" />
        John Smith
        <br aria-hidden="true" />
        Acme Corporation
      </p>
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-[#f9fafb] h-[374px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col items-start pt-[12px] px-[12px] relative size-full">
        <Paragraph />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[402px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading4 />
      <Container11 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[756.763px] items-start relative shrink-0 w-full" data-name="Container">
      <Container5 />
      <Container9 />
      <Container10 />
      <Container12 />
    </div>
  );
}

function Container14() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[383.2px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pt-[16px] px-[16px] relative rounded-[inherit] size-full">
        <Container13 />
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[24px] relative shrink-0 w-[140.363px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute css-ew64yg font-['Arial:Regular',sans-serif] leading-[24px] left-[70px] not-italic text-[16px] text-center text-white top-[-2.2px]">Send to Insight CPQ</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#a0490b] h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center pr-[0.013px] relative size-full">
          <Text6 />
          <Icon1 />
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-[#f9fafb] h-[72.8px] relative shrink-0 w-[383.2px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t-[0.8px] inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16.8px] px-[16px] relative size-full">
        <Button1 />
      </div>
    </div>
  );
}

export default function Container16() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-black border-l-[0.8px] border-solid inset-0 pointer-events-none shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)]" />
      <Container />
      <Container14 />
      <Container15 />
    </div>
  );
}
function StepperTitles() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Stepper Titles">
      <p className="css-4hzbpn font-['Roboto:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[14px] text-black tracking-[0.17px] w-[218px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Contact Information
      </p>
    </div>
  );
}

function SubStepperComponents() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Sub Stepper Components">
      <div className="flex h-[27px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "0", "--transform-inner-height": "43" } as React.CSSProperties}>
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

function SubStepper() {
  return (
    <div className="content-stretch flex flex-col gap-[21px] items-start relative shrink-0" data-name="Sub Stepper">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.38)] border-l-[0.5px] border-solid inset-0 pointer-events-none" />
      <SubStepperComponents />
      <SubStepperComponents1 />
      {[...Array(10).keys()].map((_, i) => (
        <SubStepperComponents2 key={i} />
      ))}
    </div>
  );
}

export default function SubStepper1() {
  return (
    <div className="bg-[#f8f8f8] content-stretch flex flex-col items-start p-[10px] relative rounded-[6px] size-full" data-name="Sub Stepper">
      <SubStepper />
    </div>
  );
}
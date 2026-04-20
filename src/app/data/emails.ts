/* ── Types ── */

export interface QuoteLineItem {
  sku: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  minOrderQty: number;
  qtyBreakIncrement: number;
  requestedQty?: number;
  stockStatus?: 'in-stock' | 'lead-time';
  leadTime?: string;
}

export interface QuoteTable {
  quoteNumber: string;
  validThrough: string;
  customerName: string;
  lineItems: QuoteLineItem[];
  total: number;
  shipping?: {
    method: string;
    cost: number;
    note?: string;
  };
}

export interface ReviewMatchItem {
  requestedItem: string;
  matchedItem: string;
  confidence: string;
  details: string;
  catalogUrl?: string;
  // Extended fields for detailed quote view
  quantity?: number;
  minOrderQty?: number;
  qtyBreakIncrement?: number;
  stockStatus?: 'in-stock' | 'lead-time' | 'unavailable';
  leadTime?: string;
  unitPrice?: number;
  totalPrice?: number;
  description?: string;
}

export interface EmailThread {
  from: string;
  fromEmail: string;
  to: string;
  cc?: string;
  subject: string;
  bodyBefore: string;
  bodyAfter: string;
  quoteTable?: QuoteTable;
  date: string;
  time: string;
  isAiGenerated?: boolean;
}

export interface QuotedPrevious {
  from: string;
  fromEmail: string;
  date: string;
  time: string;
  subject?: string;
  body: string;
}

export interface Email {
  id: string;
  from: string;
  fromEmail: string;
  to: string;
  cc?: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  time: string;
  read: boolean;
  quoteStatus?: 'processing' | 'quoted' | 'review';
  inlineQuoteTable?: QuoteTable;
  bodyBefore?: string;
  bodyAfter?: string;
  quotedPrevious?: QuotedPrevious;
  isCcFromAi?: boolean;
  isCcFromAiQuoteTable?: QuoteTable;
  originalSender?: string;
  isReviewRequest?: boolean;
  reviewFlaggedItems?: { description: string; reason: string }[];
  reviewMatchItems?: ReviewMatchItem[];
  reviewQuoteNumber?: string;
  reviewCustomerAccount?: string;
  reviewOriginalEmail?: {
    from: string;
    fromEmail: string;
    to: string;
    subject: string;
    body: string;
    date: string;
    time: string;
  };
  reviewReply?: {
    body: string;
    date: string;
    time: string;
  };
  isDirectQuoteRequest?: boolean;
  forwardTo?: string;
  forwardNote?: string;
  aiResponse?: EmailThread;
  reviewFinalQuote?: EmailThread;
  forwardAiResponse?: EmailThread;
  customerReply?: {
    from: string;
    fromEmail: string;
    to: string;
    cc?: string;
    subject: string;
    body: string;
    date: string;
    time: string;
  };
  threadedQuoteResponse?: {
    from: string;
    fromEmail: string;
    to: string;
    cc?: string;
    date: string;
    time: string;
    subject: string;
    bodyBefore: string;
    bodyAfter: string;
    quoteTable: QuoteTable;
    quotedPrevious: QuotedPrevious;
  };
}

/* ── Quote data for workflows ── */

const rcscaQuote: QuoteTable = {
  quoteNumber: 'Q-1093928',
  validThrough: 'Feb 27, 2026',
  customerName: 'RCSCA',
  lineItems: [
    { sku: 'ADH-X315', description: 'X315 Thermal Output Adhesive 25ML System', quantity: 2, unitPrice: 19.76, totalPrice: 39.52, minOrderQty: 2, qtyBreakIncrement: 2, requestedQty: 1, stockStatus: 'in-stock' },
    { sku: 'ACT-Z788', description: 'Z788 7 Activator 1.75OZ Bottle', quantity: 6, unitPrice: 21.29, totalPrice: 127.74, minOrderQty: 6, qtyBreakIncrement: 6, requestedQty: 2, stockStatus: 'in-stock' },
  ],
  total: 192.01,
  shipping: {
    method: 'Cold Pack — Air Shipment',
    cost: 24.75,
    note: 'Temperature-sensitive adhesives require cold packing and overnight air delivery.',
  },
};

const stoniteFinalQuote: QuoteTable = {
  quoteNumber: 'Q-8320281',
  validThrough: 'Feb 27, 2026',
  customerName: 'Stonite Coil Corp',
  lineItems: [
    { sku: 'MW27HPLRT', description: 'Round Taper, #27 AWG, HPL Coating', quantity: 25, unitPrice: 14.25, totalPrice: 356.25, minOrderQty: 25, qtyBreakIncrement: 25, requestedQty: 15, stockStatus: 'in-stock' },
    { sku: 'SDPZ-22.5-RT', description: 'Round Taper, #22.5 AWG, SDPZ Coating', quantity: 100, unitPrice: 18.50, totalPrice: 1850, minOrderQty: 25, qtyBreakIncrement: 25, stockStatus: 'in-stock' },
  ],
  total: 2231.25,
  shipping: {
    method: 'LTL Truck',
    cost: 25.00,
    note: 'Heavyweight wire shipment via designated carrier.',
  },
};

const motionQuote: QuoteTable = {
  quoteNumber: 'Q-3018483',
  validThrough: 'Feb 27, 2026',
  customerName: 'Motion Industries Inc.',
  lineItems: [
    { sku: 'BRT40XF17M', description: 'TAPE,ARAMID,FLAT BRAIDED,500YD,WHT', quantity: 2, unitPrice: 259.10, totalPrice: 518, minOrderQty: 1, qtyBreakIncrement: 1, stockStatus: 'in-stock' },
  ],
  total: 545.50,
  shipping: {
    method: 'Ground',
    cost: 27.50,
  },
};

const taperedReelQuote: QuoteTable = {
  quoteNumber: 'Q-4150772',
  validThrough: 'Mar 14, 2026',
  customerName: 'Tri-State Coil Winding',
  lineItems: [
    { sku: 'TR115-11AWG-RED', description: '10-11" Tapered Reel/Box (115), 11 AWG, Red', quantity: 10, unitPrice: 916.84, totalPrice: 9168.40, minOrderQty: 10, qtyBreakIncrement: 10, stockStatus: 'lead-time', leadTime: '2–4 weeks' },
    { sku: 'SP060-14AWG-RED', description: '6" Spool (060), 14 AWG, Red', quantity: 10, unitPrice: 1024.13, totalPrice: 10241.30, minOrderQty: 10, qtyBreakIncrement: 10, stockStatus: 'in-stock' },
    { sku: 'TR115-14AWG-RED', description: '10-11" Tapered Reel/Box (115), 14 AWG, Red', quantity: 10, unitPrice: 923.28, totalPrice: 9232.80, minOrderQty: 10, qtyBreakIncrement: 10, stockStatus: 'lead-time', leadTime: '2–4 weeks' },
    { sku: 'TR115-15AWG-RED', description: '10-11" Tapered Reel/Box (115), 15 AWG, Red', quantity: 10, unitPrice: 928.38, totalPrice: 9283.80, minOrderQty: 10, qtyBreakIncrement: 10, stockStatus: 'in-stock' },
    { sku: 'TR115-16AWG-RED', description: '10-11" Tapered Reel/Box (115), 16 AWG, Red', quantity: 10, unitPrice: 941.52, totalPrice: 9415.20, minOrderQty: 10, qtyBreakIncrement: 10, stockStatus: 'lead-time', leadTime: '2–4 weeks' },
    { sku: 'TR115-17AWG-RED', description: '10-11" Tapered Reel/Box (115), 17 AWG, Red', quantity: 10, unitPrice: 954.39, totalPrice: 9543.90, minOrderQty: 10, qtyBreakIncrement: 10, stockStatus: 'lead-time', leadTime: '2–4 weeks' },
  ],
  total: 57660.40,
  shipping: {
    method: 'LTL Truck',
    cost: 775.00,
    note: 'Heavyweight cubic volume shipment. Carrier to be selected based on destination.',
  },
};

const stoniteMatchItems: ReviewMatchItem[] = [
  {
    requestedItem: '# 27 HPL - round tapers (Qty: 15)',
    matchedItem: 'MW27HPLRT',
    confidence: '95%',
    details: 'Line Item 1: Requested quantity (15) is below minimum order quantity of 25',
    catalogUrl: 'https://www.apex-supply.com/catalog/magnet-wire/round-magnet-wire',
    description: 'Round Taper, #27 AWG, HPL Coating',
    quantity: 15,
    minOrderQty: 25,
    qtyBreakIncrement: 25,
    stockStatus: 'in-stock',
    unitPrice: 14.25,
    totalPrice: 213.75 // 15 units (will need adjustment to 25)
  },
  {
    requestedItem: '# 24 SDPZ - round tapers',
    matchedItem: 'SDPZ-22.5-RT',
    confidence: '60%',
    details: 'Line Item 2: Requested #24 gauge not available. Closest available gauge is #22.5',
    description: 'Round Taper, #22.5 AWG, SDPZ Coating',
    quantity: undefined,
    minOrderQty: 25,
    qtyBreakIncrement: 25,
    stockStatus: 'in-stock',
    unitPrice: 18.50,
    totalPrice: undefined
  },
];

/* ══════════════════════════════════════════════════════════════════════════
   WORKFLOW 1 & 4 EMAIL DEFINITIONS — Arrive at demo start
   ══════════════════════════════════════════════════════════════════════════ */

// WF1: Jawinder's original request
export const eis1Jawinder: Email = {
  id: 'eis-1',
  from: 'Jawinder Schahal',
  fromEmail: 'jschahal@rcsca.com',
  to: 'quotes@apex-corp.com',
  subject: 'Adhesive & Activator Pricing',
  preview: 'Please advise price for ADH-X315 and ACT-Z788 activator',
  body: `Please advise price for ADH-X315 and ACT-Z788 activator`,
  date: 'Jan 28, 2026',
  time: '10:30 AM',
  read: false,
};

// WF1: Auto-quote response to Jawinder
export const eis1Response: Email = {
  id: 'eis-1-response',
  from: 'Apex Quoting',
  fromEmail: 'quotes@apex-corp.com',
  to: 'jschahal@rcsca.com',
  cc: 'creisch@apex-corp.com',
  subject: 're: Adhesive & Activator Pricing',
  preview: 'Quote #Q-1093928 — $192.01 for RCSCA. Jawinder, Please see below for details...',
  body: '',
  bodyBefore: `Jawinder, Please see below for details of your requested quote.`,
  bodyAfter: `Thank you for reaching out to Apex. We appreciate the opportunity to connect and are excited to support your needs.`,
  date: 'Jan 28, 2026',
  time: '10:33 AM',
  read: false,
  quoteStatus: 'quoted',
  inlineQuoteTable: rcscaQuote,
  quotedPrevious: {
    from: 'Jawinder Schahal',
    fromEmail: 'jschahal@rcsca.com',
    date: 'Jan 28, 2026',
    time: '10:30 AM',
    subject: 'Adhesive & Activator Pricing',
    body: 'Please advise price for ADH-X315 and ACT-Z788 activator',
  },
};

// WF1: CC notification in CSR inbox
export const csr1CC: Email = {
  id: 'csr-ai-1',
  from: 'Apex Quoting',
  fromEmail: 'quotes@apex-corp.com',
  to: 'jschahal@rcsca.com',
  cc: 'creisch@apex-corp.com',
  subject: 're: Adhesive & Activator Pricing',
  preview: 'Auto-quoted: Quote #Q-1093928 — $192.01 for RCSCA...',
  body: '',
  bodyBefore: `Jawinder, Please see below for details of your requested quote.`,
  bodyAfter: `Thank you for reaching out to Apex. We appreciate the opportunity to connect and are excited to support your needs.`,
  date: 'Jan 28, 2026',
  time: '10:33 AM',
  read: false,
  isCcFromAi: true,
  originalSender: 'Jawinder Schahal (RCSCA)',
  isCcFromAiQuoteTable: rcscaQuote,
  quotedPrevious: {
    from: 'Jawinder Schahal',
    fromEmail: 'jschahal@rcsca.com',
    date: 'Jan 28, 2026',
    time: '10:30 AM',
    subject: 'Adhesive & Activator Pricing',
    body: 'Please advise price for ADH-X315 and ACT-Z788 activator',
  },
};

// WF4: Dave's original request
export const eis6Dave: Email = {
  id: 'eis-6',
  from: 'Dave Morrison',
  fromEmail: 'dmorrison@tristatecoil.com',
  to: 'quotes@apex-corp.com',
  subject: 'Tapered Reel & Spool Packaging — 6 Configurations',
  preview: 'Need pricing on all available tapered reel packaging options in red, various AWG sizes...',
  body: `Hi,\n\nWe're evaluating packaging options for our magnet wire line and need a quote on all available tapered reel and spool configurations you carry.\n\nSpecifically looking for:\n- 10-11" Tapered Reel/Box options across all AWG sizes available in Red\n- Any spool alternatives in the same wire gauges\n\nPlease quote 10 units of each option so we can compare pricing. We'd also like to know what's in stock vs. what has lead time.\n\nThanks,\nDave Morrison\nOperations Manager\nTri-State Coil Winding`,
  date: 'Jan 28, 2026',
  time: '10:05 AM',
  read: false,
};

// WF4: Auto-quote response to Dave
export const eis6Response: Email = {
  id: 'eis-6-response',
  from: 'Apex Quoting',
  fromEmail: 'quotes@apex-corp.com',
  to: 'dmorrison@tristatecoil.com',
  cc: 'morgan@apex-corp.com',
  subject: 'Re: Tapered Reel & Spool Packaging — 6 Configurations',
  preview: 'Quote #Q-4150772 — $57,660.40 for Tri-State Coil Winding...',
  body: '',
  bodyBefore: `Dave, Please see below for all available tapered reel and spool packaging options matching your request. Pricing is per 100 US pounds.`,
  bodyAfter: `All items are available for order. Stock availability varies by configuration — in-stock items are ready to ship immediately, while others carry standard manufacturing lead times.\n\nPlease reply to confirm which options you'd like to proceed with, or let us know if you'd like to adjust quantities.\n\nThank you for reaching out to Apex. We appreciate the opportunity to connect and are excited to support your needs.`,
  date: 'Jan 28, 2026',
  time: '10:09 AM',
  read: false,
  quoteStatus: 'quoted',
  inlineQuoteTable: taperedReelQuote,
  quotedPrevious: {
    from: 'Dave Morrison',
    fromEmail: 'dmorrison@tristatecoil.com',
    date: 'Jan 28, 2026',
    time: '10:05 AM',
    subject: 'Tapered Reel & Spool Packaging — 6 Configurations',
    body: `Hi,\n\nWe're evaluating packaging options for our magnet wire line and need a quote on all available tapered reel and spool packaging options matching your request. Pricing is per 100 US pounds.\n\nSpecifically looking for:\n- 10-11" Tapered Reel/Box options across all AWG sizes available in Red\n- Any spool alternatives in the same wire gauges\n\nPlease quote 10 units of each option...`,
  },
};

// WF4: CC notification in CSR inbox
export const csr2CC: Email = {
  id: 'csr-ai-2',
  from: 'Apex Quoting',
  fromEmail: 'quotes@apex-corp.com',
  to: 'dmorrison@tristatecoil.com',
  cc: 'morgan@apex-corp.com',
  subject: 'Re: Tapered Reel & Spool Packaging — 6 Configurations',
  preview: 'Auto-quoted: Quote #Q-4150772 — $57,660.40 for Tri-State Coil Winding...',
  body: '',
  bodyBefore: `Dave, Please see below for all available tapered reel and spool packaging options matching your request. Pricing is per 100 US pounds.`,
  bodyAfter: `All items are available for order. Stock availability varies by configuration — in-stock items are ready to ship immediately, while others carry standard manufacturing lead times.\n\nPlease reply to confirm which options you'd like to proceed with, or let us know if you'd like to adjust quantities.\n\nThank you for reaching out to Apex. We appreciate the opportunity to connect and are excited to support your needs.`,
  date: 'Jan 28, 2026',
  time: '10:09 AM',
  read: false,
  isCcFromAi: true,
  originalSender: 'Dave Morrison (Tri-State Coil Winding)',
  isCcFromAiQuoteTable: taperedReelQuote,
  quotedPrevious: {
    from: 'Dave Morrison',
    fromEmail: 'dmorrison@tristatecoil.com',
    date: 'Jan 28, 2026',
    time: '10:05 AM',
    subject: 'Tapered Reel & Spool Packaging — 6 Configurations',
    body: `Hi,\n\nWe're evaluating packaging options for our magnet wire line and need a quote on all available tapered reel and spool packaging options matching your request. Pricing is per 100 US pounds.\n\nSpecifically looking for:\n- 10-11" Tapered Reel/Box options across all AWG sizes available in Red\n- Any spool alternatives in the same wire gauges\n\nPlease quote 10 units of each option...`,
  },
};

// WF2: Steve's original request (flagged for review)
export const eis5Stonite: Email = {
  id: 'eis-5',
  from: 'Steve Landers',
  fromEmail: 'slanders@stonitecoil.com',
  to: 'quotes@apex-corp.com',
  subject: 'Magnet Wire Pricing — HPL & SDPZ Round Tapers',
  preview: 'Good morning, I need pricing for the below: # 27 HPL - round tapers (15 units)...',
  body: `Good morning, I need pricing for the below:\n\n# 27 HPL - round tapers (15 units)\n# 24 SDPZ - round tapers\n\nThanks,\nSteve Landers\nStonite Coil Corp`,
  date: 'Jan 28, 2026',
  time: '11:15 AM',
  read: false,
  quoteStatus: 'review',
};

// WF2: Review request in CSR inbox - Draft forward to customer
export const csrReview1: Email = {
  id: 'csr-review-1',
  from: 'Apex Quoting',
  fromEmail: 'quotes@apex-corp.com',
  to: 'morgan@apex-corp.com',
  subject: 'Review Needed: Magnet Wire Pricing — HPL & SDPZ Round Tapers',
  preview: 'Draft message ready. Request from Steve Landers needs clarification...',
  body: '',
  bodyBefore: `Draft message ready for customer. The following items need clarification before quoting:`,
  bodyAfter: `Can you provide the information listed above so I can quote this accurately? Alternatively, I can make my best estimate to get you a quote based on reasonable assumptions.\n\nPlease let me know your preference.\n\nBest regards,\nMorgan\nApex Corp`,
  date: 'Jan 28, 2026',
  time: '11:18 AM',
  read: false,
  isReviewRequest: true,
  originalSender: 'Steve Landers (Stonite Coil Corp)',
  reviewCustomerAccount: 'Stonite Coil Corp',
  reviewQuoteNumber: 'Q-8320281',
  reviewMatchItems: stoniteMatchItems,
  reviewOriginalEmail: {
    from: 'Steve Landers',
    fromEmail: 'slanders@stonitecoil.com',
    to: 'quotes@apex-corp.com',
    subject: 'Magnet Wire Pricing — HPL & SDPZ Round Tapers',
    body: `Good morning, I need pricing for the below:\n\n# 27 HPL - round tapers (15 units)\n# 24 SDPZ - round tapers\n\nThanks,\nSteve Landers\nStonite Coil Corp`,
    date: 'Jan 28, 2026',
    time: '11:15 AM',
  },
  reviewReply: {
    body: `Please provide the missing details for the items listed in the table above:\n\n[Provide corrections or clarifications for each item that needs review]\n\nFor example:\n- Item 1: [Confirm correct item number, adjust quantity if needed]\n- Item 2: [Specify correct gauge or alternative, provide quantity]\n\n- Morgan`,
    date: 'Jan 28, 2026',
    time: '11:42 AM',
  },
};

// WF2: Steve's response providing clarification (after Morgan forwards draft to him)
export const csrSteveClarification: Email = {
  id: 'csr-steve-clarification',
  from: 'Steve Landers',
  fromEmail: 'slanders@stonitecoil.com',
  to: 'morgan@apex-corp.com',
  subject: 'Re: Magnet Wire Pricing — HPL & SDPZ Round Tapers',
  preview: 'Thanks for checking. For the #27 HPL, we need 25 units. For #24 SDPZ...',
  body: `Hi Morgan,\n\nThanks for checking on this.\n\nFor the #27 HPL round tapers - we can do 25 units to meet your MOQ.\n\nFor the #24 SDPZ - yes, we can use #22.5 gauge instead. Please quote 100 units of that.\n\nThanks,\nSteve`,
  date: 'Jan 28, 2026',
  time: '11:38 AM',
  read: false,
  // This is Steve's response to the review forward - needs to be forwarded to quotes@
  forwardTo: 'quotes@apex-corp.com',
  forwardNote: `Hi Steve - great to hear from you!\n\nI've reviewed your request and need a few additional details to provide accurate pricing. Please review the below items and outstanding questions:\n\n- Morgan`,
  quotedPrevious: {
    from: 'Morgan',
    fromEmail: 'morgan@apex-corp.com',
    to: 'slanders@stonitecoil.com',
    subject: 'Re: Magnet Wire Pricing — HPL & SDPZ Round Tapers',
    body: `Hi Steve,\n\nThank you for the quote request. I've reviewed your request and need a few additional details to provide accurate quoting.\n\n[Details about quantities and gauges]\n\nCan you provide the information listed above so I can quote this accurately?`,
    date: 'Jan 28, 2026',
    time: '11:30 AM',
  },
};

// WF3: Herman's direct email
export const csrHermanDirect: Email = {
  id: 'csr-forward-1',
  from: 'Herman',
  fromEmail: 'hemnant@motion.com',
  to: 'morgan@apex-corp.com',
  subject: 'Aramid Braided Tape Pricing — P/N BRT40XF17M',
  preview: 'Hi Morgan, we spoke at the trade show last month about your sleeving line...',
  body: `Hi Morgan,\n\nWe spoke at the trade show last month about your sleeving line. I'd like to get pricing on the following:\n\nP/N BRT40XF17M — Qty 2 Rolls\n\nCan you get me a quote by end of week?\n\nThanks,\nHerman\nMotion`,
  date: 'Jan 28, 2026',
  time: '11:50 AM',
  read: false,
  isDirectQuoteRequest: true,
  forwardTo: 'quotes@apex-corp.com',
  forwardNote: `Herman from Motion needs pricing on BRT40XF17M — forwarding for quoting.\n\n- Morgan`,
  originalSender: 'Herman (Motion)',
  forwardAiResponse: {
    from: 'Apex Quoting',
    fromEmail: 'quotes@apex-corp.com',
    to: 'hemnant@motion.com',
    cc: 'morgan@apex-corp.com',
    subject: 'Re: Aramid Braided Tape Pricing — P/N BRT40XF17M',
    date: 'Jan 28, 2026',
    time: '9:52 AM',
    isAiGenerated: true,
    bodyBefore: `Herman, Please see below for details of your requested quote.`,
    bodyAfter: `Thank you for reaching out to Apex. We appreciate the opportunity to connect and are excited to support your needs.`,
    quoteTable: motionQuote,
  },
};

/* ═══════════════════════════════════════════════════════════════════════════
   QUOTE INBOX — Starts empty; emails arrive dynamically during demo
   ═══════════════════════════════════════════════════════════════════════════ */

export const eisEmails: Email[] = [];

/* ── Dynamic emails that appear based on workflow state ── */

export const eisStoniteResponse: Email = {
  id: 'eis-5-response',
  from: 'Apex Quoting',
  fromEmail: 'quotes@apex-corp.com',
  to: 'slanders@stonitecoil.com',
  cc: 'morgan@apex-corp.com',
  subject: 'Re: Magnet Wire Pricing — HPL & SDPZ Round Tapers',
  preview: 'Quote #Q-8320281 — $2,231.25 for Stonite Coil Corp...',
  body: '',
  bodyBefore: `Hi Steve,\n\nThank you for your quote request. Based on your specifications and current pricing, I've prepared the following quote:\n\nNote: I've adjusted your #27 HPL quantity to 25 units to meet the minimum order requirement. For the SDPZ coating, we carry #22.5 gauge which aligns with your typical specifications for this application and will meet your requirements.`,
  bodyAfter: `All quantities meet minimum order requirements (MOQ 25, order breaks of 25).\n\nStandard lead time is 5–7 business days. Please reply to confirm or if you'd like to adjust quantities.\n\nBest regards,\nApex Quoting System\nApex Supply Corporation`,
  date: 'Jan 28, 2026',
  time: '11:45 AM',
  read: false,
  quoteStatus: 'quoted',
  inlineQuoteTable: stoniteFinalQuote,
  quotedPrevious: {
    from: 'Steve Landers',
    fromEmail: 'slanders@stonitecoil.com',
    date: 'Jan 28, 2026',
    time: '11:15 AM',
    subject: 'Magnet Wire Pricing — HPL & SDPZ Round Tapers',
    body: 'Good morning, I need pricing for the below:\n\n# 27 HPL - round tapers (15 units)\n# 24 SDPZ - round tapers',
  },
};

export const eisForwardedEmail: Email = {
  id: 'eis-forward-1',
  from: 'Morgan (Forwarded)',
  fromEmail: 'morgan@apex-corp.com',
  to: 'quotes@apex-corp.com',
  subject: 'FW: Aramid Braided Tape Pricing — P/N BRT40XF17M',
  preview: 'Herman from Motion needs pricing on BRT40XF17M — forwarding for quoting...',
  body: `Herman from Motion needs pricing on BRT40XF17M — forwarding for quoting.\n\n- Morgan`,
  date: 'Jan 28, 2026',
  time: '11:53 AM',
  read: false,
  quoteStatus: 'processing',
  quotedPrevious: {
    from: 'Herman',
    fromEmail: 'hemnant@motion.com',
    date: 'Jan 28, 2026',
    time: '11:50 AM',
    subject: 'Aramid Braided Tape Pricing — P/N BRT40XF17M',
    body: `Hi Morgan,\n\nWe spoke at the trade show last month about your sleeving line. I'd like to get pricing on the following:\n\nP/N BRT40XF17M — Qty 2 Rolls\n\nCan you get me a quote by end of week?`,
  },
};

export const eisMotionResponse: Email = {
  id: 'eis-forward-1-response',
  from: 'Apex Quoting',
  fromEmail: 'quotes@apex-corp.com',
  to: 'hemnant@motion.com',
  cc: 'morgan@apex-corp.com',
  subject: 'Re: Aramid Braided Tape Pricing — P/N BRT40XF17M',
  preview: 'Quote #Q-3018483 — $545.50 for Motion Industries Inc....',
  body: '',
  bodyBefore: `Herman, Please see below for details of your requested quote.`,
  bodyAfter: `Thank you for reaching out to Apex. We appreciate the opportunity to connect and are excited to support your needs.`,
  date: 'Jan 28, 2026',
  time: '11:57 AM',
  read: false,
  quoteStatus: 'quoted',
  inlineQuoteTable: motionQuote,
  quotedPrevious: {
    from: 'Herman',
    fromEmail: 'hemnant@motion.com',
    date: 'Jan 28, 2026',
    time: '11:50 AM',
    subject: 'Aramid Braided Tape Pricing — P/N BRT40XF17M',
    body: `Hi Morgan,\n\nWe spoke at the trade show last month about your sleeving line. I'd like to get pricing on the following:\n\nP/N BRT40XF17M — Qty 2 Rolls`,
  },
};

/* ═══════════════════════════════════════════════════════════════════════════
   CSR INBOX — Starts completely empty
   ═══════════════════════════════════════════════════════════════════════════ */

export const csrEmails: Email[] = [];

/* ── Daily summary email — available as a constant ── */

export const csrDailySummary: Email = {
  id: 'csr-daily-summary',
    from: 'Apex Quoting',
    fromEmail: 'quotes@apex-corp.com',
    to: 'morgan@apex-corp.com',
    subject: 'Daily Quoting Summary — January 27, 2026',
    preview: '12 quotes sent across 9 customers. Total quoted value: $47,850.00. Avg quote size: $3,987.50...',
    body: `Hi Morgan,

Here is your quoting activity summary for Monday, January 27, 2026.

══════════════════════════════════════
  QUOTING ACTIVITY OVERVIEW
══════════════════════════════════════

  Quotes Sent:            12
  Customers Quoted:        9
  Total Quoted Value:     $47,850.00
  Average Quote Size:     $3,987.50
  Largest Quote:          $8,420.00
  Smallest Quote:         $385.00

══════════════════════════════════════
  STATUS BREAKDOWN
══════════════════════════════════════

  Auto-Quoted:             9  (75%)
  Flagged for Review:      2  (17%)
  Pending Processing:      1  ( 8%)

══════════════════════════════════════
  TOP QUOTES BY VALUE
══════════════════════════════════════

  1. Midwest Power Generators     $8,420.00
     Motor rewind materials, Class H insulation, bearings

  2. Summit Electric Motor Svc    $6,715.00
     Slot liner, NMN laminate, VPI resin, bearings

  3. Pace Ranixter                $5,370.00
     Braided sleeving, grommet strips

  4. Atlantic Fabricators          $4,960.00
     Custom die-cut gaskets, fish paper, tooling

  5. Consolidated Power Svc       $3,210.00
     Kapton tape, thermal pads, dielectric grease

══════════════════════════════════════
  ITEMS FLAGGED FOR REVIEW
══════════════════════════════════════

  • Stonite Coil Corp — 3 unmatched SKUs
    (round tapers: #27 HPL, #24 SDPZ, #19 SDPZ)

  • Delta Transformer Corp — custom spec needed
    (non-standard laminate thickness request)

══════════════════════════════════════
  PRODUCT CATEGORY BREAKDOWN
══════════════════════════════════════

  Electrical Insulation:    34%   ($16,269)
  Bearings & Bushings:      18%   ($8,613)
  Adhesives & Sealants:     14%   ($6,699)
  Industrial Tapes:         12%   ($5,742)
  Sleeving & Tubing:         9%   ($4,307)
  Custom Fabrication:         8%   ($3,828)
  MRO Supplies:              5%   ($2,392)

══════════════════════════════════════

This summary is generated automatically at the end of each business day. For detailed quote records, visit the Apex Quote Inbox.

Best regards,
Apex Quoting System`,
    date: 'Jan 28, 2026',
    time: '5:00 PM',
    read: true,
};

/* ── Dynamic CSR emails ── */

export const csrReviewReplyEmail: Email = {
  id: 'csr-review-reply',
  from: 'Morgan',
  fromEmail: 'morgan@apex-corp.com',
  to: 'quotes@apex-corp.com',
  subject: 'Re: Review Needed: Magnet Wire Round Tapers — Stonite Coil Corp',
  preview: 'The #27 HPL match is correct — MW27HPLRT is what Steve orders. Adjust quantity to 25...',
  body: `The #27 HPL match is correct — MW27HPLRT is what Steve orders. Adjust quantity to 25 to meet MOQ.\n\nFor #24 SDPZ — we carry #22.5 SDPZ which aligns with what he typically orders for this application. Use SDPZ-22.5-RT. Quote 100 units.\n\n- Morgan`,
  date: 'Jan 28, 2026',
  time: '11:42 AM',
  read: true,
  quotedPrevious: {
    from: 'Apex Quoting',
    fromEmail: 'quotes@apex-corp.com',
    date: 'Jan 28, 2026',
    time: '11:18 AM',
    subject: 'Review Needed: Magnet Wire Round Tapers — Stonite Coil Corp',
    body: 'The below quote requires your attention. A partial quote was prepared for Steve Landers (Stonite Coil Corp) but some items need confirmation.',
  },
};

export const csrStoniteFinalCc: Email = {
  id: 'csr-stonite-final-cc',
  from: 'Apex Quoting',
  fromEmail: 'quotes@apex-corp.com',
  to: 'slanders@stonitecoil.com',
  cc: 'morgan@apex-corp.com',
  subject: 'Re: Magnet Wire Pricing — HPL & SDPZ Round Tapers',
  preview: 'Resolved: Quote #Q-8320281 — $2,231.25 for Stonite Coil Corp...',
  body: '',
  bodyBefore: `Hi Steve,\n\nThank you for your quote request. Based on your specifications and current pricing, I've prepared the following quote:\n\nNote: I've adjusted your #27 HPL quantity to 25 units to meet the minimum order requirement. For the SDPZ coating, we carry #22.5 gauge which aligns with your typical specifications for this application and will meet your requirements.`,
  bodyAfter: `All quantities meet minimum order requirements (MOQ 25, order breaks of 25).\n\nStandard lead time is 5–7 business days. Please reply to confirm or if you'd like to adjust quantities.\n\nBest regards,\nApex Quoting System\nApex Supply Corporation`,
  date: 'Jan 28, 2026',
  time: '11:45 AM',
  read: false,
  isCcFromAi: true,
  originalSender: 'Steve Landers (Stonite Coil Corp)',
  isCcFromAiQuoteTable: stoniteFinalQuote,
  quotedPrevious: {
    from: 'Morgan',
    fromEmail: 'morgan@apex-corp.com',
    date: 'Jan 28, 2026',
    time: '11:42 AM',
    subject: 'Re: Review Needed: Magnet Wire Round Tapers — Stonite Coil Corp',
    body: 'The #27 HPL match is correct — MW27HPLRT is what Steve orders. Adjust quantity to 25 to meet MOQ.\n\nFor #24 SDPZ — we carry #22.5 SDPZ which aligns with what he typically orders for this application. Use SDPZ-22.5-RT. Quote 100 units.',
  },
};

export const csrMotionCc: Email = {
  id: 'csr-forward-cc',
  from: 'Apex Quoting',
  fromEmail: 'quotes@apex-corp.com',
  to: 'hemnant@motion.com',
  cc: 'morgan@apex-corp.com',
  subject: 'Re: Aramid Braided Tape Pricing — P/N BRT40XF17M',
  preview: 'Auto-quoted: Quote #Q-3018483 — $545.50 for Motion Industries Inc....',
  body: '',
  bodyBefore: `Herman, Please see below for details of your requested quote.`,
  bodyAfter: `Thank you for reaching out to Apex. We appreciate the opportunity to connect and are excited to support your needs.`,
  date: 'Jan 28, 2026',
  time: '11:57 AM',
  read: false,
  isCcFromAi: true,
  originalSender: 'Herman (Motion)',
  isCcFromAiQuoteTable: motionQuote,
  quotedPrevious: {
    from: 'Herman',
    fromEmail: 'hemnant@motion.com',
    date: 'Jan 28, 2026',
    time: '11:50 AM',
    subject: 'Aramid Braided Tape Pricing — P/N BRT40XF17M',
    body: `Hi Morgan,\n\nWe spoke at the trade show last month about your sleeving line. I'd like to get pricing on the following:\n\nP/N BRT40XF17M — Qty 2 Rolls`,
  },
};

export const csrHermanReply: Email = {
  id: 'csr-herman-reply',
  from: 'Herman',
  fromEmail: 'hemnant@motion.com',
  to: 'quotes@apex-corp.com',
  cc: 'morgan@apex-corp.com',
  subject: 'Re: Aramid Braided Tape Pricing — P/N BRT40XF17M',
  preview: 'Hey Morgan! Thanks for getting that quote over so quickly...',
  body: `Hey Morgan!\n\nThanks for getting that quote over so quickly — really appreciate the fast turnaround. I'm going to review it with our purchasing team and should have an answer for you by end of week.\n\nLet's catch up next time you're in town! It was great talking at the show.\n\nTalk soon,\nHerman`,
  date: 'Jan 28, 2026',
  time: '2:17 PM',
  read: false,
  threadedQuoteResponse: {
    from: 'Apex Quoting',
    fromEmail: 'quotes@apex-corp.com',
    to: 'hemnant@motion.com',
    cc: 'morgan@apex-corp.com',
    date: 'Jan 28, 2026',
    time: '11:57 AM',
    subject: 'Re: Aramid Braided Tape Pricing — P/N BRT40XF17M',
    bodyBefore: `Herman, Please see below for details of your requested quote.`,
    bodyAfter: `Thank you for reaching out to Apex. We appreciate the opportunity to connect and are excited to support your needs.`,
    quoteTable: motionQuote,
    quotedPrevious: {
      from: 'Herman',
      fromEmail: 'hemnant@motion.com',
      date: 'Jan 28, 2026',
      time: '11:50 AM',
      subject: 'Aramid Braided Tape Pricing — P/N BRT40XF17M',
      body: `Hi Morgan,\n\nWe spoke at the trade show last month about your sleeving line. I'd like to get pricing on the following:\n\nP/N BRT40XF17M — Qty 2 Rolls\n\nCan you get me a quote by end of week?\n\nThanks,\nHerman\nMotion`,
    },
  },
};

/* ── Folder definitions ── */

export interface InboxFolderDef {
  id: string;
  label: string;
  sublabel?: string;
  icon: 'inbox' | 'zap' | 'flag';
  count: number;
  unreadCount: number;
  children?: InboxFolderDef[];
}

export const inboxFolders: InboxFolderDef[] = [
  {
    id: 'csr',
    label: 'CSR Inbox',
    sublabel: 'morgan@apex-corp.com',
    icon: 'inbox' as const,
    count: csrEmails.length,
    unreadCount: csrEmails.filter((e) => !e.read).length,
    children: [
      {
        id: 'csr-oem',
        label: 'OEM',
        icon: 'inbox' as const,
        count: 0,
        unreadCount: 0,
      },
      {
        id: 'csr-am-mro',
        label: 'AM/MRO',
        icon: 'inbox' as const,
        count: 0,
        unreadCount: 0,
      },
    ],
  },
  {
    id: 'eis',
    label: 'Apex Quote Inbox',
    sublabel: 'quotes@apex-corp.com',
    icon: 'zap' as const,
    count: eisEmails.length,
    unreadCount: eisEmails.filter((e) => !e.read).length,
  },
  {
    id: 'review',
    label: 'Flagged for Review',
    sublabel: 'Apex Quoting',
    icon: 'flag' as const,
    count: (() => {
      const eisReview = eisEmails.filter((e) => e.quoteStatus === 'review');
      const csrReview = csrEmails.filter((e) => e.isReviewRequest);
      return eisReview.length + csrReview.length;
    })(),
    unreadCount: (() => {
      const eisReview = eisEmails.filter((e) => e.quoteStatus === 'review' && !e.read);
      const csrReview = csrEmails.filter((e) => e.isReviewRequest && !e.read);
      return eisReview.length + csrReview.length;
    })(),
  },
];

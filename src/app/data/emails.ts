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
  standardUnitPrice?: number;
  standardTotalPrice?: number;
  priceChangeReason?: string;
  pricingBasis?: 'Distributor Pricing' | 'Catalog Price' | 'Partner Pricing' | 'Contract Price' | 'Volume Tier' | 'Account Pricing';
  qtyBreakNote?: string;
  qtyBreakDiscount?: string;
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
    standardMethod?: string;
    standardCost?: number;
  };
  discount?: {
    label: string;
    percentage: number;
    amount: number;
    note?: string;
  };
  rushFee?: {
    label: string;
    amount: number;
    note?: string;
  };
  isRushOrder?: boolean;
  comparisonNote?: string;
  standardTotal?: number;
  isQtyBreakComparison?: boolean;
  pricingNote?: string;
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
  to?: string;
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
  quoteStatus?: 'processing' | 'quoted' | 'auto-quoted' | 'review';
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
  isApprovalHold?: boolean;
  approvalReason?: string;
  approvalQuoteTable?: QuoteTable;
  approvalCustomerEmail?: string;
  approvalCustomerName?: string;
  isDirectQuoteRequest?: boolean;
  forwardTo?: string;
  forwardNote?: string;
  aiResponse?: EmailThread;
  reviewFinalQuote?: EmailThread;
  forwardAiResponse?: EmailThread;
  threadHistory?: Array<{
    from: string;
    fromEmail: string;
    to: string;
    cc?: string;
    subject?: string;
    body: string;
    bodyBefore?: string;
    bodyAfter?: string;
    quoteTable?: QuoteTable;
    date: string;
    time: string;
  }>;
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
    { sku: 'ADH-X315', description: 'X315 Thermal Output Adhesive 25ML System', quantity: 1, unitPrice: 19.76, totalPrice: 19.76, minOrderQty: 1, qtyBreakIncrement: 1, stockStatus: 'in-stock', pricingBasis: 'Distributor Pricing', standardUnitPrice: 24.50 },
    { sku: 'ACT-Z788', description: 'Z788 7 Activator 1.75OZ Bottle', quantity: 1, unitPrice: 21.29, totalPrice: 21.29, minOrderQty: 1, qtyBreakIncrement: 1, stockStatus: 'in-stock', pricingBasis: 'Distributor Pricing', standardUnitPrice: 26.15 },
  ],
  total: 86.05,
  shipping: {
    method: 'Standard Shipping',
    cost: 45.00,
  },
  pricingNote: 'Pricing reflects your current account pricing, valid as of January 2026.',
};

const stoniteFinalQuote: QuoteTable = {
  quoteNumber: 'Q-8320281',
  validThrough: 'Feb 27, 2026',
  customerName: 'Stonite Coil Corp',
  lineItems: [
    { sku: 'MW27HPLRT', description: 'Round Taper, #27 AWG, HPL Coating', quantity: 25, unitPrice: 14.25, totalPrice: 356.25, minOrderQty: 25, qtyBreakIncrement: 25, requestedQty: 15, stockStatus: 'in-stock', pricingBasis: 'Account Pricing' },
    { sku: 'SDPZ-22.5-RT', description: 'Round Taper, #22.5 AWG, SDPZ Coating', quantity: 100, unitPrice: 16.90, totalPrice: 1690, minOrderQty: 25, qtyBreakIncrement: 25, stockStatus: 'in-stock', pricingBasis: 'Account Pricing' },
  ],
  total: 2091.25,
  shipping: {
    method: 'Standard Shipping',
    cost: 45.00,
  },
  pricingNote: 'Pricing reflects your current account pricing, valid as of January 2026.',
};

const motionQuote: QuoteTable = {
  quoteNumber: 'Q-3018483',
  validThrough: 'Feb 27, 2026',
  customerName: 'Motion Industries Inc.',
  lineItems: [
    { sku: 'BRT40XF17M', description: 'TAPE,ARAMID,FLAT BRAIDED,500YD,WHT', quantity: 2, unitPrice: 259.10, totalPrice: 518, minOrderQty: 2, qtyBreakIncrement: 1, stockStatus: 'in-stock', pricingBasis: 'Contract Price' },
  ],
  total: 563.00,
  shipping: {
    method: 'Standard Shipping',
    cost: 45.00,
  },
  pricingNote: 'Pricing per your current agreement, valid as of January 2026.',
};

const taperedReelQuote: QuoteTable = {
  quoteNumber: 'Q-4150772',
  validThrough: 'Mar 14, 2026',
  customerName: 'Tri-State Coil Winding',
  lineItems: [
    { sku: 'TR115-11AWG-RED', description: '10-11" Tapered Reel/Box (115), 11 AWG, Red', quantity: 10, unitPrice: 14.68, totalPrice: 146.80, minOrderQty: 10, qtyBreakIncrement: 10, stockStatus: 'lead-time', leadTime: '2–4 weeks', pricingBasis: 'Catalog Price' },
    { sku: 'TR115-14AWG-RED', description: '10-11" Tapered Reel/Box (115), 14 AWG, Red', quantity: 10, unitPrice: 15.32, totalPrice: 153.20, minOrderQty: 10, qtyBreakIncrement: 10, stockStatus: 'lead-time', leadTime: '2–4 weeks', pricingBasis: 'Catalog Price' },
    { sku: 'TR115-15AWG-RED', description: '10-11" Tapered Reel/Box (115), 15 AWG, Red', quantity: 10, unitPrice: 15.48, totalPrice: 154.80, minOrderQty: 10, qtyBreakIncrement: 10, stockStatus: 'in-stock', pricingBasis: 'Catalog Price' },
    { sku: 'TR115-16AWG-RED', description: '10-11" Tapered Reel/Box (115), 16 AWG, Red', quantity: 10, unitPrice: 16.92, totalPrice: 169.20, minOrderQty: 10, qtyBreakIncrement: 10, stockStatus: 'lead-time', leadTime: '2–4 weeks', pricingBasis: 'Catalog Price' },
    { sku: 'TR115-17AWG-RED', description: '10-11" Tapered Reel/Box (115), 17 AWG, Red', quantity: 10, unitPrice: 17.39, totalPrice: 173.90, minOrderQty: 10, qtyBreakIncrement: 10, stockStatus: 'lead-time', leadTime: '2–4 weeks', pricingBasis: 'Catalog Price' },
    { sku: 'SP060-14AWG-RED', description: '6" Spool (060), 14 AWG, Red', quantity: 10, unitPrice: 11.25, totalPrice: 112.50, minOrderQty: 10, qtyBreakIncrement: 10, stockStatus: 'in-stock', pricingBasis: 'Catalog Price' },
  ],
  total: 955.40,
  shipping: {
    method: 'Standard Shipping',
    cost: 45.00,
  },
  pricingNote: 'Quoted at current standard pricing, valid through Mar 14, 2026.',
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

/* ── Quote data for approval hold workflow (Midwest Power) ── */

const midwestPowerQuote: QuoteTable = {
  quoteNumber: 'Q-5571039',
  validThrough: 'Feb 27, 2026',
  customerName: 'Midwest Power Generators',
  lineItems: [
    { sku: 'INS-H220-NMN', description: 'NMN Laminate, Class H, 0.020" Sheet', quantity: 50, unitPrice: 89.40, totalPrice: 4470.00, minOrderQty: 10, qtyBreakIncrement: 10, stockStatus: 'in-stock', pricingBasis: 'Contract Price' },
    { sku: 'VPI-1260-5GAL', description: 'VPI Resin 1260, 5-Gallon Pail', quantity: 4, unitPrice: 312.00, totalPrice: 1248.00, minOrderQty: 1, qtyBreakIncrement: 1, stockStatus: 'in-stock', pricingBasis: 'Contract Price' },
    { sku: 'BRG-6205-2RS', description: 'Ball Bearing 6205-2RS, Sealed', quantity: 24, unitPrice: 18.50, totalPrice: 444.00, minOrderQty: 12, qtyBreakIncrement: 12, stockStatus: 'in-stock', pricingBasis: 'Contract Price' },
    { sku: 'SLT-NMN-14', description: 'Slot Liner, NMN, 14" Cut Length', quantity: 200, unitPrice: 3.85, totalPrice: 770.00, minOrderQty: 100, qtyBreakIncrement: 50, stockStatus: 'in-stock', pricingBasis: 'Contract Price' },
    { sku: 'KAP-HN-1MIL', description: 'Kapton Tape HN, 1mil × 1" × 36yd', quantity: 36, unitPrice: 142.50, totalPrice: 5130.00, minOrderQty: 12, qtyBreakIncrement: 12, stockStatus: 'lead-time', leadTime: '1–2 weeks', pricingBasis: 'Contract Price' },
  ],
  total: 11328.00,
  shipping: {
    method: 'Large Order Shipping',
    cost: 185.00,
  },
  discount: {
    label: 'Volume Discount',
    percentage: 7.5,
    amount: 919.00,
    note: 'Applied based on order volume.',
  },
  pricingNote: 'Pricing per your current agreement. Volume discount applied.',
};

/* ── Quote data for rush re-quote workflow (RCSCA rush) ── */

const rushRcscaQuote: QuoteTable = {
  quoteNumber: 'Q-1094215',
  validThrough: 'Feb 3, 2026',
  customerName: 'RCSCA',
  isRushOrder: true,
  comparisonNote: 'Rush pricing compared to standard quote Q-1093928',
  standardTotal: 86.05,
  lineItems: [
    { sku: 'ADH-X315', description: 'X315 Thermal Output Adhesive 25ML System', quantity: 1, unitPrice: 19.76, totalPrice: 19.76, minOrderQty: 1, qtyBreakIncrement: 1, stockStatus: 'in-stock', pricingBasis: 'Distributor Pricing', standardUnitPrice: 24.50 },
    { sku: 'ACT-Z788', description: 'Z788 7 Activator 1.75OZ Bottle', quantity: 1, unitPrice: 21.29, totalPrice: 21.29, minOrderQty: 1, qtyBreakIncrement: 1, stockStatus: 'in-stock', pricingBasis: 'Distributor Pricing', standardUnitPrice: 26.15 },
  ],
  rushFee: {
    label: 'Rush Processing Fee (25%)',
    amount: 10.26,
    note: 'Applied to expedite order for Friday delivery.',
  },
  total: 136.31,
  shipping: {
    method: 'Overnight Shipping',
    cost: 85.00,
    standardMethod: 'Standard Shipping',
    standardCost: 45.00,
  },
  pricingNote: 'Your account pricing applies. Rush surcharge added per expedite policy.',
};

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
  preview: 'Quote #Q-1093928 — $86.05 for RCSCA. Jawinder, Please see below for details...',
  body: '',
  bodyBefore: `Jawinder, We've reviewed your request and provided your quote below.`,
  bodyAfter: `Thank you for doing business with us. Please follow up with any questions.`,
  date: 'Jan 28, 2026',
  time: '10:33 AM',
  read: false,
  quoteStatus: 'auto-quoted',
  inlineQuoteTable: rcscaQuote,
  quotedPrevious: {
    from: 'Jawinder Schahal',
    fromEmail: 'jschahal@rcsca.com',
    to: 'quotes@apex-corp.com',
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
  preview: 'Auto-quoted: Quote #Q-1093928 — $86.05 for RCSCA...',
  body: '',
  bodyBefore: `Jawinder, We've reviewed your request and provided your quote below.`,
  bodyAfter: `Thank you for doing business with us. Please follow up with any questions.`,
  date: 'Jan 28, 2026',
  time: '10:33 AM',
  read: false,
  isCcFromAi: true,
  originalSender: 'Jawinder Schahal (RCSCA)',
  isCcFromAiQuoteTable: rcscaQuote,
  quotedPrevious: {
    from: 'Jawinder Schahal',
    fromEmail: 'jschahal@rcsca.com',
    to: 'quotes@apex-corp.com',
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
  preview: 'Quote #Q-4150772 — $955.40 for Tri-State Coil Winding...',
  body: '',
  bodyBefore: `Dave, Please see below for all available tapered reel and spool packaging options matching your request.`,
  bodyAfter: `Thank you for doing business with us. Please follow up with any questions.`,
  date: 'Jan 28, 2026',
  time: '10:09 AM',
  read: false,
  quoteStatus: 'auto-quoted',
  inlineQuoteTable: taperedReelQuote,
  quotedPrevious: {
    from: 'Dave Morrison',
    fromEmail: 'dmorrison@tristatecoil.com',
    to: 'quotes@apex-corp.com',
    date: 'Jan 28, 2026',
    time: '10:05 AM',
    subject: 'Tapered Reel & Spool Packaging — 6 Configurations',
    body: `Hi,\n\nWe're evaluating packaging options for our magnet wire line and need a quote on all available tapered reel and spool packaging options matching your request.\n\nSpecifically looking for:\n- 10-11" Tapered Reel/Box options across all AWG sizes available in Red\n- Any spool alternatives in the same wire gauges\n\nPlease quote 10 units of each option...`,
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
  preview: 'Auto-quoted: Quote #Q-4150772 — $955.40 for Tri-State Coil Winding...',
  body: '',
  bodyBefore: `Dave, Please see below for all available tapered reel and spool packaging options matching your request.`,
  bodyAfter: `Thank you for doing business with us. Please follow up with any questions.`,
  date: 'Jan 28, 2026',
  time: '10:09 AM',
  read: false,
  isCcFromAi: true,
  originalSender: 'Dave Morrison (Tri-State Coil Winding)',
  isCcFromAiQuoteTable: taperedReelQuote,
  quotedPrevious: {
    from: 'Dave Morrison',
    fromEmail: 'dmorrison@tristatecoil.com',
    to: 'quotes@apex-corp.com',
    date: 'Jan 28, 2026',
    time: '10:05 AM',
    subject: 'Tapered Reel & Spool Packaging — 6 Configurations',
    body: `Hi,\n\nWe're evaluating packaging options for our magnet wire line and need a quote on all available tapered reel and spool packaging options matching your request.\n\nSpecifically looking for:\n- 10-11" Tapered Reel/Box options across all AWG sizes available in Red\n- Any spool alternatives in the same wire gauges\n\nPlease quote 10 units of each option...`,
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

// WF2: Steve's original request to Morgan (arrives first, missing details)
export const csrSteveOriginal: Email = {
  id: 'csr-steve-original',
  from: 'Steve Landers',
  fromEmail: 'slanders@stonitecoil.com',
  to: 'morgan@apex-corp.com',
  subject: 'Magnet Wire Pricing — HPL & SDPZ Round Tapers',
  preview: 'Good morning, I need pricing for 27 gauge HPL round tapers - we need about...',
  body: `Good morning Morgan,\n\nI need pricing for 27 gauge HPL round tapers - we need about 15 units.\n\nAlso need a quote on 24 gauge SDPZ round tapers.\n\nThanks,\nSteve Landers\nStonite Coil Corp`,
  date: 'Jan 28, 2026',
  time: '11:15 AM',
  read: false,
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
  bodyAfter: `Best regards,\nMorgan\nApex Corp`,
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
    body: `Good morning, I need pricing for 27 gauge HPL round tapers - we need about 15 units.\n\nAlso need a quote on 24 gauge SDPZ round tapers.\n\nThanks,\nSteve Landers\nStonite Coil Corp`,
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
  cc: 'quotes@apex-corp.com',
  subject: 'Re: Magnet Wire Pricing — HPL & SDPZ Round Tapers',
  preview: 'Thanks for checking. For the #27 HPL, we need 25 units. For #24 SDPZ...',
  body: `Hi Morgan,\n\nThanks for checking on this.\n\nFor the #27 HPL round tapers - we can do 25 units to meet your MOQ.\n\nFor the #24 SDPZ - yes, we can use #22.5 gauge instead. Please quote 100 units of that.\n\nThanks,\nSteve`,
  date: 'Jan 28, 2026',
  time: '11:38 AM',
  read: false,
  forwardTo: 'quotes@apex-corp.com',
  forwardNote: `Please quote the below thread per customer specifications.`,
  threadHistory: [
    {
      from: 'Steve Landers',
      fromEmail: 'slanders@stonitecoil.com',
      to: 'morgan@apex-corp.com',
      subject: 'Magnet Wire Pricing — HPL & SDPZ Round Tapers',
      body: `Good morning Morgan,\n\nI need pricing for 27 gauge HPL round tapers - we need about 15 units.\n\nAlso need a quote on 24 gauge SDPZ round tapers.\n\nThanks,\nSteve Landers\nStonite Coil Corp`,
      date: 'Jan 28, 2026',
      time: '11:15 AM',
    },
    {
      from: 'Morgan',
      fromEmail: 'morgan@apex-corp.com',
      to: 'slanders@stonitecoil.com',
      subject: 'Re: Magnet Wire Pricing — HPL & SDPZ Round Tapers',
      body: `Hi Steve,\n\nThank you for the quote request. I have a couple of items I need to confirm before I can get pricing over to you:\n\n1. #27 HPL Round Tapers — you requested 15 units, but the minimum order quantity is 25. Can you do 25?\n\n2. #24 SDPZ Round Tapers — we don't carry a #24 gauge in SDPZ. The closest we have is #22.5. Would that work for your application? Also, how many units do you need?\n\nLet me know and I'll get your quote right out.\n\nBest regards,\nMorgan`,
      date: 'Jan 28, 2026',
      time: '11:30 AM',
    },
    {
      from: 'Apex Quoting',
      fromEmail: 'quotes@apex-corp.com',
      to: 'slanders@stonitecoil.com',
      cc: 'morgan@apex-corp.com',
      subject: 'Re: Magnet Wire Pricing — HPL & SDPZ Round Tapers',
      body: '',
      bodyBefore: `Hi Steve - great to hear from you! Here is your quote as requested.\n\nAs we discussed, I've adjusted the #27 HPL quantity to 25 units to meet the minimum order requirement. For the SDPZ, I've quoted the #22.5 gauge per your confirmation — 100 units.`,
      bodyAfter: `Thank you for doing business with us. Please follow up with any questions.`,
      quoteTable: stoniteFinalQuote,
      date: 'Jan 28, 2026',
      time: '11:45 AM',
    },
  ],
};

/* ══════════════════════════════════════════════════════════════════════════
   APPROVAL HOLD WORKFLOW — Large dollar quote held for sales rep review
   ══════════════════════════════════════════════════════════════════════════ */

// Original customer request (referenced in approval hold)
export const eis7MidwestPower: Email = {
  id: 'eis-7-midwest',
  from: 'Gary Tillman',
  fromEmail: 'gtillman@midwestpower.com',
  to: 'quotes@apex-corp.com',
  subject: 'Motor Rewind Materials — Full Kit Pricing',
  preview: 'We need a quote on a full rewind kit for our 500HP motor overhaul program...',
  body: `Good morning,\n\nWe need a quote on a full rewind kit for our 500HP motor overhaul program. Here's what we need:\n\n- NMN laminate sheets, Class H, 0.020" — 50 sheets\n- VPI resin, 5-gallon pails — 4 pails\n- 6205-2RS sealed bearings — 24 units\n- Slot liners, NMN, 14" cut — 200 pcs\n- Kapton tape HN 1mil, 1" × 36yd — 36 rolls\n\nPlease provide pricing and availability. We'd like to get this ordered this week if possible.\n\nThanks,\nGary Tillman\nMaintenance Manager\nMidwest Power Generators`,
  date: 'Jan 28, 2026',
  time: '9:45 AM',
  read: false,
};

// Approval hold notification in CSR inbox
export const csrApprovalHold: Email = {
  id: 'csr-approval-hold',
  from: 'Apex Quoting',
  fromEmail: 'quotes@apex-corp.com',
  to: 'morgan@apex-corp.com',
  subject: 'Approval Required: Motor Rewind Materials — Midwest Power Generators',
  preview: 'Quote #Q-5571039 ($11,328.00) requires approval before sending. Quote exceeds auto-send threshold...',
  body: '',
  bodyBefore: `A quote has been generated for Midwest Power Generators but requires your approval before sending to the customer.\n\nThis quote was held because it exceeds the $10,000 auto-send threshold. Please review the quote below and approve, edit, or reject.`,
  bodyAfter: `Once approved, this quote will be sent directly to the customer with you CC'd.\n\nOriginal request from Gary Tillman (gtillman@midwestpower.com) received Jan 28, 2026 at 9:45 AM.`,
  date: 'Jan 28, 2026',
  time: '9:48 AM',
  read: false,
  isApprovalHold: true,
  approvalReason: 'Quote exceeds $10,000 auto-send threshold',
  approvalQuoteTable: midwestPowerQuote,
  approvalCustomerEmail: 'gtillman@midwestpower.com',
  approvalCustomerName: 'Gary Tillman',
  originalSender: 'Gary Tillman (Midwest Power Generators)',
  quotedPrevious: {
    from: 'Gary Tillman',
    fromEmail: 'gtillman@midwestpower.com',
    to: 'quotes@apex-corp.com',
    date: 'Jan 28, 2026',
    time: '9:45 AM',
    subject: 'Motor Rewind Materials — Full Kit Pricing',
    body: `Good morning,\n\nWe need a quote on a full rewind kit for our 500HP motor overhaul program. Here's what we need:\n\n- NMN laminate sheets, Class H, 0.020" — 50 sheets\n- VPI resin, 5-gallon pails — 4 pails\n- 6205-2RS sealed bearings — 24 units\n- Slot liners, NMN, 14" cut — 200 pcs\n- Kapton tape HN 1mil, 1" × 36yd — 36 rolls`,
  },
};

// CC confirmation after approval
export const csrApprovalSentCc: Email = {
  id: 'csr-approval-cc',
  from: 'Apex Quoting',
  fromEmail: 'quotes@apex-corp.com',
  to: 'gtillman@midwestpower.com',
  cc: 'morgan@apex-corp.com',
  subject: 'Re: Motor Rewind Materials — Full Kit Pricing',
  preview: 'Approved & Sent: Quote #Q-5571039 — $11,328.00 for Midwest Power Generators...',
  body: '',
  bodyBefore: `Gary, Please see below for details of your requested quote for the 500HP motor rewind kit.\n\nAll requested items have been matched and priced. Kapton tape has a 1–2 week lead time; all other items are in stock and ready to ship.`,
  bodyAfter: `Thank you for doing business with us. Please follow up with any questions.`,
  date: 'Jan 28, 2026',
  time: '9:51 AM',
  read: false,
  isCcFromAi: true,
  originalSender: 'Gary Tillman (Midwest Power Generators)',
  isCcFromAiQuoteTable: midwestPowerQuote,
  quotedPrevious: {
    from: 'Gary Tillman',
    fromEmail: 'gtillman@midwestpower.com',
    to: 'quotes@apex-corp.com',
    date: 'Jan 28, 2026',
    time: '9:45 AM',
    subject: 'Motor Rewind Materials — Full Kit Pricing',
    body: `Good morning,\n\nWe need a quote on a full rewind kit for our 500HP motor overhaul program...`,
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   CUSTOMER-SPECIFIC PRICING — Same products, different customers, different prices
   Shows ADH-X315 + ACT-Z788 quoted to two new customers alongside RCSCA (batch 0)
   ══════════════════════════════════════════════════════════════════════════ */

const northeastMotorQuote: QuoteTable = {
  quoteNumber: 'Q-1094501',
  validThrough: 'Feb 27, 2026',
  customerName: 'Northeast Motor Supply',
  lineItems: [
    { sku: 'ADH-X315', description: 'X315 Thermal Output Adhesive 25ML System', quantity: 2, unitPrice: 24.50, totalPrice: 49.00, minOrderQty: 2, qtyBreakIncrement: 2, requestedQty: 2, stockStatus: 'in-stock', pricingBasis: 'Catalog Price' },
    { sku: 'ACT-Z788', description: 'Z788 7 Activator 1.75OZ Bottle', quantity: 6, unitPrice: 26.15, totalPrice: 156.90, minOrderQty: 6, qtyBreakIncrement: 6, requestedQty: 6, stockStatus: 'in-stock', pricingBasis: 'Catalog Price' },
  ],
  total: 250.90,
  shipping: {
    method: 'Standard Shipping',
    cost: 45.00,
  },
  pricingNote: 'Quoted at current standard pricing, valid as of January 2026.',
};

const gulfCoastQuote: QuoteTable = {
  quoteNumber: 'Q-1094502',
  validThrough: 'Feb 27, 2026',
  customerName: 'Gulf Coast Industrial',
  lineItems: [
    { sku: 'ADH-X315', description: 'X315 Thermal Output Adhesive 25ML System', quantity: 2, unitPrice: 17.90, totalPrice: 35.80, minOrderQty: 2, qtyBreakIncrement: 2, requestedQty: 2, stockStatus: 'in-stock', pricingBasis: 'Partner Pricing', standardUnitPrice: 24.50 },
    { sku: 'ACT-Z788', description: 'Z788 7 Activator 1.75OZ Bottle', quantity: 6, unitPrice: 18.85, totalPrice: 113.10, minOrderQty: 6, qtyBreakIncrement: 6, requestedQty: 6, stockStatus: 'in-stock', pricingBasis: 'Partner Pricing', standardUnitPrice: 26.15 },
  ],
  total: 193.90,
  shipping: {
    method: 'Standard Shipping',
    cost: 45.00,
  },
  pricingNote: 'Pricing reflects your current account pricing, valid as of December 2025.',
};

// Northeast Motor Supply — request
export const eis10NortheastRequest: Email = {
  id: 'eis-10-northeast',
  from: 'Karen Walsh',
  fromEmail: 'kwalsh@northeastmotor.com',
  to: 'quotes@apex-corp.com',
  subject: 'Adhesive & Activator Pricing',
  preview: 'Hi, we need pricing on ADH-X315 adhesive and ACT-Z788 activator...',
  body: `Hi,\n\nWe need pricing on ADH-X315 adhesive (2 units) and ACT-Z788 activator (6 units) for a motor repair job.\n\nThanks,\nKaren Walsh\nNortheast Motor Supply`,
  date: 'Jan 28, 2026',
  time: '1:15 PM',
  read: false,
};

// Northeast Motor Supply — auto-quote response
export const eis10NortheastResponse: Email = {
  id: 'eis-10-northeast-response',
  from: 'Apex Quoting',
  fromEmail: 'quotes@apex-corp.com',
  to: 'kwalsh@northeastmotor.com',
  cc: 'creisch@apex-corp.com',
  subject: 're: Adhesive & Activator Pricing',
  preview: 'Quote #Q-1094501 — $250.90 for Northeast Motor Supply...',
  body: '',
  bodyBefore: `Karen, We've confirmed availability and prepared competitive pricing for your request. Please see below for details:`,
  bodyAfter: `Thank you for doing business with us. Please follow up with any questions.`,
  date: 'Jan 28, 2026',
  time: '1:18 PM',
  read: false,
  quoteStatus: 'auto-quoted',
  inlineQuoteTable: northeastMotorQuote,
  quotedPrevious: {
    from: 'Karen Walsh',
    fromEmail: 'kwalsh@northeastmotor.com',
    to: 'quotes@apex-corp.com',
    date: 'Jan 28, 2026',
    time: '1:15 PM',
    subject: 'Adhesive & Activator Pricing',
    body: 'Hi,\n\nWe need pricing on ADH-X315 adhesive (2 units) and ACT-Z788 activator (6 units) for a motor repair job.',
  },
};

// Northeast Motor Supply — CSR CC
export const csr4NortheastCc: Email = {
  id: 'csr-ai-4',
  from: 'Apex Quoting',
  fromEmail: 'quotes@apex-corp.com',
  to: 'kwalsh@northeastmotor.com',
  cc: 'creisch@apex-corp.com',
  subject: 're: Adhesive & Activator Pricing',
  preview: 'Auto-quoted: Quote #Q-1094501 — $250.90 for Northeast Motor Supply...',
  body: '',
  bodyBefore: `Karen, We've confirmed availability and prepared competitive pricing for your request. Please see below for details:`,
  bodyAfter: `Thank you for doing business with us. Please follow up with any questions.`,
  date: 'Jan 28, 2026',
  time: '1:18 PM',
  read: false,
  isCcFromAi: true,
  originalSender: 'Karen Walsh (Northeast Motor Supply)',
  isCcFromAiQuoteTable: northeastMotorQuote,
  quotedPrevious: {
    from: 'Karen Walsh',
    fromEmail: 'kwalsh@northeastmotor.com',
    to: 'quotes@apex-corp.com',
    date: 'Jan 28, 2026',
    time: '1:15 PM',
    subject: 'Adhesive & Activator Pricing',
    body: 'Hi,\n\nWe need pricing on ADH-X315 adhesive (2 units) and ACT-Z788 activator (6 units) for a motor repair job.',
  },
};

// Gulf Coast Industrial — request
export const eis11GulfCoastRequest: Email = {
  id: 'eis-11-gulfcoast',
  from: 'Mike Hernandez',
  fromEmail: 'mhernandez@gulfcoastindustrial.com',
  to: 'quotes@apex-corp.com',
  subject: 'Adhesive & Activator — Reorder',
  preview: 'Need to reorder our usual adhesive and activator — ADH-X315 and ACT-Z788...',
  body: `Hi,\n\nNeed to reorder our usual adhesive and activator — ADH-X315 (2 units) and ACT-Z788 (6 units).\n\nPlease send over a quote when you can.\n\nThanks,\nMike Hernandez\nGulf Coast Industrial`,
  date: 'Jan 28, 2026',
  time: '1:20 PM',
  read: false,
};

// Gulf Coast Industrial — auto-quote response
export const eis11GulfCoastResponse: Email = {
  id: 'eis-11-gulfcoast-response',
  from: 'Apex Quoting',
  fromEmail: 'quotes@apex-corp.com',
  to: 'mhernandez@gulfcoastindustrial.com',
  cc: 'creisch@apex-corp.com',
  subject: 're: Adhesive & Activator — Reorder',
  preview: 'Quote #Q-1094502 — $193.90 for Gulf Coast Industrial...',
  body: '',
  bodyBefore: `Mike, We've reviewed your request and provided your quote below.`,
  bodyAfter: `Thank you for doing business with us. Please follow up with any questions.`,
  date: 'Jan 28, 2026',
  time: '1:23 PM',
  read: false,
  quoteStatus: 'auto-quoted',
  inlineQuoteTable: gulfCoastQuote,
  quotedPrevious: {
    from: 'Mike Hernandez',
    fromEmail: 'mhernandez@gulfcoastindustrial.com',
    to: 'quotes@apex-corp.com',
    date: 'Jan 28, 2026',
    time: '1:20 PM',
    subject: 'Adhesive & Activator — Reorder',
    body: 'Need to reorder our usual adhesive and activator — ADH-X315 (2 units) and ACT-Z788 (6 units).',
  },
};

// Gulf Coast Industrial — CSR CC
export const csr5GulfCoastCc: Email = {
  id: 'csr-ai-5',
  from: 'Apex Quoting',
  fromEmail: 'quotes@apex-corp.com',
  to: 'mhernandez@gulfcoastindustrial.com',
  cc: 'creisch@apex-corp.com',
  subject: 're: Adhesive & Activator — Reorder',
  preview: 'Auto-quoted: Quote #Q-1094502 — $193.90 for Gulf Coast Industrial...',
  body: '',
  bodyBefore: `Mike, We've reviewed your request and provided your quote below.`,
  bodyAfter: `Thank you for doing business with us. Please follow up with any questions.`,
  date: 'Jan 28, 2026',
  time: '1:23 PM',
  read: false,
  isCcFromAi: true,
  originalSender: 'Mike Hernandez (Gulf Coast Industrial)',
  isCcFromAiQuoteTable: gulfCoastQuote,
  quotedPrevious: {
    from: 'Mike Hernandez',
    fromEmail: 'mhernandez@gulfcoastindustrial.com',
    to: 'quotes@apex-corp.com',
    date: 'Jan 28, 2026',
    time: '1:20 PM',
    subject: 'Adhesive & Activator — Reorder',
    body: 'Need to reorder our usual adhesive and activator — ADH-X315 (2 units) and ACT-Z788 (6 units).',
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   RUSH RE-QUOTE WORKFLOW — Price comparison (standard vs rush)
   ══════════════════════════════════════════════════════════════════════════ */

// Rush request from Jawinder (same customer as WF1)
export const eis8Rush: Email = {
  id: 'eis-8-rush',
  from: 'Jawinder Schahal',
  fromEmail: 'jschahal@rcsca.com',
  to: 'quotes@apex-corp.com',
  subject: 'Re: Adhesive & Activator Pricing — Need Friday Delivery',
  preview: 'Our timeline moved up — can we get the same items delivered by Friday?',
  body: `Hi,\n\nOur timeline moved up — can we get the same items from our last order (ADH-X315 and ACT-Z788) delivered by Friday? Happy to pay rush pricing if needed.\n\nThanks,\nJawinder Schahal\nRCSCA`,
  date: 'Jan 28, 2026',
  time: '2:10 PM',
  read: false,
};

// Rush auto-quote response with price comparison
export const eis8RushResponse: Email = {
  id: 'eis-8-rush-response',
  from: 'Apex Quoting',
  fromEmail: 'quotes@apex-corp.com',
  to: 'jschahal@rcsca.com',
  cc: 'creisch@apex-corp.com',
  subject: 're: Adhesive & Activator Pricing — Need Friday Delivery',
  preview: 'Rush Quote #Q-1094215 — $136.31 for RCSCA (standard: $86.05)...',
  body: '',
  bodyBefore: `Jawinder, We've prepared a rush quote to meet your Friday delivery timeline.\n\nA 25% rush surcharge has been applied to all line items. For reference, your standard quote Q-1093928 is shown alongside the rush pricing below.`,
  bodyAfter: `Estimated delivery: Friday, Jan 30 (expedited).\n\nIf standard delivery timing works instead, your original quote Q-1093928 ($86.05) remains valid through Feb 27, 2026.\n\nThank you for doing business with us. Please follow up with any questions.`,
  date: 'Jan 28, 2026',
  time: '2:13 PM',
  read: false,
  quoteStatus: 'auto-quoted',
  inlineQuoteTable: rushRcscaQuote,
  quotedPrevious: {
    from: 'Jawinder Schahal',
    fromEmail: 'jschahal@rcsca.com',
    to: 'quotes@apex-corp.com',
    date: 'Jan 28, 2026',
    time: '2:10 PM',
    subject: 'Re: Adhesive & Activator Pricing — Need Friday Delivery',
    body: `Hi,\n\nOur timeline moved up — can we get the same items from our last order (ADH-X315 and ACT-Z788) delivered by Friday? Happy to pay rush pricing if needed.`,
  },
};

// Rush CC notification in CSR inbox
export const csr3RushCc: Email = {
  id: 'csr-rush-cc',
  from: 'Apex Quoting',
  fromEmail: 'quotes@apex-corp.com',
  to: 'jschahal@rcsca.com',
  cc: 'creisch@apex-corp.com',
  subject: 're: Adhesive & Activator Pricing — Need Friday Delivery',
  preview: 'Rush Quote #Q-1094215 — $136.31 for RCSCA (standard: $86.05)...',
  body: '',
  bodyBefore: `Jawinder, We've prepared a rush quote to meet your Friday delivery timeline.\n\nA 25% rush surcharge has been applied to all line items. For reference, your standard quote Q-1093928 is shown alongside the rush pricing below.`,
  bodyAfter: `Estimated delivery: Friday, Jan 30 (expedited).\n\nIf standard delivery timing works instead, your original quote Q-1093928 ($86.05) remains valid through Feb 27, 2026.\n\nThank you for doing business with us. Please follow up with any questions.`,
  date: 'Jan 28, 2026',
  time: '2:13 PM',
  read: false,
  isCcFromAi: true,
  originalSender: 'Jawinder Schahal (RCSCA)',
  isCcFromAiQuoteTable: rushRcscaQuote,
  quotedPrevious: {
    from: 'Jawinder Schahal',
    fromEmail: 'jschahal@rcsca.com',
    to: 'quotes@apex-corp.com',
    date: 'Jan 28, 2026',
    time: '2:10 PM',
    subject: 'Re: Adhesive & Activator Pricing — Need Friday Delivery',
    body: `Hi,\n\nWe need to expedite our previous order. Same items as before — ADH-X315 adhesive and ACT-Z788 activator — but we have a production line down and need delivery by Friday.`,
  },
};

// ── Qty-break comparison quote (auto-generated) ──

const qtyBreakQuote: QuoteTable = {
  quoteNumber: 'Q-5571040',
  validThrough: 'Feb 27, 2026',
  customerName: 'Consolidated Electric',
  isQtyBreakComparison: true,
  lineItems: [
    { sku: 'SRT-500', description: 'Silicone Rescue Tape, 1"x12ft, Red', quantity: 12, unitPrice: 8.75, totalPrice: 105.00, minOrderQty: 12, qtyBreakIncrement: 12, stockStatus: 'in-stock', qtyBreakNote: 'Standard (1–23 units)', pricingBasis: 'Volume Tier' },
    { sku: 'SRT-500', description: 'Silicone Rescue Tape, 1"x12ft, Red', quantity: 48, unitPrice: 7.45, totalPrice: 357.60, minOrderQty: 12, qtyBreakIncrement: 12, stockStatus: 'in-stock', qtyBreakNote: 'Case (24–99 units)', qtyBreakDiscount: '15% off', pricingBasis: 'Volume Tier' },
    { sku: 'SRT-500', description: 'Silicone Rescue Tape, 1"x12ft, Red', quantity: 144, unitPrice: 6.15, totalPrice: 885.60, minOrderQty: 12, qtyBreakIncrement: 12, stockStatus: 'in-stock', qtyBreakNote: 'Pallet (100+ units)', qtyBreakDiscount: '30% off', pricingBasis: 'Volume Tier' },
  ],
  total: 0,
  pricingNote: 'Volume tiers based on manufacturer pack sizes.',
};

export const eis9QtyBreak: Email = {
  id: 'eis-9-qtybreak',
  from: 'Lisa Torres',
  fromEmail: 'ltorres@consolidated-electric.com',
  to: 'quotes@apex-corp.com',
  subject: 'Silicone Rescue Tape — Q1 Restock',
  preview: "We need to restock SRT-500 silicone rescue tape for our Q1 maintenance kits...",
  body: "Hi,\n\nWe need to restock SRT-500 silicone rescue tape for our Q1 maintenance kits. Can you send over pricing when you get a chance?\n\nThanks,\nLisa Torres\nConsolidated Electric",
  date: 'Jan 28, 2026',
  time: '10:15 AM',
  read: false,
  quoteStatus: 'quoted',
};

export const eis9QtyBreakResponse: Email = {
  id: 'eis-9-qtybreak-response',
  from: 'Apex Quoting',
  fromEmail: 'quotes@apex-corp.com',
  to: 'ltorres@consolidated-electric.com',
  cc: 'morgan@apex-corp.com',
  subject: 'Re: Silicone Rescue Tape — Q1 Restock',
  preview: 'Quote #Q-5571040 — Pricing for Consolidated Electric...',
  body: '',
  bodyBefore: `Lisa, Please see below for details of your requested quote.\n\nNote: Since this item is available at volume discount tiers, we've included pricing at multiple quantity breaks so you can choose the best option for your restock.`,
  bodyAfter: `Volume tiers are based on manufacturer pack sizes. The 48-unit case price reflects a full-case discount, while 144+ units qualify for pallet pricing from the manufacturer. Orders at any quantity will be priced at the nearest qualifying tier.\n\nThank you for doing business with us. Please follow up with any questions.`,
  date: 'Jan 28, 2026',
  time: '10:18 AM',
  read: false,
  quoteStatus: 'quoted',
  inlineQuoteTable: qtyBreakQuote,
  quotedPrevious: {
    from: 'Lisa Torres',
    fromEmail: 'ltorres@consolidated-electric.com',
    to: 'quotes@apex-corp.com',
    date: 'Jan 28, 2026',
    time: '10:15 AM',
    subject: 'Silicone Rescue Tape — Q1 Restock',
    body: "We need to restock SRT-500 silicone rescue tape for our Q1 maintenance kits. Can you send over pricing when you get a chance?",
  },
};

export const csrQtyBreakCc: Email = {
  id: 'csr-ai-3',
  from: 'Apex Quoting',
  fromEmail: 'quotes@apex-corp.com',
  to: 'ltorres@consolidated-electric.com',
  cc: 'morgan@apex-corp.com',
  subject: 'Re: Silicone Rescue Tape — Q1 Restock',
  preview: 'Auto-quoted: Quote #Q-5571040 — Pricing for Consolidated Electric...',
  body: '',
  bodyBefore: `Lisa, Please see below for details of your requested quote.\n\nNote: Since this item is available at volume discount tiers, we've included pricing at multiple quantity breaks so you can choose the best option for your restock.`,
  bodyAfter: `Volume tiers are based on manufacturer pack sizes. The 48-unit case price reflects a full-case discount, while 144+ units qualify for pallet pricing from the manufacturer. Orders at any quantity will be priced at the nearest qualifying tier.\n\nThank you for doing business with us. Please follow up with any questions.`,
  date: 'Jan 28, 2026',
  time: '10:18 AM',
  read: false,
  isCcFromAi: true,
  originalSender: 'Lisa Torres (Consolidated Electric)',
  isCcFromAiQuoteTable: qtyBreakQuote,
  quotedPrevious: {
    from: 'Lisa Torres',
    fromEmail: 'ltorres@consolidated-electric.com',
    to: 'quotes@apex-corp.com',
    date: 'Jan 28, 2026',
    time: '10:15 AM',
    subject: 'Silicone Rescue Tape — Q1 Restock',
    body: "We need to restock SRT-500 silicone rescue tape for our Q1 maintenance kits. Can you send over pricing when you get a chance?",
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
  body: `Hi Morgan,\n\nWe spoke at the trade show last month about your sleeving line. I'd like to get pricing on the following:\n\nP/N BRT40XF17M\n\nCan you get me a quote by end of week?\n\nThanks,\nHerman\nMotion`,
  date: 'Jan 28, 2026',
  time: '11:50 AM',
  read: false,
  isDirectQuoteRequest: true,
  forwardTo: 'quotes@apex-corp.com',
  forwardNote: `Please quote the below thread per customer specifications.`,
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
    bodyBefore: `Herman, Please see below for details of your requested quote.\n\nNote: Since you didn't specify a quantity, we've quoted 2 units (the minimum order quantity for this item). If you need a different quantity, we'd be happy to provide updated pricing — larger orders may qualify for volume discounts and more competitive pricing tiers.`,
    bodyAfter: `Thank you for doing business with us. Please follow up with any questions.`,
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
  preview: 'Quote #Q-8320281 — $2,091.25 for Stonite Coil Corp...',
  body: '',
  bodyBefore: `Hi Steve - great to hear from you! Here is your quote as requested.\n\nAs we discussed, I've adjusted the #27 HPL quantity to 25 units to meet the minimum order requirement. For the SDPZ, I've quoted the #22.5 gauge per your confirmation — 100 units.`,
  bodyAfter: `Thank you for doing business with us. Please follow up with any questions.`,
  date: 'Jan 28, 2026',
  time: '11:45 AM',
  read: false,
  quoteStatus: 'quoted',
  inlineQuoteTable: stoniteFinalQuote,
  quotedPrevious: {
    from: 'Steve Landers',
    fromEmail: 'slanders@stonitecoil.com',
    to: 'quotes@apex-corp.com',
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
    to: 'morgan@apex-corp.com',
    date: 'Jan 28, 2026',
    time: '11:50 AM',
    subject: 'Aramid Braided Tape Pricing — P/N BRT40XF17M',
    body: `Hi Morgan,\n\nWe spoke at the trade show last month about your sleeving line. I'd like to get pricing on the following:\n\nP/N BRT40XF17M\n\nCan you get me a quote by end of week?`,
  },
};

export const eisMotionResponse: Email = {
  id: 'eis-forward-1-response',
  from: 'Apex Quoting',
  fromEmail: 'quotes@apex-corp.com',
  to: 'hemnant@motion.com',
  cc: 'morgan@apex-corp.com',
  subject: 'Re: Aramid Braided Tape Pricing — P/N BRT40XF17M',
  preview: 'Quote #Q-3018483 — $563.00 for Motion Industries Inc....',
  body: '',
  bodyBefore: `Herman, Please see below for details of your requested quote.\n\nNote: Since you didn't specify a quantity, we've quoted 2 units (the minimum order quantity for this item). If you need a different quantity, we'd be happy to provide updated pricing — larger orders may qualify for volume discounts and more competitive pricing tiers.`,
  bodyAfter: `Thank you for doing business with us. Please follow up with any questions.`,
  date: 'Jan 28, 2026',
  time: '11:57 AM',
  read: false,
  quoteStatus: 'quoted',
  inlineQuoteTable: motionQuote,
  quotedPrevious: {
    from: 'Herman',
    fromEmail: 'hemnant@motion.com',
    to: 'morgan@apex-corp.com',
    date: 'Jan 28, 2026',
    time: '11:50 AM',
    subject: 'Aramid Braided Tape Pricing — P/N BRT40XF17M',
    body: `Hi Morgan,\n\nWe spoke at the trade show last month about your sleeving line. I'd like to get pricing on the following:\n\nP/N BRT40XF17M`,
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
    subject: 'Daily Quoting Summary — Jan 27, 2026',
    preview: '12 quotes sent across 9 customers. Total quoted value: $47,850.00. Avg quote size: $3,987.50...',
    body: `Hi Morgan,

Here is your quoting activity summary for Tuesday, January 27, 2026.

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
    to: 'morgan@apex-corp.com',
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
  preview: 'Resolved: Quote #Q-8320281 — $2,091.25 for Stonite Coil Corp...',
  body: '',
  bodyBefore: `Hi Steve - great to hear from you! Here is your quote as requested.\n\nAs we discussed, I've adjusted the #27 HPL quantity to 25 units to meet the minimum order requirement. For the SDPZ, I've quoted the #22.5 gauge per your confirmation — 100 units.`,
  bodyAfter: `Thank you for doing business with us. Please follow up with any questions.`,
  date: 'Jan 28, 2026',
  time: '11:45 AM',
  read: false,
  isCcFromAi: true,
  originalSender: 'Steve Landers (Stonite Coil Corp)',
  isCcFromAiQuoteTable: stoniteFinalQuote,
  quotedPrevious: {
    from: 'Morgan',
    fromEmail: 'morgan@apex-corp.com',
    to: 'quotes@apex-corp.com',
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
  preview: 'Auto-quoted: Quote #Q-3018483 — $563.00 for Motion Industries Inc....',
  body: '',
  bodyBefore: `Herman, Please see below for details of your requested quote.\n\nNote: Since you didn't specify a quantity, we've quoted 2 units (the minimum order quantity for this item). If you need a different quantity, we'd be happy to provide updated pricing — larger orders may qualify for volume discounts and more competitive pricing tiers.`,
  bodyAfter: `Thank you for doing business with us. Please follow up with any questions.`,
  date: 'Jan 28, 2026',
  time: '11:57 AM',
  read: false,
  isCcFromAi: true,
  originalSender: 'Herman (Motion)',
  isCcFromAiQuoteTable: motionQuote,
  quotedPrevious: {
    from: 'Herman',
    fromEmail: 'hemnant@motion.com',
    to: 'morgan@apex-corp.com',
    date: 'Jan 28, 2026',
    time: '11:50 AM',
    subject: 'Aramid Braided Tape Pricing — P/N BRT40XF17M',
    body: `Hi Morgan,\n\nWe spoke at the trade show last month about your sleeving line. I'd like to get pricing on the following:\n\nP/N BRT40XF17M`,
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
    bodyBefore: `Herman, Please see below for details of your requested quote.\n\nNote: Since you didn't specify a quantity, we've quoted 2 units (the minimum order quantity for this item). If you need a different quantity, we'd be happy to provide updated pricing — larger orders may qualify for volume discounts and more competitive pricing tiers.`,
    bodyAfter: `Thank you for doing business with us. Please follow up with any questions.`,
    quoteTable: motionQuote,
    quotedPrevious: {
      from: 'Herman',
      fromEmail: 'hemnant@motion.com',
      to: 'morgan@apex-corp.com',
      date: 'Jan 28, 2026',
      time: '11:50 AM',
      subject: 'Aramid Braided Tape Pricing — P/N BRT40XF17M',
      body: `Hi Morgan,\n\nWe spoke at the trade show last month about your sleeving line. I'd like to get pricing on the following:\n\nP/N BRT40XF17M\n\nCan you get me a quote by end of week?\n\nThanks,\nHerman\nMotion`,
    },
  },
};

/* ── Folder definitions ── */

export interface InboxFolderDef {
  id: string;
  label: string;
  sublabel?: string;
  icon: 'inbox' | 'zap' | 'flag' | 'check-circle';
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
    id: 'auto-quoted',
    label: 'Auto Quoted',
    sublabel: 'Apex Quoting',
    icon: 'check-circle' as const,
    count: eisEmails.filter((e) => e.quoteStatus === 'auto-quoted').length,
    unreadCount: eisEmails.filter((e) => e.quoteStatus === 'auto-quoted' && !e.read).length,
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

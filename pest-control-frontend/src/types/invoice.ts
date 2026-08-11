export interface InvoiceItem {
    description: string;
    units: number;
    rate: number;
    subtotal: number;
}

export interface InvoiceCollection {
    _id: string;
    contractId: string | { _id: string; title: string; contractNumber: string; email?: string; phone?: string };
    jobId: string;
    contractNumber?: string;
    clientName?: string;

    scheduledDate: string;
    collectionDate: string;

    items: InvoiceItem[];
    grandTotal: number;

    createdAt: string;
    updatedAt: string;
}

export interface InvoiceState {
    items: InvoiceCollection[];
    currentInvoice: InvoiceCollection | null;
    loading: boolean;
    error: any;
}

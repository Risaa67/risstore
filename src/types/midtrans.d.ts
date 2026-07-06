declare module "midtrans-client" {
  interface SnapOptions {
    isProduction: boolean;
    serverKey: string;
    clientKey: string;
  }

  interface TransactionParameter {
    transaction_details: {
      order_id: string;
      gross_amount: number;
    };
    customer_details?: {
      first_name?: string;
      email?: string;
    };
    item_details?: Array<{
      id: string;
      name: string;
      price: number;
      quantity: number;
    }>;
  }

  interface TransactionResult {
    token: string;
    redirect_url: string;
  }

  class Snap {
    constructor(options: SnapOptions);
    createTransaction(parameter: TransactionParameter): Promise<TransactionResult>;
  }

  export { Snap, TransactionParameter, TransactionResult };
  export default { Snap };
}

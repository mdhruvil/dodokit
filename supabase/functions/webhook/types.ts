export type CommonPayloadType = {
    data: {
        customer: {
            email: string;
        };
        product_id: string;
        status: string;
        subscription_id: string;
        created_at: Date;
    };
};

export type Subscription = {
    email: string;
    product_id: string;
    status: string;
    subscription_id: string;
    activated_at?: string;
};

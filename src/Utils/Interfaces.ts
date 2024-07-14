export interface Shop {
    _id: string;
    logo: {
        asset: {
            url: string;
        };
    };
    name: string;
    slug: {
        current: string;
    };
    website?: string;
    subDomainName?: string;
    city?: string;
    country?: string;
    description?: string;
}
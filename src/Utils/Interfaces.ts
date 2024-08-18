export interface UserProfile {
    name: string;
    email?: string;
    userType?: 'admin' | 'customer' | 'editor';
    shop?: {
        _type: 'reference';
        _ref: string;
    };
    createdAt?: string;
    lastLogin?: string;
    userId: string;
}

export interface Shop {
    name: string;
    slug: string;
    street?: string;
    city?: string;
    country?: string;
    postalCode?: string;
    phone?: string;
    email?: string;
    website?: string;
    description?: string;
}
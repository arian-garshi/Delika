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
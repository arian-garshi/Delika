export interface Project {
    _id: string;
    mainImage: {
        asset: {
            url: string;
        };
    };
    gallery?: {
        asset: {
            url: string;
        };
    }[];
    title: string;
    subTitle?: string;
    description: string;
    url?: string;
    tags?: string[];
    slug: string;
}
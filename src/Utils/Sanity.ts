import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { Shop } from './Interfaces';

const client = createClient({
    projectId: "1o0mv0nx", // replace with your-project-id
    dataset: "production", // replace with your-dataset
    useCdn: true,
});
const builder = imageUrlBuilder(client);



/**
 * Generates an image URL based on provided reference, with optional width and height.
 * @param {string} _ref - The reference to the image.
 * @param {number|} [width] - The desired width of the image (optional).
 * @param {number|} [height] - The desired height of the image (optional).
 * @returns {string} The generated image URL.
 */
export const generateImageUrl = (_ref: string, width: number, height: number): string => {
    let imageBuilder = builder.image(_ref).auto('format');

    if (width) {
        imageBuilder = imageBuilder.width(width);
    }

    if (height) {
        imageBuilder = imageBuilder.height(height);
    }

    return imageBuilder.url();
}

export const fetchShops = async (): Promise<Shop[]> => {
    const query = '*[_type == "shops"]{ _id, slug, logo{asset->{url}}, name, website, subDomainName, city, country }';
    const shops = await client.fetch(query);
    return shops;
};

export const fetchShopBySlug = async (slug: string): Promise<Shop> => {
    const query = `*[_type == "shops" && slug.current == $slug][0]{ _id, slug, logo{asset->{url}}, name, website, description, subDomainName, city, country, description }`;
    const params = { slug };
    const shop = await client.fetch(query, params);
    return shop;
};
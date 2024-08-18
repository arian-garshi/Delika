import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { UserProfile, Shop } from './Interfaces';

const client = createClient({
    projectId: "1o0mv0nx", 
    dataset: "production", 
    useCdn: true,
    token: "skEoofEMODNs7WvBPTEGe6EEJpjv04SmbbFDF56Xo0OAfrqp1Ry9CNXMmiwZsZgpzQVzT7vCC2AuFwga3nD8J4qqOqbYQYvRJtLBep6JS2bUqGT8ksIN5HKppIm9nF4tavRJCZ8d4Jq4TbIcg7SGuFQ7MdCGVNCFiEQG3PWdpHoKhaORD5Ew",
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

export const createShop = async (shop: Shop) => {
    const { name, slug, street, city, country, postalCode, phone, email, website, description } = shop;

    const doc = {
        _type: 'shops',
        name,
        slug,
        street,
        city,
        country,
        postalCode,
        phone,
        email,
        website,
        description,
    };

    try {
        const result = await client.create(doc);
        return result;
    } catch (error) {
        console.error('Error creating shop:', error);
        throw new Error('Could not create shop');
    }
};

export const createUserProfile = async (user: UserProfile) => {
    const { name, email, userType, shop, createdAt, lastLogin, userId } = user;

    const doc = {
        _type: 'users',
        name,
        email,
        userType,
        shop,
        createdAt,
        lastLogin,
        userId,
    };

    try {
        const result = await client.create(doc);
        console.log('User profile created:', result);
        return result;
    } catch (error) {
        console.error('Error creating user profile:', error);
        throw new Error('Could not create user profile');
    }
};

export const fetchUserById = async (id: string): Promise<UserProfile | undefined> => {
    if (!id) {
        return undefined;
    }
    const query = '*[_type == "users" && userId == $id][0]';

    try {
        const user = await client.fetch(query, { id });
        return user || undefined;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw new Error('Could not fetch user');
    }
};

export const updateLastLogin = async (id: string) => {
    const doc = {
        _id: id,
        lastLogin: new Date().toISOString(),
    };

    try {
        const result = await client.patch(doc._id).commit();
        console.log('Updated last login:', result);
        return result;
    } catch (error) {
        console.error('Error updating last login:', error);
        throw new Error('Could not update last login');
    }
}

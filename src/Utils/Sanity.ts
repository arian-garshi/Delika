import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { Project } from './Interfaces';

const client = createClient({
    projectId: "zmnyi79s", // replace with your-project-id
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


export const fetchProjects = async (): Promise<Project[]> => {
    const query = '*[_type == "project"]{ _id, mainImage{asset->{url}}, gallery[]{asset->{url}}, title, subTitle, description, url, tags, slug }';
    const projects = await client.fetch(query);
    return projects;
};
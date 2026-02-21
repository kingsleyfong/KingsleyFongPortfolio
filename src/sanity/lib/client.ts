import { createClient } from 'next-sanity';
import { mockProjects } from '../data/mock';
import { Project } from '../types';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-02-19';

export const client = projectId
  ? createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
  })
  : null;

export async function getProjects(): Promise<Project[]> {
  if (!client) {
    console.warn('Sanity Project ID not found, using mock data.');
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return mockProjects;
  }

  try {
    const fetchedProjects = await client.fetch<Project[]>(
      `*[_type == "project"] | order(date desc){
        _id,
        title,
        slug,
        description,
        mainImage{
          asset->{
            url
          },
          alt
        },
        tags,
        links,
        date,
        category,
        specs,
        content,
        media
      }`
    );

    if (!fetchedProjects || fetchedProjects.length === 0) {
      console.warn('Sanity returned 0 projects. Falling back to mock data for layout stability.');
      return mockProjects;
    }
    return fetchedProjects;
  } catch (error) {
    console.error('Error fetching from Sanity:', error);
    return mockProjects;
  }
}

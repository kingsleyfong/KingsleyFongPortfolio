import { createClient } from 'next-sanity';
import { mockProjects, mockExperiences } from '../data/mock';
import { Project, Experience } from '../types';

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
  if (!client || process.env.NODE_ENV === 'development') {
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

export async function getExperiences(): Promise<Experience[]> {
  if (!client || process.env.NODE_ENV === 'development') {
    return mockExperiences;
  }

  try {
    const fetchedExps = await client.fetch<Experience[]>(
      `*[_type == "experience"] | order(date desc)`
    );
    return fetchedExps.length > 0 ? fetchedExps : mockExperiences;
  } catch (error) {
    console.error('Error fetching experiences from Sanity:', error);
    return mockExperiences;
  }
}

export async function getExperienceBySlug(slug: string): Promise<Experience | null> {
  // If no sanity, fallback to mock
  if (!client || process.env.NODE_ENV === 'development') {
    return mockExperiences.find(exp => exp.slug.current === slug) || null;
  }

  try {
    const fetchedExp = await client.fetch<Experience>(
      `*[_type == "experience" && slug.current == $slug][0]`,
      { slug }
    );
    return fetchedExp || mockExperiences.find(exp => exp.slug.current === slug) || null;
  } catch (error) {
    console.error('Error fetching experience from Sanity:', error);
    return mockExperiences.find(exp => exp.slug.current === slug) || null;
  }
}

export async function getProjectsByIds(ids: string[]): Promise<Project[]> {
  // If no sanity, fallback to mock
  if (!client || process.env.NODE_ENV === 'development') {
    return mockProjects.filter(p => ids.includes(p._id));
  }

  try {
    const fetchedProjects = await client.fetch<Project[]>(
      `*[_type == "project" && _id in $ids]{
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
      }`,
      { ids }
    );
    return fetchedProjects.length > 0 ? fetchedProjects : mockProjects.filter(p => ids.includes(p._id));
  } catch (error) {
    console.error('Error fetching projects by ids from Sanity:', error);
    return mockProjects.filter(p => ids.includes(p._id));
  }
}

export async function getHero(): Promise<any> {
  if (!client || process.env.NODE_ENV === 'development') return null;
  try {
    return await client.fetch(`*[_type == "hero"][0]{
      headline,
      description,
      profileImage{
        asset->{url}
      }
    }`);
  } catch (error) {
    return null;
  }
}

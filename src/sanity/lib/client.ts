import { createClient } from 'next-sanity';
import { mockProjects, mockExperiences } from '../data/mock';
import { Project, Experience } from '../types';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'eqlb03gf';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-02-19';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});


export async function getProjects(): Promise<Project[]> {
  if (!client) {
    console.warn('Sanity client not configured. Using mock projects.');
    return mockProjects;
  }

  try {
    const fetchedProjects = await client.fetch<Project[]>(
      `*[_type == "project"] | order(startDate desc){
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
        year,
        startDate,
        endDate,
        duration,
        category,
        specs,
        content,
        media{
          carousel[]{
            type,
            "image": image.asset->url,
            "video": video.asset->url,
            alt
          },
          bottomLeftAnchor{
            type,
            "image": image.asset->url,
            "video": video.asset->url,
            alt
          },
          bottomRightAnchor{
            type,
            "image": image.asset->url,
            "video": video.asset->url,
            alt
          }
        }
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
  if (!client) {
    console.warn('Sanity client not configured. Using mock experiences.');
    return mockExperiences;
  }

  try {
    const fetchedExps = await client.fetch<Experience[]>(
      `*[_type == "experience"] | order(startDate desc){
        _id,
        company,
        slug,
        role,
        date,
        description,
        "thumbnail": thumbnail.asset->url,
        "projects": projects[]->{
          _id,
          title,
          slug,
          description,
          mainImage{
            asset->{url},
            alt
          },
          tags,
          links,
          year,
          startDate,
          endDate,
          duration,
          category,
          specs,
          content,
          media{
            carousel[]{
              type,
              "image": image.asset->url,
              "video": video.asset->url,
              alt
            },
            bottomLeftAnchor{
              type,
              "image": image.asset->url,
              "video": video.asset->url,
              alt
            },
            bottomRightAnchor{
              type,
              "image": image.asset->url,
              "video": video.asset->url,
              alt
            }
          }
        }
      }`
    );
    return fetchedExps.length > 0 ? fetchedExps : mockExperiences;
  } catch (error) {
    console.error('Error fetching experiences from Sanity:', error);
    return mockExperiences;
  }
}

export async function getExperienceBySlug(slug: string): Promise<Experience | null> {
  // If no sanity, fallback to mock
  if (!client) {
    return mockExperiences.find(exp => exp.slug.current === slug) || null;
  }

  try {
    const fetchedExp = await client.fetch<Experience>(
      `*[_type == "experience" && slug.current == $slug][0]{
        _id,
        company,
        slug,
        role,
        date,
        description,
        "thumbnail": thumbnail.asset->url,
        "projects": projects[]->{
          _id,
          title,
          slug,
          description,
          mainImage{
            asset->{url},
            alt
          },
          tags,
          links,
          year,
          startDate,
          endDate,
          duration,
          category,
          specs,
          content,
          media{
            carousel[]{
              type,
              "image": image.asset->url,
              "video": video.asset->url,
              alt
            },
            bottomLeftAnchor{
              type,
              "image": image.asset->url,
              "video": video.asset->url,
              alt
            },
            bottomRightAnchor{
              type,
              "image": image.asset->url,
              "video": video.asset->url,
              alt
            }
          }
        }
      }`,
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
  if (!client) {
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
        year,
        startDate,
        endDate,
        duration,
        category,
        specs,
        content,
        media{
          carousel[]{
            type,
            "image": image.asset->url,
            "video": video.asset->url,
            alt
          },
          bottomLeftAnchor{
            type,
            "image": image.asset->url,
            "video": video.asset->url,
            alt
          },
          bottomRightAnchor{
            type,
            "image": image.asset->url,
            "video": video.asset->url,
            alt
          }
        }
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
  if (!client) return null;
  try {
    return await client.fetch(`*[_type == "hero"][0]{
      headline,
      description,
      profileImage{
        asset->{url}
      },
      "resumeUrl": resume.asset->url
    }`);

  } catch (error) {
    return null;
  }
}


export async function getSettings(): Promise<any> {
  if (!client) return null;
  try {
    return await client.fetch(`*[_type == "settings"][0]{
      ...,
      "resumeUrl": resume.asset->url,
      "featuredProjects": featuredProjects[]->{
        _id,
        title,
        slug,
        description,
        mainImage{
          asset->{url},
          alt
        },
        tags,
        links,
        year,
        startDate,
        endDate,
        duration,
        category,
        specs,
        content,
        media{
          carousel[]{
            type,
            "image": image.asset->url,
            "video": video.asset->url,
            alt
          },
          bottomLeftAnchor{
            type,
            "image": image.asset->url,
            "video": video.asset->url,
            alt
          },
          bottomRightAnchor{
            type,
            "image": image.asset->url,
            "video": video.asset->url,
            alt
          }
        }
      }
    }`);

  } catch (error) {
    return null;
  }
}

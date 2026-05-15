import { ImageResponse } from 'next/og';
import { getHero } from '@/sanity/lib/client';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Kingsley Fong Profile';
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default async function Icon() {
  const hero = await getHero();
  const imageUrl = hero?.profileImage?.asset?.url || 'https://kingsleyfong.com/kingsley.png';

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 24,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        <img
          src={imageUrl}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}

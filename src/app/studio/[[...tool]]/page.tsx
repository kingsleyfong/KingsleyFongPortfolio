'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
    return (
        <div className="fixed inset-0 w-full h-screen z-[999999] bg-black overflow-hidden pointer-events-auto">
            <NextStudio config={config} />
        </div>
    )
}

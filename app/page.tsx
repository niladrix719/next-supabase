import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from '../components/LogoutButton'
import Image from 'next/image';
import styles from './Page.module.css';
import data from './data.json';

export const dynamic = 'force-dynamic'

const resources = [
  {
    title: 'Cookie-based Auth and the Next.js App Router',
    subtitle:
      'This free course by Jon Meyers, shows you how to configure Supabase Auth to use cookies, and steps through some common patterns.',
    url: 'https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF',
    icon: 'M7 4V20M17 4V20M3 8H7M17 8H21M3 12H21M3 16H7M17 16H21M4 20H20C20.5523 20 21 19.5523 21 19V5C21 4.44772 20.5523 4 20 4H4C3.44772 4 3 4.44772 3 5V19C3 19.5523 3.44772 20 4 20Z',
  },
  {
    title: 'Supabase Next.js App Router Example',
    subtitle:
      'Want to see a code example containing some common patterns with Next.js and Supabase? Check out this repo!',
    url: 'https://github.com/supabase/supabase/tree/master/examples/auth/nextjs',
    icon: 'M10 20L14 4M18 8L22 12L18 16M6 16L2 12L6 8',
  },
  {
    title: 'Supabase Auth Helpers Docs',
    subtitle:
      'This template has configured Supabase Auth to use cookies for you, but the docs are a great place to learn more.',
    url: 'https://supabase.com/docs/guides/auth/auth-helpers/nextjs',
    icon: 'M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528',
  },
]

const examples = [
  { type: 'Client Components', src: 'app/_examples/client-component/page.tsx' },
  { type: 'Server Components', src: 'app/_examples/server-component/page.tsx' },
  { type: 'Server Actions', src: 'app/_examples/server-action/page.tsx' },
  { type: 'Route Handlers', src: 'app/_examples/route-handler.ts' },
  { type: 'Middleware', src: 'app/middleware.ts' },
  { type: 'Protected Routes', src: 'app/_examples/protected/page.tsx' },
]

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="w-full flex flex-col items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
          <div />
          <div>
            {user ? (
              <div className="flex items-center gap-4">
                Hey, {user.email}!
                <LogoutButton />
              </div>
            ) : (
              <Link
                href="/login"
                className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <h1
        className='text-7xl text-center tracking-tighter font-extrabold mb-14 mt-10'
        id={styles.heading}
      >
        VideoCourse
      </h1>
      <div className='flex items-center place-content-evenly w-full flex-wrap'>
        {data.map((course) => (
          <Link href={`course/${course.id}`} className='flex flex-col mb-10 items-center border-2 cursor-pointer hover:border-zinc-300 solid h-96 w-80 border-zinc-800 rounded-xl' key={course.id}>
            <Image
              src={course.image_link}
              alt={course.course_name}
              width={350}
              height={350}
              id={styles.coverImg}
              className='rounded-t-xl'
            />
            <div className='flex flex-row justify-end p-2 pt-4 w-full px-6 text-lg'>
              <div>
                {course.course_type === 'premium' && <p className='bg-red-950 text-red-500 py-0 px-6 rounded-2xl'>Premium</p>}
                {course.course_type !== 'premium' && <p className='bg-green-950 text-green-500 py-0 px-6 rounded-2xl'>Free</p>}
              </div>
            </div>
            <div className='flex flex-col items-center justify-center p-4 pt-0'>
              <h2 className='text-lg text-white font-bold text-left py-2 w-full'>{course.course_name}</h2>
              <p className='text-md text-left text-zinc-500'>{course.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

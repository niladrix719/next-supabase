'use client'
import styles from '../.././Page.module.css';
import data from '../.././data.json';
import ReactPlayer from 'react-player'
import { useState, useEffect } from 'react';
import LogoutButton from '../../../components/LogoutButton'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function Page({ params }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const supabase = createClientComponentClient()

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className='w-full'>
      <h1
        className='text-7xl text-center tracking-tighter font-extrabold mb-14 mt-10'
        id={styles.heading}
      >
        {data[params.course - 1]['course_name']}
      </h1>
      <div className='flex items-center place-content-evenly w-full flex-wrap'>
        {data[params.course - 1]['video_links'].map((video, index) => (
          <div
            className='flex flex-col mb-10 items-center border-2 cursor-pointer hover:border-zinc-300 solid h-fit w-fit border-zinc-700 rounded-xl'
            key={index + 1}
          >
            {isLoaded ? (
              <ReactPlayer
                url={video ? video : null}
                id={styles.video}
                width={350}
                height={350}
                className='rounded-t-xl'
                controls={true}
                config={{
                  youtube: {
                    playerVars: {
                      fs: 1
                    }
                  }
                }}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
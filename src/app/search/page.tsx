import getSongs from '@/actions/getSongs';
import getSongsBySearch from '@/actions/getSongsBySearch';
import Header from '@/components/Header';
import SearchInput from '@/components/SearchInput';
import React from 'react'
import SearchContent from './component/SearchContent';

interface searchPageProps {
  searchParams: {
    searchTerm: string;
  }
}

export const revalidate = 0;

const page = async({searchParams}: searchPageProps) => {
  const songs = await getSongsBySearch(searchParams.searchTerm);
  return (
    <div className='bg-neutral-800/70 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
      <Header className="from-bg-neutral-800/70">
        <div className='mt-2 mb-2 flex flex-col gap-y-6'>
          <h1 className='font-semibold text-4xl text-white'>Search</h1>
        </div>
        <SearchInput />
      </Header>
      <SearchContent songs={songs}/>
    </div>
  )
}

export default page
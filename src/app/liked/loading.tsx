import Box from '@/components/Box'
import React from 'react'
import {BeatLoader} from 'react-spinners'

const Loading = () => {
  return (
    <Box className='h-full flex items-center justify-center'>
        <BeatLoader color='#22c55e' size={20}/>
    </Box>
  )
}

export default Loading
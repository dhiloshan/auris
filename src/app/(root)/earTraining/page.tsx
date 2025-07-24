"use client";

import { use, useState, useEffect } from 'react';
import { getMajorKey } from '@/lib/music-utils';
import { playScale, testUser } from '@/lib/api/earTrainer';
import { Button } from '@/components/ui/button';


const Page = () => {
  const [scale, setScale] = useState<string | null>(null);

  const handleClickScale = () => {
    let newScale = JSON.stringify(getMajorKey());
    while(scale == newScale) newScale = JSON.stringify(getMajorKey());
    setScale(newScale);
  }

  useEffect(() => {
    if(scale){
        try{
            const notes = JSON.parse(scale).notes;
            playScale(notes, 4, "8n");
        }
        catch{
            console.log("Failed to parse the data.");
        }
    }
  }, [scale]);

  return (
    <>
        <div>Current scale : {scale || "not yet"}</div>
        <Button onClick={handleClickScale}>New Scale</Button>
        <Button onClick={testUser}>Test on interval</Button>
    </>
  );
};

export default Page;
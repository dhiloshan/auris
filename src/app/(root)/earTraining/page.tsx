"use client";

import React, { use, useState, useEffect } from 'react';
import { getMajorKey } from '@/lib/music-utils';
import { playScale } from '@/lib/api/earTrainer';


const Page = () => {
  const [scale, setScale] = useState<string | null>(null);

  const handleClick = () => {
    let newScale = JSON.stringify(getMajorKey());
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
        <button onClick={handleClick} className="bg-black text-white rounded-2xl p-2 hover:bg-gray-700">New Scale</button>
    </>
  );
};

export default Page;
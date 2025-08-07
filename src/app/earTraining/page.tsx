"use client";

import { useState, useEffect } from 'react';
import { 
    genRandomInterval
} from '@/lib/interval-utils';
import { 
    playSoundNow, 
    playChord, 
    playMelodicSequence
} from '@/lib/api/earTrainer';
import { Note } from '@/types/earTrainer';
import TrainingTips from '@/components/TrainingTips';
import { Button } from '@/components/ui/button';
import { INTERVAL_NAMES } from '@/lib/constants';
import Image from 'next/image';

type ExerciseType = 'intervals' | 'chords' | 'melody';

const Page = () => {
  const [correctIntervalName, setCorrectIntervalName] = useState('');
  const [buttonStates, setButtonStates] = useState<{[key: string]: string}>({});

  function handleNewIntervalTest() {
    const newInterval = genRandomInterval();
    setCorrectIntervalName(newInterval);
    setButtonStates({}); // Reset button states
    console.log(newInterval);
  }

  async function checkIntervalTest(clickedIntervalName: string) {
     if(clickedIntervalName === correctIntervalName){
        console.log("Correct!");
        setButtonStates(prev => ({...prev, [clickedIntervalName]: 'bg-green-500'}));
     } else {   
        console.log("Incorrect!");
        setButtonStates(prev => ({...prev, [clickedIntervalName] : 'bg-red-500'}));
     }
  }

  return (
    <>
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white p-6 rounded-lg">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold mb-2">Ear Training Studio</h1>
                    <a href="/" className="mr-5"> 
                        <Image src="/home.png" width={40} height={40} alt="Home Icon"/>
                    </a>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-blue-100">Score:</p>
                    </div>
                </div>
            </div>
            <div>
              <Button onClick={handleNewIntervalTest}>Test me On Intervals</Button>
            </div>
            <div className="grid">
                {INTERVAL_NAMES.map((intervalName, index) => (
                    <Button 
                        key={index} 
                        className={buttonStates[intervalName] || 'bg-yellow-800'} 
                        onClick={() => checkIntervalTest(intervalName)}
                    >
                        {intervalName}
                    </Button>
                ))}
            </div>
            

            {/* TODO: Load the sheet music using an API for intervals and playback */}
            <TrainingTips />
        </div>
    </>
  );
};

export default Page; 
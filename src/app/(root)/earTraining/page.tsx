"use client";

import { use, useState, useEffect } from 'react';
import { getMajorKey, testUser, calculateInterval, getIntervalName } from '@/lib/music-utils';
import { playScale, playSoundNow } from '@/lib/api/earTrainer';
import { Note } from '@/types/earTrainer';

const Page = () => {
  const [scale, setScale] = useState<string | null>(null);
  const [intervalTest, setIntervalTest] = useState<any>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const handleClick = () => {
    let newScale = JSON.stringify(getMajorKey());
    while(scale == newScale) newScale = JSON.stringify(getMajorKey());
    setScale(newScale);
  }

  const handleIntervalTest = () => {
    const test = testUser();
    setIntervalTest(test);
    setUserAnswer('');
    setResult('');
  }

  const handlePlayInterval = () => {
    if (intervalTest) {
      playSoundNow(intervalTest.note1);
      setTimeout(() => {
        playSoundNow(intervalTest.note2);
      }, 1000);
    }
  }

  const handleSubmitAnswer = () => {
    if (intervalTest && userAnswer.trim()) {
      const isCorrect = userAnswer.toLowerCase() === intervalTest.answer.toLowerCase();
      setResult(isCorrect ? 'Correct!' : `Incorrect. The answer is ${intervalTest.answer}`);
    }
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
        <div className="space-y-8">
            <div className="border p-4 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Scale Training</h2>
                <div>Current scale : {scale || "not yet"}</div>
                <button onClick={handleClick} className="bg-black text-white rounded-2xl p-2 hover:bg-gray-700 mt-2">New Scale</button>
            </div>

            <div className="border p-4 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Interval Training</h2>
                <button onClick={handleIntervalTest} className="bg-blue-600 text-white rounded-2xl p-2 hover:bg-blue-700 mb-4">New Interval Test</button>
                
                {intervalTest && (
                    <div className="space-y-4">
                        <div className="text-lg">{intervalTest.question}</div>
                        <button onClick={handlePlayInterval} className="bg-green-600 text-white rounded-2xl p-2 hover:bg-green-700">Play Interval</button>
                        
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                placeholder="Enter interval name (e.g., Major Third)"
                                className="border p-2 rounded flex-1"
                            />
                            <button onClick={handleSubmitAnswer} className="bg-purple-600 text-white rounded-2xl p-2 hover:bg-purple-700">Submit</button>
                        </div>
                        
                        {result && (
                            <div className={`p-2 rounded ${result.includes('Correct') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {result}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    </>
  );
};

export default Page;
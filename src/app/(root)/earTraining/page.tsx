"use client";

import { use, useState, useEffect } from 'react';
import { 
    getMajorKey, 
    testUser, 
    calculateInterval, 
    getIntervalName,
    generateChordProgression,
    generateMelodicSequence,
    generateScaleRecognition,
    generateRhythmPattern
} from '@/lib/music-utils';
import { 
    playScale, 
    playSoundNow, 
    playChord, 
    playMelodicSequence, 
    playRhythmPattern 
} from '@/lib/api/earTrainer';
import { Note } from '@/types/earTrainer';

type ExerciseType = 'intervals' | 'chords' | 'melody' | 'scales' | 'rhythm';

const Page = () => {
  const [currentExercise, setCurrentExercise] = useState<ExerciseType>('intervals');
  const [scale, setScale] = useState<string | null>(null);
  const [intervalTest, setIntervalTest] = useState<any>(null);
  const [chordTest, setChordTest] = useState<any>(null);
  const [melodyTest, setMelodyTest] = useState<any>(null);
  const [scaleTest, setScaleTest] = useState<any>(null);
  const [rhythmTest, setRhythmTest] = useState<any>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [totalAttempts, setTotalAttempts] = useState<number>(0);

  const handleScaleClick = () => {
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

  const handleChordTest = () => {
    const test = generateChordProgression();
    setChordTest(test);
    setUserAnswer('');
    setResult('');
  }

  const handleMelodyTest = () => {
    const test = generateMelodicSequence(4);
    setMelodyTest(test);
    setUserAnswer('');
    setResult('');
  }

  const handleScaleTest = () => {
    const test = generateScaleRecognition();
    setScaleTest(test);
    setUserAnswer('');
    setResult('');
  }

  const handleRhythmTest = () => {
    const test = generateRhythmPattern();
    setRhythmTest(test);
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

  const handlePlayChord = () => {
    if (chordTest) {
      playChord(chordTest.notes);
    }
  }

  const handlePlayMelody = () => {
    if (melodyTest) {
      playMelodicSequence(melodyTest.notes);
    }
  }

  const handlePlayScale = () => {
    if (scaleTest) {
      const scaleNotes = scaleTest.notes.map((note: Note) => note.noteName);
      playScale(scaleNotes, 4, "4n");
    }
  }

  const handlePlayRhythm = () => {
    if (rhythmTest) {
      playRhythmPattern(rhythmTest.pattern);
    }
  }

  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) return;

    let isCorrect = false;
    let correctAnswer = '';

    switch (currentExercise) {
      case 'intervals':
        isCorrect = userAnswer.toLowerCase() === intervalTest.answer.toLowerCase();
        correctAnswer = intervalTest.answer;
        break;
      case 'chords':
        isCorrect = userAnswer.toLowerCase() === chordTest.answer.toLowerCase();
        correctAnswer = chordTest.answer;
        break;
      case 'melody':
        isCorrect = userAnswer.toLowerCase() === melodyTest.sequence.toLowerCase();
        correctAnswer = melodyTest.sequence;
        break;
      case 'scales':
        isCorrect = userAnswer.toLowerCase() === scaleTest.answer.toLowerCase();
        correctAnswer = scaleTest.answer;
        break;
      case 'rhythm':
        isCorrect = userAnswer.toLowerCase() === rhythmTest.answer.toLowerCase();
        correctAnswer = rhythmTest.answer;
        break;
    }

    setTotalAttempts(prev => prev + 1);
    if (isCorrect) {
      setScore(prev => prev + 1);
      setResult('Correct! Well done!');
    } else {
      setResult(`Incorrect. The answer is: ${correctAnswer}`);
    }
  }

  const getCurrentTest = () => {
    switch (currentExercise) {
      case 'intervals': return intervalTest;
      case 'chords': return chordTest;
      case 'melody': return melodyTest;
      case 'scales': return scaleTest;
      case 'rhythm': return rhythmTest;
    }
  }

  const getCurrentQuestion = () => {
    const test = getCurrentTest();
    if (!test) return '';

    switch (currentExercise) {
      case 'intervals': return test.question;
      case 'chords': return 'What type of chord is this?';
      case 'melody': return 'What notes did you hear? (e.g., C - D - E)';
      case 'scales': return 'Is this a Major or Minor scale?';
      case 'rhythm': return 'What rhythm pattern did you hear?';
    }
  }

  const handlePlayCurrent = () => {
    switch (currentExercise) {
      case 'intervals': handlePlayInterval(); break;
      case 'chords': handlePlayChord(); break;
      case 'melody': handlePlayMelody(); break;
      case 'scales': handlePlayScale(); break;
      case 'rhythm': handlePlayRhythm(); break;
    }
  }

  const handleNewTest = () => {
    switch (currentExercise) {
      case 'intervals': handleIntervalTest(); break;
      case 'chords': handleChordTest(); break;
      case 'melody': handleMelodyTest(); break;
      case 'scales': handleScaleTest(); break;
      case 'rhythm': handleRhythmTest(); break;
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

  const accuracy = totalAttempts > 0 ? Math.round((score / totalAttempts) * 100) : 0;

  return (
    <>
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
                <h1 className="text-3xl font-bold mb-2">Ear Training Studio</h1>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-blue-100">Score: {score}/{totalAttempts} ({accuracy}%)</p>
                    </div>
                </div>
            </div>

            <div className="flex space-x-2 mb-6">
                {(['intervals', 'chords', 'melody', 'scales', 'rhythm'] as ExerciseType[]).map(exercise => (
                    <button
                        key={exercise}
                        onClick={() => setCurrentExercise(exercise)}
                        className={`px-4 py-2 rounded-lg font-medium ${
                            currentExercise === exercise
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        {exercise.charAt(0).toUpperCase() + exercise.slice(1)}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="border p-6 rounded-lg bg-white shadow-sm">
                    <h2 className="text-2xl font-bold mb-4">Scale Training</h2>
                    <div className="mb-4">Current scale: {scale || "Click 'New Scale' to start"}</div>
                    <button onClick={handleScaleClick} className="bg-black text-white rounded-lg p-3 hover:bg-gray-700">
                        New Scale
                    </button>
                </div>

                <div className="border p-6 rounded-lg bg-white shadow-sm">
                    <h2 className="text-2xl font-bold mb-4">{currentExercise.charAt(0).toUpperCase() + currentExercise.slice(1)} Training</h2>
                    
                    <button onClick={handleNewTest} className="bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700 mb-4">
                        New {currentExercise.charAt(0).toUpperCase() + currentExercise.slice(1)} Test
                    </button>
                    
                    {getCurrentTest() && (
                        <div className="space-y-4">
                            <div className="text-lg font-medium">{getCurrentQuestion()}</div>
                            <button onClick={handlePlayCurrent} className="bg-green-600 text-white rounded-lg p-3 hover:bg-green-700">
                                Play Audio
                            </button>
                            
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    placeholder={`Enter your answer...`}
                                    className="border p-3 rounded-lg flex-1"
                                    onKeyPress={(e) => e.key === 'Enter' && handleSubmitAnswer()}
                                />
                                <button onClick={handleSubmitAnswer} className="bg-purple-600 text-white rounded-lg p-3 hover:bg-purple-700">
                                    Submit
                                </button>
                            </div>
                            
                            {result && (
                                <div className={`p-3 rounded-lg ${
                                    result.includes('Correct') 
                                        ? 'bg-green-100 text-green-800 border border-green-200' 
                                        : 'bg-red-100 text-red-800 border border-red-200'
                                }`}>
                                    {result}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Training Tips</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div>
                        <h4 className="font-semibold text-blue-600">Intervals</h4>
                        <p>Practice recognizing the distance between two notes. Start with perfect intervals (4th, 5th, octave).</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-green-600">Chords</h4>
                        <p>Learn to distinguish major, minor, diminished, and augmented triads by their emotional quality.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-purple-600">Melody</h4>
                        <p>Train your ear to recognize melodic patterns and sequences. Focus on the contour and direction.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-orange-600">Scales</h4>
                        <p>Distinguish between major and minor scales. Major sounds bright, minor sounds darker.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-red-600">Rhythm</h4>
                        <p>Practice recognizing rhythmic patterns. Count along and feel the pulse.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-indigo-600">Practice</h4>
                        <p>Regular practice is key to developing your musical ear. Try different exercises daily!</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default Page;
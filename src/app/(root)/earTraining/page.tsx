"use client";

import { useState, useEffect } from 'react';
import { 
    getMajorKey, 
    generateChordProgression,
    generateMelodicSequence,
    generateScaleRecognition,
    generateIntervalTestFromJSON,
    getAllIntervalTypes
} from '@/lib/music-utils';
import { 
    playScale, 
    playSoundNow, 
    playChord, 
    playMelodicSequence
} from '@/lib/api/earTrainer';
import { Note } from '@/types/earTrainer';
import TrainingTips from '@/components/TrainingTips';

type ExerciseType = 'intervals' | 'chords' | 'melody' | 'scales';

const Page = () => {
  const [currentExercise, setCurrentExercise] = useState<ExerciseType>('intervals');
  const [scale, setScale] = useState<string | null>(null);
  const [intervalTest, setIntervalTest] = useState<any>(null);
  const [chordTest, setChordTest] = useState<any>(null);
  const [melodyTest, setMelodyTest] = useState<any>(null);
  const [scaleTest, setScaleTest] = useState<any>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [totalAttempts, setTotalAttempts] = useState<number>(0);
  const [allIntervalTypes, setAllIntervalTypes] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [playedNotes, setPlayedNotes] = useState<string>('');

  useEffect(() => {
    setAllIntervalTypes(getAllIntervalTypes());
  }, []);

  const handleScaleClick = () => {
    let newScale = JSON.stringify(getMajorKey());
    while(scale == newScale) newScale = JSON.stringify(getMajorKey());
    setScale(newScale);
  }

  const handleIntervalTest = () => {
    const test = generateIntervalTestFromJSON();
    setIntervalTest(test);
    setUserAnswer('');
    setResult('');
    setSubmitted(false);
    setPlayedNotes('');
  }

  const handleChordTest = () => {
    const test = generateChordProgression();
    setChordTest(test);
    setUserAnswer('');
    setResult('');
    setSubmitted(false);
    setPlayedNotes('');
  }

  const handleMelodyTest = () => {
    const test = generateMelodicSequence(4);
    setMelodyTest(test);
    setUserAnswer('');
    setResult('');
    setSubmitted(false);
    setPlayedNotes('');
  }

  const handleScaleTest = () => {
    const test = generateScaleRecognition();
    setScaleTest(test);
    setUserAnswer('');
    setResult('');
    setSubmitted(false);
    setPlayedNotes('');
  }

  const handlePlayInterval = async () => {
    if (intervalTest) {
      setPlayedNotes(`${intervalTest.note1.noteName}${intervalTest.note1.pitch} - ${intervalTest.note2.noteName}${intervalTest.note2.pitch}`);
      await playSoundNow(intervalTest.note1);
      setTimeout(async () => {
        await playSoundNow(intervalTest.note2);
      }, 1000);
    }
  }

  const handlePlayChord = async () => {
    if (chordTest) {
      const noteNames = chordTest.notes.map((note: Note) => `${note.noteName}${note.pitch}`).join(' - ');
      setPlayedNotes(noteNames);
      await playChord(chordTest.notes);
    }
  }

  const handlePlayMelody = async () => {
    if (melodyTest) {
      const noteNames = melodyTest.notes.map((note: Note) => `${note.noteName}${note.pitch}`).join(' - ');
      setPlayedNotes(noteNames);
      await playMelodicSequence(melodyTest.notes);
    }
  }

  const handlePlayScale = async () => {
    if (scaleTest) {
      const scaleNotes = scaleTest.notes.map((note: Note) => note.noteName);
      setPlayedNotes(scaleNotes.join(' - '));
      await playScale(scaleNotes, 4, "4n");
    }
  }

  const handleSubmitAnswer = () => {
    if (!userAnswer.trim() || submitted) return;

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
    }

    setSubmitted(true);
    setTotalAttempts(prev => prev + 1);
    if (isCorrect) {
      setScore(prev => prev + 1);
      setResult('Correct! Well done!');
    } else {
      setResult(`Incorrect. The answer is: ${correctAnswer}`);
    }
  }

  const handleOptionSelect = (selectedOption: string) => {
    if (currentExercise === 'intervals' && !submitted) {
      const isCorrect = selectedOption.toLowerCase() === intervalTest.answer.toLowerCase();
      
      setSubmitted(true);
      setTotalAttempts(prev => prev + 1);
      if (isCorrect) {
        setScore(prev => prev + 1);
        setResult('Correct! Well done!');
      } else {
        setResult(`Incorrect. The answer is: ${intervalTest.answer}`);
      }
    }
  }

  const getCurrentTest = () => {
    switch (currentExercise) {
      case 'intervals': return intervalTest;
      case 'chords': return chordTest;
      case 'melody': return melodyTest;
      case 'scales': return scaleTest;
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
    }
  }

  const handlePlayCurrent = async () => {
    switch (currentExercise) {
      case 'intervals': await handlePlayInterval(); break;
      case 'chords': await handlePlayChord(); break;
      case 'melody': await handlePlayMelody(); break;
      case 'scales': await handlePlayScale(); break;
    }
  }

  const handleNewTest = () => {
    switch (currentExercise) {
      case 'intervals': handleIntervalTest(); break;
      case 'chords': handleChordTest(); break;
      case 'melody': handleMelodyTest(); break;
      case 'scales': handleScaleTest(); break;
    }
  }

  useEffect(() => {
    if (scale) {
      try {
        const notes = JSON.parse(scale).notes;
        playScale(notes, 4, "4n");
      } catch {
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
                {(['intervals', 'chords', 'melody', 'scales'] as ExerciseType[]).map(exercise => (
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
                            
                            {currentExercise === 'intervals' ? (
                                <div className="space-y-2">
                                    <div className="text-sm text-gray-600 mb-2">Select the correct interval:</div>
                                    <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto">
                                        {allIntervalTypes.map((intervalType, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleOptionSelect(intervalType)}
                                                disabled={submitted}
                                                className={`p-2 text-sm border rounded-lg font-medium transition-colors ${
                                                    submitted 
                                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300'
                                                }`}
                                            >
                                                {intervalType.replace(/_/g, ' ')}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={userAnswer}
                                        onChange={(e) => setUserAnswer(e.target.value)}
                                        placeholder={`Enter your answer...`}
                                        disabled={submitted}
                                        className={`border p-3 rounded-lg flex-1 ${
                                            submitted ? 'bg-gray-100 text-gray-500' : ''
                                        }`}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSubmitAnswer()}
                                    />
                                    <button 
                                        onClick={handleSubmitAnswer} 
                                        disabled={submitted}
                                        className={`rounded-lg p-3 ${
                                            submitted 
                                                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                                                : 'bg-purple-600 text-white hover:bg-purple-700'
                                        }`}
                                    >
                                        {submitted ? 'Submitted' : 'Submit'}
                                    </button>
                                </div>
                            )}
                            
                            {result && (
                                <div className={`p-3 rounded-lg ${
                                    result.includes('Correct') 
                                        ? 'bg-green-100 text-green-800 border border-green-200' 
                                        : 'bg-red-100 text-red-800 border border-red-200'
                                }`}>
                                    {result}
                                </div>
                            )}
                            
                            {submitted && playedNotes && (
                                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                                    <div className="text-sm font-medium text-blue-800 mb-1">Notes that were played:</div>
                                    <div className="text-blue-700">{playedNotes}</div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <TrainingTips />
        </div>
    </>
  );
};

export default Page; 
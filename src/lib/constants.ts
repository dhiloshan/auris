export const CHROMATIC_SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const FLAT_CHROMATIC_SCALE = ['C', 'D♭', 'D', 'E♭', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B'];
export const NOTE_LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

export const semitoneToInterval : {[key: number]: string} = { 0 : 'Unison', 1 : 'Minor Second', 2 : 'Major Second', 3 : 'Minor Third', 4 : 'Major Third', 5 : 'Perfect Fourth', 6 : 'Tritone', 7 : 'Perfect Fifth', 8 : 'Minor Sixth', 9 : 'Major Sixth', 10 : 'Minor Seventh', 11 : 'Major Seventh', 12 : 'Octave'};

export const INTERVAL_NAMES = [
    'Unison', 'Minor Second', 'Major Second', 'Minor Third', 'Major Third',
    'Perfect Fourth', 'Tritone', 'Perfect Fifth', 'Minor Sixth', 'Major Sixth',
    'Minor Seventh', 'Major Seventh', 'Octave'
];

export const CHORD_TYPES = [
    { name: 'Major Triad', intervals: ["major_third", "perfect_fifth"], answer: 'Major' },
    { name: 'Minor Triad', intervals: ["minor_third", "perfect_fifth"], answer: 'Minor' },
    { name: 'Diminished Triad', intervals: ["minor_third", "diminished_fifth"], answer: 'Diminished' },
    { name: 'Augmented Triad', intervals: ["major_third", "augmented_fifth"], answer: 'Augmented' },
    { name: 'Major Seventh', intervals: ["major_third", "perfect_fifth", "major_seventh"], answer: 'Major' },
    { name: 'Minor Seventh', intervals: ["minor_third", "perfect_fifth", "minor_seventh"], answer: 'Minor' },
    { name: 'Diminished Seventh', intervals: ["minor_third", "diminished_fifth", "minor_seventh"], answer: 'Diminished' },
    { name: 'Dominant Seventh', intervals: ["major_third", "perfect_fifth", "minor_seventh"], answer: 'Dominant' },
];

export const QUALITY_ORDER = ['diminished', 'minor', 'major', 'augmented'];

export const DISTANCE_ORDER = [
    'unison', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'octave', 'ninth', 'tenth'
]; 
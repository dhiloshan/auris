export const CHROMATIC_SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const INTERVAL_NAMES = [
    'Unison', 'Minor Second', 'Major Second', 'Minor Third', 'Major Third',
    'Perfect Fourth', 'Tritone', 'Perfect Fifth', 'Minor Sixth', 'Major Sixth',
    'Minor Seventh', 'Major Seventh', 'Octave'
];

export const CHORD_TYPES = [
    { name: 'Major Triad', intervals: [0, 4, 7], answer: 'Major' },
    { name: 'Minor Triad', intervals: [0, 3, 7], answer: 'Minor' },
    { name: 'Diminished Triad', intervals: [0, 3, 6], answer: 'Diminished' },
    { name: 'Augmented Triad', intervals: [0, 4, 8], answer: 'Augmented' }
];

export const RHYTHM_PATTERNS = [
    { pattern: ['4n', '4n', '4n', '4n'], answer: 'Four quarter notes' },
    { pattern: ['2n', '2n'], answer: 'Two half notes' },
    { pattern: ['8n', '8n', '8n', '8n', '8n', '8n', '8n', '8n'], answer: 'Eight eighth notes' },
    { pattern: ['4n', '8n', '8n', '4n'], answer: 'Quarter, two eighths, quarter' },
    { pattern: ['8n', '8n', '4n', '4n'], answer: 'Two eighths, two quarters' }
];

export const QUALITY_ORDER = ['diminished', 'minor', 'major', 'augmented'];

export const DISTANCE_ORDER = [
    'unison', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'octave', 'ninth', 'tenth'
]; 
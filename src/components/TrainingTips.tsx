const TrainingTips = () => {
  const tips = [
    {
      title: "Intervals",
      color: "text-blue-600",
      description: "Practice recognizing the distance between two notes. Start with perfect intervals (4th, 5th, octave)."
    },
    {
      title: "Chords",
      color: "text-green-600",
      description: "Learn to distinguish major, minor, diminished, and augmented triads by their emotional quality."
    },
    {
      title: "Melody",
      color: "text-purple-600",
      description: "Train your ear to recognize melodic patterns and sequences. Focus on the contour and direction."
    },
    {
      title: "Scales",
      color: "text-orange-600",
      description: "Distinguish between major and minor scales. Major sounds bright, minor sounds darker."
    },
    {
      title: "Rhythm",
      color: "text-red-600",
      description: "Practice recognizing rhythmic patterns. Count along and feel the pulse."
    },
    {
      title: "Practice",
      color: "text-indigo-600",
      description: "Regular practice is key to developing your musical ear. Try different exercises daily!"
    }
  ];

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-3">Training Tips</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
        {tips.map((tip, index) => (
          <div key={index}>
            <h4 className={`font-semibold ${tip.color}`}>{tip.title}</h4>
            <p>{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingTips; 
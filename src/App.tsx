import  { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain } from 'lucide-react';

function App() {
  const WORK_TIME = 40 * 60; // 40 minutes in seconds
  const BREAK_TIME = 8 * 60; // 8 minutes in seconds

  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Play notification sound
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      audio.play();
      
      // Switch between work and break
      setIsBreak(!isBreak);
      setTimeLeft(isBreak ? WORK_TIME : BREAK_TIME);
      setIsRunning(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, isBreak]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(WORK_TIME);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progress = ((isBreak ? BREAK_TIME : WORK_TIME) - timeLeft) / (isBreak ? BREAK_TIME : WORK_TIME) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Pomodoro Timer</h1>
          <p className="text-gray-600">
            {isBreak ? 'Take a break!' : 'Stay focused!'}
          </p>
        </div>

        <div className="relative mb-8">
          <div className="w-48 h-48 mx-auto relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl font-bold text-gray-800">
                {formatTime(timeLeft)}
              </div>
            </div>
            <svg className="transform -rotate-90 w-48 h-48">
              <circle
                cx="96"
                cy="96"
                r="88"
                className="stroke-current text-gray-200"
                strokeWidth="12"
                fill="transparent"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                className="stroke-current text-indigo-500"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray="553"
                strokeDashoffset={553 - (553 * progress) / 100}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={toggleTimer}
            className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full p-4 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {isRunning ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button
            onClick={resetTimer}
            className="bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full p-4 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <RotateCcw size={24} />
          </button>
        </div>

        <div className="flex justify-between items-center px-4">
          <div className="flex items-center">
            <Brain className="text-indigo-500 mr-2" size={20} />
            <span className="text-sm text-gray-600">Work: 40m</span>
          </div>
          <div className="flex items-center">
            <Coffee className="text-indigo-500 mr-2" size={20} />
            <span className="text-sm text-gray-600">Break: 8m</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
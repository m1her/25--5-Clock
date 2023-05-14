"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const audioRef = useRef(null);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [isActive, setIsActive] = useState(false);
  const [sessionMinutes, setSessionMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [toggleTimer, setToggleTimer] = useState(false);

  const secondsFormat = seconds.toString().padStart(2, "0");
  const minutesFormat = minutes.toString().padStart(2, "0");

  useEffect(() => {
    let intervalId;
    if (isActive) {
      intervalId = setInterval(() => {
        setSeconds((second) => (second <= 0 ? 59 : second - 1));
        setMinutes((minutes) =>
          seconds == 0 && minutes != 0 ? minutes - 1 : minutes
        );
      }, 1000);
    }
    if (minutes == 0 && seconds == 0) {
      setToggleTimer(!toggleTimer);
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    return () => clearInterval(intervalId);
  }, [isActive, seconds, minutes]);

  const togglePause = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    if (toggleTimer) {
      setMinutes(breakMinutes);
      setSeconds(0);
    } else {
      setMinutes(sessionMinutes);
      setSeconds(0);
    }
  }, [toggleTimer]);

  const resetHandler = () => {
    setIsActive(false);
    setMinutes(25);
    setSessionMinutes(25);
    setBreakMinutes(5);
    setSeconds(0);
  };

  const incrementSessionHandler = () => {
    if (sessionMinutes < 1 || sessionMinutes >= 60) {
    } else {
      if (sessionMinutes == 60) {
        return;
      }
      if (toggleTimer == false) {
        setMinutes(sessionMinutes + 1);
        setSeconds(0);
      }
      setSessionMinutes(sessionMinutes + 1);
    }
  };
  const decrementSessionHandler = () => {
    if (sessionMinutes < 1 || sessionMinutes > 60) {
    } else {
      if (sessionMinutes == 1) {
        return;
      }
      if (toggleTimer == false) {
        setMinutes(sessionMinutes - 1);
        setSeconds(0);
      }
      setSessionMinutes(sessionMinutes - 1);
    }
  };
  const incrementBreakHandler = () => {
    if (breakMinutes < 1 || breakMinutes > 60) {
    } else {
      if (breakMinutes == 60) {
        return;
      }
      if (toggleTimer == true) {
        setMinutes(breakMinutes + 1);
        setSeconds(0);
      }
      setBreakMinutes(breakMinutes + 1);
    }
  };
  const decrementBreakHandler = () => {
    if (breakMinutes < 1 || breakMinutes >= 60) {
    } else {
      if (breakMinutes == 1) {
        return;
      }
      if (toggleTimer == true) {
        setMinutes(breakMinutes - 1);
        setSeconds(0);
      }
      setBreakMinutes(breakMinutes - 1);
    }
  };

  return (
    <main className="font-mono flex min-h-screen flex-col items-center justify-between p-24 bg-[#A9907E]">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center text-[#675D50]">
          25 + 5 Clock
        </h1>
        <div className="flex flex-col items-center mt-8">
          <div className="flex space-x-8">
            <div className="flex flex-col items-center">
              <div
                id="break-label"
                className="text-xl font-semibold text-[#F3DEBA]"
              >
                Break Length
              </div>
              <div className="flex space-x-2 mt-2">
                <button
                  id="break-decrement"
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  disabled={isActive}
                  onClick={decrementBreakHandler}
                >
                  -
                </button>
                <div
                  id="break-length"
                  className="text-lg font-bold text-gray-800"
                >
                  {breakMinutes}
                </div>
                <button
                  id="break-increment"
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  disabled={isActive}
                  onClick={incrementBreakHandler}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div
                id="session-label"
                className="text-xl font-semibold text-[#F3DEBA]"
              >
                Session Length
              </div>
              <div className="flex space-x-2 mt-2">
                <button
                  id="session-decrement"
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  onClick={decrementSessionHandler}
                  disabled={isActive}
                >
                  -
                </button>
                <div
                  id="session-length"
                  className="text-lg font-bold text-gray-800"
                >
                  {sessionMinutes}
                </div>
                <button
                  id="session-increment"
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  onClick={incrementSessionHandler}
                  disabled={isActive}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center mt-8">
            <div
              id="timer-label"
              className="text-xl font-semibold text-[#F3DEBA]"
            >
              {toggleTimer ? "Break" : "Session"}
            </div>
            <div
              id="time-left"
              className="text-6xl font-bold text-[#675D50] mt-2"
            >
              {minutesFormat}:{secondsFormat}
            </div>
            <div className="flex space-x-4 mt-4">
              <button
                id="start_stop"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={togglePause}
              >
                Start/Stop
              </button>
              <button
                id="reset"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                onClick={resetHandler}
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <audio id="beep" className="clip" ref={audioRef}>
          <source src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
        </audio>
      </div>
      <p className="text-sm text-[#794a51]">
        Coded by <span className="text-[#6f2c36]">m1her</span>
      </p>
    </main>
  );
}

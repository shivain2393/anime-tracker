'use client';

import { useEffect, useState } from "react";

const Countdown = ({ targetTime }: { targetTime: Date | null }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!targetTime) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }


    const updateCountdown = () => {
      const now = new Date();
      const difference = targetTime.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  return (
    <div className="mt-4 grid grid-cols-4 gap-1 text-center">
      <div className="bg-zinc-200 dark:bg-zinc-800 rounded p-1">
        <div className="text-xl font-bold">{timeLeft.days}</div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">days</div>
      </div>
      <div className="bg-zinc-200 dark:bg-zinc-800 rounded p-1">
        <div className="text-xl font-bold">{timeLeft.hours}</div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">hours</div>
      </div>
      <div className="bg-zinc-200 dark:bg-zinc-800 rounded p-1">
        <div className="text-xl font-bold">{timeLeft.minutes}</div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">mins</div>
      </div>
      <div className="bg-zinc-200 dark:bg-zinc-800 rounded p-1">
        <div className="text-xl font-bold">{timeLeft.seconds}</div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">secs</div>
      </div>
    </div>
  );
};

export default Countdown;

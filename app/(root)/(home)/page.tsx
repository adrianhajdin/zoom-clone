//@ts-nocheck
'use client';

import React from 'react';
import { useGetCalls } from '@/hooks/useGetCalls';
import Loader from '@/components/Loader';
import MeetingTypesList from '@/components/MeetingTypesList';

const Home = () => {

  const { upcomingCalls, isLoading } = useGetCalls();
  if (isLoading) return <Loader />;

  const currentDateTime = new Date();
  // Format the time as 10:25 AM/PM
  const timeFormatted = currentDateTime.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const dateFormatted = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
  }).format(currentDateTime);

  // Filter and sort the upcoming calls to find the latest one
  const sortedCalls = upcomingCalls?.sort((a, b) => {
    const dateA = new Date(a.state.startsAt$.source._value);
    const dateB = new Date(b.state.startsAt$.source._value);
    return dateA - dateB;
  });

  const latestCall =
    sortedCalls?.length > 0 ? sortedCalls[0].state.startsAt : null;

  return (
    <section className="size-full flex flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex flex-col h-full justify-between max-md:px-5 max-md:py-8 lg:p-11">
          {latestCall ? (
            <h2 className="glassmorphism max-w-[270px] rounded-md py-2 text-center text-base font-normal">
              <p>Upcoming meeting at</p>
              <span className="text-red-500 font-bold">
                {new Date(latestCall)
                  .toLocaleString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })
                  .replace(',', '')}
              </span>
            </h2>
          ) : (
            <h2 className="glassmorphism max-w-[270px] rounded-md py-2 text-center text-base font-normal">
              No Upcoming meetings!
            </h2>
          )}

          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">
              {timeFormatted}
            </h1>
            <p className="font-medium text-sky-1 text-lg lg:text-2xl">
              {dateFormatted}
            </p>
          </div>
        </div>
      </div>

      <MeetingTypesList />
    </section>
  );
};

export default Home;

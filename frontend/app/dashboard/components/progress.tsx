'use client';

import React from 'react';

interface ProgressProps {
  step: number;
}

export default function Progress({ step }: ProgressProps) {
  return (
    <div className="flex items-center justify-between px-2 mb-8">
      {[1, 2, 3].map(num => (
        <React.Fragment key={num}>
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= num ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-slate-200 text-slate-500'}`}
            >
              {num}
            </div>
            <span
              className={`text-[10px] font-bold uppercase ${step >= num ? 'text-indigo-600' : 'text-slate-400'}`}
            >
              {num === 1 ? '목표' : num === 2 ? '인바디' : '1RM'}
            </span>
          </div>
          {num < 3 && (
            <div className="h-0.5 flex-1 mx-2 bg-slate-200 overflow-hidden">
              <div
                className={`h-full bg-indigo-600 transition-all duration-500 ${step > num ? 'w-full' : 'w-0'}`}
              ></div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}


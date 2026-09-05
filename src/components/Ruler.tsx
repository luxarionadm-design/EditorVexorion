import React from "react";

interface Props {
  width: number;
}

export const Ruler: React.FC<Props> = ({ width }) => {
  // Generate markings every 10px, with larger marks every 50px and numbered marks every 100px
  const marksCount = Math.floor(width / 20);

  return (
    <div className="h-5 bg-stone-100 border-b border-stone-300 flex items-end select-none text-[9px] text-stone-500 overflow-hidden relative shadow-2xs">
      {/* Margin indicator left */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-stone-300/40 border-r border-stone-400/50" />

      {/* Ticks */}
      <div className="flex items-end w-full h-full">
        {Array.from({ length: marksCount }).map((_, i) => {
          const isMajor = i % 5 === 0;
          const isMid = i % 5 === 2 || i % 5 === 3;
          const num = i / 5;

          return (
            <div
              key={i}
              className="flex flex-col items-center justify-end"
              style={{ width: "20px" }}
            >
              {isMajor && i > 0 && (
                <span className="mb-0.5 leading-none text-stone-600 font-mono text-[8px]">
                  {num}
                </span>
              )}
              <div
                className={`w-px bg-stone-400 ${
                  isMajor ? "h-2.5 bg-stone-600" : isMid ? "h-1.5" : "h-1"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Margin indicator right */}
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-stone-300/40 border-l border-stone-400/50" />
    </div>
  );
};

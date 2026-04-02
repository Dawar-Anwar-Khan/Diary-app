"use client";

import Image from "next/image";
import { SubjectEntry } from "@/lib/types";

interface Props {
  dateStr: string;
  className: string;
  subjects: SubjectEntry[];
  schoolName?: string;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = d.getDate();
  const suffix =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
          ? "rd"
          : "th";
  return `${days[d.getDay()]}, ${day}${suffix} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export default function WhiteboardMockup({
  dateStr,
  className,
  subjects,
  schoolName,
}: Props) {
  return (
    /*
      Outer wrapper — maintains the photo's natural 1308:872 aspect ratio.
      The real whiteboard photo sits as the background layer.
      Text is overlaid absolutely, positioned to land exactly on
      the white board surface inside the aluminium frame.

      Board surface bounds (measured from photo):
        left:   6.88%   top:   12.96%
        width: 86.54%  height: 66.63%
      Text gets an inner padding of ~4% on each side.
    */
    <div className="relative w-full" style={{ aspectRatio: "1308 / 872" }}>
      {/* ── REAL PHOTO ── */}
      <Image
        src="/whiteboard.webp"
        alt="Whiteboard"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
        priority
      />

      {/* ── TEXT OVERLAY — positioned over the white board surface ── */}
      <div
        className="absolute"
        style={{
          left: "6.88%",
          top: "12.96%",
          width: "86.54%",
          height: "66.63%",
          // Slightly darken the board so marker text pops (looks written on)
          // background: "rgba(0,0,0,0.01)",
          overflow: "hidden",
          fontFamily: "'Patrick Hand', cursive",
        }}
      >
        {/* Inner padding keeps text away from the metal frame */}
        <div
          className="w-full h-full flex flex-col"
          style={{
            paddingLeft: "5%",
            paddingRight: "5%",
            paddingTop: "2.5%",
            paddingBottom: "2%",
            gap: 0,
          }}
        >
          {/* School name */}
          {schoolName?.trim() && (
            <div
              className="text-center"
              style={{
                fontSize: "clamp(9px, 1.3vw, 18px)",
                color: "rgba(60,55,50,0.6)",
                letterSpacing: "0.08em",
                // marginBottom: "0.6%",
                fontFamily: "'Patrick Hand', cursive",
              }}
            >
              {schoolName.trim().toUpperCase()}
            </div>
          )}

          {/* Date + Class on same row */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "center",
              gap: "1em",
              marginTop:"1.5%",
              marginBottom: "0.4%",
              fontFamily: "'Patrick Hand', cursive",
            }}
          >
            <div
              className="font-bold"
              style={{
                fontSize: "clamp(13px, 2.4vw, 34px)",
                color: "#111",
                lineHeight: 1.1,
              }}
            >
              {formatDate(dateStr)}
            </div>
            <div
              style={{
                textAlign:"right",
                fontSize: "clamp(10px, 1.5vw, 19px)",
                color: "rgba(40,40,40,0.55)",
                whiteSpace: "nowrap",
              }}
            >
              | Class: {className}
            </div>
          </div>

          {/* Dashed divider */}
          {/* <div
            style={{
              borderTop: "1.5px dashed rgba(30,30,30,0.18)",
              marginBottom: "1.8%",
            }}
          /> */}

          {/* "Homework" heading */}
          <div
            className="text-center font-bold relative"
            style={{
              fontSize: "clamp(15px, 3vw, 46px)",
              color: "#0a0a0a",
              lineHeight: 1.1,
              marginBottom: "1%",
              fontFamily: "'Patrick Hand', cursive",
              paddingBottom: 7,
            }}
          >
            Homework
            <div
              style={{
                position: "absolute",
                bottom: "-16%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "36%",
                height: "2.5px",
                background: "#0a0a0a",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-20%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "36%",
                height: "1px",
                background: "#0a0a0a",
              }}
            />
          </div>

          {/* Spacer for underlines */}
          <div style={{ flexShrink: 0, height: "2.5%" }} />

          {/* Subject rows */}
          <div
            className="flex flex-col"
            style={{
              gap: "clamp(2px, 1.3vh, 13px)",
              flex: 1,
              overflow: "hidden",
            }}
          >
            {subjects.map((sub) => {
              if (!sub.name) return null;
              return (
                <div
                  key={sub.id}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "0.35em",
                    lineHeight: 1.3,
                    fontFamily: "'Patrick Hand', cursive",
                  }}
                >
                  {/* Subject label */}
                  <span
                    className="font-bold flex-shrink-0"
                    style={{
                      fontSize: "clamp(10px, 1.9vw, 28px)",
                      color: "#0c2461",
                      fontFamily: "'Patrick Hand', cursive",
                    }}
                  >
                    {sub.name}:
                  </span>

                  {/* Task */}
                  <span
                    style={{
                      fontSize: "clamp(9px, 1.75vw, 26px)",
                      color: "#111",
                      fontFamily: "'Patrick Hand', cursive",
                    }}
                  >
                    {sub.task.trim() || "–"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

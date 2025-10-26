"use client";

import { useMemo, useState } from "react";
import {
  addDays,
  addMonths,
  addWeeks,
  eachDayOfInterval,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfWeek,
  subDays,
  setYear,
  subMonths,
  subWeeks,
} from "date-fns";
import { enUS } from "date-fns/locale";
import { useData } from "@/contexts/DataContext";

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month");
  const { events: rawEvents, projects } = useData();

  const events = useMemo(() => {
    return rawEvents.map((event) => ({
      ...event,
      date: new Date(event.date),
      project: projects.find((p) => p.id === event.projectId)?.title ?? "N/A",
    }));
  }, [rawEvents, projects]);

  const renderMonthView = () => {
    const days = eachDayOfInterval({
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0),
    });

    return (
      <div className="grid grid-cols-7 gap-1">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="text-center font-medium p-2">
            {day}
          </div>
        ))}
        {days.map((day) => {
          const dayEvents = events.filter((event) =>
            isSameDay(event.date, day)
          );
          const isCurrentDay = isToday(day);
          return (
            <div
              key={day.toString()}
              className={`min-h-[100px] p-1 border ${
                isSameMonth(day, currentDate) ? "bg-white" : "bg-gray-100"
              } ${isCurrentDay ? "bg-blue-50" : ""}`}
            >
              <div
                className={`font-medium text-sm ${
                  isCurrentDay ? "text-blue-600 font-bold" : ""
                }`}
              >
                {format(day, "d")}
              </div>
              {dayEvents.map((event) => (
                <div
                  key={event.id}
                  className="text-xs p-1 mb-1 rounded bg-blue-100 truncate"
                  title={event.title}
                >
                  {event.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    const end = endOfWeek(currentDate, { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start, end });

    return (
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <div key={day.toString()} className="border p-2">
            <div className="font-medium">
              {format(day, "EEEE", { locale: enUS })}
            </div>
            <div className="text-sm">{format(day, "d MMM")}</div>
            {events
              .filter((event) => isSameDay(event.date, day))
              .map((event) => (
                <div
                  key={event.id}
                  className="text-xs p-1 mt-1 bg-blue-100 rounded"
                >
                  {event.title}
                </div>
              ))}
          </div>
        ))}
      </div>
    );
  };

  const renderDayView = () => {
    const dayEvents = events.filter((event) =>
      isSameDay(event.date, currentDate)
    );

    return (
      <div className="border p-4">
        <h3 className="font-bold text-lg mb-4">
          {format(currentDate, "EEEE, d MMMM yyyy", { locale: enUS })}
        </h3>
        {dayEvents.length > 0 ? (
          dayEvents.map((event) => (
            <div key={event.id} className="mb-2 p-2 bg-blue-100 rounded">
              <div className="font-medium">{event.title}</div>
              <div className="text-sm text-gray-600">{event.project}</div>
            </div>
          ))
        ) : (
          <p>No events scheduled for this day.</p>
        )}
      </div>
    );
  };

  const handleMonthSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.target.value, 10);
    setCurrentDate(new Date(currentDate.getFullYear(), newMonth, 1));
  };

  const handleYearSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value, 10);
    setCurrentDate(setYear(currentDate, newYear));
  };

  const yearOptions = Array.from(
    { length: 21 },
    (_, i) => new Date().getFullYear() - 10 + i
  );
  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: format(new Date(2000, i, 1), "MMMM", { locale: enUS }),
  }));

  return (
    <div>
      <div className="flex items-center justify-center mb-4">
        <h2 className="text-xl font-semibold w-64 text-center justify-center mb-4">
          {format(currentDate, "MMMM yyyy")}
        </h2>
      </div>

      <div className="mb-4 flex items-center justify-between px-6">
        <button
          style={{
            border: "1px solid #ccc",
            padding: "6px 12px",
            borderRadius: "4px",
            backgroundColor: "#f9f9f9",
            cursor: "pointer",
          }}
          onClick={() =>
            setCurrentDate((prev) => {
              if (view === "day") return subDays(prev, 1);
              if (view === "week") return subWeeks(prev, 1);
              return subMonths(prev, 1);
            })
          }
        >
          Previous
        </button>

        <div className="flex items-center gap-2">
          <select
            value={currentDate.getMonth()}
            onChange={handleMonthSelect}
            className="border rounded px-2 py-1"
          >
            {monthOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            value={currentDate.getFullYear()}
            onChange={handleYearSelect}
            className="border rounded px-2 py-1"
          >
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select
            value={view}
            onChange={(e) => setView(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="day">Day</option>
          </select>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="border rounded px-3 py-1 text-sm"
            style={{
              border: "1px solid #ccc",
              backgroundColor: "#f9f9f9",
            }}
          >
            Today
          </button>
        </div>
        <button
          style={{
            border: "1px solid #ccc",
            padding: "6px 12px",
            borderRadius: "4px",
            backgroundColor: "#f9f9f9",
            cursor: "pointer",
          }}
          onClick={() =>
            setCurrentDate((prev) => {
              if (view === "day") return addDays(prev, 1);
              if (view === "week") return addWeeks(prev, 1);
              return addMonths(prev, 1);
            })
          }
        >
          Next
        </button>
      </div>
      {view === "month" && renderMonthView()}
      {view === "week" && renderWeekView()}
      {view === "day" && renderDayView()}
    </div>
  );
}

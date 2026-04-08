import { useState, useEffect } from "react";

function Notes({ startDate, endDate, currentMonth }) {

  const monthKey = currentMonth.toISOString().slice(0, 7);
  const key = `${monthKey}-${startDate || "none"}-${endDate || "none"}`;

  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  // Load note
  useEffect(() => {
    const savedNote = localStorage.getItem(key);
    setNote(savedNote || "");
    setSaved(false);
  }, [key]);

  // ✅ Manual Save
  const handleSave = () => {
    localStorage.setItem(key, note);
    setSaved(true);

    setTimeout(() => setSaved(false), 1500);
  };

  // ✅ Clear
  const handleClear = () => {
    setNote("");
    localStorage.removeItem(key);
    setSaved(false);
  };

  return (
    
      <div className="bg-white/70 backdrop-blur-md p-4 rounded-xl shadow-md border border-gray-200 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-xl font-semibold mb-2">Notes</h2>

      <p className="text-sm text-gray-500 mb-2">
        {startDate && endDate
          ? `Notes for ${startDate} - ${endDate}`
          : "Select a date range"}
      </p>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full h-40 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
        placeholder="Write your notes..."
      />

      {/* ✅ Buttons Row */}
      <div className="flex justify-between items-center mt-3">

        {/* Save button */}
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-green-500 transition cursor-pointer"
        >
          Save
        </button>

        {/* Right side */}
        <div className="flex items-center gap-3">
          
          {saved && (
            <span className="text-green-600 text-sm">Saved ✅</span>
          )}

          <button
            onClick={handleClear}
            className="px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition cursor-pointer"
          >
            Clear
          </button>

        </div>
      </div>
    </div>
  );
}

export default Notes;
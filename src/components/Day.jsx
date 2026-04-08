function Day({ day, onClick, isStart, isEnd, isInRange, isToday }) {
  return (
    <div
      onClick={() => onClick(day)}
      className={`p-2 text-center rounded-lg cursor-pointer shadow-sm transition-all duration-200
        
        ${isStart ? "bg-blue-600 text-white scale-105 shadow-md" : ""}
        ${isEnd ? "bg-blue-600 text-white scale-105 shadow-md" : ""}
        
        ${isInRange && !isStart && !isEnd ? "bg-blue-200" : ""}
        
        ${!isInRange && !isStart && !isEnd ? "bg-white hover:bg-blue-100 hover:scale-105" : ""}
        
        ${isToday ? "border-2 border-red-500 font-bold" : ""}
      `}
    >
      {day}
    </div>
  );
}

export default Day;
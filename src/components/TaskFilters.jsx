function TaskFilters({ onToday, onWeek, onMonth, onAll }) {
  return (
    <div className="buttons-calendar">
      <button onClick={onToday}>Dia</button>
      <button onClick={onWeek}>Semana</button>
      <button onClick={onMonth}>Mes</button>
      <button onClick={onAll}>Todas</button>
    </div>
  )
}

export default TaskFilters

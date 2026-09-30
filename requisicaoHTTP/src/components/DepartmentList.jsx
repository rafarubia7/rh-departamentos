function DepartmentList({ departments, loading }) {
  if (loading) {
    return <p className="message info-message">Carregando departamentos...</p>
  }

  return (
    <ul className="department-list">
      {departments.map((department) => (
        <li key={department.id} className="department-item">
          <span>{department.name}</span>
          <strong>{department.acronym}</strong>
        </li>
      ))}
    </ul>
  )
}

export default DepartmentList

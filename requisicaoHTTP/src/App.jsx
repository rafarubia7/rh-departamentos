import { useEffect, useState } from 'react'
import './App.css'

const initialForm = {
  name: '',
  acronym: '',
}

function App() {
  const [departments, setDepartments] = useState([])
  const [formData, setFormData] = useState(initialForm)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [formError, setFormError] = useState('')

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('http://localhost:3000/departments')

        if (!response.ok) {
          throw new Error('Não foi possível carregar os departamentos.')
        }

        const data = await response.json()
        setDepartments(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDepartments()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'acronym' ? value.toUpperCase() : value,
    }))
    setFormError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const name = formData.name.trim()
    const acronym = formData.acronym.trim().toUpperCase()

    if (!name) {
      setFormError('Informe o nome do departamento.')
      return
    }

    if (!/^[A-Za-z]{2,5}$/.test(acronym)) {
      setFormError('A sigla deve ter entre 2 e 5 letras.')
      return
    }

    if (departments.some((department) => department.acronym.toUpperCase() === acronym)) {
      setFormError('Essa sigla já existe na lista.')
      return
    }

    setIsSubmitting(true)
    setFormError('')
    setError('')

    try {
      const response = await fetch('http://localhost:3000/departments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, acronym }),
      })

      if (!response.ok) {
        throw new Error('Não foi possível cadastrar o departamento.')
      }

      const newDepartment = await response.json()
      setDepartments((prev) => [...prev, newDepartment])
      setFormData(initialForm)
    } catch (err) {
      setFormError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="app-shell">
      <section className="panel">
        <h1>Cadastro de Departamentos</h1>

        <form className="department-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="name">Nome do Departamento</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex.: Recursos Humanos"
            />
          </div>

          <div className="field-group">
            <label htmlFor="acronym">Sigla</label>
            <input
              id="acronym"
              name="acronym"
              type="text"
              value={formData.acronym}
              onChange={handleChange}
              placeholder="Ex.: RH"
              maxLength={5}
            />
          </div>

          {formError && <p className="message error-message">{formError}</p>}
          {error && <p className="message error-message">{error}</p>}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Cadastrar Departamento'}
          </button>
        </form>
      </section>

      <section className="panel list-panel">
        <h2>Lista de Departamentos</h2>

        {loading ? (
          <p className="message info-message">Carregando departamentos...</p>
        ) : (
          <ul className="department-list">
            {departments.map((department) => (
              <li key={department.id} className="department-item">
                <span>{department.name}</span>
                <strong>{department.acronym}</strong>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App

function DepartmentForm({ formData, onChange, onSubmit, isSubmitting, formError }) {
  return (
    <form className="department-form" onSubmit={onSubmit}>
      <div className="field-group">
        <label htmlFor="name">Nome do Departamento</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={onChange}
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
          onChange={onChange}
          placeholder="Ex.: RH"
          maxLength={5}
        />
      </div>

      {formError && <p className="message error-message">{formError}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Cadastrar Departamento'}
      </button>
    </form>
  )
}

export default DepartmentForm

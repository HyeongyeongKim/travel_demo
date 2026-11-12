import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import './CreateTripPage.css'

export default function CreateTripPage() {
  const [fields, setFields] = useState({ name: '', country: '', city: '', start: '', end: '' })
  const [notice, setNotice] = useState('')
  const dirty = Object.values(fields).some(Boolean)
  const invalidDates = Boolean(fields.start && fields.end && fields.end < fields.start)
  const ready = Boolean(fields.name.trim() && fields.country.trim() && fields.city.trim() && fields.start && fields.end && !invalidDates)
  // UTC 날짜로 계산해 일광 절약 시간에 따른 하루 길이 차이를 피한다.
  const nights = fields.start && fields.end && !invalidDates
    ? Math.round((Date.parse(fields.end) - Date.parse(fields.start)) / 86400000)
    : null

  useEffect(() => {
    if (!dirty) return
    const warnBeforeLeaving = (event) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', warnBeforeLeaving)
    return () => window.removeEventListener('beforeunload', warnBeforeLeaving)
  }, [dirty])

  function updateField(event) {
    setFields({ ...fields, [event.target.name]: event.target.value })
    setNotice('')
  }

  function submit(event) {
    event.preventDefault()
    if (ready) setNotice('여행 만들기는 서버 연결 후 이용할 수 있어요. 입력한 내용은 이 화면에 유지돼요.')
  }

  return (
    <main className="screen create-screen">
      <header className="signup-header">
        <Link className="back-link" to="/home" aria-label="홈으로 돌아가기" onClick={(event) => {
          if (dirty && !window.confirm('작성 중인 내용을 버리고 홈으로 돌아갈까요?')) event.preventDefault()
        }}>
          <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M19 12H5m0 0 7-7m-7 7 7 7" /></svg>
        </Link>
        <h1>새 여행 만들기</h1>
      </header>

      <form className="create-form" onSubmit={submit}>
        <div className="create-fields">
          <div className="trip-field">
            <label htmlFor="trip-name">여행 이름</label>
            <input id="trip-name" name="name" value={fields.name} onChange={updateField} placeholder="예: 친구들과 오사카" required />
          </div>

          <fieldset className="destination-fields">
            <legend>나라 · 도시</legend>
            <div className="create-two-columns">
              <div className="trip-field">
                <label className="small-field-label" htmlFor="trip-country">나라</label>
                <input id="trip-country" name="country" value={fields.country} onChange={updateField} placeholder="예: 일본" required />
              </div>
              <div className="trip-field">
                <label className="small-field-label" htmlFor="trip-city">도시</label>
                <input id="trip-city" name="city" value={fields.city} onChange={updateField} placeholder="예: 오사카" required />
              </div>
            </div>
          </fieldset>

          <div className="trip-dates">
            <div className="create-two-columns">
              <div className="trip-field">
                <label htmlFor="trip-start">시작일</label>
                <input id="trip-start" name="start" type="date" value={fields.start} onChange={updateField} required />
              </div>
              <div className="trip-field">
                <label htmlFor="trip-end">종료일</label>
                <input id="trip-end" name="end" type="date" value={fields.end} min={fields.start || undefined} onChange={updateField} aria-invalid={invalidDates} aria-describedby={invalidDates ? 'date-error' : undefined} required />
              </div>
            </div>
            {invalidDates && <p className="form-message" id="date-error" role="alert">종료일은 시작일보다 빠를 수 없어요.</p>}
            {nights !== null && <p className="duration-chip" role="status">{nights === 0 ? '당일 여행' : `${nights}박 ${nights + 1}일`}</p>}
          </div>

        </div>

        <footer className="create-bottom">
          {notice && <p className="create-notice" role="status">{notice}</p>}
          {!ready && <p className="create-help">이름, 나라·도시, 시작일·종료일을 입력하면 만들 수 있어요.</p>}
          <button className="primary-button" type="submit" disabled={!ready}>여행 만들기</button>
        </footer>
      </form>
    </main>
  )
}

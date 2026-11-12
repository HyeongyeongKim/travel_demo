import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import './JoinTripPage.css'

export default function JoinTripPage() {
  const [inviteLink, setInviteLink] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (!inviteLink) return
    const warnBeforeLeaving = (event) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', warnBeforeLeaving)
    return () => window.removeEventListener('beforeunload', warnBeforeLeaving)
  }, [inviteLink])

  function handleSubmit(event) {
    event.preventDefault()
    setNotice('')
    try {
      const url = new URL(inviteLink.trim())
      if (url.protocol !== 'https:' && url.protocol !== 'http:') throw new Error('invalid-protocol')
    } catch {
      setError('초대 링크 형식을 확인해 주세요. 받은 링크 전체를 붙여넣어 주세요.')
      return
    }
    setError('')
    // 초대 경로와 토큰 검증은 서버 연결 시 구현한다.
    setNotice('여행 참여는 서버 연결 후 이용할 수 있어요. 아직 링크를 확인하거나 여행에 참여하지 않았어요.')
  }

  return (
    <main className="screen join-screen">
      <header className="signup-header">
        <Link className="back-link" to="/home" aria-label="홈으로 돌아가기" onClick={(event) => {
          if (inviteLink && !window.confirm('입력한 링크를 지우고 홈으로 돌아갈까요?')) event.preventDefault()
        }}>
          <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M19 12H5m0 0 7-7m-7 7 7 7" /></svg>
        </Link>
        <h1>여행 참여하기</h1>
      </header>
      <form className="join-form" onSubmit={handleSubmit} noValidate>
        <div className="join-introduction">
          <div className="invite-symbol" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="m10 13 4-4m-6 5-1 1a3.5 3.5 0 0 0 5 5l4-4a3.5 3.5 0 0 0 0-5m0-1 1-1a3.5 3.5 0 0 0-5-5L8 8a3.5 3.5 0 0 0 0 5" /></svg>
          </div>
          <h2>함께 떠날 준비가 됐나요?</h2>
          <p>친구에게 받은 초대 링크를 붙여넣어 주세요.</p>
        </div>
        <label htmlFor="invite-link">초대 링크</label>
        <input id="invite-link" name="inviteLink" type="url" inputMode="url" autoCapitalize="none" autoCorrect="off" spellCheck={false} placeholder="초대 링크를 붙여넣어 주세요" value={inviteLink} aria-invalid={Boolean(error)} aria-describedby={error ? 'invite-error' : 'invite-help'} onChange={(event) => {
          setInviteLink(event.target.value)
          setError('')
          setNotice('')
        }} />
        {error && <p className="form-message" id="invite-error" role="alert">{error}</p>}
        <p className="join-help" id="invite-help">삭제된 여행의 초대 링크는 사용할 수 없어요.</p>
        <div className="join-bottom">
          {notice && <p className="join-notice" role="status">{notice}</p>}
          <button className="primary-button" type="submit" disabled={!inviteLink.trim()}>참여하기</button>
        </div>
      </form>
    </main>
  )
}

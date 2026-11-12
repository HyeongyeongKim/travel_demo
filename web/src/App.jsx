import { useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router'
import CreateTripPage from './CreateTripPage'
import JoinTripPage from './JoinTripPage'

function IntroPage() {
  return (
    <main className="screen intro-screen">
      <section className="intro-content" aria-labelledby="intro-title">
        <div className="logo-placeholder" aria-label="로고 자리" />
        <h1 id="intro-title">Demo</h1>
        <p>친구와 함께 여행을 계획해요</p>
      </section>
      <section className="intro-action" aria-label="앱 시작">
        <Link className="primary-button" to="/login">앱 시작하기</Link>
      </section>
    </main>
  )
}

function LoginPage() {
  const [notice, setNotice] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email') ?? '').trim()
    const password = String(formData.get('password') ?? '')
    if (!email || !password) {
      setNotice('이메일과 비밀번호를 입력해 주세요.')
      return
    }
    setNotice('로그인 기능은 아직 연결되지 않았어요.')
  }

  return (
    <main className="screen login-screen">
      <section className="login-brand" aria-labelledby="login-title">
        <div className="logo-placeholder" aria-label="로고 자리" />
        <h1 id="login-title">Demo</h1>
        <p>친구와 함께 여행을 계획해요</p>
      </section>
      <section className="login-content">
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="email">이메일</label>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="example@email.com" />

          <label htmlFor="password">비밀번호</label>
          <input id="password" name="password" type="password" autoComplete="current-password" placeholder="비밀번호" />

          <button className="primary-button" type="submit">로그인</button>
        </form>
        {notice && <p className="form-message" role="status" aria-live="polite">{notice}</p>}
        <div className="login-links">
          <button type="button" className="text-link" onClick={() => setNotice('비밀번호 찾기는 준비 중입니다.')}>비밀번호 찾기</button>
          <Link className="text-link accent-link" to="/signup">회원가입</Link>
        </div>
        <div className="social-divider" aria-hidden="true"><span />또는<span /></div>
        <div className="social-actions">
          <button className="social-button" type="button" onClick={() => setNotice('구글 로그인은 아직 연결되지 않았어요.')}>구글로 계속하기</button>
          <button className="social-button" type="button" onClick={() => setNotice('카카오 로그인은 아직 연결되지 않았어요.')}>카카오로 계속하기</button>
        </div>
      </section>
    </main>
  )
}

function SignupPage() {
  const [message, setMessage] = useState('')

  const checkEmail = (event) => {
    const email = String(new FormData(event.currentTarget.form).get('email') ?? '').trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage('이메일 형식을 확인해 주세요.')
      return
    }
    setMessage('이메일 중복 확인은 서버 연결 후 이용할 수 있어요.')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email') ?? '').trim()
    const nickname = String(formData.get('nickname') ?? '').trim()
    const password = String(formData.get('password') ?? '')
    const confirmation = String(formData.get('passwordConfirmation') ?? '')

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) setMessage('이메일 형식을 확인해 주세요.')
    else if (!nickname) setMessage('닉네임을 입력해 주세요.')
    else if (password.length < 8) setMessage('비밀번호를 8자 이상 입력해 주세요.')
    else if (password !== confirmation) setMessage('비밀번호와 비밀번호 확인이 같지 않아요.')
    else if (!formData.get('agreement')) setMessage('이용약관과 개인정보 처리방침에 동의해 주세요.')
    else setMessage('회원가입은 서버 연결 후 이용할 수 있어요.')
  }

  return (
    <main className="screen signup-screen">
      <header className="signup-header">
        <Link className="back-link" to="/login" aria-label="로그인 화면으로 돌아가기">
          <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M19 12H5m0 0 7-7m-7 7 7 7" /></svg>
        </Link>
        <h1>회원가입</h1>
      </header>
      <section className="signup-content" aria-label="계정 만들기">
        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="signup-email">이메일</label>
          <div className="email-check-row">
            <input id="signup-email" name="email" type="email" autoComplete="email" placeholder="example@email.com" />
            <button type="button" className="secondary-button" onClick={checkEmail}>중복 확인</button>
          </div>

          <label htmlFor="nickname">닉네임</label>
          <input id="nickname" name="nickname" autoComplete="nickname" placeholder="다른 사람에게 보일 이름" />

          <label htmlFor="signup-password">비밀번호</label>
          <input id="signup-password" name="password" type="password" autoComplete="new-password" placeholder="8자 이상" />

          <label htmlFor="password-confirmation">비밀번호 확인</label>
          <input id="password-confirmation" name="passwordConfirmation" type="password" autoComplete="new-password" placeholder="비밀번호를 한 번 더 입력" />

          <label className="agreement-row">
            <input name="agreement" type="checkbox" />
            <span>이용약관과 개인정보 처리방침에 동의해요</span>
          </label>
          {message && <p className="form-message" role="status" aria-live="polite">{message}</p>}
          <div className="signup-bottom">
            <button className="primary-button" type="submit">가입하기</button>
            <p>이미 계정이 있나요? <Link to="/login">로그인</Link></p>
          </div>
        </form>
      </section>
    </main>
  )
}

function HomePage() {
  return (
    <main className="screen home-screen">
      <div className="home-content">
        <header className="home-header">
          <div>
            <p>오늘도 여행 준비 중</p>
            <h1>안녕하세요, 서연님</h1>
          </div>
          <button className="profile-avatar" type="button" aria-label="프로필">서</button>
        </header>

        <section className="upcoming-card" aria-labelledby="upcoming-title">
          <div className="upcoming-heading">
            <p id="upcoming-title">다가오는 여행</p>
            <span className="countdown-chip">D-38</span>
          </div>
          <h2>오사카 <span>· 일본</span></h2>
          <p className="trip-date">12.20 – 12.23 <span>· 3박 4일</span></p>
          <div className="upcoming-footer">
            <div className="avatar-stack" aria-label="여행 멤버: 서연, 민지, 준호">
              <span>서</span><span>민</span><span>준</span>
            </div>
            <button type="button" className="continue-button">이어서 계획하기</button>
          </div>
        </section>

        <section className="trips-section" aria-labelledby="my-trips-title">
          <div className="section-heading">
            <h2 id="my-trips-title">내 여행</h2>
            <Link className="join-button" to="/trips/join">여행 참여하기</Link>
          </div>
          <div className="trip-filters" aria-label="여행 필터">
            <button type="button" className="filter-chip active">예정·진행 중</button>
            <button type="button" className="filter-chip">지난 여행</button>
          </div>
          <div className="trip-card-row">
            <Link className="create-trip-card" to="/trips/new">
              <span className="plus-mark" aria-hidden="true">+</span>
              <strong>새 여행 만들기</strong>
            </Link>
            <article className="mini-trip-card">
              <span className="new-label">NEW</span>
              <p>제주</p>
              <h3>친구들과 제주</h3>
              <span className="mini-trip-date">01.10 – 01.12</span>
              <span className="trip-status">계획 전</span>
            </article>
            <article className="mini-trip-card">
              <p>부산</p>
              <h3>부산 먹방 투어</h3>
              <span className="mini-trip-date">02.03 – 02.04</span>
              <span className="trip-status">계획 전</span>
            </article>
          </div>
        </section>

        <section className="friends-section" aria-labelledby="friends-title">
          <div className="section-heading">
            <h2 id="friends-title">친구들의 새 글</h2>
            <button type="button" className="more-link">더 보기</button>
          </div>
          <article className="friend-post-card">
            <div className="post-thumbnail" aria-hidden="true"><span /></div>
            <div>
              <h3>도쿄에서 꼭 가야 할 카페 5곳</h3>
              <p>민지 · 도쿄 · 11.08</p>
            </div>
          </article>
        </section>
      </div>

      <nav className="bottom-nav" aria-label="주요 메뉴">
        <button type="button" className="nav-item selected" aria-current="page">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3.5 10 8.5-7 8.5 7v10a1 1 0 0 1-1 1h-5.2v-6.5H9.7V21H4.5a1 1 0 0 1-1-1z" /></svg><span>홈</span>
        </button>
        <button type="button" className="nav-item">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7.5h16v13H4zM8 7.5V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2.5M4 12h16m-10 0v2h4v-2" /></svg><span>내 여행</span>
        </button>
        <button type="button" className="nav-item">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="m15.8 8.2-2.3 5.3-5.3 2.3 2.3-5.3z" /></svg><span>탐험</span>
        </button>
        <button type="button" className="nav-item">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2zM9 3v16m6-14v16" /></svg><span>지난 여정</span>
        </button>
        <button type="button" className="nav-item">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path d="M4.5 21a7.5 7.5 0 0 1 15 0" /></svg><span>프로필</span>
        </button>
      </nav>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/trips/new" element={<CreateTripPage />} />
          <Route path="/trips/join" element={<JoinTripPage />} />
          <Route path="*" element={<IntroPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

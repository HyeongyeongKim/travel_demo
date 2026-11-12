# Demo · 여행 플랜

친구들과 함께 여행을 계획하는 모바일 우선 웹 서비스입니다. React와 JavaScript를 배우면서 실제 사용할 수 있는 서비스를 만드는 프로젝트입니다.

## 현재 상태

화면을 먼저 만드는 단계입니다. 로그인, 회원가입, 여행 생성·참여는 아직 서버와 연결되지 않았습니다. 홈의 여행과 사용자 정보는 예시 데이터입니다.

| 주소 | 화면 |
| --- | --- |
| `/` | 인트로 |
| `/login` | 로그인 |
| `/signup` | 회원가입 |
| `/home` | 홈 |
| `/trips/new` | 새 여행 만들기 |
| `/trips/join` | 여행 참여하기 |

홈에서 여행 만들기·참여하기 화면으로 이동할 수 있습니다. 로그인은 연결 전이므로 홈은 `/home` 주소로 직접 확인합니다.

## 실행

Node.js와 npm이 설치된 환경에서 실행합니다.

```powershell
cd web
npm.cmd install
npm.cmd run dev
```

터미널에 표시되는 주소를 브라우저에서 엽니다. 기본 주소는 `http://localhost:5173`입니다.

서버는 별도 터미널에서 실행합니다.

```powershell
cd server
npm.cmd install
npm.cmd run dev
```

서버는 현재 `http://127.0.0.1:3000/health` 상태 확인 경로만 제공합니다.

웹 빌드 확인: `web` 폴더에서 `npm.cmd run build`.

## 기술과 문서

- 화면: React, JavaScript, Vite, React Router, 직접 작성한 CSS
- 서버: Node.js, Fastify
- 이후 연결 예정: MySQL, mysql2와 SQL, 서버 세션과 쿠키
- [날짜별 작업 기록](docs/작업기록.md)
- [기능·개발 기획](여행플랜_기획.md)
- [디자인 참고 PDF](여행플랜_디자인정리.pdf)
- [작업 규칙](AGENTS.md)

`web/src/`은 화면과 스타일, `server/src/`는 서버 코드를 담습니다. 기존 `streamlit_cloud.py`와 `requirements.txt`는 이전 작업이며 현재 React 웹 실행에는 사용하지 않습니다.

## 다음 작업

여행 상세의 일정 화면을 만듭니다. 여행 이름·기간·멤버, 날짜 선택, 일정 목록부터 구성한 뒤 서버·데이터베이스 연결로 진행합니다.

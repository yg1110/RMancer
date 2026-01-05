# RMancer Frontend

Next.js 16 기반 프론트엔드 애플리케이션

## 📋 목차

- 개요
- 기술 스택
- 프로젝트 구조
- 주요 페이지
- 시작하기
- 환경 변수 설정
- 개발 가이드

## 📖 개요

RMancer Frontend는 사용자에게 직관적이고 반응형인 웹 인터페이스를 제공하는 Next.js 애플리케이션입니다. 사용자는 목표 설정, 인바디 기록, 1RM 관리, 운동 루틴 조회 등을 할 수 있습니다.

## 🛠 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Library**: React 19
- **Authentication**: Next Auth 5
- **Styling**: Tailwind CSS 4
- **State Management**: TanStack Query
- **Package Manager**: pnpm
- **API Client**: OpenAPI TypeScript Client

## 📁 프로젝트 구조

```
frontend/
├── app/
│   ├── (auth)/            # 인증 관련 페이지
│   │   ├── signin/        # 로그인 페이지
│   │   └── signup/        # 회원가입 페이지
│   ├── (protected)/       # 인증 필요 페이지
│   │   ├── dashboard/     # 대시보드 페이지
│   │   ├── selection/     # 프로그램 선택 페이지
│   │   └── recommendation/ # 추천 프로그램 페이지
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 홈 페이지
├── components/            # 공통 컴포넌트
├── config/                # 설정 파일
│   ├── openapi-runtime.ts # OpenAPI 런타임 설정
│   └── providers.tsx      # Provider 설정
├── generated/             # OpenAPI 생성 파일
│   └── openapi-client/    # API 클라이언트
├── lib/                   # 유틸리티
│   ├── api.ts             # API 클라이언트 설정
│   └── password-utils.ts  # 비밀번호 유틸리티
├── hooks/                 # 커스텀 훅
├── shared/                # 공유 리소스
│   ├── enums/             # 열거형
│   ├── icons/             # 아이콘
│   └── utils/             # 유틸리티
├── types/                 # 타입 정의
└── public/                # 정적 파일
```

## 🎨 주요 페이지

### 1. 로그인 페이지 (Sign In)

사용자 로그인을 위한 페이지입니다.

![로그인 페이지](../images/signin.png)

_로그인 페이지 화면_

**주요 기능:**

- 이메일/비밀번호 로그인
- 회원가입 페이지로 이동
- 에러 메시지 표시

### 2. 회원가입 페이지 (Sign Up)

신규 사용자 회원가입을 위한 페이지입니다.

![회원가입 페이지](../images/signup.png)

_회원가입 페이지 화면_

**주요 기능:**

- 이메일/비밀번호 회원가입
- 비밀번호 유효성 검증
- 로그인 페이지로 이동

### 3. 대시보드 (Dashboard)

사용자의 최신 정보를 한눈에 확인할 수 있는 메인 페이지입니다.

![대시보드 페이지1](../images/dashboard-step1.png)

![대시보드 페이지2](../images/dashboard-step2.png)

![대시보드 페이지3](../images/dashboard-step3.png)

_대시보드 페이지 화면_

**주요 기능:**

- 목표 설정 (목표 유형, 경험 수준, 주당 운동 빈도)
- 최신 인바디 정보 조회
- 최신 1RM 기록 조회
- 운동 프로그램 추천으로 이동

**구성 요소:**

- Step 1: 목표 선택 (근육 증가 / 체중 감량)
- Step 2: 경험 수준 선택 (초보자 / 중급자 / 고급자)
- Step 3: 주당 운동 빈도 설정

### 4. 프로그램 선택 페이지 (Selection)

추천 프로그램을 선택하는 페이지입니다.

![프로그램 선택 페이지](../images/selection.png)

_프로그램 선택 페이지 화면_

**주요 기능:**

- 추천 프로그램 목록 조회
- 프로그램 선택 및 상세 정보 확인
- 추천 프로그램 페이지로 이동

### 5. 추천 프로그램 페이지 (Recommendation)

선택한 운동 프로그램의 상세 내용을 확인하고 관리하는 페이지입니다.

![추천 프로그램 페이지1](../images/recommendation1.png)

![추천 프로그램 페이지2](../images/recommendation2.png)

![추천 프로그램 페이지3](../images/recommendation3.png)

_추천 프로그램 페이지 화면_

**주요 기능:**

- 루틴 헤더 정보 표시
- 날짜별 운동 루틴 조회
- 운동 카드 상세 정보 표시
- 운동 완료 상태 관리
- 성장 요약 정보 표시

**구성 요소:**

- 루틴 헤더: 제목, 목표, 경험 수준, 주당 빈도
- 날짜 선택기: 특정 날짜의 운동 루틴 조회
- 운동 카드: 운동 종목, 세트, 횟수, 중량 정보
- 완료 버튼: 운동 완료 처리
- 성장 요약: 운동 진행 상황 요약

## 🚀 시작하기

### 필수 요구사항

- Node.js 18 이상
- pnpm
- PostgreSQL 16 (Next Auth 세션 저장용)

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 환경 변수 설정
vi .env
# .env 파일을 편집하여 API URL 및 인증 설정

# OpenAPI 클라이언트 생성 (백엔드 API 변경 시)
pnpm openapi

# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build
pnpm start
```

프론트엔드 서버는 기본적으로 `http://localhost:3000`에서 실행됩니다.

## ⚙️ 환경 변수 설정

`.env` 파일에 다음 환경 변수를 설정하세요:

```env
AUTH_SECRET="IMG2LX4Fs7dQZmhiA6D78h7JtvzFRmjjSPQFyHJ9uVQ="
DATABASE_URL="postgresql://rmancer:rmancer@localhost:5432/rmancer"
API_URL="http://localhost:8000"
```

## 🔨 개발 가이드

### OpenAPI 클라이언트 생성

백엔드 API가 변경되었을 때 OpenAPI 클라이언트를 재생성해야 합니다:

```bash
pnpm openapi
```

이 명령은 `openapi-ts.config.ts` 설정을 기반으로 API 클라이언트를 생성합니다.

### 컴포넌트 구조

- `app/` 디렉토리는 Next.js App Router 구조를 따릅니다
- 공통 컴포넌트는 `components/` 디렉토리에 위치합니다
- 각 페이지별 컴포넌트는 해당 페이지 디렉토리 내에 `components/` 폴더로 구성됩니다

### 스타일링

- Tailwind CSS 4를 사용합니다
- shadcn/ui 컴포넌트 라이브러리를 사용합니다
- 반응형 디자인을 지원합니다

### 상태 관리

- **서버 상태**: TanStack Query를 사용하여 API 데이터를 관리합니다

### Docker 실행

```bash
# Docker Compose로 실행
docker-compose up -d

# 로그 확인
docker-compose logs -f

# 중지
docker-compose down
```

## 📝 주요 기능

### 인증

- Next Auth를 사용한 세션 기반 인증
- JWT 토큰을 통한 백엔드 API 인증
- 보호된 라우트 자동 처리

### 데이터 페칭

- TanStack Query를 사용한 서버 상태 관리
- 자동 캐싱 및 재검증
- 로딩 및 에러 상태 처리

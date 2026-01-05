# RMancer

AI 기반 개인 맞춤 운동 프로그램 추천 서비스

RMancer는 인바디 분석과 운동 목표를 바탕으로 사용자에게 최적화된 운동 루틴을 추천하는 헬스케어 애플리케이션입니다.

## 📋 목차

- [기술 스택](#기술-스택)
- [주요 기능](#주요-기능)
- [프로젝트 구조](#프로젝트-구조)
- [시작하기](#시작하기)
- [환경 변수 설정](#환경-변수-설정)
- [데이터베이스 설정](#데이터베이스-설정)
- [API 문서](#api-문서)
- [Docker를 이용한 실행](#docker를-이용한-실행)

## 🛠 기술 스택

### Backend

- **Framework**: NestJS 11
- **Language**: TypeScript
- **Database**: PostgreSQL 16
- **ORM**: Prisma 6
- **Authentication**: JWT (Passport)
- **API Documentation**: Swagger
- **Package Manager**: pnpm

### Frontend

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Library**: React 19
- **Authentication**: Next Auth 5
- **Styling**: Tailwind CSS 4
- **State Management**: Jotai, TanStack Query
- **Form Management**: React Hook Form, Zod
- **Charts**: Recharts
- **Package Manager**: pnpm

## ✨ 주요 기능

### 1. 사용자 인증

- 이메일/비밀번호 기반 회원가입 및 로그인
- JWT 토큰 기반 인증
- 세션 관리

### 2. 목표 설정

- 운동 목표 선택 (근육 증가 / 체중 감량)
- 경험 수준 선택 (초보자 / 중급자 / 고급자)
- 주당 운동 빈도 설정

### 3. 인바디 기록 관리

- 신장, 체중, 골격근량, 체지방량 등 측정 데이터 기록
- 측정 일시별 데이터 조회
- 인바디 변화 추이 확인

### 4. 1RM 기록 관리

- 주요 운동 1RM 기록 관리
  - 벤치프레스 (Bench Press)
  - 백스쿼트 (Back Squat)
  - 데드리프트 (Deadlift)
  - 오버헤드프레스 (Overhead Press)
- 운동별 최신 1RM 조회

### 5. 루틴 관리

- 개인 맞춤 운동 루틴 생성 및 관리
- 주차별/일별 운동 계획 수립
- 운동 종목, 세트, 횟수, 중량 설정
- 프리셋 루틴 제공

### 6. 대시보드

- 사용자의 최신 목표, 인바디, 1RM 정보 통합 조회
- 목표 설정 및 수정
- 운동 프로그램 추천으로 연결

### 7. 입력 데이터 기반 프로그램 추천

- 사용자의 목표, 경험 수준, 인바디, 1RM 데이터를 종합 분석
- 개인 맞춤 운동 프로그램 추천

## 📁 프로젝트 구조

```
RMancer/
├── backend/                 # NestJS 백엔드 애플리케이션
│   ├── src/
│   │   ├── auth/           # 인증 모듈
│   │   ├── dashboard/      # 대시보드 모듈
│   │   ├── goal/           # 목표 설정 모듈
│   │   ├── inbody/         # 인바디 기록 모듈
│   │   ├── one-rm/         # 1RM 기록 모듈
│   │   ├── routine/        # 루틴 관리 모듈
│   │   ├── preset-routine/ # 프리셋 루틴 모듈
│   │   ├── prisma/         # Prisma 설정
│   │   └── main.ts         # 애플리케이션 진입점
│   ├── prisma/
│   │   └── schema.prisma   # 데이터베이스 스키마
│   └── docker-compose.yml  # Docker Compose 설정
│
├── frontend/               # Next.js 프론트엔드 애플리케이션
│   ├── app/
│   │   ├── (auth)/        # 인증 관련 페이지
│   │   │   └── signin/    # 로그인 페이지
│   │   ├── (protected)/   # 인증 필요 페이지
│   │   │   ├── dashboard/ # 대시보드
│   │   │   ├── selection/ # 프로그램 선택
│   │   │   └── recommendation/ # 추천 프로그램
│   │   └── layout.tsx     # 루트 레이아웃
│   ├── config/            # 설정 파일
│   ├── lib/               # 유틸리티 및 API 클라이언트
│   ├── components/        # 공통 컴포넌트
│   ├── generated/         # OpenAPI 생성 파일
│   └── docker-compose.yml # Docker Compose 설정
│
└── README.md
```

## 🚀 시작하기

### 필수 요구사항

- Node.js 18 이상
- pnpm
- PostgreSQL 16
- Docker 및 Docker Compose (선택사항)

### 백엔드 실행

```bash
cd backend

# 의존성 설치
pnpm install

# 환경 변수 설정 (.env 파일 생성)
cp .env.example .env
# .env 파일을 편집하여 데이터베이스 연결 정보 설정

# 데이터베이스 마이그레이션
pnpm prisma migrate dev

# Prisma Client 생성
pnpm prisma generate

# 개발 서버 실행
pnpm start:dev

# 프로덕션 빌드
pnpm build
pnpm start:prod
```

백엔드 서버는 기본적으로 `http://localhost:8000`에서 실행됩니다.

### 프론트엔드 실행

```bash
cd frontend

# 의존성 설치
pnpm install

# 환경 변수 설정 (.env 파일 생성)
cp .env.example .env
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

# 데이터베이스 (Next Auth용)

DATABASE_URL="postgresql://user:password@localhost:5432/rmancer?schema=public"

````

## 🗄️ 데이터베이스 설정

### Prisma 마이그레이션

```bash
cd backend

# 마이그레이션 생성
pnpm prisma migrate dev --name migration_name

# 마이그레이션 적용 (프로덕션)
pnpm prisma migrate deploy

# Prisma Studio 실행 (데이터베이스 GUI)
pnpm prisma studio
````

## 📚 API 문서

백엔드 서버 실행 후 Swagger API 문서를 확인할 수 있습니다:

```
http://localhost:8000/docs
```

API 문서에서 모든 엔드포인트와 요청/응답 스키마를 확인하고 테스트할 수 있습니다.

## 🐳 Docker를 이용한 실행

### 백엔드 실행

```bash
cd backend

# .env 파일 생성 및 설정
cp .env.example .env

# Docker Compose로 실행
docker-compose up -d

# 로그 확인
docker-compose logs -f

# 중지
docker-compose down
```

### 프론트엔드 실행

```bash
cd frontend

# .env 파일 생성 및 설정
cp .env.example .env

# Docker Compose로 실행
docker-compose up -d

# 로그 확인
docker-compose logs -f

# 중지
docker-compose down
```

# RMancer

AI 기반 개인 맞춤 운동 프로그램 추천 서비스

RMancer는 인바디 분석과 운동 목표를 바탕으로 사용자에게 최적화된 운동 루틴을 추천하는 헬스케어 웹 애플리케이션입니다. 사용자의 개인 정보, 목표, 경험 수준, 인바디 데이터, 1RM 기록을 종합 분석하여 맞춤형 운동 프로그램을 제공합니다.

## 📋 목차

- 프로젝트 소개
- 기술 스
- 주요 기술적 특징
- 아키텍처
- 주요 기능
- 프로젝트 구조
- 시작하기
- 상세 문서

## 📖 프로젝트 소개

RMancer는 헬스케어 분야의 풀스택 웹 애플리케이션으로, 사용자가 효과적이고 체계적으로 운동을 할 수 있도록 돕는 서비스입니다.

### 주요 특징

- **개인 맞춤화**: 사용자의 목표, 경험 수준, 신체 데이터를 기반으로 최적의 운동 프로그램 제공
- **데이터 기반 추천**: 인바디 분석과 1RM 기록을 통한 과학적인 운동 계획 수립
- **편리한 관리**: 웹 기반 인터페이스로 언제 어디서나 운동 기록과 진행 상황 확인
- **체계적인 루틴**: 주차별, 일별로 구분된 상세한 운동 계획 제공

## 🛠 기술 스택

### Backend

- **Framework**: NestJS 11
- **Database**: PostgreSQL 16
- **ORM**: Prisma 6
- **Authentication**: JWT (Passport)
- **API Documentation**: Swagger/OpenAPI
- **Validation**: class-validator, class-transformer
- **Package Manager**: pnpm

### Frontend

- **Framework**: Next.js 16 (App Router)
- **Authentication**: Next Auth 5
- **Styling**: Tailwind CSS 4
- **State Management**: TanStack Query
- **API Client**: OpenAPI TypeScript Client
- **Package Manager**: pnpm

### 백엔드 아키텍처

- **모듈화 설계**: NestJS의 모듈 시스템을 활용한 관심사 분리 및 재사용 가능한 구조
- **의존성 주입 (DI)**: IoC 컨테이너를 통한 느슨한 결합 설계
- **레이어드 아키텍처**: Controller → Service → Repository 패턴으로 명확한 책임 분리
- **RESTful API 설계**: 표준 REST 원칙에 따른 직관적인 API 엔드포인트 설계

### 인증 및 보안

- **JWT 기반 인증**: Passport 전략을 활용한 토큰 기반 인증 시스템
- **가드 패턴**: NestJS Guard를 통한 라우트 레벨 인증/인가 처리
- **비밀번호 암호화**: bcrypt를 활용한 단방향 해싱
- **세션 관리**: Next Auth를 통한 서버 사이드 세션 관리

### 데이터 검증

- **DTO 패턴**: Data Transfer Object를 통한 요청/응답 데이터 구조화
- **런타임 검증**: class-validator를 활용한 입력 데이터 유효성 검증
- **타입 변환**: class-transformer를 통한 데이터 직렬화/역직렬화

### API 문서화

- **Swagger/OpenAPI**: 자동 생성되는 API 문서를 통한 개발자 경험 향상
- **타입 안전한 클라이언트**: OpenAPI 스키마 기반 자동 생성 TypeScript 클라이언트
- **인터랙티브 문서**: Swagger UI를 통한 API 테스트 가능한 문서 제공

### 프론트엔드 아키텍처

- **서버 사이드 렌더링**: Next.js App Router를 활용한 SSR 및 SSG
- **타입 안정성**: TypeScript를 통한 컴파일 타임 타입 체크
- **상태 관리**: TanStack Query를 활용한 서버 상태 관리 및 캐싱
- **컴포넌트 재사용성**: React 컴포넌트 기반 UI 구성

### 개발 경험

- **타입 안전성**: 백엔드와 프론트엔드 전반에 걸친 TypeScript 사용
- **코드 생성**: OpenAPI 스키마로부터 자동 생성되는 타입 안전한 API 클라이언트

## 🏗 아키텍처

프로젝트는 모놀리식 아키텍처를 따르며, 백엔드와 프론트엔드가 분리되어 있습니다:

- **Backend**: NestJS 기반 RESTful API 서버
- **Frontend**: Next.js 기반 서버사이드 렌더링 웹 애플리케이션
- **Database**: PostgreSQL 관계형 데이터베이스

```
┌─────────────┐         ┌─────────────┐
│   Client    │────────▶│   Frontend  │
│  (Browser)  │◀────────│  (Next.js)  │
└─────────────┘         └─────────────┘
                               │
                               │ HTTP/REST
                               │
                               ▼
                        ┌─────────────┐
                        │   Backend   │
                        │  (NestJS)   │
                        └─────────────┘
                               │
                               │ Prisma ORM
                               │
                               ▼
                        ┌─────────────┐
                        │  PostgreSQL │
                        │  Database   │
                        └─────────────┘
```

## ✨ 주요 기능

### 1. 사용자 인증

- 이메일/비밀번호 기반 회원가입 및 로그인
- JWT 토큰 기반 인증
- Next Auth를 활용한 세션 관리

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
- 무게와 반복 횟수를 통한 1RM 자동 계산

### 5. 루틴 관리

- 개인 맞춤 운동 루틴 생성 및 관리
- 주차별/일별 운동 계획 수립
- 운동 종목, 세트, 횟수, 중량 설정
- 프리셋 루틴 제공

### 6. 대시보드

- 사용자의 최신 목표, 인바디, 1RM 정보 통합 조회
- 목표 설정 및 수정
- 운동 프로그램 추천으로 연결

### 7. 프로그램 추천

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
│   │   ├── (protected)/   # 인증 필요 페이지
│   │   └── layout.tsx     # 루트 레이아웃
│   ├── config/            # 설정 파일
│   ├── lib/               # 유틸리티 및 API 클라이언트
│   ├── components/        # 공통 컴포넌트
│   └── generated/         # OpenAPI 생성 파일
│
└── README.md
```

각 폴더별 상세한 설명은 다음 문서를 참고하세요:

- [Backend README](./backend/README.md) - 백엔드 상세 문서
- [Frontend README](./frontend/README.md) - 프론트엔드 상세 문서

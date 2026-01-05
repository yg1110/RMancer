# RMancer Backend

NestJS 기반 백엔드 API 서버

## 📋 목차

- 개요
- 기술 스택
- 프로젝트 구조
- 주요 모듈
- 시작하기
- 환경 변수 설정
- 데이터베이스-설정
- API 문서
- 개발 가이드

## 📖 개요

RMancer Backend는 운동 프로그램 추천 서비스를 위한 RESTful API 서버입니다. 사용자의 인바디 데이터, 운동 목표, 1RM 기록 등을 관리하고 개인 맞춤 운동 루틴을 제공하는 API를 제공합니다.

## 🛠 기술 스택

- **Framework**: NestJS 11
- **Language**: TypeScript
- **Database**: PostgreSQL 16
- **ORM**: Prisma 6
- **Authentication**: JWT (Passport)
- **API Documentation**: Swagger/OpenAPI
- **Package Manager**: pnpm
- **Validation**: class-validator, class-transformer

## 📁 프로젝트 구조

```
backend/
├── src/
│   ├── auth/              # 인증 모듈
│   │   ├── guards/        # JWT 가드
│   │   ├── strategies/    # Passport 전략
│   │   └── auth.module.ts
│   ├── dashboard/         # 대시보드 모듈
│   ├── goal/              # 목표 설정 모듈
│   ├── inbody/            # 인바디 기록 모듈
│   ├── one-rm/            # 1RM 기록 모듈
│   ├── routine/           # 루틴 관리 모듈
│   ├── preset-routine/    # 프리셋 루틴 모듈
│   ├── health/            # 헬스 체크 모듈
│   ├── prisma/            # Prisma 모듈
│   ├── common/            # 공통 상수
│   └── main.ts            # 애플리케이션 진입점
├── prisma/
│   └── schema.prisma      # 데이터베이스 스키마
├── dist/                  # 빌드 출력
└── docker-compose.yml     # Docker Compose 설정
```

## 🔧 주요 모듈

### 1. Auth (인증)

- JWT 기반 인증
- Access Token 전략
- 인증 가드

### 2. Dashboard (대시보드)

- 사용자 최신 데이터 통합 조회
- 목표, 인바디, 1RM 정보 제공
- **Prisma 트랜잭션 기반 프로필 일괄 생성**: 목표 프로필, 인바디 기록, 1RM 기록을 단일 트랜잭션으로 안전하게 생성
  - 원자성 보장: 모든 데이터가 성공적으로 저장되거나 모두 롤백
  - 데이터 일관성: 부분 실패로 인한 데이터 불일치 방지
  - 자동 롤백: 작업 중 하나라도 실패하면 모든 변경사항 자동 롤백

### 3. Goal (목표 설정)

- 운동 목표 관리 (근육 증가 / 체중 감량)
- 경험 수준 관리 (초보자 / 중급자 / 고급자)
- 주당 운동 빈도 설정

### 4. Inbody (인바디 기록)

- 인바디 측정 데이터 CRUD
- 측정 일시별 조회
- 사용자별 인바디 기록 관리

### 5. One-RM (1RM 기록)

- 주요 운동 1RM 기록 관리
  - 벤치프레스 (Bench Press)
  - 백스쿼트 (Back Squat)
  - 데드리프트 (Deadlift)
  - 오버헤드프레스 (Overhead Press)
- 1RM 계산 기능
- 운동별 최신 기록 조회

### 6. Routine (루틴 관리)

- 개인 맞춤 운동 루틴 생성 및 관리
- 주차별/일별 운동 계획 수립
- 운동 종목, 세트, 횟수, 중량 설정

### 7. Preset-Routine (프리셋 루틴)

- 미리 정의된 운동 루틴 제공
- 프리셋 루틴 조회

### 8. Health (헬스 체크)

- 서버 상태 확인
- API 가용성 확인

## 🚀 시작하기

### 필수 요구사항

- Node.js 18 이상
- pnpm
- PostgreSQL 16

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 환경 변수 설정
vi .env
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

서버는 기본적으로 `http://localhost:8000`에서 실행됩니다.

## ⚙️ 환경 변수 설정

`.env` 파일에 다음 환경 변수를 설정하세요:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/rmancer?schema=public"
PORT=8000
AUTH_SECRET="your secret key"
```

## 🗄️ 데이터베이스 설정

### Prisma 마이그레이션

```bash
# 마이그레이션 생성
pnpm prisma migrate dev --name migration_name

# 마이그레이션 적용 (프로덕션)
pnpm prisma migrate deploy

# Prisma Studio 실행 (데이터베이스 GUI)
pnpm prisma studio
```

### 스키마 변경 시

```bash
# 스키마 변경 후
pnpm prisma migrate dev

# Prisma Client 재생성
pnpm prisma generate
```

## 📚 API 문서

백엔드 서버 실행 후 Swagger API 문서를 확인할 수 있습니다:

```
http://localhost:8000/docs
```

API 문서에서 모든 엔드포인트와 요청/응답 스키마를 확인하고 테스트할 수 있습니다.

### Swagger API 문서

![Swagger API 문서](../images/swagger-api-docs.png)

_Swagger API 문서 화면_

## 🔨 개발 가이드

### Docker 실행

```bash
# Docker Compose로 실행
docker-compose up -d

# 로그 확인
docker-compose logs -f

# 중지
docker-compose down
```

## 📝 API 엔드포인트 개요

### 인증

- `POST /auth/signup` - 회원가입
- `POST /auth/signin` - 로그인

### 대시보드

- `GET /dashboard` - 대시보드 데이터 조회
- `POST /dashboard/profile-with-records` - 프로필 및 기록 일괄 생성 (트랜잭션)

### 목표 설정

- `GET /goal` - 목표 조회
- `POST /goal` - 목표 생성
- `PATCH /goal` - 목표 수정

### 인바디 기록

- `GET /inbody` - 인바디 기록 목록 조회
- `POST /inbody` - 인바디 기록 생성
- `GET /inbody/:id` - 인바디 기록 상세 조회
- `PATCH /inbody/:id` - 인바디 기록 수정
- `DELETE /inbody/:id` - 인바디 기록 삭제

### 1RM 기록

- `GET /one-rm` - 1RM 기록 요약 조회
- `POST /one-rm` - 1RM 기록 생성
- `POST /one-rm/calculate` - 1RM 계산 및 업데이트
- `GET /one-rm/:id` - 1RM 기록 상세 조회
- `PATCH /one-rm/:id` - 1RM 기록 수정
- `DELETE /one-rm/:id` - 1RM 기록 삭제

### 루틴

- `GET /routines` - 루틴 목록 조회
- `POST /routines` - 루틴 생성
- `GET /routines/:id` - 루틴 상세 조회
- `PATCH /routines/:id` - 루틴 수정
- `DELETE /routines/:id` - 루틴 삭제

### 프리셋 루틴

- `GET /preset-routines` - 프리셋 루틴 목록 조회
- `GET /preset-routines/:id` - 프리셋 루틴 상세 조회

### 헬스 체크

- `GET /health` - 서버 상태 확인

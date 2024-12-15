# 빌드 단계
FROM node:lts-alpine AS build-stage
WORKDIR /app

# package.json과 package-lock.json을 복사하여 의존성 설치
COPY package*.json ./
RUN npm install

# 소스 코드 복사
COPY . .

# React 앱 빌드
RUN npm run build

# 프로덕션 이미지 생성 단계
FROM nginx:alpine AS production-stage

# 빌드된 파일을 Nginx의 디폴트 웹서버 디렉토리에 복사
COPY --from=build-stage /app/build /usr/share/nginx/html

# 포트 80을 열어줌
EXPOSE 80

# Nginx 서버 실행
CMD ["nginx", "-g", "daemon off;"]

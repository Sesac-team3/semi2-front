FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN cp -r build /app
EXPOSE 80

# 빌드된 React 애플리케이션 실행
CMD ["npx", "serve", "build"]

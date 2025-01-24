# Sử dụng image Node.js làm base image
FROM node:14-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependency
RUN npm install

# Sao chép toàn bộ code vào container
COPY . .

# Mở port để truy cập server
EXPOSE 3000

# Chạy server
CMD ["node", "index.js"]
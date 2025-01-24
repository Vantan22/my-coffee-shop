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

# Build ứng dụng ReactJS
RUN npm run build

# Mở port để truy cập ứng dụng
EXPOSE 2210

# Chạy ứng dụng
CMD ["npm", "dev"]
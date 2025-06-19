# Stage 1: Build the React assets
FROM node:20-alpine AS frontend_builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build # Or npm run prod, depending on your setup

# Stage 2: Build the Laravel application
FROM php:8.3-fpm-alpine AS laravel_app

WORKDIR /var/www/html

# Install PHP extensions
RUN apk add --no-cache \
    nginx \
    supervisor \
    libpq \
    libzip-dev \
    oniguruma-dev \
    postgresql-dev \
    && docker-php-ext-install pdo_pgsql zip bcmath opcache

# Copy composer.lock and composer.json for dependency installation
COPY composer.json composer.lock ./

# Install Composer dependencies
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --optimize-autoloader

# Copy the Laravel application code
COPY . .

# Copy the compiled frontend assets from the frontend_builder stage
COPY --from=frontend_builder /app/public/build /var/www/html/public/build # Adjust path based on your Vite output

# Configure Nginx (optional, if Nginx is handled in a separate container, omit this)
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Expose port 9000 for PHP-FPM
EXPOSE 9000

CMD ["php-fpm"]
.DEFAULT_GOAL := install

.PHONY: install install-dev test lint format run clean build

# Install dependencies
install:
	npm install

# Install dependencies (including dev packages)
install-dev:
	npm install

# Run tests (placeholder - add when you have tests)
test:
	@echo "No tests configured yet"
	@echo "Run: npm run test when you add testing"

# Lint code
lint:
	npm run lint
	npm run format:check

# Format code
format:
	npm run format

# Run Next.js development server
run:
	npm run dev

# Build for production
build:
	npm run build

# Clean up cache and build files
clean:
	rm -rf .next
	rm -rf node_modules
	rm -f package-lock.json
	@echo "Run 'make install' to reinstall dependencies" 
#!/bin/bash

# ============================================
# PennyWise Environment Setup Script
# ============================================
# This script helps you set up different environments

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_header() {
    echo -e "\n${BLUE}▶ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Main menu
show_menu() {
    echo -e "\n${BLUE}======================================${NC}"
    echo -e "${BLUE}PennyWise Environment Setup${NC}"
    echo -e "${BLUE}======================================${NC}"
    echo "1) Setup Development Environment"
    echo "2) Setup Staging Environment"
    echo "3) Setup Production Environment"
    echo "4) Generate NextAuth Secret"
    echo "5) Test Database Connection"
    echo "6) Run Database Migrations"
    echo "7) View Environment Variables"
    echo "8) Exit"
    echo -e "${BLUE}======================================${NC}"
    read -p "Select option (1-8): " choice
}

# Setup development
setup_dev() {
    print_header "Setting Up Development Environment"
    
    # Check if .env.local exists
    if [ -f ".env.local" ]; then
        print_warning ".env.local already exists"
        read -p "Overwrite? (y/n): " overwrite
        if [ "$overwrite" != "y" ]; then
            return
        fi
    fi
    
    # Copy template
    cp .env.example .env.local
    print_success "Created .env.local"
    
    # Generate secret
    secret=$(openssl rand -base64 32)
    
    # Update .env.local
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/your-secret-key-here-change-in-production/$secret/" .env.local
    else
        # Linux
        sed -i "s/your-secret-key-here-change-in-production/$secret/" .env.local
    fi
    
    print_success "Generated NEXTAUTH_SECRET"
    print_warning "Remember to update DATABASE_URL in .env.local"
    
    echo -e "\n${BLUE}Example DATABASE_URL values:${NC}"
    echo "Local PostgreSQL:  postgresql://postgres:password@localhost:5432/pennywise_dev"
    echo "Docker:            postgresql://postgres:postgres@localhost:5432/pennywise_dev"
    echo "Supabase:          postgresql://user:password@db.supabase.co:5432/postgres"
    echo "Neon:              postgresql://user:password@ep-xxx.neon.tech/neondb"
}

# Setup staging
setup_staging() {
    print_header "Setting Up Staging Environment"
    
    if [ -f ".env.staging" ]; then
        print_warning ".env.staging already exists"
        read -p "Overwrite? (y/n): " overwrite
        if [ "$overwrite" != "y" ]; then
            return
        fi
    fi
    
    cp .env.example .env.staging
    print_success "Created .env.staging"
    print_warning "Edit .env.staging with your staging database and settings"
}

# Setup production
setup_prod() {
    print_header "Setting Up Production Environment"
    
    if [ -f ".env.production" ]; then
        print_warning ".env.production already exists"
        read -p "Overwrite? (y/n): " overwrite
        if [ "$overwrite" != "y" ]; then
            return
        fi
    fi
    
    cp .env.example .env.production
    print_success "Created .env.production"
    print_error "⚠ DO NOT commit .env.production to git!"
    print_warning "Use secrets manager in production (Vercel, AWS Secrets Manager, etc.)"
}

# Generate secret
generate_secret() {
    print_header "Generating NextAuth Secret"
    
    secret=$(openssl rand -base64 32)
    echo -e "\n${GREEN}Generated Secret:${NC}"
    echo "$secret"
    echo -e "\n${YELLOW}Copy this to NEXTAUTH_SECRET in your .env files${NC}"
}

# Test database connection
test_db() {
    print_header "Testing Database Connection"
    
    if [ ! -f ".env.local" ]; then
        print_error ".env.local not found. Run setup first."
        return
    fi
    
    source .env.local
    
    if [ -z "$DATABASE_URL" ]; then
        print_error "DATABASE_URL not set in .env.local"
        return
    fi
    
    print_warning "Testing connection to: ${DATABASE_URL:0:30}..."
    
    # Try connecting with psql
    if command -v psql &> /dev/null; then
        if psql "$DATABASE_URL" -c "SELECT NOW();" > /dev/null 2>&1; then
            print_success "Database connection successful!"
        else
            print_error "Failed to connect to database"
        fi
    else
        print_warning "psql not installed. Install PostgreSQL client tools."
    fi
}

# Run migrations
run_migrations() {
    print_header "Running Database Migrations"
    
    if [ ! -f ".env.local" ]; then
        print_error ".env.local not found"
        return
    fi
    
    if ! command -v npx &> /dev/null; then
        print_error "npx not found. Install Node.js first."
        return
    fi
    
    print_warning "Running: npx prisma migrate dev"
    npx prisma migrate dev --name init
    print_success "Migrations completed!"
}

# View environment
view_env() {
    print_header "Environment Variables (.env.local)"
    
    if [ ! -f ".env.local" ]; then
        print_error ".env.local not found"
        return
    fi
    
    echo ""
    cat .env.local
    echo ""
}

# Main loop
main() {
    while true; do
        show_menu
        
        case $choice in
            1) setup_dev ;;
            2) setup_staging ;;
            3) setup_prod ;;
            4) generate_secret ;;
            5) test_db ;;
            6) run_migrations ;;
            7) view_env ;;
            8) print_success "Goodbye!"; exit 0 ;;
            *) print_error "Invalid option" ;;
        esac
    done
}

# Run main
main

$readmeContent = @'
# Laravel Development Environment

A comprehensive Laravel development setup with integrated Python analytics and automated deployment scripts.

## 🚀 Features

- **Laravel Framework** - Modern PHP web application framework
- **NPM Development Server** - Hot reload and asset compilation
- **Python Analytics Integration** - Data analysis capabilities with virtual environment
- **Automated Environment Setup** - One-click development environment startup
- **Encrypted Environment Configuration** - Secure .env file management
- **Multi-Window Development** - Separate command windows for each service

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **PHP** >= 8.1
- **Composer** - PHP dependency manager
- **Node.js** >= 16.x and **NPM**
- **Python** >= 3.8
- **Git**

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd <project-name>
```

### 2. Install PHP Dependencies
```bash
composer install
```

### 3. Install Node.js Dependencies
```bash
npm install
```

### 4. Set Up Python Virtual Environment
```bash
python -m venv .venv
.venv\Scripts\activate  # Windows
# or
source .venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
```

### 5. Environment Configuration
The project uses encrypted environment files. The startup script will automatically decrypt the `.env` file if it doesn't exist.

## 🚀 Quick Start

### Option 1: Using Batch File (Windows)
Simply double-click `run.bat` or execute from command line:
```bash
run.bat
```

### Option 2: Using Executable
If you have the compiled executable:
```bash
run.exe
```

### Option 3: Manual Start
```bash
# Terminal 1 - Laravel Server
php artisan serve

# Terminal 2 - NPM Development
npm run dev

# Terminal 3 - Python Environment
.venv\Scripts\activate
python python\analyze.py
```

## 📁 Project Structure

```
├── app/                    # Laravel application code
├── resources/              # Views, assets, and frontend code
├── python/                 # Python analytics scripts
│   └── analyze.py         # Main analysis script
├── public/                 # Public assets and entry point
├── storage/                # File storage and logs
├── .venv/                 # Python virtual environment
├── run.bat                # Development environment startup script
├── run.exe                # Compiled executable version
└── README.md              # This file
```

## 🔧 Configuration

### Environment Variables
The project uses encrypted environment configuration. Key variables include:

- `APP_NAME` - Application name
- `APP_ENV` - Application environment (local, production)
- `APP_URL` - Application URL
- `DB_CONNECTION` - Database connection details
- `PYTHON_ANALYTICS_PATH` - Path to Python scripts

### Laravel Configuration
Standard Laravel configuration files are located in the `config/` directory.

### Python Configuration
Python dependencies are listed in `requirements.txt`. The virtual environment is automatically activated by the startup scripts.

## 🌐 Development Workflow

1. **Start Development Environment**: Run `run.bat` to start all services
2. **Laravel Development**: Access your app at `http://localhost:8000`
3. **Frontend Development**: NPM runs in watch mode for live reloading
4. **Python Analytics**: Scripts run automatically and can be modified in the `python/` directory

## 📊 Services Overview

| Service | Port | Purpose | Window Title |
|---------|------|---------|--------------|
| Laravel | 8000 | Web application server | Laravel Server |
| NPM | - | Asset compilation & hot reload | NPM Dev Server |
| Python | - | Data analysis and processing | Python Analysis |

## 🔒 Security Features

- **Encrypted Environment Files** - Sensitive configuration is encrypted
- **Automated Decryption** - Startup scripts handle environment setup
- **Virtual Environment Isolation** - Python dependencies are containerized

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Check what's using port 8000
netstat -ano | findstr :8000
# Kill the process if needed
taskkill /PID <process-id> /F
```

**Environment Decryption Failed**
- Verify the encryption key is correct
- Check if you have proper permissions
- Ensure PHP OpenSSL extension is enabled

**Python Virtual Environment Issues**
```bash
# Recreate virtual environment
rmdir /s .venv
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

**NPM Issues**
```bash
# Clear NPM cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 🚀 Deployment

### Development
Use the provided startup scripts for local development.

### Production
1. Set `APP_ENV=production` in your environment
2. Run `php artisan config:cache`
3. Run `npm run production`
4. Configure your web server to point to `public/index.php`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 📞 Support

If you encounter any issues or need support:

1. Check the [troubleshooting section](#-troubleshooting)
2. Review Laravel documentation: https://laravel.com/docs
3. Create an issue in this repository
4. Contact the development team

## 🙏 Acknowledgments

- Laravel Framework
- Python Community
- NPM and Node.js ecosystem
- All contributors and maintainers

---

**Happy Coding! 🎉**
'@

# Write to README.md file
$readmeContent | Out-File -FilePath "README.md" -Encoding UTF8

Write-Host "README.md file created successfully!" -ForegroundColor Green

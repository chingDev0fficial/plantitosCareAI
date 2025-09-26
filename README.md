# Laravel Development Environment

A comprehensive Laravel development setup with integrated Python analytics and automated deployment scripts.

## 🚀 Features

- **Laravel Framework** - Modern PHP web application framework
- **NPM Development Server** - Hot reload and asset compilation
- **Flask Server** - Load and executes Computer Vision and Gemini AI models
- **Automated Environment Setup** - One-click development environment startup
- **Encrypted Environment Configuration** - Secure .env file management
- **Multi-Window Development** - Separate command windows for each service

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **PHP** >= 8.1
- **Composer** - PHP dependency manager
- **Node.js** >= 16.x and **NPM**
- **Python** >= 3.9
- **Git**

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/chingDev0fficial/plantitosCareAI.git
cd plant_disease_identifyer_app
```

### 2. Run Build
```bash
.\build.exe
```

## 🚀 Quick Start

### Option 1: Run Project Locally (Recommended)
```bash
.\run.exe
```

### Option 2: Manual Start
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
```

## 🔧 Configuration

### Environment Variables
The project uses encrypted environment configuration. Key variables include:

- `APP_NAME` - Application name
- `APP_ENV` - Application environment (local, production)
- `APP_URL` - Application URL
- `PYTHON_ANALYTICS_PATH` - Path to Python scripts

### Laravel Configuration
Standard Laravel configuration files are located in the `config/` directory.

## 🌐 Development Workflow

1. **Start Development Environment**: Run `.\run.exe` to start all services
2. **Laravel Development**: Access your app at `http://localhost:8000`
3. **Frontend Development**: NPM runs in watch mode for live reloading

## 📊 Services Overview

| Service | Port | Purpose | Window Title |
|---------|------|---------|--------------|
| Laravel | 8000 | Web application server | Laravel Server |
| NPM | 5173 | Asset compilation & hot reload | NPM Dev Server |
| Flask | 5000 | Model Loader | Flask Server |

## 🔒 Security Features

- **Encrypted Environment Files** - Sensitive configuration is encrypted
- **Automated Decryption** - Startup scripts handle environment setup
- **Virtual Environment Isolation** - Python dependencies are containerized

## 🚀 Deployment

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Laravel Framework
- Python Community
- NPM and Node.js ecosystem
- All contributors and maintainers

## 📞 For more information and concern pls contect me
- (+63) 9676877741
- Hexacoders.ching03@gmail.com (`Personal Email`)
- pajoc@ssct.edu.ph (`Surigao del Norte States University (SNSU) Email`)

---

**Happy Coding! 🎉**

# Write to README.md file
$readmeContent | Out-File -FilePath "README.md" -Encoding UTF8

Write-Host "README.md file created successfully!" -ForegroundColor Green

# SauceDemo WebdriverIO Test Automation Framework

## 📋 Descripción del Proyecto

Framework de pruebas automatizadas para [SauceDemo](https://www.saucedemo.com/) implementando conceptos de:
- **BDD** (Behavior Driven Development) con Cucumber
- **POM** (Page Object Model) para mantenibilidad
- **TAF** (Test Automation Framework) con arquitectura modular
- **WebDriverIO v7** sin Selenium standalone
- **Ejecución paralela** en múltiples navegadores

## 🎯 Casos de Prueba Implementados

### UC-1: Test Login form with empty credentials
- **Acción:** Abrir página de login y hacer clic en "Login" sin ingresar credenciales
- **Resultado Esperado:** Mensaje de error "Username is required"

### UC-2: Test Login form with credentials by passing Username
- **Acción:** Ingresar solo username, limpiar password y hacer clic en "Login"
- **Resultado Esperado:** Mensaje de error "Password is required"

### UC-3: Test Login form with credentials by passing Username & Password
- **Acción:** Ingresar credenciales válidas de usuarios aceptados y hacer clic en "Login"
- **Resultado Esperado:** Dashboard muestra título "Swag Labs" y URL contiene "inventory.html"

## 🛠️ Tecnologías Utilizadas

- **Node.js:** v12.14.0
- **WebDriverIO:** v7.31.1 (Sin Selenium)
- **Cucumber:** Framework BDD
- **Spec Reporter:** Reportes en consola

## 📦 Navegadores Soportados

- ✅ **Google Chrome** (chromedriver)
- ✅ **Mozilla Firefox** (geckodriver)
- ✅ **Microsoft Edge** (edgedriver)

## 📂 Estructura del Proyecto

```
webdriverio-saucedemo/
│
├── package.json                    # Dependencias y scripts
├── wdio.conf.js                    # Configuración de WebDriverIO
├── README.md                       # Documentación
│
├── test/
│   ├── features/                   # Feature files (BDD)
│   │   └── login.feature          # Escenarios de login
│   │
│   ├── step-definitions/          # Step definitions (Cucumber)
│   │   └── login.steps.js         # Implementación de steps
│   │
│   ├── pageobjects/               # Page Objects (POM)
│   │   ├── login.page.js          # Login page
│   │   └── dashboard.page.js      # Dashboard page
│   │
│   └── data/                      # Test data
│       └── credentials.json       # Credenciales de prueba
│
├── reports/                        # Reportes de ejecución
├── allure-results/                # Resultados Allure
└── driver-logs/                   # Logs de drivers
```

## 🚀 Instalación

### Prerrequisitos

- Node.js v12.14.0 o superior
- npm v6.x o superior
- Navegadores instalados (Chrome, Firefox, Edge)

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd webdriverio-saucedemo
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Verificar instalación de drivers**
Los drivers se instalan automáticamente con las dependencias:
- chromedriver
- geckodriver
- edgedriver

## ▶️ Ejecución de Pruebas

### Ejecutar todas las pruebas en todos los navegadores
```bash
npm test
```

### Ejecutar en un navegador específico
```bash
# Solo Chrome
npm run test:chrome

# Solo Firefox
npm run test:firefox

# Solo Edge
npm run test:edge
```

### Ejecutar con tags específicos
```bash
npx wdio run wdio.conf.js --cucumberOpts.tagExpression='@smoke'
npx wdio run wdio.conf.js --cucumberOpts.tagExpression='@regression'
npx wdio run wdio.conf.js --cucumberOpts.tagExpression='@UC-1'
```

## 📊 Reportes

### Reporte Spec (Console)
Se muestra automáticamente en la consola durante la ejecución con detalles de:
- Escenarios ejecutados
- Steps pasados/fallidos
- Tiempo de ejecución
- Navegador utilizado

## 🏗️ Arquitectura del Framework

### Page Object Model (POM)

Cada página tiene su propia clase con:
- Selectores de elementos
- Métodos de interacción
- Métodos de validación

**Ejemplo:**
```javascript
class LoginPage {
    get inputUsername() { return $('#user-name'); }
    get btnLogin() { return $('#login-button'); }
    
    login(username, password) {
        this.inputUsername.setValue(username);
        this.inputPassword.setValue(password);
        this.btnLogin.click();
    }
}
```

### Behavior Driven Development (BDD)

Escenarios escritos en Gherkin para legibilidad:

```gherkin
Scenario: UC-1 Test Login form with empty credentials
    Given I open the SauceDemo login page
    When I click the Login button without entering credentials
    Then I should see the error message "Username is required"
```

### Test Automation Framework (TAF)

- **Modularidad:** Separación de concerns (pages, steps, data)
- **Reusabilidad:** Componentes reutilizables
- **Mantenibilidad:** Fácil de mantener y extender
- **Escalabilidad:** Preparado para crecer

## 🔧 Configuración

### wdio.conf.js

Configuración principal del framework:
- Capabilities para 3 navegadores
- Services para drivers automáticos
- Framework Cucumber
- Spec Reporter para consola
- Timeouts y reintentos

### Parámetros Clave

```javascript
maxInstances: 1              // Ejecución secuencial por estabilidad
baseUrl: 'https://www.saucedemo.com'
waitforTimeout: 10000        // Timeout implícito
cucumberOpts.timeout: 60000  // Timeout por step
```

## 📝 Conceptos Implementados

### ✅ BDD (Behavior Driven Development)
- Escenarios en lenguaje natural (Gherkin)
- Colaboración entre técnicos y no técnicos
- Documentación viva y ejecutable

### ✅ POM (Page Object Model)
- Encapsulación de elementos UI
- Reducción de duplicación de código
- Mantenimiento centralizado

### ✅ TAF (Test Automation Framework)
- Estructura modular y escalable
- Data-driven testing
- Logging y reporting
- Gestión de configuración

### ✅ Paralelización
- Ejecución en múltiples navegadores
- Optimización de tiempos de ejecución
- Configuración de maxInstances

### ✅ Data Provider
- Credenciales externalizadas (JSON)
- Múltiples conjuntos de datos
- Fácil mantenimiento

## 🐛 Solución de Problemas

### Error: "Driver not found"
```bash
# Reinstalar drivers
npm install chromedriver geckodriver edgedriver --save-dev
```

### Error: "Browser not installed"
Asegúrate de tener instalados los navegadores:
- Chrome: https://www.google.com/chrome/
- Firefox: https://www.mozilla.org/firefox/
- Edge: Incluido en Windows 10/11

### Tests lentos
Ajusta los timeouts en `wdio.conf.js`:
```javascript
waitforTimeout: 5000
connectionRetryTimeout: 60000
```

## 📌 Notas Importantes

- ⚠️ **Node.js 12.14.0:** Versión mínima requerida
- ⚠️ **Sin Selenium:** WebDriverIO maneja drivers directamente
- ⚠️ **Ejecución Secuencial:** maxInstances=1 por estabilidad
- ⚠️ **Screenshots:** Se toman automáticamente en fallos

## 👥 Usuarios de Prueba

### Usuarios Aceptados (UC-3)
- `standard_user` / `secret_sauce`
- `problem_user` / `secret_sauce`
- `performance_glitch_user` / `secret_sauce`

### Usuario Bloqueado
- `locked_out_user` / `secret_sauce` (genera error)

## 📚 Referencias

- [WebDriverIO Documentation](https://webdriver.io/docs/gettingstarted)
- [Cucumber.js Documentation](https://github.com/cucumber/cucumber-js)
- [SauceDemo Test Site](https://www.saucedemo.com/)

## 📄 Licencia

ISC

---

**Desarrollado para prueba técnica de automatización**  
**Stack:** WebDriverIO + Cucumber + Node.js 12.14.0
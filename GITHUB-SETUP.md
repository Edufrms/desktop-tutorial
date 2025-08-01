# 🚀 Guía para Subir a GitHub

## 📋 **Pasos para Subir a GitHub sin Perder Funcionalidad**

### **1. Crear Repositorio en GitHub**

1. Ve a [GitHub.com](https://github.com) y inicia sesión
2. Haz clic en el botón **"New"** o **"+"** → **"New repository"**
3. Configura el repositorio:
   - **Repository name**: `comextoolbox-lead-discovery`
   - **Description**: `Interactive Lead Discovery Dashboard for Comextoolbox - Belgium`
   - **Visibility**: Public o Private (según prefieras)
   - **NO marques**: "Add a README file" (ya tenemos uno)
   - **NO marques**: "Add .gitignore" (ya tenemos uno)
4. Haz clic en **"Create repository"**

### **2. Conectar Repositorio Local con GitHub**

```bash
# En tu terminal, en el directorio del proyecto:
git remote add origin https://github.com/TU-USUARIO/comextoolbox-lead-discovery.git
git branch -M main
git push -u origin main
```

### **3. Configurar GitHub Pages (Opcional)**

Si quieres que tu proyecto sea visible online:

1. Ve a tu repositorio en GitHub
2. **Settings** → **Pages**
3. **Source**: Deploy from a branch
4. **Branch**: main
5. **Folder**: `/ (root)`
6. **Save**

## 🔧 **Configuración para Desarrollo**

### **Después de Clonar en Otro Ordenador:**

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU-USUARIO/comextoolbox-lead-discovery.git

# 2. Navegar al directorio
cd comextoolbox-lead-discovery

# 3. Instalar dependencias
npm install

# 4. Ejecutar en desarrollo
npm start
```

## 📁 **Estructura del Repositorio**

```
comextoolbox-lead-discovery/
├── public/
│   ├── index.html          # HTML principal
│   ├── leads.json          # Datos de leads (8 leads en Bélgica)
│   └── custom.geo.json     # GeoJSON de Bélgica
├── src/
│   ├── components/
│   │   ├── LeadMap.js      # Mapa interactivo
│   │   └── FilterPanel.js  # Panel de filtros
│   ├── App.js              # Componente principal
│   ├── App.css             # Estilos
│   ├── index.js            # Punto de entrada
│   └── index.css           # Estilos globales
├── package.json            # Dependencias
├── .gitignore              # Archivos a ignorar
├── README.md              # Documentación principal
├── INSTRUCCIONES.md       # Guía de inicio rápido
├── SOLUCION-GEOJSON.md    # Solución del problema GeoJSON
├── CAMBIOS-LUXEMBURGO.md  # Resumen de cambios
├── ejemplo-belgica-precisa.html  # Ejemplo HTML
├── belgium-coordinates.js # Coordenadas de Bélgica
└── GITHUB-SETUP.md        # Esta guía
```

## 🎯 **Funcionalidades que se Mantienen**

### **✅ Todo Funciona Igual:**
- **Mapa interactivo** centrado en Bélgica
- **8 leads** distribuidos por Bélgica
- **Filtros dinámicos** por tipo de lead
- **Marcadores agrupados** con clusters
- **Pop-ups personalizados** con información
- **Estilos corporativos** (#2A9D8F)
- **Diseño responsivo**

### **🗺️ Características del Mapa:**
- **Silueta precisa de Bélgica** (sin Luxemburgo)
- **Relleno sutil** (8% opacidad)
- **Sin trazo invasivo**
- **Tooltip interactivo**
- **Zoom y navegación** completa

## 🔄 **Flujo de Trabajo con Git**

### **Para Hacer Cambios:**

```bash
# 1. Hacer cambios en el código
# 2. Verificar cambios
git status

# 3. Añadir cambios
git add .

# 4. Hacer commit
git commit -m "Descripción de los cambios"

# 5. Subir a GitHub
git push origin main
```

### **Para Actualizar desde GitHub:**

```bash
# 1. Descargar cambios
git pull origin main

# 2. Instalar nuevas dependencias (si las hay)
npm install
```

## 🌐 **Despliegue en Producción**

### **Opción 1: GitHub Pages**
```bash
# Construir para producción
npm run build

# Subir la carpeta build/ a GitHub Pages
```

### **Opción 2: Netlify**
1. Conectar repositorio de GitHub
2. Configurar build command: `npm run build`
3. Configurar publish directory: `build`

### **Opción 3: Vercel**
1. Conectar repositorio de GitHub
2. Configuración automática para React

## 📞 **Soporte**

### **Problemas Comunes:**

1. **Error de dependencias**: `npm install`
2. **Error de puerto**: Cambiar puerto en `package.json`
3. **Error de Git**: Verificar configuración de usuario

### **Comandos Útiles:**

```bash
# Ver estado del repositorio
git status

# Ver historial de commits
git log --oneline

# Ver ramas
git branch

# Crear nueva rama
git checkout -b nueva-funcionalidad

# Cambiar de rama
git checkout main
```

---

**¡Tu proyecto estará seguro en GitHub y listo para colaboración! 🚀** 
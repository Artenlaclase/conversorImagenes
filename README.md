# 🖼️ Conversor de Imágenes Online

Conversor de imágenes 100% gratuito y privado que funciona completamente en tu navegador. Convierte entre JPG, PNG, WebP y HEIC sin subir archivos a ningún servidor.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black)
![React](https://img.shields.io/badge/React-19.2.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

## ✨ Características

- 🔒 **100% Privado**: Todo el procesamiento ocurre localmente en tu navegador
- 🚀 **Sin Servidor**: Tus imágenes nunca se suben a ningún servidor
- 🆓 **Completamente Gratis**: Sin límites, sin registro, sin anuncios
- 📱 **Soporta HEIC**: Convierte archivos HEIC de iPhone/iPad
- 🎨 **Múltiples Formatos**: JPG, PNG, WebP, HEIC
- 📏 **Redimensionamiento**: Ajusta ancho y alto de tus imágenes
- ⚡ **Rápido**: Conversión instantánea sin esperas
- 🎯 **Interfaz Simple**: Drag & drop intuitivo
- 📦 **Sin Instalación**: Funciona directamente en el navegador

## 🛠️ Tecnologías

- **Framework**: [Next.js 16](https://nextjs.org/) con App Router
- **UI**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Drag & Drop**: [react-dropzone](https://react-dropzone.js.org/)
- **Conversión HEIC**: [heic2any](https://github.com/alexcorvi/heic2any)
- **Descarga**: [file-saver](https://github.com/eligrey/FileSaver.js/)

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js 20+ instalado
- npm, yarn, pnpm o bun

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/image-converter.git
cd image-converter
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

## 📁 Estructura del Proyecto

```
image-converter/
├── app/
│   ├── components/
│   │   └── imageConverter.tsx    # Componente principal del conversor
│   ├── privacidad/
│   │   └── page.tsx              # Página de política de privacidad
│   ├── globals.css               # Estilos globales
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Página de inicio
├── public/
│   ├── favicon.svg               # Favicon del sitio
│   └── logo1.png                 # Logo
├── package.json                  # Dependencias y scripts
├── tsconfig.json                 # Configuración TypeScript
├── tailwind.config.ts            # Configuración Tailwind
└── next.config.ts                # Configuración Next.js
```

## 🎯 Uso

1. **Cargar Imagen**: Arrastra una imagen o haz clic para seleccionar
2. **Elegir Formato**: Selecciona JPG, PNG o WebP
3. **Redimensionar (Opcional)**: Ajusta ancho y/o alto si lo necesitas
4. **Convertir**: Haz clic en "Convertir y Descargar"
5. **Descargar**: Tu imagen convertida se descargará automáticamente

### Formatos Soportados

#### Entrada
- JPEG/JPG
- PNG
- WebP
- HEIC (iPhone/iPad)

#### Salida
- JPEG - Mejor compatibilidad, menor tamaño
- PNG - Calidad máxima, soporta transparencia
- WebP - Mejor compresión, web moderno

## 🔒 Privacidad y Seguridad

- ✅ **Procesamiento Local**: Todo se ejecuta en tu navegador usando Canvas API
- ✅ **Sin Subidas**: Tus imágenes nunca salen de tu dispositivo
- ✅ **Sin Almacenamiento**: No guardamos ningún dato
- ✅ **Sin Cookies**: No usamos cookies de rastreo
- ✅ **Sin Analytics**: No recopilamos información de uso
- ✅ **Código Abierto**: Puedes revisar todo el código

## 🌐 Compatibilidad de Navegadores

| Navegador | Versión Mínima | HEIC Support |
|-----------|----------------|--------------|
| Chrome    | 90+            | 116+         |
| Firefox   | 88+            | 130+         |
| Safari    | 14+            | ✅ Nativo    |
| Edge      | 90+            | 116+         |

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Construye para producción
npm run start        # Inicia servidor de producción

# Calidad de código
npm run lint         # Ejecuta ESLint
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👏 Créditos

Desarrollado por [Oceanica Web](https://www.oceanicaweb.cl)

En colaboración con [Arte en la Clase](https://www.artenlaclase.cl)

## 🐛 Reportar Problemas

Si encuentras un bug o tienes una sugerencia, por favor abre un [issue](https://github.com/tu-usuario/image-converter/issues).

## 📧 Contacto

- Web: [oceanicaweb.cl](https://www.oceanicaweb.cl)
- Proyecto: [artenlaclase.cl](https://www.artenlaclase.cl)

---

Hecho con ❤️ usando Next.js y React

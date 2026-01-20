'use client';

import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { saveAs } from 'file-saver';
import type { FileWithPath } from 'react-dropzone';

export default function ImageConverter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [format, setFormat] = useState<string>('image/png');
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isHeicFile, setIsHeicFile] = useState<boolean>(false);
  
  // Referencia al canvas oculto para procesar la imagen
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const resetForm = () => {
    setSelectedFile(null);
    setPreview(null);
    setFormat('image/png');
    setWidth(0);
    setHeight(0);
    setShowModal(false);
    setError(null);
    setIsHeicFile(false);
  };

  const onDrop = async (acceptedFiles: FileWithPath[]) => {
    const file = acceptedFiles[0];
    setError(null);
    
    // Detectar si es HEIC basándose en la extensión Y el tipo MIME
    const hasHeicExtension = file.name.toLowerCase().endsWith('.heic');
    const isActuallyHeic = hasHeicExtension && !file.type.startsWith('image/');
    
    setIsHeicFile(isActuallyHeic);
    
    if (file) {
      setSelectedFile(file);
      
      // Para archivos HEIC reales (sin tipo MIME legible)
      if (isActuallyHeic) {
        // Crear una preview genérica o mensaje
        setPreview(null); // No podemos mostrar preview de HEIC directamente
        setWidth(0);
        setHeight(0);
      } else {
        // Para otros formatos o HEIC renombrados (ya convertidos), crear preview normalmente
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        // Obtener dimensiones originales
        const img = new Image();
        img.onload = () => {
          setWidth(img.width);
          setHeight(img.height);
        };
        img.onerror = () => {
          // Si falla al cargar la imagen, probablemente sí es HEIC real
          setIsHeicFile(true);
          setPreview(null);
          setError("Archivo HEIC detectado. Elige el formato de salida y presiona 'Convertir y Descargar'.");
        };
        img.src = objectUrl;
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.heic'] 
    },
    onDrop
  });

  const handleConvert = async () => {
    setIsProcessing(true);
    setError(null);
    
    try {
      let imageToProcess = preview;
      
      // Si es un archivo HEIC, convertirlo primero
      if (isHeicFile && selectedFile) {
        try {
          // Verificar soporte del navegador
          if (typeof window === 'undefined') {
            throw new Error("No se puede ejecutar en el servidor");
          }
          
          // Importar dinámicamente heic2any solo cuando sea necesario
          const heic2anyModule = await import('heic2any');
          const heic2any = heic2anyModule.default || heic2anyModule;
          
          if (!heic2any || typeof heic2any !== 'function') {
            throw new Error("LIBRARY_NOT_AVAILABLE");
          }
          
          console.log('Iniciando conversión HEIC...', {
            fileName: selectedFile.name,
            fileSize: selectedFile.size,
            fileType: selectedFile.type,
            targetFormat: format
          });
          
          // Convertir HEIC al formato elegido por el usuario
          const conversionResult = await heic2any({
            blob: selectedFile,
            toType: format,
            quality: 0.9
          });
          
          console.log('Conversión completada:', conversionResult);
          
          // Asegurar que obtenemos un blob
          let convertedBlob: Blob | null = null;
          
          if (conversionResult instanceof Blob) {
            convertedBlob = conversionResult;
          } else if (Array.isArray(conversionResult) && conversionResult.length > 0 && conversionResult[0] instanceof Blob) {
            convertedBlob = conversionResult[0];
          }
          
          if (!convertedBlob) {
            throw new Error("INVALID_RESULT");
          }
          
          // Crear URL temporal para la imagen convertida
          imageToProcess = URL.createObjectURL(convertedBlob);
          console.log('Preview URL creada exitosamente');
          
        } catch (e: any) {
          console.error('Error detallado en conversión HEIC:', e);
          
          let errorMessage = "Error desconocido";
          let errorCode = null;
          
          if (e instanceof Error) {
            errorMessage = e.message;
          } else if (typeof e === 'string') {
            errorMessage = e;
          } else if (e && typeof e === 'object') {
            errorMessage = e.message || "Error desconocido";
            errorCode = e.code;
          }
          
          // Verificar si el error es porque la imagen ya es legible
          if (errorCode === 1 || errorMessage.includes("already browser readable") || errorMessage.includes("ERR_USER")) {
            // El archivo tiene extensión .heic pero ya es un formato estándar (JPG/PNG)
            // Usar el archivo directamente sin conversión HEIC
            console.log('El archivo tiene extensión .heic pero ya está en formato legible. Procesando directamente...');
            setIsHeicFile(false); // Marcar como no-HEIC para procesarlo normalmente
            imageToProcess = preview; // Usar la preview existente
            
            // Si no hay preview, crearla ahora
            if (!imageToProcess) {
              imageToProcess = URL.createObjectURL(selectedFile);
            }
          } else {
            // Error real de conversión
            let userMessage = "";
            
            if (errorMessage === "LIBRARY_NOT_AVAILABLE" || errorMessage.includes("not a function")) {
              userMessage = "⚠️ La conversión de HEIC no está disponible. Por favor, usa Chrome, Edge o Firefox actualizado.";
            } else if (errorMessage === "INVALID_RESULT" || errorMessage.includes("valid") || errorMessage.includes("válido")) {
              userMessage = "❌ El archivo HEIC podría estar corrupto. Intenta con otro archivo.";
            } else if (errorMessage.includes("User cancelled") || errorMessage.includes("canceled")) {
              userMessage = "ℹ️ Conversión cancelada.";
            } else if (errorMessage.includes("not support") || errorMessage.includes("browser")) {
              userMessage = "⚠️ Tu navegador no soporta archivos HEIC. Usa Chrome 116+, Edge 116+, o Firefox 130+.";
            } else {
              userMessage = `❌ Error al convertir HEIC: ${errorMessage}. Intenta convertir el archivo manualmente primero.`;
            }
            
            setError(userMessage);
            setIsProcessing(false);
            return;
          }
        }
      }
      
      if (!imageToProcess) {
        setError("No hay imagen para procesar");
        setIsProcessing(false);
        return;
      }
      
      const img = new Image();
      img.src = imageToProcess;
      
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) {
          setIsProcessing(false);
          return;
        }
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setIsProcessing(false);
          return;
        }

        // Configurar dimensiones del canvas (usar las originales si no se especificaron)
        const finalWidth = width > 0 ? width : img.width;
        const finalHeight = height > 0 ? height : img.height;
        
        canvas.width = finalWidth;
        canvas.height = finalHeight;

        // Dibujar imagen redimensionada
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convertir al formato deseado
        canvas.toBlob((blob: Blob | null) => {
          if (blob) {
            // Generar nombre de archivo
            const extension = format.split('/')[1];
            const baseName = selectedFile?.name.replace(/\.[^.]+$/, '') || 'imagen-convertida';
            saveAs(blob, `${baseName}.${extension}`);
            
            // Mostrar modal solo después de un tiempo prudencial
            // Dar tiempo para que se abra el diálogo de descarga del navegador
            setTimeout(() => {
              setIsProcessing(false);
              setShowModal(true);
            }, 2500);
          } else {
            setIsProcessing(false);
          }
          
          // Limpiar URL temporal si se creó para HEIC
          if (isHeicFile && imageToProcess !== preview) {
            URL.revokeObjectURL(imageToProcess);
          }
        }, format, 0.9); // 0.9 es la calidad (90%)
      };
      
      img.onerror = () => {
        setError("Error al cargar la imagen para conversión");
        setIsProcessing(false);
      };
      
    } catch (error) {
      setError("Error inesperado durante la conversión");
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Conversor de Imágenes</h2>

      {/* Mensaje de error */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <svg className="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">
            <p className="text-sm text-red-800">{error}</p>
            <button 
              onClick={() => setError(null)} 
              className="text-xs text-red-600 hover:text-red-800 underline mt-1"
            >
              Descartar
            </button>
          </div>
        </div>
      )}

      {/* Área de Dropzone */}
      <div 
        {...getRootProps()} 
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition"
      >
        <input {...getInputProps()} />
        {selectedFile ? (
          <div>
            <p className="text-green-600 font-medium">✓ Archivo cargado: {selectedFile.name}</p>
            {isHeicFile && (
              <p className="text-sm text-blue-600 mt-2">📱 Archivo HEIC detectado. Selecciona el formato de salida y presiona convertir.</p>
            )}
          </div>
        ) : (
          <>
            <p className="text-gray-700 font-medium">Arrastra una imagen aquí o haz clic para seleccionar</p>
            <p className="text-sm text-gray-500 mt-2">Formatos soportados: JPEG, PNG, WebP, HEIC</p>
          </>
        )}
      </div>

      {/* Nota de privacidad */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-800 text-center">
          🔒 <strong>100% Privado y Seguro:</strong> Tus imágenes se procesan localmente en tu navegador. 
          Nunca se suben a ningún servidor.{' '}
          <a 
            href="/privacidad" 
           /*  target="_blank" */
            rel="noopener noreferrer"
            className="underline hover:text-blue-900 font-medium"
          >
            Ver política de privacidad
          </a>
        </p>
      </div>

      {selectedFile && (
        <div className="mt-6 space-y-4">
          {/* Previsualización - solo para archivos no-HEIC */}
          {preview && !isHeicFile && (
            <div className="flex justify-center bg-gray-100 p-4 rounded">
              <img src={preview} alt="Preview" className="max-h-64 object-contain" />
            </div>
          )}
          
          {/* Mensaje para archivos HEIC */}
          {isHeicFile && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div className="flex-1">
                  <p className="text-blue-800 font-medium">📱 Archivo HEIC detectado</p>
                  <p className="text-sm text-blue-600 mt-1">Selecciona el formato de destino y haz clic en "Convertir y Descargar"</p>
                  <details className="mt-2">
                    <summary className="text-xs text-blue-700 cursor-pointer hover:underline">¿Tu navegador no soporta HEIC?</summary>
                    <div className="mt-2 text-xs text-blue-600 space-y-1">
                      <p>• <strong>Windows/Android:</strong> Usa Chrome 116+ o Edge 116+</p>
                      <p>• <strong>Mac/iOS:</strong> Usa Safari (soporta HEIC nativamente)</p>
                      <p>• <strong>Alternativa:</strong> Convierte el archivo en línea primero en <a href="https://heic2jpg.com" target="_blank" rel="noopener" className="underline">heic2jpg.com</a></p>
                    </div>
                  </details>
                </div>
              </div>
            </div>
          )}

          {/* Controles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Formato de Salida</label>
              <p className="text-xs text-gray-500 mt-1 mb-2">Selecciona el formato para descargar</p>
              <select 
                value={format} 
                onChange={(e) => setFormat(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              >
                <option value="image/jpeg">JPEG - Mejor compatibilidad, archivo más pequeño</option>
                <option value="image/png">PNG - Mejor calidad, transparencia</option>
                <option value="image/webp">WebP - Mejor compresión, Web moderno</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Ancho (px)</label>
                <input 
                  type="number" 
                  value={width || ''} 
                  onChange={(e) => setWidth(Number(e.target.value))}
                  placeholder={isHeicFile ? "Original" : "Auto"}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Alto (px)</label>
                <input 
                  type="number" 
                  value={height || ''} 
                  onChange={(e) => setHeight(Number(e.target.value))}
                  placeholder={isHeicFile ? "Original" : "Auto"}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleConvert}
            disabled={isProcessing}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {isProcessing ? 'Procesando...' : 'Convertir y Descargar'}
          </button>
        </div>
      )}
      
      {/* Canvas oculto para procesamiento */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Modal de descarga completada */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 text-center" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">✅ Conversión exitosa</h3>
            <p className="text-gray-600 mb-2">Tu imagen ha sido procesada correctamente.</p>
            <p className="text-sm text-gray-500 mb-6">Verifica tu carpeta de descargas</p>
            <div className="flex gap-3">
              <button
                onClick={resetForm}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition font-medium"
              >
                Convertir otra
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition font-medium"
              >
                Continuar editando
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
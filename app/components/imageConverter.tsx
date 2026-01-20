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
  
  // Referencia al canvas oculto para procesar la imagen
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const resetForm = () => {
    setSelectedFile(null);
    setPreview(null);
    setFormat('image/png');
    setWidth(0);
    setHeight(0);
    setShowModal(false);
  };

  const onDrop = async (acceptedFiles: FileWithPath[]) => {
    let file = acceptedFiles[0];
    
    // Detectar si es HEIC
    if (file.name.toLowerCase().endsWith('.heic')) {
      try {
        setIsProcessing(true); // Mostrar carga
        // Importar dinámicamente heic2any solo cuando sea necesario
        const heic2any = (await import('heic2any')).default;
        // Convertir HEIC a Blob (generalmente JPEG o PNG) legible por navegador
        const convertedBlob = await heic2any({
          blob: file,
          toType: "image/jpeg",
        });
        file = new File([convertedBlob as Blob], file.name.replace('.heic', '.jpg'), { type: "image/jpeg" });
        setIsProcessing(false);
      } catch (e) {
        console.error("Error convirtiendo HEIC", e);
        setIsProcessing(false);
        return;
      }
    }

    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // Obtener dimensiones originales
      const img = new Image();
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = objectUrl;
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
    const img = new Image();
    img.src = preview || '';
    
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

      // Configurar dimensiones del canvas
      canvas.width = width;
      canvas.height = height;

      // Dibujar imagen redimensionada
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Convertir al formato deseado
      canvas.toBlob((blob: Blob | null) => {
        if (blob) {
          // Generar nombre de archivo
          const extension = format.split('/')[1];
          saveAs(blob, `imagen-convertida.${extension}`);
          // Mostrar modal después de descargar
          setShowModal(true);
        }
        setIsProcessing(false);
      }, format, 0.9); // 0.9 es la calidad (90%)
    };
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Conversor de Imágenes</h2>

      {/* Área de Dropzone */}
      <div 
        {...getRootProps()} 
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition"
      >
        <input {...getInputProps()} />
        {selectedFile ? (
          <p className="text-green-600 font-medium">✓ Archivo cargado: {selectedFile.name}</p>
        ) : (
          <>
            <p className="text-gray-700 font-medium">Arrastra una imagen aquí o haz clic para seleccionar</p>
            <p className="text-sm text-gray-500 mt-2">Formatos soportados: JPEG, PNG, WebP, HEIC</p>
          </>
        )}
      </div>

      {preview && (
        <div className="mt-6 space-y-4">
          {/* Previsualización */}
          <div className="flex justify-center bg-gray-100 p-4 rounded">
            <img src={preview} alt="Preview" className="max-h-64 object-contain" />
          </div>

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
                  value={width} 
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Alto (px)</label>
                <input 
                  type="number" 
                  value={height} 
                  onChange={(e) => setHeight(Number(e.target.value))}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 text-center">
            <div className="mb-4">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">¡Descarga completada!</h3>
            <p className="text-gray-600 mb-6">Tu imagen ha sido convertida y descargada exitosamente.</p>
            <div className="flex gap-3">
              <button
                onClick={resetForm}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition font-medium"
              >
                Convertir otra imagen
              </button>
              <button
                onClick={resetForm}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition font-medium"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
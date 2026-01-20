import ImageConverter from '@/app/components/imageConverter';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Editor de Imágenes Rápido
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Cambia el formato y tamaño de tus imágenes directamente en el navegador.
          </p>
        </div>
        
        <ImageConverter />
      </div>
    </main>
  );
}
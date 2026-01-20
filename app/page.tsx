import ImageConverter from '@/app/components/imageConverter';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Conversor de Imágenes Online
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Convierte tus imágenes a <span className="font-semibold">JPG, PNG o WebP</span> y ajusta el tamaño en segundos, directamente en tu navegador.
          </p>
          <p className="mt-3 text-sm text-gray-500">
            ✓ 100% Gratis • ✓ Sin registros • ✓ Sin subidas a servidor • ✓ Formatos: JPEG, PNG, WebP, HEIC
          </p>
        </div>
        
        <ImageConverter />
      </div>
    </main>
  );
}
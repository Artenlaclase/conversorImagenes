import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
        <div className="mb-6">
          <div className="text-8xl font-bold text-blue-600 mb-2">404</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Página no encontrada</h1>
          <p className="text-gray-600">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>

        <div className="mb-6">
          <svg 
            className="w-32 h-32 mx-auto text-gray-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>

        <div className="space-y-3">
          <Link 
            href="/"
            className="block w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition font-medium"
          >
            Volver al inicio
          </Link>
          
          <p className="text-sm text-gray-500">
            ¿Necesitas ayuda? Visita nuestra página principal para convertir imágenes.
          </p>
        </div>
      </div>
    </div>
  );
}

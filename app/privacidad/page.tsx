import Link from 'next/link';

export const metadata = {
  title: 'Política de Privacidad - Conversor de Imágenes',
  description: 'Política de privacidad del conversor de imágenes online',
};

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al inicio
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">Política de Privacidad</h1>
        
        <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Introducción</h2>
            <p>
              En el Conversor de Imágenes Online, valoramos y respetamos tu privacidad. Esta política explica 
              cómo manejamos tus datos cuando utilizas nuestro servicio de conversión de imágenes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Procesamiento Local</h2>
            <p>
              <strong>Todas las conversiones se realizan completamente en tu navegador.</strong> Esto significa que:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Tus imágenes NUNCA se suben a nuestros servidores</li>
              <li>Tus imágenes NUNCA salen de tu dispositivo</li>
              <li>No almacenamos, guardamos ni tenemos acceso a tus archivos</li>
              <li>Todo el procesamiento ocurre localmente usando JavaScript en tu navegador</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Datos que NO Recopilamos</h2>
            <p>Nuestra aplicación NO recopila:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Imágenes o archivos que conviertes</li>
              <li>Información personal identificable</li>
              <li>Datos de navegación o uso detallado</li>
              <li>Cookies de seguimiento o análisis</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Seguridad</h2>
            <p>
              Dado que todo el procesamiento es local y no hay transmisión de datos, tus imágenes están 
              completamente seguras. No hay riesgo de interceptación o acceso no autorizado porque los 
              datos nunca dejan tu dispositivo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Enlaces Externos</h2>
            <p>
              Nuestro sitio puede contener enlaces a sitios web externos (como www.artenlaclase.cl y 
              www.oceanicaweb.cl). No somos responsables de las prácticas de privacidad de estos sitios. 
              Te recomendamos leer sus políticas de privacidad.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Tecnología Utilizada</h2>
            <p>
              Utilizamos las siguientes tecnologías web estándar:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Canvas API:</strong> Para procesar y convertir imágenes</li>
              <li><strong>File API:</strong> Para leer archivos desde tu dispositivo</li>
              <li><strong>heic2any:</strong> Para convertir archivos HEIC (procesamiento local)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Servicios de Terceros</h2>
            <p>
              Este sitio puede utilizar servicios de alojamiento proporcionados por terceros. Estos 
              proveedores pueden recopilar datos técnicos básicos como direcciones IP para fines de 
              seguridad y funcionamiento del servicio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Cambios a esta Política</h2>
            <p>
              Podemos actualizar esta política de privacidad ocasionalmente. Cualquier cambio será 
              publicado en esta página con la fecha de actualización.
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Contacto</h2>
            <p>
              Si tienes preguntas sobre esta política de privacidad, puedes contactarnos a través de{' '}
              <a 
                href="https://www.oceanicaweb.cl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                www.oceanicaweb.cl
              </a>
            </p>
          </section>

          <div className="mt-12 p-6 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div>
                <p className="font-semibold text-green-900 mb-1">
                  🔒 Tu Privacidad es Nuestra Prioridad
                </p>
                <p className="text-sm text-green-800">
                  Este conversor fue diseñado con la privacidad en mente. Tus imágenes permanecen 
                  100% en tu dispositivo. Sin servidores, sin almacenamiento, sin riesgos.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <Link 
            href="/" 
            className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Volver al Conversor
          </Link>
        </div>
      </div>
    </main>
  );
}

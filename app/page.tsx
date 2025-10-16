import { CarreraCard } from "@/components/carrera-card"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function HomePage() {
  const API = "http://localhost:3000"
  let carreras: any[] = []

  try {
    const response = await fetch(`${API}/api/carreras`, { cache: "no-store" })

    if (!response.ok) {
      console.error("❌ Error al obtener carreras:", response.status, response.statusText)
      return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
          <h1 className="text-3xl font-bold text-red-500 mb-4">Error al cargar las carreras</h1>
          <p className="text-gray-600">No se pudo conectar con la base de datos. Verifica tu conexión o vuelve a intentarlo.</p>
        </div>
      )
    }

    const json = await response.json()
    carreras = json?.data || []

  } catch (error) {
    console.error("⚠️ Error al conectar con la API:", error)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Error de conexión</h1>
        <p className="text-gray-600">No se pudo establecer conexión con el servidor. Asegúrate de que el backend esté ejecutándose.</p>
      </div>
    )
  }

  // Agrupar carreras por facultad
  const carrerasPorFacultad = carreras.reduce((acc: any, carrera: any) => {
    const facultad = carrera.facultad || "General"
    if (!acc[facultad]) acc[facultad] = []
    acc[facultad].push(carrera)
    return acc
  }, {})

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-lg backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src="/img/logouniboost.png"
                alt="Logo Uniboost"
                className="w-20 h-20 rounded-xl object-contain shadow-lg transition-transform group-hover:scale-105"
                loading="lazy"
              />
              <span className="sr-only">Uniboost</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="https://www.uniautonoma.edu.co"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-all duration-300 hover:scale-105"
              >
                Sitio Oficial
              </Link>
              <Link href="/registro">
                <Button variant="secondary" size="sm" className="shadow-lg hover:shadow-xl transition-all">
                  Únete a la Comunidad
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance bg-gradient-to-br from-white to-secondary bg-clip-text text-transparent">
            Descubre Tu Futuro Profesional
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-4xl mx-auto text-pretty leading-relaxed">
            Explora las carreras de la Corporación Universitaria Autónoma del Cauca y da el primer paso hacia tu éxito
          </p>
          <Link href="/registro">
            <Button size="lg" variant="secondary" className="text-lg px-10 py-7 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 bg-gradient-to-r from-secondary to-accent">
              Únete a Nuestra Comunidad
            </Button>
          </Link>
        </div>
      </section>

      {/* Carreras por Facultad Section */}
      <main className="flex-1 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Nuestras Carreras
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Programas académicos organizados por facultad para que encuentres tu camino ideal
          </p>
        </div>

        <div className="space-y-16">
          {Object.entries(carrerasPorFacultad).map(([facultad, carrerasFacultad]: [string, any]) => (
            <section key={facultad} className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-3">
                  {facultad}
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {carrerasFacultad.map((carrera: any) => (
                  <div
                    key={carrera._id}
                    className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                  >
                    <CarreraCard carrera={carrera} />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}

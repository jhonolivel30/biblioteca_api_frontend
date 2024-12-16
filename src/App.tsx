import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Library, Users, BookOpen } from "lucide-react";
import { Autor } from "./types/Autor";
import { Libro } from "./types/Libro";
import { getAutores, getLibros } from "./services/api";
import { AutorCard } from "./components/AutorCard";
import { LibroCard } from "./components/LibroCard";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { LoadingSpinner } from "./components/LoadingSpinner";

function App() {
  const [autores, setAutores] = useState<Autor[]>([]);
  const [libros, setLibros] = useState<Libro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [activeTab, setActiveTab] = useState<"autores" | "libros">("autores");
  const [filtroLibros, setFiltroLibros] = useState<
    "todos" | "disponibles" | "no-disponibles"
  >("todos");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [autoresData, librosData] = await Promise.all([
          getAutores(),
          getLibros(),
        ]);
        console.log("Fetched autores:", autoresData);
        console.log("Fetched libros:", librosData);
        setAutores(autoresData);
        setLibros(librosData);
        setError(null);
      } catch (err) {
        console.error("Error in fetchData:", err);
        setError(err instanceof Error ? err : new Error("Error desconocido"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  const librosFiltrados = libros.filter((libro) => {
    if (filtroLibros === "disponibles") return libro.disponible;
    if (filtroLibros === "no-disponibles") return !libro.disponible;
    return true;
  });

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex justify-center mb-4"
            >
              <div className="p-4 bg-green-100 rounded-full">
                <Library className="w-12 h-12 text-green-600" />
              </div>
            </motion.div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Biblioteca Virtual
            </h1>
            <p className="text-xl text-gray-600">
              Explora nuestra colección de libros y autores
            </p>
          </div>

          <div className="mb-6 flex justify-center">
            <div className="bg-white rounded-lg shadow-sm p-1 inline-flex space-x-4">
              <button
                onClick={() => setActiveTab("autores")}
                className={`inline-flex items-center px-4 py-2 rounded-md transition-colors ${
                  activeTab === "autores"
                    ? "bg-green-100 text-green-800"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Users className="w-5 h-5 mr-2" />
                Autores
              </button>
              <button
                onClick={() => setActiveTab("libros")}
                className={`inline-flex items-center px-4 py-2 rounded-md transition-colors ${
                  activeTab === "libros"
                    ? "bg-green-100 text-green-800"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Libros
              </button>
            </div>
          </div>

          {activeTab === "autores" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {autores.map((autor) => (
                <AutorCard key={autor.id} autor={autor} />
              ))}
            </motion.div>
          )}

          {activeTab === "libros" && (
            <>
              <div className="mb-6 flex justify-center">
                <div className="bg-white rounded-lg shadow-sm p-1 inline-flex space-x-4">
                  <button
                    onClick={() => setFiltroLibros("todos")}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      filtroLibros === "todos"
                        ? "bg-green-100 text-green-800"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => setFiltroLibros("disponibles")}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      filtroLibros === "disponibles"
                        ? "bg-green-100 text-green-800"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Disponibles
                  </button>
                  <button
                    onClick={() => setFiltroLibros("no-disponibles")}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      filtroLibros === "no-disponibles"
                        ? "bg-green-100 text-green-800"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    No Disponibles
                  </button>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {librosFiltrados.map((libro) => (
                  <LibroCard key={libro.id} libro={libro} />
                ))}
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </ErrorBoundary>
  );
}

export default App;

import { motion } from 'framer-motion';
import { Book } from 'lucide-react';
import { Libro } from '../types/Libro';

interface LibroCardProps {
  libro: Libro;
}

export const LibroCard = ({ libro }: LibroCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white p-6 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
    >
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-green-100 rounded-full">
          <Book className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{libro.titulo}</h3>
          <p className="text-gray-600">Por: {libro.autor.nombre}</p>
          <span
            className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
              libro.disponible
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {libro.disponible ? 'Disponible' : 'No Disponible'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
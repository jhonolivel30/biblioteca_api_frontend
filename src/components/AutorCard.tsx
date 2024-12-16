import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { Autor } from '../types/Autor';

interface AutorCardProps {
  autor: Autor;
}

export const AutorCard = ({ autor }: AutorCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white p-6 rounded-lg shadow-lg transition-shadow hover:shadow-xl"
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-green-100 rounded-full">
          <User className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{autor.nombre}</h3>
          <p className="text-gray-600">{autor.nacionalidad}</p>
        </div>
      </div>
    </motion.div>
  );
};
import axios from 'axios';
import { AutorSchema, Autor } from '../types/Autor';
import { LibroSchema, Libro } from '../types/Libro';

const BASE_URL = 'https://jhonoliver-api-backend.vercel.app/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAutores = async (): Promise<Autor[]> => {
  try {
    const { data } = await api.get('/autores');
    console.log('Autores raw data:', data);
    return data.map((autor: unknown) => {
      try {
        return AutorSchema.parse(autor);
      } catch (error) {
        console.error('Error parsing autor:', autor, error);
        throw error;
      }
    });
  } catch (error) {
    console.error('Error fetching autores:', error);
    throw error;
  }
};

export const getLibros = async (): Promise<Libro[]> => {
  try {
    const { data } = await api.get('/libros');
    console.log('Libros raw data:', data);
    return data.map((libro: unknown) => {
      try {
        return LibroSchema.parse(libro);
      } catch (error) {
        console.error('Error parsing libro:', libro, error);
        throw error;
      }
    });
  } catch (error) {
    console.error('Error fetching libros:', error);
    throw error;
  }
};
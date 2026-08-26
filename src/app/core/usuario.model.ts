export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  telefono: string | null;
  rol: string;
  creado_en: string;
}

export interface UsuarioForm {
  nombre: string;
  correo: string;
  telefono: string;
  rol: string;
}

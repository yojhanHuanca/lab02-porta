import { Component, HostListener, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';
import { ThreeBackground } from '../../shared/three-background/three-background';

interface SkillGroup {
  title: string;
  icon: string;
  items: string[];
}

interface Project {
  name: string;
  tag: string;
  description: string;
  stack: string[];
  features: string[];
  demo: string;
  repo: string;
  accent: string;
}

interface Focus {
  icon: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [ScrollRevealDirective, ThreeBackground, RouterLink],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio {
  readonly name = 'Yojhan Leodan Huanca Yucra';
  readonly role = 'Full Stack Developer';
  readonly email = 'yhuancayucra@gmail.com';
  // TODO: reemplaza con tus enlaces reales de GitHub y LinkedIn
  readonly github = '#';
  readonly linkedin = '#';

  readonly menuOpen = signal(false);
  readonly scrolled = signal(false);
  readonly year = new Date().getFullYear();

  readonly nav = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'sobre-mi', label: 'Sobre mí' },
    { id: 'skills', label: 'Habilidades' },
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'formacion', label: 'Formación' },
    { id: 'contacto', label: 'Contacto' },
  ];

  readonly skills: SkillGroup[] = [
    { title: 'Frontend', icon: '</>', items: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'] },
    { title: 'Backend', icon: '{ }', items: ['Java', 'Spring Boot', 'Python', 'FastAPI', 'PHP', 'Laravel'] },
    { title: 'Bases de datos', icon: 'DB', items: ['MySQL', 'MongoDB'] },
    { title: 'Herramientas', icon: '⚙', items: ['Git', 'GitHub', 'VS Code', 'IntelliJ IDEA', 'Postman'] },
    { title: 'Cloud', icon: '☁', items: ['AWS', 'Arquitectura Cloud', 'Servicios en la nube'] },
  ];

  readonly projects: Project[] = [
    {
      name: "D'CAMPO",
      tag: 'Sistema E-commerce',
      description: 'Plataforma web de comercio electrónico desarrollada para la gestión y venta de productos.',
      stack: ['Laravel', 'PHP', 'MySQL', 'JavaScript'],
      features: [
        'Catálogo de productos',
        'Carrito de compras',
        'Proceso de checkout',
        'Gestión de productos',
        'Panel administrativo',
        'Gestión de pedidos',
        'Integración de métodos de pago',
      ],
      demo: '#',
      repo: '#',
      accent: 'var(--accent)',
    },
    {
      name: 'DUVET',
      tag: 'Plataforma educativa',
      description:
        'Aplicación educativa desarrollada con arquitectura frontend y backend, orientada a brindar herramientas de aprendizaje.',
      stack: ['React', 'TypeScript', 'FastAPI', 'Python', 'MongoDB'],
      features: [
        'Registro e inicio de sesión',
        'Autenticación mediante JWT',
        'Roles de estudiante y docente',
        'Chat con inteligencia artificial',
        'Tutor de matemáticas',
        'Herramientas educativas',
        'Integración con servicios externos',
      ],
      demo: '#',
      repo: '#',
      accent: 'var(--accent-2)',
    },
    {
      name: 'AutoClipper',
      tag: 'Plataforma de generación de clips con IA',
      description:
        'Proyecto orientado a transformar videos largos en clips cortos para TikTok, Instagram Reels y YouTube Shorts.',
      stack: ['React', 'Python', 'FFmpeg', 'APIs'],
      features: [
        'Importación de videos',
        'Carga de archivos MP4',
        'Procesamiento de videos',
        'Generación de clips',
        'Edición de clips',
        'Preparación de contenido para redes sociales',
      ],
      demo: '#',
      repo: '#',
      accent: 'var(--accent-3)',
    },
  ];

  readonly learning = [
    'Computación en la nube',
    'AWS',
    'Arquitectura Cloud',
    'APIs REST',
    'Desarrollo Full Stack',
    'Integración de sistemas',
    'DevOps',
    'Docker',
    'Microservicios',
  ];

  readonly focus: Focus[] = [
    {
      icon: '🧩',
      title: 'Desarrollo Full Stack',
      text: 'Comprendo el desarrollo de una aplicación de manera integral: desde la interfaz que usa el usuario hasta la lógica del servidor y la base de datos.',
    },
    {
      icon: '🎨',
      title: 'Desarrollo web',
      text: 'Creo interfaces modernas, responsivas y fáciles de utilizar con tecnologías actuales.',
    },
    {
      icon: '🔗',
      title: 'Backend y APIs',
      text: 'Desarrollo servicios backend y APIs que permiten conectar diferentes aplicaciones y servicios.',
    },
    {
      icon: '☁️',
      title: 'Cloud',
      text: 'Amplío mis conocimientos en computación en la nube y AWS para desplegar y escalar aplicaciones.',
    },
  ];

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 24);
  }
}

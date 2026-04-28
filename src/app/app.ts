import { Component, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit {
  private sanitizer = inject(DomSanitizer);
  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.setupScrollAnimations();
    this.setupCounters();
    this.setupNavbarScroll();
  }

  private setupScrollAnimations(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
  }

  private setupCounters(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const target = parseInt(el.dataset['counter'] ?? '0');
            const suffix = el.dataset['suffix'] ?? '';
            const duration = 1800;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              el.textContent = Math.round(eased * target) + suffix;
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.6 }
    );
    document.querySelectorAll('[data-counter]').forEach((el) => observer.observe(el));
  }

  private setupNavbarScroll(): void {
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
      nav?.classList.toggle('nav-scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  phone = '9517688543';
  phoneDisplay = '951 768 8543';

  particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 4 + 2}px`,
    duration: `${Math.random() * 8 + 6}s`,
    delay: `${Math.random() * 6}s`,
    opacity: `${Math.random() * 0.4 + 0.1}`,
  }));

  mapSteps = [
    { num: '1', title: 'En Auto', desc: 'Busca en Google Maps' },
    { num: '2', title: 'A Pie', desc: 'Av. Morelos, Centro' },
    { num: '3', title: '¿Dudas?', desc: 'Escríbenos por WhatsApp' },
  ];

  mapEmbedUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://www.google.com/maps?q=Auto+Servicio+Quevedo+Express,+Av.+Morelos+No.+29,+San+Antonio+de+la+Cal,+Oaxaca&z=18&output=embed'
  );

  services = [
    {
      title: 'Mecánica General',
      desc: 'Diagnóstico y reparación de motor, transmisión, frenos y sistema eléctrico.',
      iconSvg: this.getWrenchIcon(),
    },
    {
      title: 'Pintura',
      desc: 'Pintura automotriz completa, retoques y acabados de alta calidad.',
      iconSvg: this.getPaintIcon(),
    },
    {
      title: 'Lavado',
      desc: 'Lavado exterior e interior, encerado y detallado profesional.',
      iconSvg: this.getWashIcon(),
    },
    {
      title: 'Hojalatería',
      desc: 'Enderezado de carrocería, reparación de golpes y abolladuras.',
      iconSvg: this.getHammerIcon(),
    },
  ];

  testimonials = [
    {
      name: 'Carlos Mendoza',
      service: 'Mecánica General',
      stars: 5,
      comment:
        'Excelente servicio, muy profesional. Mi auto quedó como nuevo. Recomiendo ampliamente el trabajo de estos mecánicos.',
    },
    {
      name: 'María García',
      service: 'Pintura y Detallado',
      stars: 5,
      comment:
        'Llevé mi vehículo por un retoque de pintura y quedó perfecto. Los chicos tienen muy buena mano y son muy atentos.',
    },
    {
      name: 'Roberto Flores',
      service: 'Hojalatería',
      stars: 5,
      comment:
        'Tenía un golpe bastante feo en la puerta y lo dejaron impecable. Trabajo de primera calidad a buen precio.',
    },
    {
      name: 'Fernanda López',
      service: 'Lavado y Encerado',
      stars: 5,
      comment:
        'Servicio rápido y eficiente. Mi auto brilla como nuevo. Volveré con seguridad para mantenimiento regular.',
    },
    {
      name: 'Javier Rodríguez',
      service: 'Diagnóstico Completo',
      stars: 5,
      comment:
        'Gran profesionalismo. Diagnosticaron un problema que otros no habían visto. Muy recomendado para confianza.',
    },
    {
      name: 'Sofía Martínez',
      service: 'Sistema Eléctrico',
      stars: 5,
      comment:
        'Excelente atención. Resolvieron mi problema en poco tiempo. Precio justo y trabajo garantizado.',
    },
  ];

  // Iconos SVG
  getWrenchIcon(): string {
    return `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M19.07 4.93L17.65 3.5c-.39-.39-1.02-.39-1.41 0l-10.6 10.6c-.39.39-.39 1.02 0 1.41l1.41 1.41c.39.39 1.02.39 1.41 0l10.6-10.6c.39-.39.39-1.02 0-1.41zM5.5 13.5l-2.04 4.04c-.2.4-.11.88.23 1.22.39.39 1.02.39 1.41 0l4.04-2.04-3.64-3.22z"/></svg>`;
  }

  getPaintIcon(): string {
    return `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31.84 2.41 2 2.83V23h2v-3.17c1.16-.42 2-1.52 2-2.83 0-1.66-1.34-3-3-3zm13.71-9.71L12 0 .29 11.71c-.39.39-.39 1.02 0 1.41l11.29 11.29c.39.39 1.02.39 1.41 0L20.41 13c.39-.39.39-1.02 0-1.41zM13 5.83L18.17 11H7.83L13 5.83z"/></svg>`;
  }

  getWashIcon(): string {
    return `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-. 9-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zM7.5 9l1.5 2v7h9v-7l1.5-2h-12zm0-3h9V4h-9v2z"/></svg>`;
  }

  getHammerIcon(): string {
    return `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.37-.29-.59-.17l-2.49 1.8c-.52-.4-1.08-.73-1.69-.98l-.37-3c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.37 3c-.61.25-1.17.59-1.69.98l-2.49-1.8c-.22-.15-.47-.09-.59.17l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.37.29.59.17l2.49-1.8c.52.4 1.08.73 1.69.98l.37 3c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.37-3c.61-.25 1.17-.59 1.69-.98l2.49 1.8c.23.15.48.09.59-.17l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg>`;
  }
}

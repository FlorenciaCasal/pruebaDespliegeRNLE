# Sistema de Gestión de Visitas – Reserva Natural Lago escondido

Aplicación web desarrollada para la **gestión y control de visitas a una reserva natural**, con foco en la regulación de capacidad, la protección del entorno y la experiencia del visitante.

El sistema se encuentra actualmente **en producción** y cuenta con un **sitio público** y un **panel de administración con acceso restringido**.  
Está diseñado para crecer de forma progresiva incorporando nuevas funcionalidades a futuro.

🌐 Sitio en producción:  
https://www.reservalagoescondido.com.ar

---

## 🎯 Objetivo del sistema

- Regular el flujo de visitantes para preservar la flora y fauna del área protegida.
- Facilitar la gestión de reservas y capacidades diarias.
- Brindar una experiencia clara tanto para visitantes como para el personal de control.

---

## 🧭 Funcionalidades principales

### Sitio público
- Visualización de información general de la reserva.
- Gestión de reservas por parte de los visitantes.
- Página pública de detalle de reserva.
- Acceso a la ubicación mediante integración con **Google Maps**.

### Panel de administración (acceso restringido)
- Gestión de reservas, usuarios y disponibilidad.
- Visualización de reservas confirmadas por día.
- Control de capacidad diaria para evitar sobrecarga del área protegida.
- Gestión de excepciones por fecha:
  - Habilitación / deshabilitación de días específicos.
  - Habilitación / deshabilitación de meses completos.
- Filtros avanzados de reservas:
  - Estado
  - Fecha
  - DNI
  - Nombre
- Exportación de reservas a **Excel**.

---

## 🔐 Seguridad y autenticación

- Autenticación mediante **JWT almacenado en cookies HttpOnly**.
- Control de roles:
  - Administrador completo
  - Administrador con permisos limitados
- Acceso restringido al panel administrativo.

---

## 🧩 Arquitectura y tecnologías

### Frontend
- **Next.js** (App Router)
- **React**
- **TypeScript**
- Renderizado moderno orientado a performance y escalabilidad.

### Backend
- Integración con backend desarrollado en **Spring Boot**.
- Comunicación mediante **APIs REST**.

### Servicios externos
- Notificaciones transaccionales por **WhatsApp** mediante **Twilio** para:
  - Confirmación de visitas
  - Cancelación de reservas

---

## 🚀 Desarrollo local

```bash
npm run dev
# o
yarn dev
# o
pnpm dev

# ROADMAP: NestJS Mastery & Clean Architecture

Este temario sintetiza los cursos oficiales de NestJS (_Fundamentals_, _Authentication_, _Architecture & Advanced Patterns_), la documentación oficial y los estándares de ingeniería de software para proyectos empresariales en producción.

Cada tema abajo se procesa con el **5-Step Cognitive Learning Cycle** de [AGENTS.md](./AGENTS.md) §8. Los tres campos que ves por tema (`Under the Hood`, `Hands-on Challenge`, `DoD`) son solo el contenido fuente que alimenta ese ciclo, no los pasos en sí:

- **Under the Hood** → insumo para el Step 2 (Concept Briefing & Note Generation).
- **Hands-on Challenge** → el Step 3.
- **DoD** → criterio de cierre usado en el Step 4 (Architectural Review) antes de marcar el tema `✅ Completado`.

> **This file is the single source of truth for topic status.** [USER.md](./USER.md) only tracks dates and learnings, never status. Valid values for `**Estado**`: `⏳ Pendiente` · `🔄 En progreso` · `✅ Completado`. A phase checkbox in the "🗺️ Mapa de Fases" list above is marked `[x]` only once every topic inside it is `✅ Completado`.

---

## 🗺️ Mapa de Fases

- [x] **Fase 0: Project Setup, Tooling & Production Foundations**
- [x] **Fase 1: NestJS Core & Primitivas Fundamentales**
- [ ] **Fase 2: Request-Response Lifecycle & Pipeline**
- [ ] **Fase 3: Inyección de Dependencias Avanzada & Dynamic Modules**
- [ ] **Fase 4: Configuración, Persistencia & Repository Pattern**
- [ ] **Fase 5: Seguridad, Autenticación (JWT) & Autorización (RBAC)**
- [ ] **Fase 6: Clean / Hexagonal Architecture & Enterprise Patterns**
- [ ] **Fase 7: Testing Suite Completo (Unit, Integration & E2E)**

---

## 📌 Fase 0: Project Setup, Tooling & Production Foundations

### 0.1 Project Scaffolding & Anatomía de Archivos

- **Under the Hood**: Qué genera el CLI (`nest new`), diferencias entre `tsconfig.json` y `tsconfig.build.json`, rol de `nest-cli.json`, y configuración de Path Aliases (`@/*` o `@core/*`, `@modules/*`).
- **Hands-on Challenge**: Inicializar el proyecto con `@nestjs/cli`, configurar TypeScript en modo estricto (`strict: true`) y definir alias de importación limpios.
- **DoD**: Proyecto compilando sin errores con tipado estricto y alias de rutas funcionando.
- **Estado**: ✅ Completado

### 0.2 Code Quality Tooling: ESLint, Prettier & Git Hooks

- **Under the Hood**: Automatización de calidad de código en equipo; `typescript-eslint`, formateo determinista con Prettier, Git Hooks con `Husky` y `lint-staged` para validar staged files, `commitlint` para Conventional Commits.
- **Hands-on Challenge**: Configurar ESLint con reglas estrictas (sin `any` implícitos, promesas no manejadas), Prettier, y hooks de pre-commit para autoformatear y linting en cada commit.
- **DoD**: No es posible hacer un `git commit` con código mal formateado, errores de linting o mensajes que no sigan Conventional Commits.
- **Estado**: ✅ Completado

### 0.3 Environment Management & Fail-Fast Schema Validation

- **Under the Hood**: Principio 12-Factor App para configuración; cómo `@nestjs/config` lee `.env`, y por qué la validación con esquema (`Joi` o `Zod`) debe detener el arranque de la app (_fail-fast_) si falta una variable requerida.
- **Hands-on Challenge**: Crear `.env.example`, configurar `ConfigModule` global y un esquema de validación estricto para variables como `PORT`, `NODE_ENV` y `APP_NAME`.
- **DoD**: La aplicación arranca si las variables son válidas y lanza un error fatal explicativo si se borra una variable obligatoria de `.env`.
- **Estado**: ✅ Completado

### 0.4 Estructura Modular Profesional (Domain/Feature-First)

- **Under the Hood**: Comparativa entre estructura por capas (_layer-first_) vs por características (_feature-first_). Por qué aislar por features (`src/users`, `src/products`) junto a `src/common` o `src/core` mejora la escalabilidad y mantenibilidad.
- **Hands-on Challenge**: Diseñar la estructura de carpetas base del proyecto siguiendo las convenciones de la industria.
- **DoD**: Estructura de carpetas creada con separación clara entre módulos de dominio y módulos globales de infraestructura.
- **Estado**: ✅ Completado

---

## 📌 Fase 1: NestJS Core & Primitivas Fundamentales

### 1.1 Bootstrap, Application Context & HTTP Adapter

- **Under the Hood**: `NestFactory.create()`, capa de abstracción HTTP (Express vs Fastify), instanciación del IoC Container.
- **Paralelismo**: `Program.cs` / `WebApplication.CreateBuilder()` en ASP.NET Core; `main.ts` / `bootstrapApplication` en Angular.
- **Hands-on Challenge**: Inicializar la aplicación, comprender la estructura de arranque y configurar prefijos globales de API (ej. `/api/v1`).
- **DoD**: Servidor arrancando con `bun run start:dev`, respondiendo a un health check básico en `/api/v1/health`.
- **Estado**: ✅ Completado

### 1.2 Controllers, Routing & HTTP Decorators

- **Under the Hood**: Metadatos con `ReflectMetadata`, mapeo de rutas, extracción de parámetros (`@Param`, `@Query`, `@Body`, `@Headers`, `@Res`, `@Req`).
- **Paralelismo**: `[ApiController]` y `[Route]` en ASP.NET Core; endpoints REST estándar.
- **Hands-on Challenge**: Crear un controlador REST completo (GET, POST, PUT, PATCH, DELETE) para un recurso del dominio.
- **DoD**: Endpoints respondiendo con códigos de estado HTTP semánticos (`200`, `201`, `204`, `404`).
- **Estado**: ✅ Completado

### 1.3 Providers, Services & Inversión de Control (IoC)

- **Under the Hood**: Decorador `@Injectable()`, cómo el contenedor de NestJS resuelve el árbol de dependencias mediante metadata en el constructor.
- **Paralelismo**: `@Injectable({ providedIn: 'root' })` en Angular; `services.AddScoped<IService, Service>()` en C#.
- **Hands-on Challenge**: Extraer la lógica de negocio del controlador hacia un servicio inyectado y desacoplado.
- **DoD**: Controlador sin lógica de negocio; servicio inyectado por constructor con tipado estricto.
- **Estado**: ✅ Completado

### 1.4 Modules, Encapsulamiento & Re-exports

- **Under the Hood**: Los módulos como islas de contexto (encapsulamiento por defecto). `imports`, `controllers`, `providers`, `exports`.
- **Paralelismo**: `NgModule` en Angular; modularización por _bounded contexts_.
- **Hands-on Challenge**: Crear múltiples módulos y compartir servicios exportados entre ellos.
- **DoD**: Módulo dependiente consumiendo un servicio sin errores de resolución de dependencias.
- **Estado**: ✅ Completado

---

## 📌 Fase 2: Request-Response Lifecycle & Pipeline

### 2.1 Middlewares: Interceptando el flujo HTTP base

- **Under the Hood**: Funciones middleware estilo Express que se ejecutan antes de que la petición entre al pipeline de NestJS (`NestMiddleware`).
- **Hands-on Challenge**: Implementar un middleware de logging y correlación de peticiones (`X-Request-ID`).
- **DoD**: Cada petición entrante registra su método, URL, duración y asigna un ID único en cabeceras.
- **Estado**: ✅ Completado

### 2.2 Pipes: Transformación y Validación de Datos

- **Under the Hood**: `PipeTransform`, uso de `ValidationPipe`, `class-validator` y `class-transformer` para validar DTOs en tiempo de ejecución.
- **Paralelismo**: Model Validation & DataAnnotations en C# (`[Required]`, `[StringLength]`).
- **Hands-on Challenge**: Crear DTOs con validación estricta (`whitelist`, `forbidNonWhitelisted`, `transform`) y un Pipe personalizado.
- **DoD**: Rechazo automático de payloads inválidos con errores `400 Bad Request` formateados.
- **Estado**: ✅ Completado

### 2.3 Guards: Control de Acceso & Autorización

- **Under the Hood**: `CanActivate`, `ExecutionContext`, lectura de metadatos con `Reflector`. Se ejecutan después de middlewares y antes de interceptores/pipes.
- **Paralelismo**: `[Authorize]` attributes y Policy Guards en C# / Angular `CanActivateFn`.
- **Hands-on Challenge**: Crear un Guard para validar tokens/API keys y un decorador personalizado de roles.
- **DoD**: Peticiones no autorizadas rechazadas con `403 Forbidden` antes de invocar el handler del controlador.
- **Estado**: 🔄 En progreso

### 2.4 Interceptors: AOP (Aspect Oriented Programming) con RxJS

- **Under the Hood**: `NestInterceptor`, `CallHandler`, streams de RxJS para mutar la respuesta, medir tiempos de ejecución o implementar caching.
- **Hands-on Challenge**: Crear un interceptor que estandarice la estructura de respuesta (`{ success: true, data: ..., timestamp: ... }`) y mida el tiempo de respuesta.
- **DoD**: Todas las respuestas salientes envueltas en el formato estándar unificado.
- **Estado**: ⏳ Pendiente

### 2.5 Exception Filters: Manejo Global y Limpio de Errores

- **Under the Hood**: `ExceptionFilter`, decorador `@Catch()`, captura de `HttpException` y excepciones no controladas.
- **Hands-on Challenge**: Implementar un Exception Filter global que capture errores inesperados, enmascare detalles internos y devuelva un JSON uniforme.
- **DoD**: Errores no controlados retornan `500 Internal Server Error` sin exponer stacktraces en producción.
- **Estado**: ⏳ Pendiente

### 2.6 Custom Parameter Decorators & ExecutionContext

- **Under the Hood**: `createParamDecorator()`, abstracción sobre `ExecutionContext` para extraer datos limpios en la firma del método.
- **Hands-on Challenge**: Crear decoradores como `@CurrentUser()` o `@ClientIp()`.
- **DoD**: Controlador consumiendo datos del contexto sin acoplarse al objeto `req` crudo de Express.
- **Estado**: ⏳ Pendiente

---

## 📌 Fase 3: Inyección de Dependencias Avanzada & Dynamic Modules

### 3.1 Custom Providers & Injection Tokens

- **Under the Hood**: `useClass`, `useValue`, `useFactory`, `useExisting`, tokens basados en `string` o `Symbol`.
- **Paralelismo**: `InjectionToken` en Angular; IoC registration en C#.
- **Hands-on Challenge**: Inyectar configuraciones externas, clientes de terceros o implementaciones mock usando `useFactory` y tokens personalizados.
- **DoD**: Servicio desacoplado de la implementación concreta mediante interfaces y tokens.
- **Estado**: ⏳ Pendiente

### 3.2 Dynamic Modules (`forRoot`, `register`, `forRootAsync`)

- **Under the Hood**: Módulos configurables en tiempo de compilación/ejecución con soporte para configuración asíncrona.
- **Hands-on Challenge**: Crear un módulo dinámico reutilizable (ej. un módulo de notificaciones o cliente HTTP configurable).
- **DoD**: Módulo importado en `AppModule` mediante `.forRootAsync()` consumiendo variables de entorno.
- **Estado**: ⏳ Pendiente

### 3.3 Scopes de Inyección & Lifecycle Hooks

- **Under the Hood**: `Scope.DEFAULT` (Singleton), `Scope.REQUEST`, `Scope.TRANSIENT`, hooks `OnModuleInit`, `OnApplicationBootstrap`, `OnModuleDestroy`.
- **Hands-on Challenge**: Analizar el impacto de rendimiento de `Scope.REQUEST` y gestionar conexiones en el ciclo de vida.
- **DoD**: Proveedor gestionando su inicialización y limpieza mediante hooks del ciclo de vida.
- **Estado**: ⏳ Pendiente

---

## 📌 Fase 4: Configuración, Persistencia & Repository Pattern

### 4.1 Base de Datos & ORM (Prisma / TypeORM)

- **Under the Hood**: Mapeo relacional, migraciones, pooling de conexiones y ciclo de vida de la base de datos.
- **Hands-on Challenge**: Configurar modelos, migraciones y conexión a una base de datos relacional (ej. PostgreSQL / SQLite para desarrollo).
- **DoD**: Esquema migrado y operaciones de lectura/escritura funcionando contra la base de datos.
- **Estado**: ⏳ Pendiente

### 4.2 Repository Pattern & Aislamiento de Entidades

- **Under the Hood**: Desacoplar el modelo de dominio de la persistencia de base de datos (Ports & Adapters).
- **Hands-on Challenge**: Implementar una interfaz de repositorio en el dominio y su adaptador concreto en infraestructura.
- **DoD**: Los servicios de aplicación dependen únicamente de la interfaz del repositorio, no del ORM directamente.
- **Estado**: ⏳ Pendiente

### 4.3 Transacciones & Unit of Work

- **Under the Hood**: Manejo de transacciones ACID para operaciones atómicas multi-tabla.
- **Hands-on Challenge**: Implementar un caso de uso que requiera atomicidad (ej. crear orden + descontar inventario).
- **DoD**: Rollback automático en caso de fallo intermedio durante la operación.
- **Estado**: ⏳ Pendiente

---

## 📌 Fase 5: Seguridad, Autenticación & Autorización

### 5.1 Password Hashing, Rate Limiting & Security Headers

- **Under the Hood**: Hashing con `bcrypt` / `argon2`, protección contra ataques con `helmet`, CORS y rate limiting con `@nestjs/throttler`.
- **Hands-on Challenge**: Configurar protección global contra fuerza bruta y cabeceras seguras.
- **DoD**: Endpoints protegidos con límites de peticiones y contraseñas hasheadas en persistencia.
- **Estado**: ⏳ Pendiente

### 5.2 Autenticación con JWT & Passport

- **Under the Hood**: `@nestjs/passport`, `passport-jwt`, estrategias, generación y verificación de Access Tokens y Refresh Tokens.
- **Hands-on Challenge**: Implementar endpoints de registro, login y refresh token con guardias de autenticación.
- **DoD**: Endpoints privados protegidos con `JwtAuthGuard` validando el token de portador (`Bearer`).
- **Estado**: ⏳ Pendiente

### 5.3 Autorización Granular: RBAC & Resource Ownership

- **Under the Hood**: Role-Based Access Control, decoradores personalizados (`@Roles()`), validación de propiedad de recursos.
- **Hands-on Challenge**: Restringir endpoints según roles (Admin/User) y verificar que un usuario solo modifique sus propios registros.
- **DoD**: Rechazo de acceso a usuarios con rol insuficiente o que intenten modificar datos ajenos.
- **Estado**: ⏳ Pendiente

---

## 📌 Fase 6: Clean / Hexagonal Architecture & Enterprise Patterns

### 6.1 Arquitectura Hexagonal (Ports & Adapters) en NestJS

- **Under the Hood**: Separación estricta de capas:
  - `Domain`: Entidades puras, Value Objects, Interfaces de Repositorios (Zero dependencias de NestJS).
  - `Application`: Use Cases / Services coordinadores.
  - `Infrastructure`: Controladores, Entidades del ORM, Repositorios concretos, Clientes externos.
- **Hands-on Challenge**: Reestructurar un módulo completo bajo el patrón Hexagonal.
- **DoD**: El dominio no importa ningún paquete de `@nestjs/*` ni de persistencia.
- **Estado**: ⏳ Pendiente

### 6.2 Event-Driven Architecture (`@nestjs/event-emitter`)

- **Under the Hood**: Publicación y suscripción desacoplada de eventos de dominio en memoria.
- **Hands-on Challenge**: Disparar eventos de dominio (ej. `UserCreatedEvent`) y reaccionar de forma asíncrona.
- **DoD**: Efectos secundarios (ej. enviar email, auditoría) ejecutados sin acoplar el caso de uso principal.
- **Estado**: ⏳ Pendiente

### 6.3 CQRS Pattern (`@nestjs/cqrs`)

- **Under the Hood**: Command Query Responsibility Segregation. Separar mutaciones (Commands) de consultas (Queries).
- **Hands-on Challenge**: Implementar un Command Handler y un Query Handler con el bus de `@nestjs/cqrs`.
- **DoD**: Casos de uso modelados como comandos y consultas individuales con responsabilidad única.
- **Estado**: ⏳ Pendiente

---

## 📌 Fase 7: Testing Suite Completo & Production Readiness

### 7.1 Unit Testing con Jest & Mocking de Dependencias

- **Under the Hood**: Pruebas unitarias puras, mocks de servicios y repositorios sin levantar el framework.
- **Hands-on Challenge**: Escribir pruebas unitarias exhaustivas para casos de uso y servicios de dominio.
- **DoD**: Cobertura de ramas (branch coverage) alta con tests rápidos e independientes.
- **Estado**: ⏳ Pendiente

### 7.2 Integration Testing con `Test.createTestingModule`

- **Under the Hood**: `TestingModule` de `@nestjs/testing`, resolución de dependencias en un contenedor de prueba aislado.
- **Hands-on Challenge**: Testear controladores, pipes y guards en conjunto.
- **DoD**: Tests de integración verificando la interacción entre capas sin servidor HTTP real.
- **Estado**: ⏳ Pendiente

### 7.3 End-to-End (E2E) Testing con Supertest

- **Under the Hood**: Pruebas de caja negra levantando la instancia completa de NestJS contra una base de datos de test.
- **Hands-on Challenge**: Escribir un suite E2E que cubra un flujo completo de usuario (Registro → Login → CRUD → Logout).
- **DoD**: Suite E2E ejecutándose con `bun run test:e2e` pasando en verde.
- **Estado**: ⏳ Pendiente

### 7.4 Health Checks, Logging & Graceful Shutdown

- **Under the Hood**: `@nestjs/terminus`, cierre ordenado de conexiones (`enableShutdownHooks`), estructuración de logs.
- **Hands-on Challenge**: Endpoint de `/health` con chequeo de BD y memoria.
- **DoD**: Endpoint de salud respondiendo estado de los subsistemas y cierre limpio ante señales `SIGTERM`.
- **Estado**: ⏳ Pendiente

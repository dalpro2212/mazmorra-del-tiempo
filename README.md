# La Mazmorra del Tiempo

Videojuego de plataformas 2D al estilo *Prince of Persia*, hecho con JavaScript y HTML5 Canvas, sin librerías. Atraviesa 3 niveles llenos de pinchos, enemigos y un jefe final.

## Cómo instalar y jugar (para cualquier persona)

### Opción A: instalador de Windows
1. Descarga el archivo **`La Mazmorra del Tiempo Setup 1.0.0.exe`**.
2. Haz **doble clic** una sola vez. Se instala solo.
3. Si Windows muestra *"Windows protegió su PC"*, pulsa **Más información** y luego **Ejecutar de todas formas**. Es normal: el programa no tiene firma digital.
4. Para jugar, abre el ícono **La Mazmorra del Tiempo** que queda en el escritorio (no vuelvas a abrir el instalador).

Para desinstalar: *Configuración → Aplicaciones → La Mazmorra del Tiempo → Desinstalar*.

### Opción B: jugar en el navegador (sin instalar)
👉 https://dalpro2212.github.io/mazmorra-del-tiempo/

## Controles
| Acción | Tecla |
|---|---|
| Moverse | Flechas o A / D |
| Saltar | Flecha arriba, W o Espacio |
| Atacar con espada | J |
| Reiniciar | R |
| Volver al menú | Esc |
| Pantalla completa (versión instalada) | F11 |

## Personajes
- **Daniel:** guerrero fuerte. 4 vidas, espada de daño 2 y largo alcance.
- **Belu:** ágil y veloz. 3 vidas, espada rápida y **doble salto**.

## Cómo se juega
- Llega a la puerta dorada de cada nivel.
- Esquiva los pinchos (algunos aparecen y desaparecen) y los huecos.
- Derrota a bandidos y ogros con la espada.
- Recoge monedas para subir tu puntuación; el récord se guarda.
- Las banderas son checkpoints: reapareces ahí si pierdes una vida.
- En el Nivel 3, derrota al **Rey Ogro** para abrir la puerta final.

## Estructura del proyecto
- `index.html`: página principal
- `js/main.js`: bucle principal y estados del juego
- `js/player.js`: jugador, vidas, espada y personajes
- `js/enemies.js`: enemigos
- `js/boss.js`: jefe final
- `js/levels/`: un archivo por nivel
- `js/art.js`: gráficos dibujados con código
- `js/ui.js`: menú, HUD y pantallas
- `electron-main.js` y `package.json`: empaquetado del instalador

## Crear el instalador desde el código
Requiere Node.js.
```bash
npm install
npm run dist
```
El instalador queda en la carpeta `dist/`.

## Git y GitHub
- **Git** es el sistema de control de versiones local. Es **distribuido**: cada copia tiene todo el historial, a diferencia de uno centralizado como SVN.
- **GitHub** es la plataforma remota donde se aloja el repositorio y se colabora con ramas, Issues, Pull Requests y tableros.

### Flujo de trabajo
- Nada de commits directos a `main`.
- Una rama `feature/...` por cada mejora.
- Pull Requests con descripción y captura, vinculados a un Issue.
- Tablero en GitHub Projects (To Do, In Progress, In Review, Done).

## Autor
dalpro2212
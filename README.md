# La Mazmorra del Tiempo

Videojuego de plataformas 2D al estilo *Prince of Persia*, hecho con JavaScript y HTML5 Canvas, sin librerías.

## Jugar online
👉 https://dalpro2212.github.io/mazmorra-del-tiempo/

## Controles
| Acción | Tecla |
|---|---|
| Moverse | Flechas o A / D |
| Saltar | Flecha arriba, W o Espacio |
| Atacar con espada | J |
| Reiniciar | R |
| Volver al menú | Esc |

## Personajes
- **Daniel:** guerrero fuerte. 4 vidas, espada de daño 2 y largo alcance.
- **Belu:** ágil y veloz. 3 vidas, espada rápida y **doble salto**.

## Características
- 3 niveles largos con cámara, pinchos fijos e intermitentes y huecos.
- Enemigos (bandidos y ogros) y jefe final, el Rey Ogro.
- Monedas, puntuación con récord y checkpoints.

## Estructura del proyecto
- `js/player.js`: jugador, vidas, espada y personajes
- `js/enemies.js`: enemigos
- `js/boss.js`: jefe final
- `js/levels/`: un archivo por nivel
- `js/art.js`: gráficos dibujados con código
- `js/ui.js`: menú, HUD y pantallas
- `js/main.js`: bucle principal

## Git y GitHub
- **Git** es el sistema de control de versiones que corre en mi computadora y guarda el historial de cambios. Es **distribuido**: cada copia tiene todo el historial, a diferencia de uno centralizado como SVN.
- **GitHub** es la plataforma remota donde se aloja el repositorio y donde se colabora con ramas, Issues, Pull Requests y tableros.

## Flujo de trabajo
- Nada de commits directos a `main`.
- Ramas `feature/...` para cada mejora.
- Pull Requests con descripción y captura, vinculados a un Issue.
- Tablero en GitHub Projects (To Do, In Progress, In Review, Done).
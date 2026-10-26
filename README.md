# KAIROS — tienda demo

Sitio web responsive para una marca de botellas, licores y regalos personalizados. Está inspirado en patrones comunes de tiendas de regalos y licores (portada, categorías, catálogo, constructor de regalo, bolsa y pedido por WhatsApp), pero usa estructura, textos y branding propios de KAIROS.

## Archivos

- `index.html`: estructura de páginas y ventanas de la tienda.
- `css/styles.css`: todos los estilos y el diseño responsive.
- `js/catalog.js`: **archivo principal para editar productos, categorías, cajas y WhatsApp**.
- `js/app.js`: lógica de filtros, bolsa, creador de regalos y administrador local.

## Cómo abrir

1. Descomprime el ZIP.
2. Abre `index.html` en un navegador moderno.
3. Para evitar restricciones del navegador con almacenamiento local, también puedes ejecutar un servidor local desde esta carpeta:
   - Python: `python -m http.server 8000`
   - Abre `http://localhost:8000`.

No requiere Node, frameworks ni dependencias de instalación. La interfaz usa Google Fonts y algunas imágenes remotas; si no hay conexión, el resto del sitio funciona y las imágenes muestran un respaldo visual.

## Cómo actualizar productos

Abre `js/catalog.js`. El arreglo `products` contiene los productos; cada producto tiene estos campos:

```js
{
  id: "vino-ejemplo",             // identificador único, sin repetir
  name: "Vino Reserva",           // nombre visible
  category: "Vinos",              // debe coincidir con una categoría
  style: "Tinto · 750 ml",        // subtítulo opcional
  description: "Descripción…",    // texto corto
  price: 65900,                    // COP, sin puntos ni símbolo
  oldPrice: 79900,                 // opcional, puede omitirse
  image: "https://…/foto.jpg",    // URL pública directa, o "" para ilustración alternativa
  featured: true,                  // destacar al ordenar
  available: true,                 // false muestra como agotado
  badge: "Favorito"                // etiqueta opcional
}
```

Para agregar una categoría, añádela al arreglo `categories`, por ejemplo `"Ginebra"`. Luego crea productos con `category: "Ginebra"`. Puedes reorganizar categorías o cambiar precios editando este archivo y recargando la página.

## Configurar los pedidos por WhatsApp

En `js/catalog.js`, cambia:

```js
whatsappNumber: "573000000000"
```

por el número real en formato internacional, solo dígitos: indicativo de país + número; para Colombia suele empezar por `57`. No incluyas `+`, espacios ni guiones. Mientras quede el número de ejemplo, el sitio bloquea la salida de pedidos para que no se envíen a un número equivocado.

## Administrador local

Desde el pie de página entra en **Administrar catálogo**. Permite añadir, editar o eliminar productos, cambiar categorías, importar JSON y exportar una copia del catálogo. Estas modificaciones se guardan en `localStorage` en **ese navegador y dispositivo**, no en un servidor ni para otros visitantes. Es una herramienta auxiliar para probar y editar, no un panel de administración seguro para producción.

Para que los cambios se publiquen a todos los visitantes, aplica las modificaciones a `js/catalog.js` y vuelve a desplegar el sitio, o integra un backend/CMS con autenticación.

## Antes de publicar

- Reemplaza productos, precios, imágenes de ejemplo y disponibilidad por datos reales.
- Verifica con el negocio la cobertura, costos de entrega, medios de pago, políticas de cambios y tiempos de confirmación.
- Configura WhatsApp y dominio.
- Conecta el formulario de correo a una plataforma real de email marketing; actualmente es demostrativo y no suscribe a nadie.
- Añade páginas legales completas y un flujo de privacidad/datos personales.
- La confirmación de mayoría de edad es solamente una puerta de entrada en el navegador, no una verificación de identidad o edad con validez legal.
- Para pagos en línea, inventario centralizado, pedidos compartidos entre dispositivos o protección del administrador, integra backend o plataforma de ecommerce. El frontend actual confirma pedidos por WhatsApp y calcula totales estimados localmente.
- Consulta los requisitos legales locales aplicables a la comercialización de bebidas alcohólicas, publicidad, etiquetado, impuestos y envío antes de operar.

## Nota sobre tecnología

El navegador ejecuta **JavaScript**, junto con HTML y CSS. Java es un lenguaje distinto y normalmente se usaría en un backend (por ejemplo, Spring Boot); este proyecto funciona como frontend estático y no necesita Java.


## Cambios recientes
- Paleta actualizada a azul oscuro elegante y dorado.
- Logo proporcionado por KAIROS incluido en `images/kairos-logo.jpeg`.
- En la columna **Explora** del pie de página está el acceso **Administrador**. Acepta el correo `kairos@gmail.com`.
- El formulario de producto permite seleccionar una fotografía local y ver una vista previa. En esta versión la imagen se guarda como dato local del navegador y el catálogo sigue siendo local; no se comparte automáticamente entre dispositivos.

### Importante sobre seguridad y publicación
El acceso por correo sin contraseña no es una autenticación segura: cualquier persona que conozca ese correo podría entrar. Está implementado como prototipo solicitado. Antes de publicar una tienda real, conecta autenticación con contraseña o proveedor de identidad, base de datos y almacenamiento de imágenes (por ejemplo, Supabase o Firebase), con permisos solo para el administrador.


## Flujo recomendado para actualizar el catálogo

1. Abre la tienda localmente y entra a Explora → Administrador.
2. Edita productos/categorías y pulsa **Descargar catalog.js**.
3. Reemplaza el archivo `js/catalog.js` del proyecto por el descargado (mismo nombre).
4. Si subiste una imagen desde el administrador, por ahora quedará incrustada como data URL dentro del `catalog.js` exportado para que no se pierda al reemplazar el archivo. Para mantener las fotos en carpeta, copia la imagen a `images/products/` y cambia el campo `image` del producto a su ruta relativa, por ejemplo `images/products/whisky.jpg`.
5. Publica de nuevo toda la carpeta del sitio.

## Fotos locales

Los productos ahora apuntan a `images/products/`. El paquete incluye imágenes SVG de marcador para que la web funcione desde el primer momento. Para descargar las fotos de referencia que antes estaban enlazadas desde Unsplash, ejecuta desde esta carpeta `python3 descargar_imagenes.py` en un equipo con internet. El script guardará los JPG en `images/products/` y cambiará las rutas en `js/catalog.js` para utilizar los JPG descargados. Reemplaza las fotos de referencia por fotografías propias y verifica los derechos de uso antes de publicar.

**Importante:** el administrador sigue guardando cambios en el navegador; el botón Descargar catalog.js genera un archivo para reemplazar el catálogo del código fuente manualmente. No edita por sí solo los archivos del disco por restricciones de seguridad del navegador.
# KAIROS
# KAIROS
# KAIROS
# PaginaKairos
# PaginaKairos

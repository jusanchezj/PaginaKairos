/*
 KAIROS — Catálogo de demostración.
 Edita las categorías y productos de este archivo para actualizar la tienda publicada.
 Precios en COP, sin puntos ni símbolos: 89900 = $89.900.
 Imágenes: usa una ruta local dentro de images/products/, por ejemplo images/products/whisky.jpg.
 Este catálogo de ejemplo no representa inventario ni precios reales.
*/
window.KAIROS_CATALOG = {
  whatsappNumber: "573128458572",

  categories: [
    "Vinos",
    "Whisky",
    "Tequila",
    "Champagne",
    "Aguardiente",
    "Espumosos",
    "Vino de reserva",
    "Regalos"
  ],

  products: [
    {
      id: "wine-malbec",
      name: "Vino Tinto Malbec Las Moras",
      category: "Vinos",
      style: "Malbec · 750 ml",
      description: "Un tinto frutal para cenas, reuniones y momentos especiales.",
      price: 89900,
      image: "images/products/Tinto malbec las moras.png",
      featured: true,
      available: true,
      badge: "Favorito"
    },
    {
      id: "wine-premium-las-moras",
      name: "Vino Tinto Black Label Las Moras",
      category: "Vino de reserva",
      style: "Malbec · 750 ml",
      description: "Malbec de color violeta intenso, con ciruela madura, café tostado y chocolate. Su estructura y taninos suaves lo hacen ideal para carnes rojas y quesos maduros.",
      price: 159000,
      image: "images/products/Tinto premium las moras.png",
      featured: true,
      available: true,
      badge: "Selección"
    },
    {
      id: "wine-premium-enata",
      name: "Vino Tinto Enate Cabernet Sauvignon Merlot",
      category: "Vino de reserva",
      style: "Cabernet Sauvignon · Merlot · 750 ml",
      description: "Blend de Cabernet Sauvignon y Merlot, de carácter frutal y taninos aterciopelados. Acompaña muy bien asados, carnes y quesos.",
      price: 159000,
      image: "images/products/Enate.png",
      featured: true,
      available: true,
      badge: "Selección"
    },
    {
      id: "wine-premium-ramon",
      name: "Vino Tinto Ramón Bilbao Edición Limitada",
      category: "Vino de reserva",
      style: "Tempranillo · Rioja · 750 ml",
      description: "Tempranillo de Rioja con fruta negra madura y notas de pimienta, clavo y chocolate. De estructura amplia y final prolongado, perfecto para acompañar carnes y quesos curados.",
      price: 159000,
      image: "images/products/Ramon Bilbao.png",
      featured: true,
      available: true,
      badge: "Selección"
    },
    {
      id: "wine-premium-Celia",
      name: "Vino Blanco La Celia Pioneer Chardonnay",
      category: "Vino de reserva",
      style: "Chardonnay · 750 ml",
      description: "Chardonnay fresco y equilibrado, con aromas cítricos y de ananá, notas cremosas y un toque mineral. Ideal con pescados, mariscos y carnes blancas.",
      price: 159000,
      image: "images/products/Celia.png",
      featured: true,
      available: true,
      badge: "Selección"
    },
    
    {
      id: "wine-trapiche",
      name: "Vino Tinto Merlot Santa Helena",
      category: "Vinos",
      style: "Merlot · 750 ml",
      description: "Merlot chileno de fruta madura y textura amable, con notas de ciruela y mora. Una buena elección para acompañar pastas, carnes y reuniones para compartir.",
      price: 89900,
      image: "images/products/Santa Helena Merlot.png",
      featured: true,
      available: true
    },
    {
      id: "wine-caro-calvet",
      name: "Vino Bonarda Las Moras",
      category: "Vinos",
      style: "Bonarda · 750 ml",
      description: "Bonarda de fruta roja y negra, con recuerdos de cereza, vainilla y café tostado. Sus taninos redondos acompañan carnes rojas o una conversación sin prisa.",
      price: 89900,
      image: "images/products/Bonarda.png",
      featured: false,
      available: true
    },
    {
      id: "wine-white-las-moras",
      name: "Vino Blanco Sauvignon Santa Helena",
      category: "Vinos",
      style: "Sauvignon Blanc · 750 ml",
      description: "Sauvignon Blanc fresco, de acidez vivaz y perfil frutal. Va muy bien con pescados, ensaladas y quesos suaves.",
      price: 89900,
      image: "images/products/Santa Helena Sauvignion.png",
      featured: false,
      available: true
    },
    {
      id: "wine-white-chardonnay",
      name: "Vino Blanco Chardonnay Las Moras",
      category: "Vinos",
      style: "Chardonnay · 750 ml",
      description: "Chardonnay fresco y equilibrado, con notas de piña, miel y mantequilla. Una opción versátil para carnes blancas y mariscos.",
      price: 89900,
      image: "images/products/Chardonnay.png",
      featured: false,
      available: true
    },
    {
      id: "wine-rose",
      name: "Vino Rosado Reservado Santa Carolina",
      category: "Vino de reserva",
      style: "Reservado Rosé · 750 ml",
      description: "Un rosado chileno con notas de frutos rojos, delicados matices florales y un toque cítrico. Fresco y versátil para aperitivos, ensaladas y encuentros al aire libre.",
      price: 89900,
      image: "images/products/Rose.png",
      featured: false,
      available: true
    },
    {
      id: "whisky-cream",
      name: "Whisky Baileys",
      category: "Whisky",
      style: "Licor de crema · 700 ml",
      description: "Licor irlandés de crema con notas de chocolate y vainilla. Disfrútalo con hielo, en un cóctel o como toque especial sobre un postre.",
      price: 139900,
      image: "images/products/Whisky crema.png",
      featured: false,
      available: true
    },
    {
      id: "whisky-johnnie-walker-black",
      name: "Johnnie Walker Black Label",
      category: "Whisky",
      style: "Blended Scotch Whisky · 750 ml",
      description: "Un blended Scotch de perfil equilibrado, con dulzor suave y notas ahumadas. Disfrútalo solo, con hielo o en un cóctel clásico.",
      price: 189900,
      image: "images/products/Whisky Johny Walker Black.png",
      featured: true,
      available: true,
      badge: "Selección"
    },
    

    {
      id: "tequila-centenario",
      name: "Tequila Centenario",
      category: "Tequila",
      style: "Tequila ·750 ml",
      description: "Una botella con carácter para quienes disfrutan los destilados mexicanos.",
      price: 165000,
      image: "images/products/Tequila Centenario.png",
      featured: false,
      available: true
    },

    {
      id: "champagne-lp",
      name: "Champagne LP",
      category: "Champagne",
      style: "Champagne · 750 ml",
      description: "Burbujas para aniversarios, logros profesionales y grandes noticias.",
      price: 499000,
      image: "images/products/Champaign LP.png",
      featured: true,
      available: true,
      badge: "Para celebrar"
    },
  
    {
      id: "aguardiente-amarillo-750",
      name: "Aguardiente Amarillo 750 ml",
      category: "Aguardiente",
      style: "Aguardiente · 750 ml",
      description: "Una botella para compartir en reuniones y celebraciones colombianas.",
      price: 89900,
      image: "images/products/Aguardiente Amarillo 750.png",
      featured: true,
      available: true,
      badge: "Favorito"
    },
    {
      id: "sparkling-jp-rosado",
      name: "Espumoso JP Rosado",
      category: "Espumosos",
      style: "Rosado · 750 ml",
      description: "Una alternativa fresca y festiva para cumpleaños y encuentros especiales.",
      price: 125000,
      image: "images/products/Espumoso JP Rosado.png",
      featured: false,
      available: true
    },
    {
      id: "sparkling-mionetto",
      name: "Espumoso Mionetto",
      category: "Espumosos",
      style: "Espumoso · 750 ml",
      description: "Burbujas para brindar por nuevos proyectos y buenas noticias.",
      price: 139000,
      image: "images/products/Espumoso Moneto.png",
      featured: true,
      available: true
    },
   
    {
      id: "gift-card",
      name: "Tarjeta de Regalo KAIROS",
      category: "Regalos",
      style: "Digital · Personalizable",
      description: "Deja que esa persona elija su próximo motivo para brindar.",
      price: 100000,
      image: "images/products/tarjeta-regalo.png",
      featured: false,
      available: true,
      badge: "Un detalle especial",
      isGift: true
    }
  ]
};

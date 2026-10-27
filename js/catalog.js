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
    "Sin alcohol",
    "Regalos"
  ],

  giftBases: [
    {
      id: "kraft",
      name: "Caja esencial",
      description: "Caja de madera con acabado limpio",
      price: 25000,
      tone: "kraft"
    },
    {
      id: "premium",
      name: "Caja premium",
      description: "Caja de madera con acabado negro",
      price: 35000,
      tone: "dark",
      featured: true
    },
    {
      id: "wood",
      name: "Caja especial",
      description: "Caja de madera con acabado azúl",
      price: 45000,
      tone: "wood"
    }
  ],

  products: [
    {
      id: "wine-malbec",
      name: "Vino Tinto Malbec Las Moras",
      category: "Vinos",
      style: "Malbec · 750 ml",
      description: "Un tinto frutal para cenas, reuniones y momentos especiales.",
      price: 65900,
      image: "images/products/Tinto malbec las moras.png",
      featured: true,
      available: true,
      badge: "Favorito"
    },
    {
      id: "wine-premium-las-moras",
      name: "Vino Tinto Premium Las Moras",
      category: "Vinos",
      style: "Tinto · 750 ml",
      description: "Una selección especial para celebrar metas cumplidas y ocasiones memorables.",
      price: 89900,
      image: "images/products/Tinto premium las moras.png",
      featured: true,
      available: true,
      badge: "Selección"
    },
    {
      id: "wine-trapiche",
      name: "Vino Tinto Trapiche",
      category: "Vinos",
      style: "Tinto · 750 ml",
      description: "Una alternativa versátil para compartir una buena conversación.",
      price: 78900,
      image: "images/products/Tinto trapiche.png",
      featured: true,
      available: true
    },
    {
      id: "wine-caro-calvet",
      name: "Vino Tinto Caro Calvet",
      category: "Vinos",
      style: "Tinto · 750 ml",
      description: "Ideal para acompañar comidas y regalar a quienes disfrutan el vino.",
      price: 69900,
      image: "images/products/Tinto caro calvet.png",
      featured: false,
      available: true
    },
    {
      id: "wine-white-las-moras",
      name: "Vino Blanco Sauvignon Las Moras",
      category: "Vinos",
      style: "Sauvignon Blanc · 750 ml",
      description: "Fresco y aromático, ideal para comidas ligeras y encuentros de día.",
      price: 69900,
      image: "images/products/Blanco Sauvignoun las moras.png",
      featured: false,
      available: true
    },
    {
      id: "whisky-cream",
      name: "Whisky Crema",
      category: "Whisky",
      style: "Licor de crema · presentación por confirmar",
      description: "Una alternativa suave para disfrutar después de una comida.",
      price: 89900,
      image: "images/products/Whisky crema.png",
      featured: false,
      available: true
    },
    {
      id: "whisky-johnnie-walker-black",
      name: "Johnnie Walker Black Label",
      category: "Whisky",
      style: "Blended Scotch Whisky · 750 ml",
      description: "Un whisky de perfil intenso para celebraciones y regalos especiales.",
      price: 189900,
      image: "images/products/Whisky Johny Walker Black.png",
      featured: true,
      available: true,
      badge: "Selección"
    },
    {
      id: "whisky-johnnie-walker-red",
      name: "Johnnie Walker Red Label",
      category: "Whisky",
      style: "Blended Scotch Whisky · 750 ml",
      description: "Una opción versátil para reuniones y celebraciones entre amigos.",
      price: 129900,
      image: "images/products/Whisky Johny Walker Red.png",
      featured: false,
      available: true
    },
    {
      id: "tequila-1800-blanco",
      name: "Tequila 1800 Blanco",
      category: "Tequila",
      style: "Blanco · presentación por confirmar",
      description: "Un tequila limpio y versátil para coctelería y celebraciones.",
      price: 179900,
      image: "images/products/Tequila 1800 blanco.png",
      featured: true,
      available: true
    },
    {
      id: "tequila-centenario",
      name: "Tequila Centenario",
      category: "Tequila",
      style: "Tequila · presentación por confirmar",
      description: "Una botella con carácter para quienes disfrutan los destilados mexicanos.",
      price: 149900,
      image: "images/products/Tequila Centenario.png",
      featured: false,
      available: true
    },
    {
      id: "tequila-cristalino",
      name: "Tequila Cristalino",
      category: "Tequila",
      style: "Cristalino · presentación por confirmar",
      description: "Una alternativa elegante para regalar o compartir en una ocasión especial.",
      price: 189900,
      image: "images/products/Tequila Cristalino.png",
      featured: false,
      available: true
    },
    {
      id: "champagne-lp",
      name: "Champagne LP",
      category: "Champagne",
      style: "Champagne · presentación por confirmar",
      description: "Burbujas para aniversarios, logros profesionales y grandes noticias.",
      price: 249900,
      image: "images/products/Champaign LP.png",
      featured: true,
      available: true,
      badge: "Para celebrar"
    },
    {
      id: "champagne-veuve",
      name: "Champagne Veuve",
      category: "Champagne",
      style: "Champagne · presentación por confirmar",
      description: "Una opción sofisticada para celebraciones que merecen un brindis especial.",
      price: 349900,
      image: "images/products/Champaign Veuve.png",
      featured: true,
      available: true
    },
    {
      id: "aguardiente-amarillo-350",
      name: "Aguardiente Amarillo 350 ml",
      category: "Aguardiente",
      style: "Aguardiente · 350 ml",
      description: "Una presentación práctica para reuniones pequeñas y detalles de celebración.",
      price: 39900,
      image: "images/products/Aguardiente Amarillo 350.png",
      featured: false,
      available: true
    },
    {
      id: "aguardiente-amarillo-750",
      name: "Aguardiente Amarillo 750 ml",
      category: "Aguardiente",
      style: "Aguardiente · 750 ml",
      description: "Una botella para compartir en reuniones y celebraciones colombianas.",
      price: 69900,
      image: "images/products/Aguardiente Amarillo 750.png",
      featured: true,
      available: true,
      badge: "Favorito"
    },
    {
      id: "sparkling-jp-rosado",
      name: "Espumoso JP Rosado",
      category: "Espumosos",
      style: "Rosado · presentación por confirmar",
      description: "Una alternativa fresca y festiva para cumpleaños y encuentros especiales.",
      price: 59900,
      image: "images/products/Espumoso JP Rosado.png",
      featured: false,
      available: true
    },
    {
      id: "sparkling-mionetto",
      name: "Espumoso Mionetto",
      category: "Espumosos",
      style: "Espumoso · presentación por confirmar",
      description: "Burbujas para brindar por nuevos proyectos y buenas noticias.",
      price: 89900,
      image: "images/products/Espumoso Moneto.png",
      featured: true,
      available: true
    },
    {
      id: "non-alcoholic-sangre-de-toro",
      name: "Sangre de Toro Sin Alcohol",
      category: "Sin alcohol",
      style: "Bebida sin alcohol · presentación por confirmar",
      description: "Una alternativa para disfrutar el ritual del brindis sin alcohol.",
      price: 49900,
      image: "images/products/Sin alcohol Sangre de toro.png",
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
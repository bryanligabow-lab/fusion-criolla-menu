// Datos del menú Fusión Criolla
const MENU = [
  // TÍPICOS
  { cat: "tipicos", name: "Encebollado", price: 3.00, emoji: "🍲" },
  { cat: "tipicos", name: "Guatita", price: 3.50, emoji: "🍛" },
  { cat: "tipicos", name: "Bandera", price: 6.00, emoji: "🏁", desc: "Guatita, ceviche de pescado, camarón y concha" },
  { cat: "tipicos", name: "Encocado de pescado", price: 5.00, emoji: "🐟" },
  { cat: "tipicos", name: "Encocado mixto", price: 7.00, emoji: "🥘" },
  { cat: "tipicos", name: "Seco de pollo", price: 3.50, emoji: "🍗" },
  { cat: "tipicos", name: "Tonga manaba", price: 6.00, emoji: "🍱" },
  { cat: "tipicos", name: "Ceviche jipijapa", price: 5.00, emoji: "🥣" },
  { cat: "tipicos", name: "Ceviche jipijapa mixto", price: 7.00, emoji: "🥣" },
  { cat: "tipicos", name: "Ceviche de pescado", price: 5.00, emoji: "🐠" },

  // CEVICHES
  { cat: "ceviches", name: "Ceviche de pescado", price: 8.00, emoji: "🐟" },
  { cat: "ceviches", name: "Ceviche de camarón", price: 9.00, emoji: "🦐" },
  { cat: "ceviches", name: "Ceviche de concha", price: 9.00, emoji: "🐚" },
  { cat: "ceviches", name: "Ceviche mixto", price: 10.00, emoji: "🥗" },
  { cat: "ceviches", name: "Ceviche marinero", price: 12.00, emoji: "⚓" },

  // ARROCES Y CHAUFA
  { cat: "arroces", name: "Arroz con mariscos", price: 12.00, emoji: "🍚" },
  { cat: "arroces", name: "Arroz con camarones", price: 10.00, emoji: "🦐" },
  { cat: "arroces", name: "Arroz con concha", price: 10.00, emoji: "🐚" },
  { cat: "arroces", name: "Arroz con cangrejo", price: 13.00, emoji: "🦀" },
  { cat: "arroces", name: "Chaufa de mariscos", price: 12.00, emoji: "🥡" },
  { cat: "arroces", name: "Chaufa mar y tierra", price: 12.00, emoji: "🥡" },

  // CHICHARRONES
  { cat: "chicharrones", name: "Chicharrón de camarón", price: 9.00, emoji: "🦐" },
  { cat: "chicharrones", name: "Chicharrón de pescado", price: 9.00, emoji: "🐟" },
  { cat: "chicharrones", name: "Chicharrón mixto", price: 10.00, emoji: "🍤" },

  // CAUSAS
  { cat: "causas", name: "Causa acevichada", price: 12.00, emoji: "🥔" },
  { cat: "causas", name: "Causa de camarón", price: 10.00, emoji: "🥔" },
  { cat: "causas", name: "Causa de cangrejo", price: 13.00, emoji: "🦀" },
  { cat: "causas", name: "Trio de causas", price: 13.00, emoji: "✨" },

  // ESPECIALES
  { cat: "especiales", name: "Ronda", price: 15.00, emoji: "🍽️" },
  { cat: "especiales", name: "Lomo saltado", price: 9.00, emoji: "🥩" },
  { cat: "especiales", name: "Tabla mar y tierra", price: 13.00, emoji: "🍖" },
  { cat: "especiales", name: "Tabla marinera", price: 15.00, emoji: "🦞" },
  { cat: "especiales", name: "Sudado de pescado", price: 11.00, emoji: "🐟" },
  { cat: "especiales", name: "Parihuela", price: 13.00, emoji: "🍲" },
  { cat: "especiales", name: "Conchas asadas", price: 10.00, emoji: "🐚" },

  // BEBIDAS SOFT
  { cat: "bebidas", name: "Gaseosa", price: 1.00, emoji: "🥤" },
  { cat: "bebidas", name: "Agua", price: 1.00, emoji: "💧" },
  { cat: "bebidas", name: "Agua con gas", price: 1.00, emoji: "🫧" },
  { cat: "bebidas", name: "Jugo del día", price: 1.50, emoji: "🧃" },
  { cat: "bebidas", name: "Limonada frutos rojos", price: 3.00, emoji: "🍓" },
  { cat: "bebidas", name: "Limonada frozen", price: 3.00, emoji: "🍋" },
  { cat: "bebidas", name: "Maracuyá frozen", price: 3.00, emoji: "🥭" },
  { cat: "bebidas", name: "Agua aromática", price: 1.50, emoji: "🍵" },
  { cat: "bebidas", name: "Café", price: 2.00, emoji: "☕" },

  // COKTELES
  { cat: "cokteles", name: "Piña colada", price: 6.00, emoji: "🍍" },
  { cat: "cokteles", name: "Paloma", price: 6.00, emoji: "🍸" },
  { cat: "cokteles", name: "Aperol spritz", price: 6.00, emoji: "🥂" },
  { cat: "cokteles", name: "Sex on the beach", price: 5.00, emoji: "🏖️" },
  { cat: "cokteles", name: "Lagoon blue", price: 5.00, emoji: "💙" },
  { cat: "cokteles", name: "Cuba libre", price: 6.00, emoji: "🥃" },
  { cat: "cokteles", name: "Negroni", price: 6.00, emoji: "🍷" },
  { cat: "cokteles", name: "Moscow mule", price: 6.00, emoji: "🫚" },
  { cat: "cokteles", name: "Caipirinha", price: 5.00, emoji: "🍋" },

  // MOJITOS
  { cat: "mojitos", name: "Mojito clásico", price: 5.00, emoji: "🌿" },
  { cat: "mojitos", name: "Mojito frutos rojos", price: 6.00, emoji: "🍓" },
  { cat: "mojitos", name: "Mojito maracuyá", price: 6.00, emoji: "🥭" },

  // MARGARITAS
  { cat: "margaritas", name: "Margarita clásica", price: 5.00, emoji: "🍹" },
  { cat: "margaritas", name: "Margarita frutos rojos", price: 6.00, emoji: "🍓" },
  { cat: "margaritas", name: "Margarita maracuyá", price: 6.00, emoji: "🥭" },
];

const CATEGORIES = [
  { id: "all",          label: "Todo",           icon: "🍽️" },
  { id: "tipicos",      label: "Típicos",        icon: "🇪🇨" },
  { id: "ceviches",     label: "Ceviches",       icon: "🦐" },
  { id: "arroces",      label: "Arroces & Chaufa", icon: "🍚" },
  { id: "chicharrones", label: "Chicharrones",   icon: "🍤" },
  { id: "causas",       label: "Causas",         icon: "🥔" },
  { id: "especiales",   label: "Especiales",     icon: "⭐" },
  { id: "bebidas",      label: "Bebidas",        icon: "🥤" },
  { id: "cokteles",     label: "Cocteles",       icon: "🍸" },
  { id: "mojitos",      label: "Mojitos",        icon: "🌿" },
  { id: "margaritas",   label: "Margaritas",     icon: "🍹" },
];

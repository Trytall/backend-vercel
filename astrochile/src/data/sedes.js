export const sedesConfig = {
  moron: {
    name: 'Morón',
    whatsapp: '+54 9 11 2658-9218',
    phone: '+54 9 11 2658-9218',
    email: 'info@escuelaiadezonaoeste.com.ar',
    address: 'Alte. Brown 851, Galería Paseo Venecia 2° Piso, Morón',
    hours: 'Lunes a Viernes 9:00 - 18:00',
    mapsEmbed: 'https://www.google.com/maps?q=Alte.+Brown+851%2C+Galer%C3%ADa+Paseo+Venecia+2%C2%B0+Piso%2C+Mor%C3%B3n&output=embed',
    description: 'Sede principal en Zona Oeste, ubicada en el corazón comercial de Morón'
  },
  lomas: {
    name: 'Lomas de Zamora',
    whatsapp: '011 15-2260-8327',
    phone: '+54 11 15-2260-8327',
    email: 'info@escuelaiadezonaoeste.com.ar',
    address: 'Mariano Boedo 314, Lomas de Zamora, Argentina',
    hours: 'Lunes a Viernes 9:00 - 18:00',
    mapsEmbed: 'https://www.google.com/maps?q=Mariano+Boedo+314%2C+Lomas+de+Zamora%2C+Argentina&output=embed',
    description: 'Sede en Zona Sur, estratégicamente ubicada para estudiantes del conurbano sur'
  },
  avellaneda: {
    name: 'Avellaneda',
    whatsapp: '011 15-7072-5467',
    phone: '+54 11 15-7072-5467',
    email: 'escuelaiadeavellaneda@gmail.com',
    address: 'Av. Bartolomé Mitre 476, B1870 Avellaneda, Provincia de Buenos Aires',
    hours: 'Lunes a Viernes 9:00 - 18:00',
    mapsEmbed: 'https://www.google.com/maps?q=Av.+Bartolom%C3%A9+Mitre+476%2C+B1870+Avellaneda%2C+Provincia+de+Buenos+Aires&output=embed',
    description: 'Sede en Zona Este, ideal para estudiantes del conurbano este',
    website: 'escuelasiadezonasur.com.ar'
  }
};

// Función para obtener el número de WhatsApp según la sede
export function getWhatsAppNumber(sede) {
  if (sede && sedesConfig[sede.toLowerCase()]) {
    return sedesConfig[sede.toLowerCase()].whatsapp;
  }
  // Número por defecto (general)
  return '5491130112419';
}

// Función para obtener el número de WhatsApp formateado para enlaces (solo números)
export function getWhatsAppNumberForLink(sede) {
  if (sede && sedesConfig[sede.toLowerCase()]) {
    const whatsapp = sedesConfig[sede.toLowerCase()].whatsapp;
    // Convertir formato argentino a formato internacional para enlaces
    return whatsapp.replace(/[^0-9]/g, '');
  }
  // Número por defecto (general)
  return '5491130112419';
}

// Función para obtener la configuración completa de una sede
export function getSedeConfig(sede) {
  if (sede && sedesConfig[sede.toLowerCase()]) {
    return sedesConfig[sede.toLowerCase()];
  }
  return null;
}

// Función para obtener todas las sedes
export function getAllSedes() {
  return Object.values(sedesConfig);
}

// Función para obtener información de contacto de una sede específica
export function getSedeContactInfo(sede) {
  const sedeInfo = getSedeConfig(sede);
  if (sedeInfo) {
    return {
      name: sedeInfo.name,
      phone: sedeInfo.phone,
      whatsapp: sedeInfo.whatsapp,
      email: sedeInfo.email,
      address: sedeInfo.address,
      hours: sedeInfo.hours
    };
  }
  return null;
}


<?php
/**
 * Funciones auxiliares para manejar imágenes de cursos
 */

/**
 * Busca la imagen del curso en el directorio de imágenes locales
 * @param string $curso_nombre Nombre del curso
 * @return string Ruta de la imagen encontrada o imagen por defecto
 */
function getCursoImage($curso_nombre) {
    // Mapeo de cursos a imágenes locales
    $curso_imagenes = [
        'Curso de Administración y Gestión en Salud' => '../images/curso-administracion-salud.jpg',
        'Curso de Auxiliar en Cardiología' => '../images/curso-auxiliar-cardiologia.jpg',
        'Curso de Cuidado del Adulto Mayor' => '../images/curso-cuidado-adultos-mayores.jpg',
        'Curso de Auxiliar de Farmacia' => '../images/curso-auxiliar-farmacia.jpg',
        'Curso de Refrigeración y Aire Acondicionado' => '../images/curso-refrigeracion-aire.jpg',
        'Curso de Electricidad y Electrónica Automotriz' => '../images/curso-electricidad-automotriz.jpg',
        'Curso de Instalaciones Sanitarias y de Gas' => '../images/curso-instalaciones-sanitarias.jpg',
        'Curso de Mecánica de Motos' => '../images/curso-motos-alta-cilindrada.jpg',
        'Curso de Soldadura Eléctrica' => '../images/curso-soldadura-electrica.jpg',
        'Curso de Cerrajería' => '../images/curso-cerrajeria.jpg',
        'Curso de Bobinado y Reparación de Motores Eléctricos' => '../images/curso-bobinado.jpg',
        'Curso de Inyección Electrónica' => '../images/curso-inyeccion-electronica-gnc.jpg',
        'Curso de Construcción' => '../images/curso-construccion.jpg',
        'Curso de Construcción en Seco' => '../images/curso-construccion-seco.jpg',
        'Curso de Diseño y Confección de Indumentaria' => '../images/curso-diseno-confeccion.jpg',
        'Curso de Estética y Masaje Corporal' => '../images/curso-estetica-masaje.jpg',
        'Curso de Motores Diésel' => '../images/curso-motores-diesel.jpg',
        'Curso de Motos de Alto Cilindraje' => '../images/curso-motos-alta-cilindrada.jpg',
        'Curso de Electricidad y Electrónica Industrial' => '../images/curso-electricidad-industrial.jpg',
        'Curso de Electrónica Digital' => '../images/curso-electronica-digital.jpg',
        'Curso de Plaquetas Electrónicas' => '../images/curso-plaquetas-electronicas.jpg',
        'Curso de Reparación de Celulares' => '../images/curso-celulares.jpg',
        'Curso de Reparación de Electrodomésticos' => '../images/curso-reparacion-electrodomesticos.jpg',
        'Curso de Masaje Terapéutico Oriental' => '../images/curso-masaje-oriental.jpg',
        'Curso de Frenos' => '../images/curso-frenos.jpg',
        'Curso de Inyección Electrónica Diesel' => '../images/curso-inyeccion-electronica-diesel.jpg',
        'Curso de Inyección Electrónica y Gas Vehicular' => '../images/curso-inyeccion-electronica-gnc.jpg',
        'Curso de Diseño de Modas' => '../images/curso-diseno-modas.jpg',
        'Curso de Community Manager' => '../images/curso-community-manager.jpg',
        'Curso de Office' => '../images/curso-office.jpg',
        'Curso de Instalador de Paneles Solares' => '../images/curso-instalador-paneles-solares.jpg',
        'Curso de Barberia' => '../images/curso-barberia.jpg',
        'Curso de Cosmetología y Maquillaje' => '../images/curso-estetica-masaje.jpg',
        'Curso de Peluquería y Colorimetría' => '../images/curso-barberia.jpg'
    ];
    
    // Buscar la imagen correspondiente
    if (isset($curso_imagenes[$curso_nombre])) {
        return $curso_imagenes[$curso_nombre];
    }
    
    // Si no se encuentra, devolver imagen por defecto
    return '../images/curso-celulares.jpg';
}
?> 
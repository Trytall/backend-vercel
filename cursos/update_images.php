<?php
// Script para actualizar las imágenes de todos los cursos
$cursos = [
    'curso-de-administracion-y-gestion-en-salud.php',
    'curso-de-auxiliar-en-cardiologia.php',
    'curso-de-cuidado-del-adulto-mayor.php',
    'curso-de-auxiliar-de-farmacia.php',
    'curso-de-refrigeracion-y-aire-acondicionado.php',
    'curso-de-electricidad-y-electronica-automotriz.php',
    'curso-de-instalaciones-electricas-y-motores-electricos.php',
    'curso-de-instalaciones-sanitarias-y-de-gas.php',
    'curso-de-mecanica-de-motos.php',
    'curso-de-mecanica-general.php',
    'curso-de-soldadura-electrica.php',
    'curso-de-cerrajeria.php',
    'curso-de-bobinado-y-reparacion-de-motores-electricos.php',
    'curso-de-inyeccion-electronica.php',
    'curso-de-construccion.php',
    'curso-de-diseno-y-confeccion-de-indumentaria.php',
    'curso-de-estetica-y-masaje-corporal.php',
    'curso-de-motores-diesel.php',
    'curso-de-motos-de-alto-cilindraje.php',
    'curso-de-electricidad-y-electronica-industrial.php',
    'curso-de-electronica-digital.php',
    'curso-de-plaquetas-electronicas.php',
    'curso-de-reparacion-de-celulares.php',
    'curso-de-reparacion-de-electrodomesticos.php',
    'curso-de-cosmetologia-y-maquillaje.php',
    'curso-de-peluqueria-y-colorimetria.php'
];

// Función para actualizar la imagen de un curso
function actualizarImagenCurso($archivo) {
    $contenido = file_get_contents($archivo);
    
    // Buscar y reemplazar la línea de la imagen
    $contenido = preg_replace(
        '/\$curso_imagen\s*=\s*"[^"]*";/',
        '$curso_imagen = "../images/curso-celulares.jpg";',
        $contenido
    );
    
    file_put_contents($archivo, $contenido);
    echo "✅ Imagen actualizada: $archivo\n";
}

// Actualizar imágenes de todos los cursos
foreach ($cursos as $curso) {
    if (file_exists($curso)) {
        actualizarImagenCurso($curso);
    }
}

echo "\n=== RESUMEN ===\n";
echo "Imágenes actualizadas exitosamente: " . count($cursos) . "\n";
echo "\n🎉 Proceso completado. Todas las imágenes ahora usan curso-celulares.jpg.\n";
?> 
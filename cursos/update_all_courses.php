<?php
// Script para actualizar todos los cursos con el nuevo template
// Datos de los cursos
$cursos_data = [
    'curso-de-administracion-y-gestion-en-salud' => [
        'titulo' => 'CURSO DE ADMINISTRACIÓN Y GESTIÓN EN SALUD',
        'descripcion' => 'Formación integral en gestión administrativa del sector salud. Aprende a manejar sistemas de salud, documentación médica y gestión de pacientes. Este curso te prepara para trabajar en hospitales, clínicas, consultorios médicos y centros de salud, desarrollando habilidades en administración sanitaria, gestión de recursos y atención al paciente.',
        'duracion' => '6 meses',
        'imagen' => 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&auto=format&fit=crop&q=60'
    ],
    'curso-de-auxiliar-en-cardiologia' => [
        'titulo' => 'CURSO DE AUXILIAR EN CARDIOLOGÍA',
        'descripcion' => 'Especialización en asistencia cardiológica y electrocardiografía. Diagnóstico y monitoreo de pacientes cardíacos. Aprende a realizar electrocardiogramas, interpretar resultados y asistir en procedimientos cardiológicos.',
        'duracion' => '4 meses',
        'imagen' => 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&auto=format&fit=crop&q=60'
    ],
    'curso-de-cuidado-del-adulto-mayor' => [
        'titulo' => 'CURSO DE CUIDADO DEL ADULTO MAYOR',
        'descripcion' => 'Atención especializada para el cuidado de adultos mayores. Técnicas de asistencia y cuidados geriátricos. Desarrolla habilidades para trabajar en residencias, centros de día y atención domiciliaria.',
        'duracion' => '5 meses',
        'imagen' => 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&auto=format&fit=crop&q=60'
    ],
    'curso-de-auxiliar-de-farmacia' => [
        'titulo' => 'CURSO DE AUXILIAR DE FARMACIA',
        'descripcion' => 'Formación en asistencia farmacéutica y dispensación de medicamentos. Atención al cliente y gestión de stock. Prepárate para trabajar en farmacias, droguerías y laboratorios.',
        'duracion' => '4 meses',
        'imagen' => 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60'
    ],
    'curso-de-refrigeracion-y-aire-acondicionado' => [
        'titulo' => 'CURSO DE REFRIGERACIÓN Y AIRE ACONDICIONADO',
        'descripcion' => 'Mantenimiento y reparación de sistemas de refrigeración doméstica y comercial. Instalación de equipos de aire acondicionado. Aprende técnicas profesionales para trabajar en el sector HVAC.',
        'duracion' => '6 meses',
        'imagen' => 'https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?w=500&auto=format&fit=crop&q=60'
    ],
    'curso-de-electricidad-y-electronica-automotriz' => [
        'titulo' => 'CURSO DE ELECTRICIDAD Y ELECTRÓNICA AUTOMOTRIZ',
        'descripcion' => 'Diagnóstico y reparación de sistemas eléctricos automotrices. Inyección electrónica y sistemas de encendido. Especialización en la tecnología moderna de vehículos.',
        'duracion' => '8 meses',
        'imagen' => 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500&auto=format&fit=crop&q=60'
    ],
    'curso-de-instalaciones-electricas-y-motores-electricos' => [
        'titulo' => 'CURSO DE INSTALACIONES ELÉCTRICAS Y MOTORES ELÉCTRICOS',
        'descripcion' => 'Instalaciones eléctricas residenciales e industriales. Reparación y mantenimiento de motores eléctricos. Formación completa para el sector eléctrico.',
        'duracion' => '7 meses',
        'imagen' => 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=60'
    ],
    'curso-de-instalaciones-sanitarias-y-de-gas' => [
        'titulo' => 'CURSO DE INSTALACIONES SANITARIAS Y DE GAS',
        'descripcion' => 'Instalación y mantenimiento de sistemas sanitarios y de gas. Normativas de seguridad y certificaciones. Prepárate para trabajar en construcción y mantenimiento.',
        'duracion' => '5 meses',
        'imagen' => 'https://images.unsplash.com/photo-1581093458791-9d15482442f6?w=500&auto=format&fit=crop&q=60'
    ],
    'curso-de-mecanica-de-motos' => [
        'titulo' => 'CURSO DE MECÁNICA DE MOTOS',
        'descripcion' => 'Reparación y mantenimiento de motocicletas. Diagnóstico de fallas y ajustes de motor. Especialización en motos de todas las marcas y cilindradas.',
        'duracion' => '6 meses',
        'imagen' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&auto=format&fit=crop&q=60'
    ],
    'curso-de-mecanica-general' => [
        'titulo' => 'CURSO DE MECÁNICA GENERAL',
        'descripcion' => 'Fundamentos de mecánica automotriz general. Reparación de motores y sistemas de transmisión. Formación integral para talleres mecánicos.',
        'duracion' => '8 meses',
        'imagen' => 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=500&auto=format&fit=crop&q=60'
    ],
    'curso-de-soldadura-electrica' => [
        'titulo' => 'CURSO DE SOLDADURA ELÉCTRICA',
        'descripcion' => 'Técnicas de soldadura eléctrica y oxiacetilénica. Aplicaciones en construcción y metalurgia. Certificación en procedimientos de soldadura.',
        'duracion' => '4 meses',
        'imagen' => 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=500&auto=format&fit=crop&q=60'
    ],
    'curso-de-cerrajeria' => [
        'titulo' => 'CURSO DE CERRAJERÍA',
        'descripcion' => 'Apertura de cerraduras, duplicado de llaves y sistemas de seguridad. Técnicas profesionales para cerrajeros. Formación en seguridad residencial y comercial.',
        'duracion' => '3 meses',
        'imagen' => 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500&auto=format&fit=crop&q=60'
    ],
    'curso-de-bobinado-y-reparacion-de-motores-electricos' => [
        'titulo' => 'CURSO DE BOBINADO Y REPARACIÓN DE MOTORES ELÉCTRICOS',
        'descripcion' => 'Reparación y bobinado de motores eléctricos monofásicos y trifásicos. Diagnóstico de fallas y técnicas de rebobinado. Especialización en electromecánica.',
        'duracion' => '5 meses',
        'imagen' => 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500&auto=format&fit=crop&q=60'
    ],
    'curso-de-inyeccion-electronica' => [
        'titulo' => 'CURSO DE INYECCIÓN ELECTRÓNICA',
        'descripcion' => 'Diagnóstico y reparación de sistemas de inyección electrónica. Uso de scanners y equipos de diagnóstico. Especialización en tecnología automotriz moderna.',
        'duracion' => '6 meses',
        'imagen' => 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500&auto=format&fit=crop&q=60'
    ],
    'curso-de-construccion' => [
        'titulo' => 'CURSO DE CONSTRUCCIÓN',
        'descripcion' => 'Técnicas de construcción, albañilería y terminaciones. Interpretación de planos y normativas. Formación para el sector de la construcción.',
        'duracion' => '6 meses',
        'imagen' => 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500&auto=format&fit=crop&q=60'
    ],
    'curso-de-diseno-y-confeccion-de-indumentaria' => [
        'titulo' => 'CURSO DE DISEÑO Y CONFECCIÓN DE INDUMENTARIA',
        'descripcion' => 'Diseño de modas, patronaje y confección de prendas. Técnicas de costura y acabados profesionales. Formación para la industria textil.',
        'duracion' => '8 meses',
        'imagen' => 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&auto=format&fit=crop&q=60'
    ],
    'curso-de-estetica-y-masaje-corporal' => [
        'titulo' => 'CURSO DE ESTÉTICA Y MASAJE CORPORAL',
        'descripcion' => 'Técnicas de masaje terapéutico y estético. Tratamientos faciales y corporales. Formación para spas y centros de estética.',
        'duracion' => '6 meses',
        'imagen' => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format&fit=crop&q=60'
    ],
    'curso-de-motores-diesel' => [
        'titulo' => 'CURSO DE MOTORES DIÉSEL',
        'descripcion' => 'Reparación y mantenimiento de motores diésel. Sistemas de inyección y turbo. Especialización en maquinaria pesada y vehículos comerciales.',
        'duracion' => '6 meses',
        'imagen' => 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=500&auto=format&fit=crop&q=60'
    ],
    'curso-de-motos-de-alto-cilindraje' => [
        'titulo' => 'CURSO DE MOTOS DE ALTO CILINDRAJE',
        'descripcion' => 'Especialización en motos de alto rendimiento. Diagnóstico avanzado y tuning. Formación para talleres especializados en motos deportivas.',
        'duracion' => '4 meses',
        'imagen' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&auto=format&fit=crop&q=60'
    ],
    'curso-de-electricidad-y-electronica-industrial' => [
        'titulo' => 'CURSO DE ELECTRICIDAD Y ELECTRÓNICA INDUSTRIAL',
        'descripcion' => 'Automatización industrial y control de procesos. PLC y sistemas de control. Formación para la industria 4.0.',
        'duracion' => '8 meses',
        'imagen' => 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500&auto=format&fit=crop&q=60'
    ],
    'curso-de-electronica-digital' => [
        'titulo' => 'CURSO DE ELECTRÓNICA DIGITAL',
        'descripcion' => 'Circuitos digitales, microcontroladores y programación. Diseño de sistemas electrónicos. Formación en tecnología digital.',
        'duracion' => '6 meses',
        'imagen' => 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&auto=format&fit=crop&q=60'
    ],
    'curso-de-plaquetas-electronicas' => [
        'titulo' => 'CURSO DE PLAQUETAS ELECTRÓNICAS',
        'descripcion' => 'Reparación de placas electrónicas y componentes. Diagnóstico y soldadura de componentes SMD. Especialización en electrónica de consumo.',
        'duracion' => '5 meses',
        'imagen' => 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&auto=format&fit=crop&q=60'
    ],
    'curso-de-reparacion-de-celulares' => [
        'titulo' => 'CURSO DE REPARACIÓN DE CELULARES',
        'descripcion' => 'Reparación de smartphones y tablets. Cambio de pantallas, baterías y componentes. Formación para el mercado de reparación móvil.',
        'duracion' => '4 meses',
        'imagen' => '../images/curso-celulares.jpg'
    ],
    'curso-de-reparacion-de-electrodomesticos' => [
        'titulo' => 'CURSO DE REPARACIÓN DE ELECTRODOMÉSTICOS',
        'descripcion' => 'Reparación de lavarropas, heladeras, microondas y otros electrodomésticos. Diagnóstico y mantenimiento preventivo.',
        'duracion' => '5 meses',
        'imagen' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&auto=format&fit=crop&q=60'
    ],
    'curso-de-cosmetologia-y-maquillaje' => [
        'titulo' => 'CURSO DE COSMETOLOGÍA Y MAQUILLAJE',
        'descripcion' => 'Técnicas de maquillaje profesional y cosmetología. Tratamientos faciales y corporales. Formación para salones de belleza.',
        'duracion' => '6 meses',
        'imagen' => 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop&q=60'
    ],
    'curso-de-peluqueria-y-colorimetria' => [
        'titulo' => 'CURSO DE PELUQUERÍA Y COLORIMETRÍA',
        'descripcion' => 'Cortes, coloración y tratamientos capilares. Técnicas de colorimetría y tendencias. Formación para salones de peluquería.',
        'duracion' => '8 meses',
        'imagen' => 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=500&auto=format&fit=crop&q=60'
    ]
];

// Función para generar el contenido del archivo
function generarContenidoCurso($curso_key, $datos) {
    $titulo = $datos['titulo'];
    $descripcion = $datos['descripcion'];
    $duracion = $datos['duracion'];
    $imagen = $datos['imagen'];
    
    return "<?php
// Datos del curso
\$curso_titulo = \"$titulo\";
\$curso_descripcion = \"$descripcion\";
\$curso_duracion = \"$duracion\";
\$curso_modalidad = \"Online y Presencial\";
\$curso_sedes = \"Morón, Laferrere, Lomas de Zamora, Avellaneda\";
\$curso_imagen = \"$imagen\";

\$curso_temario = [
    [
        'titulo' => 'Módulo 1: Fundamentos del Curso',
        'temas' => [
            'Introducción al área de especialización',
            'Conceptos básicos y terminología',
            'Herramientas y equipos necesarios',
            'Normativas de seguridad',
            'Preparación del entorno de trabajo'
        ]
    ],
    [
        'titulo' => 'Módulo 2: Técnicas Básicas',
        'temas' => [
            'Procedimientos fundamentales',
            'Manejo de herramientas especializadas',
            'Técnicas de diagnóstico',
            'Métodos de reparación básicos',
            'Control de calidad inicial'
        ]
    ],
    [
        'titulo' => 'Módulo 3: Técnicas Avanzadas',
        'temas' => [
            'Procedimientos complejos',
            'Diagnóstico avanzado',
            'Reparaciones especializadas',
            'Optimización de procesos',
            'Resolución de problemas complejos'
        ]
    ],
    [
        'titulo' => 'Módulo 4: Tecnología Moderna',
        'temas' => [
            'Equipos y herramientas modernas',
            'Software especializado',
            'Tecnologías emergentes',
            'Automatización de procesos',
            'Mantenimiento predictivo'
        ]
    ],
    [
        'titulo' => 'Módulo 5: Gestión y Administración',
        'temas' => [
            'Gestión de inventarios',
            'Control de costos',
            'Atención al cliente',
            'Documentación técnica',
            'Planificación de mantenimiento'
        ]
    ],
    [
        'titulo' => 'Módulo 6: Práctica Profesional',
        'temas' => [
            'Prácticas en empresas del sector',
            'Desarrollo de proyectos reales',
            'Preparación para el mercado laboral',
            'Networking profesional',
            'Certificación final del curso'
        ]
    ]
];

include '../templates/curso_template.php';
?>";
}

// Procesar cada curso
$archivos_actualizados = 0;
$archivos_con_error = [];

foreach ($cursos_data as $curso_key => $datos) {
    $archivo = $curso_key . '.php';
    
    if (file_exists($archivo)) {
        $contenido = generarContenidoCurso($curso_key, $datos);
        
        if (file_put_contents($archivo, $contenido)) {
            $archivos_actualizados++;
            echo "✅ Actualizado: $archivo\n";
        } else {
            $archivos_con_error[] = $archivo;
            echo "❌ Error al actualizar: $archivo\n";
        }
    } else {
        echo "⚠️  Archivo no encontrado: $archivo\n";
    }
}

echo "\n=== RESUMEN ===\n";
echo "Archivos actualizados exitosamente: $archivos_actualizados\n";

if (!empty($archivos_con_error)) {
    echo "Archivos con error: " . implode(', ', $archivos_con_error) . "\n";
}

echo "\n🎉 Proceso completado. Todos los cursos ahora usan el nuevo template con el estilo de la imagen.\n";
?> 
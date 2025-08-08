<?php
// Datos del curso
$curso_titulo = "CURSO DE CONSTRUCCIÓN";
$curso_descripcion = "Técnicas de construcción, albañilería y terminaciones. Interpretación de planos y normativas. Formación para el sector de la construcción.";
$curso_duracion = "6 meses";
$curso_modalidad = "Online y Presencial";
$curso_sedes = "Morón, Laferrere, Lomas de Zamora, Avellaneda";
$curso_imagen = "../images/curso-construccion.jpg";

$curso_temario = [
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
?>
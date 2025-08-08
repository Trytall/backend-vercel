<?php 
include '../templates/header.php';
include 'functions.php';
?>

<main class="curso-detalle">
    <div class="hero-section">
        <div class="container">
            <div class="hero-content">
                <h1>CURSO DE BARBERÍA</h1>
                <p class="hero-subtitle">Técnicas profesionales de barbería. Cortes masculinos, barbas y tratamientos especializados.</p>
                <div class="hero-badges">
                    <span class="badge online">ONLINE</span>
                    <span class="badge presencial">PRESENCIAL</span>
                </div>
            </div>
            <div class="hero-image">
                <img src="<?= getCursoImage('Curso de Barberia') ?>" alt="Barbería">
            </div>
        </div>
    </div>

    <div class="container">
        <div class="curso-content">
            <div class="curso-info">
                <div class="info-card">
                    <h3>Información del Curso</h3>
                    <ul>
                        <li><strong>Duración:</strong> 5 meses</li>
                        <li><strong>Modalidad:</strong> Online y Presencial</li>
                        <li><strong>Sedes:</strong> Morón, Laferrere, Lomas, Avellaneda</li>
                        <li><strong>Precio:</strong> Consultar</li>
                    </ul>
                </div>

                <div class="descripcion-card">
                    <h3>Descripción del Curso</h3>
                    <p>El curso de Barbería te capacita en técnicas profesionales de corte masculino, diseño de barbas, tratamientos faciales y atención especializada para hombres.</p>
                    
                    <h4>¿Qué aprenderás?</h4>
                    <ul>
                        <li>Cortes masculinos clásicos y modernos</li>
                        <li>Diseño y cuidado de barbas</li>
                        <li>Tratamientos faciales</li>
                        <li>Técnicas de navaja</li>
                        <li>Atención al cliente masculino</li>
                        <li>Gestión de barbería</li>
                    </ul>
                </div>

                <div class="syllabus-card">
                    <h3>Programa del Curso</h3>
                    <div class="syllabus-item">
                        <div class="syllabus-header" onclick="toggleSyllabus(this)">
                            <h4>Módulo 1: Fundamentos de Barbería</h4>
                            <span class="toggle-icon">+</span>
                        </div>
                        <div class="syllabus-content">
                            <ul>
                                <li>Historia de la barbería</li>
                                <li>Herramientas básicas</li>
                                <li>Higiene y seguridad</li>
                                <li>Anatomía facial</li>
                            </ul>
                        </div>
                    </div>

                    <div class="syllabus-item">
                        <div class="syllabus-header" onclick="toggleSyllabus(this)">
                            <h4>Módulo 2: Cortes Masculinos</h4>
                            <span class="toggle-icon">+</span>
                        </div>
                        <div class="syllabus-content">
                            <ul>
                                <li>Cortes clásicos</li>
                                <li>Cortes modernos</li>
                                <li>Técnicas de degradado</li>
                                <li>Cortes de moda</li>
                            </ul>
                        </div>
                    </div>

                    <div class="syllabus-item">
                        <div class="syllabus-header" onclick="toggleSyllabus(this)">
                            <h4>Módulo 3: Barbas y Tratamientos</h4>
                            <span class="toggle-icon">+</span>
                        </div>
                        <div class="syllabus-content">
                            <ul>
                                <li>Diseño de barbas</li>
                                <li>Tratamientos faciales</li>
                                <li>Técnicas de navaja</li>
                                <li>Productos especializados</li>
                            </ul>
                        </div>
                    </div>

                    <div class="syllabus-item">
                        <div class="syllabus-header" onclick="toggleSyllabus(this)">
                            <h4>Módulo 4: Emprendimiento</h4>
                            <span class="toggle-icon">+</span>
                        </div>
                        <div class="syllabus-content">
                            <ul>
                                <li>Gestión de barbería</li>
                                <li>Marketing masculino</li>
                                <li>Atención al cliente</li>
                                <li>Productos y servicios</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="contacto-sidebar">
                <div class="contacto-card">
                    <h3>¿Te interesa este curso?</h3>
                    <p>Completa el formulario y nos pondremos en contacto contigo</p>
                    
                    <form id="contactForm" class="contacto-form">
                        <div class="form-group">
                            <label for="nombre">Nombre completo *</label>
                            <input type="text" id="nombre" name="nombre" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="email">Email *</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="telefono">Teléfono *</label>
                            <input type="tel" id="telefono" name="telefono" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="modalidad">Modalidad preferida *</label>
                            <select id="modalidad" name="modalidad" required>
                                <option value="">Selecciona una opción</option>
                                <option value="online">Online</option>
                                <option value="presencial">Presencial</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="sede">Sede (solo para presencial)</label>
                            <select id="sede" name="sede">
                                <option value="">Selecciona una sede</option>
                                <option value="moron">Morón</option>
                                <option value="laferrere">Laferrere</option>
                                <option value="lomas">Lomas</option>
                                <option value="avellaneda">Avellaneda</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="mensaje">Mensaje (opcional)</label>
                            <textarea id="mensaje" name="mensaje" rows="4" placeholder="Cuéntanos más sobre tus objetivos..."></textarea>
                        </div>
                        
                        <button type="submit" class="btn-enviar">Enviar consulta</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</main>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const modalidadSelect = document.getElementById('modalidad');
    const sedeSelect = document.getElementById('sede');
    
    // Mostrar/ocultar campo de sede según modalidad
    modalidadSelect.addEventListener('change', function() {
        if (this.value === 'presencial') {
            sedeSelect.parentElement.style.display = 'block';
            sedeSelect.required = true;
        } else {
            sedeSelect.parentElement.style.display = 'none';
            sedeSelect.required = false;
            sedeSelect.value = '';
        }
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const modalidad = formData.get('modalidad');
        
        if (modalidad === 'online') {
            // Enviar por WhatsApp
            const mensaje = `Hola! Me interesa el CURSO DE BARBERÍA (Online).\n\nNombre: ${formData.get('nombre')}\nEmail: ${formData.get('email')}\nTeléfono: ${formData.get('telefono')}\nMensaje: ${formData.get('mensaje') || 'Sin mensaje adicional'}`;
            const whatsappUrl = `https://wa.me/5491130112419?text=${encodeURIComponent(mensaje)}`;
            window.open(whatsappUrl, '_blank');
        } else {
            // Enviar por email
            const emailData = {
                curso: 'CURSO DE BARBERÍA',
                nombre: formData.get('nombre'),
                email: formData.get('email'),
                telefono: formData.get('telefono'),
                modalidad: formData.get('modalidad'),
                sede: formData.get('sede'),
                mensaje: formData.get('mensaje')
            };
            
            fetch('../enviar_consulta.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('¡Consulta enviada con éxito! Nos pondremos en contacto contigo pronto.');
                    form.reset();
                } else {
                    alert('Error al enviar la consulta. Por favor, inténtalo de nuevo.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al enviar la consulta. Por favor, inténtalo de nuevo.');
            });
        }
    });
});

function toggleSyllabus(element) {
    const content = element.nextElementSibling;
    const icon = element.querySelector('.toggle-icon');
    
    if (content.style.display === 'block') {
        content.style.display = 'none';
        icon.textContent = '+';
    } else {
        content.style.display = 'block';
        icon.textContent = '-';
    }
}
</script>

<?php include '../templates/footer.php'; ?>
<?php include '../templates/whatsapp.php'; ?> 
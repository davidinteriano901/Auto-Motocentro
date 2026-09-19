// 1. Inyección automática de los estilos CSS del Sidebar
(function inyectarEstilosSidebar() {
    const css = `
        /* Estilos de los botones de ayuda */
        .btn-sidebar-call {
            width: 100% !important;
            background-color: #0d6efd !important;
            color: #ffffff !important;
            border: none !important;
            padding: 10px 15px !important;
            border-radius: 8px !important;
            font-weight: bold !important;
            font-size: 14px !important;
            cursor: pointer !important;
            margin-bottom: 8px !important;
            display: block !important;
            text-align: center !important;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
        }

        .btn-sidebar-map {
            width: 100% !important;
            background-color: #e63946 !important;
            color: #ffffff !important;
            border: none !important;
            padding: 10px 15px !important;
            border-radius: 8px !important;
            font-weight: bold !important;
            font-size: 14px !important;
            cursor: pointer !important;
            margin-bottom: 0 !important;
            display: block !important;
            text-align: center !important;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
        }

        .btn-sidebar-call:hover {
            background-color: #0b5ed7 !important;
        }

        .btn-sidebar-wa:hover {
            background-color: #1da851 !important;
        }
    `;

    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
})();

// 2. Carga dinámica del sidebar.html
document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("sidebar-container");
    if (container) {
        fetch("sidebar.html")
            .then(response => response.text())
            .then(data => {
                container.innerHTML = data;
                // Si tenés funciones para abrir/cerrar menú o cambiar temas, ejecutalas aquí
            })
            .catch(error => console.error("Error al cargar sidebar.html:", error));
    }
});

document.addEventListener('DOMContentLoaded', () => {
  // Cargar el menú dinámicamente desde sidebar.html
  fetch('sidebar.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('No se pudo cargar sidebar.html');
      }
      return response.text();
    })
    .then(data => {
      const container = document.getElementById('sidebar-container');
      if (container) {
        container.innerHTML = data;
        iniciarEventosSidebar(); // Activa los clics cuando el menú ya fue insertado
      }
    })
    .catch(err => console.error('Error al cargar el sidebar:', err));
});

function iniciarEventosSidebar() {
  const openBtn = document.getElementById('btn-open-sidebar');
  const closeBtn = document.getElementById('btn-close-sidebar');
  const sidebar = document.getElementById('sidebar-panel');
  const overlay = document.getElementById('sidebar-overlay');

  if (openBtn && sidebar && overlay) {
    openBtn.addEventListener('click', () => {
      sidebar.classList.add('active');
      overlay.classList.add('active');
    });
  }

  function closeSidebar() {
    if (sidebar && overlay) {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);
}

// Función para cambiar de Tema aplicada al <html> (evita parpadeos)
function setTheme(themeName) {
  document.documentElement.classList.remove('theme-dark', 'theme-coffee', 'theme-blue');
  if (themeName !== 'light') {
    document.documentElement.classList.add('theme-' + themeName);
  }
  // Guardar preferencia en el navegador
  localStorage.setItem('selectedTheme', themeName);
}


document.addEventListener("DOMContentLoaded", () => {
  // Menú hamburguesa
  const btnMenu = document.getElementById('btn-menu');
  const menuLista = document.getElementById('menu-lista');

  btnMenu.addEventListener('click', () => {
    menuLista.classList.toggle('show');
  });

  // Carrusel
  const images = [
    'img/anun1.jpg',
    'img/anun2.jpg',
    'img/anun3.jpg',
    'img/helado.jpg'
  ];

  let currentIndex = 0;
  const slideImg = document.getElementById('slide');
  const btnPrev = document.getElementById('prev');
  const btnNext = document.getElementById('next');

  function showImage(index) {
    if (slideImg) {
      slideImg.src = images[index];
    }
  }

  if (btnPrev && btnNext && slideImg) {
    btnPrev.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    });

    btnNext.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    });

    showImage(currentIndex);
  }

  // Botón + y formulario
  const btnAgregar = document.getElementById("btn-agregar");
  const formulario = document.getElementById("formulario-agregar");
  const verificarBtn = document.getElementById("verificar");
  const formImagen = document.getElementById("formulario-imagen");

  const usuarioValido = "dr.autos";
  const claveValida = "soloyose012";

  btnAgregar.addEventListener("click", () => {
    formulario.style.display = "block";
  });

  verificarBtn.addEventListener("click", () => {
    const user = document.getElementById("nombreUsuario").value;
    const pass = document.getElementById("claveUsuario").value;
    if (user === usuarioValido && pass === claveValida) {
      alert("Acceso concedido");
      formImagen.style.display = "block";
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  });

  const agregarServicioBtn = document.getElementById("agregarServicio");
  agregarServicioBtn.addEventListener("click", () => {
    const file = document.getElementById("imagen").files[0];
    const descripcion = document.getElementById("descripcion").value;

    if (!file || !descripcion) {
      alert("Por favor, sube una imagen y escribe una descripción.");
      return;
    }

    const lector = new FileReader();
    lector.onload = function (e) {
      const div = document.createElement("div");
      div.style.marginTop = "30px";
      div.style.padding = "15px";
      div.style.background = "rgba(255,255,255,0.05)";
      div.style.borderRadius = "8px";
      div.style.color = "white";
      div.style.maxWidth = "800px";
      div.style.textAlign = "center";

      const img = document.createElement("img");
      img.src = e.target.result;
      img.style.width = "100%";
      img.style.maxWidth = "400px";
      img.style.borderRadius = "8px";
      img.style.marginBottom = "10px";

      const p = document.createElement("p");
      p.textContent = descripcion;

      const btnEditar = document.createElement("button");
      btnEditar.textContent = "✏️ Editar";
      btnEditar.style.margin = "10px";
      btnEditar.style.padding = "8px 15px";
      btnEditar.onclick = () => {
        const nuevoTexto = prompt("Editar descripción:", p.textContent);
        if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
          p.textContent = nuevoTexto;
        }
      };

      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "🗑️ Eliminar";
      btnEliminar.style.margin = "10px";
      btnEliminar.style.padding = "8px 15px";
      btnEliminar.style.backgroundColor = "#cc0000";
      btnEliminar.style.color = "white";
      btnEliminar.onclick = () => {
        if (confirm("¿Estás seguro que querés eliminar este servicio?")) {
          div.remove();
        }
      };

      div.appendChild(img);
      div.appendChild(p);
      div.appendChild(btnEditar);
      div.appendChild(btnEliminar);

      document.querySelector(".disponible").appendChild(div);
      alert("Servicio agregado correctamente.");

      document.getElementById("imagen").value = "";
      document.getElementById("descripcion").value = "";
    };
    lector.readAsDataURL(file);
  });
});
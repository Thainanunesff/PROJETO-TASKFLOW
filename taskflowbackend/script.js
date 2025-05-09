document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form")
    const registerForm = document.getElementById("register-form")
  
    // Login
    if (loginForm) {
      loginForm.addEventListener("submit", async (e) => {
        e.preventDefault()
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
  
        try {
          const response = await fetch("http://localhost:3000/usuarios/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha: password })
          })
  
          const data = await response.json()
          if (response.ok) {
            localStorage.setItem("usuarioId", data.usuario.id)
            window.location.href = "dashboard.html"
          } else {
            alert(data.mensagem || "Erro ao fazer login")
          }
        } catch (err) {
          console.error(err)
          alert("Erro de conexão com o servidor")
        }
      })
    }
  
    // Cadastro
    if (registerForm) {
      registerForm.addEventListener("submit", async (e) => {
        e.preventDefault()
        const name = document.getElementById("name").value
        const email = document.getElementById("register-email").value
        const password = document.getElementById("register-password").value
  
        try {
          const response = await fetch("http://localhost:3000/usuarios/cadastrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome: name, email, senha: password })
          })
  
          const data = await response.json()
          if (response.ok) {
            alert("Usuário cadastrado com sucesso!")
            window.location.href = "index.html"
          } else {
            alert(data.mensagem || "Erro ao cadastrar")
          }
        } catch (err) {
          console.error(err)
          alert("Erro de conexão com o servidor")
        }
      })
    }
  })
  
  // Alternar abas Login/Cadastro
  const tabTriggers = document.querySelectorAll(".tab-trigger")
  const tabPanes = document.querySelectorAll(".tab-pane")
  
  tabTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      tabTriggers.forEach((t) => t.classList.remove("active"))
      tabPanes.forEach((p) => p.classList.remove("active"))
  
      trigger.classList.add("active")
      const target = document.getElementById(`${trigger.dataset.tab}-tab`)
      target.classList.add("active")
    })
  })
  
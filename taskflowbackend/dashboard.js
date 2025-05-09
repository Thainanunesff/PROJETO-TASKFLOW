document.addEventListener("DOMContentLoaded", () => {
    const usuarioId = localStorage.getItem("usuarioId");
    if (!usuarioId) return (window.location.href = "index.html");
  
    const tasksContainer = document.getElementById("tasks-container");
    const form = document.getElementById("add-task-form");
    const input = document.getElementById("new-task-input");
    const progressText = document.getElementById("progress-text");
    const progressPercentage = document.getElementById("progress-percentage");
    const progressBarFill = document.getElementById("progress-bar-fill");
  
    async function carregarTarefas() {
      const res = await fetch(`http://localhost:3000/tarefas/usuario/${usuarioId}`);
      const tarefas = await res.json();
      tasksContainer.innerHTML = "";
      let concluidas = 0;
  
      tarefas.forEach((tarefa) => {
        const task = document.createElement("div");
        task.className = "task-item" + (tarefa.status_id === 2 ? " completed" : "");
        task.innerHTML = `
          <div class="task-content">
            <input type="checkbox" class="task-checkbox" ${tarefa.status_id === 2 ? "checked" : ""}>
            <label class="task-label">${tarefa.titulo}</label>
          </div>
          <div class="task-actions">
            <button class="btn-icon delete-task">🗑</button>
          </div>
        `;
  
        task.querySelector(".task-checkbox").addEventListener("change", async () => {
          await fetch(`http://localhost:3000/tarefas/${tarefa.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status_id: tarefa.status_id === 1 ? 2 : 1 }),
          });
          carregarTarefas();
        });
  
        task.querySelector(".delete-task").addEventListener("click", async () => {
          await fetch(`http://localhost:3000/tarefas/${tarefa.id}`, { method: "DELETE" });
          carregarTarefas();
        });
  
        if (tarefa.status_id === 2) concluidas++;
        tasksContainer.appendChild(task);
      });
  
      const porcentagem = tarefas.length ? Math.round((concluidas / tarefas.length) * 100) : 0;
      progressText.textContent = `${concluidas} de ${tarefas.length} tarefas concluídas`;
      progressPercentage.textContent = `${porcentagem}%`;
      progressBarFill.style.width = `${porcentagem}%`;
    }
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const titulo = input.value.trim();
      if (!titulo) return;
  
      await fetch("http://localhost:3000/tarefas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo,
          descricao: "",
          usuario_id: usuarioId,
          status_id: 1,
        }),
      });
  
      input.value = "";
      carregarTarefas();
    });
  
    document.getElementById("logout-button").addEventListener("click", () => {
      localStorage.removeItem("usuarioId");
      window.location.href = "index.html";
    });
  
    carregarTarefas();
  });
  
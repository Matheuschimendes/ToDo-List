const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector(".list-tasks")
const tarefasDoLocalStorage = localStorage.getItem("lista")


let minhaListaDeItens = []


// Função para validar se a tarefa já existe na lista
function tarefaJaExiste(tarefa){
    return  minhaListaDeItens.some(item =>  item.tarefa === tarefa)
}

//Adicionar tarefas na lista
function adicionarNovaTarefa() {
    //Validacao de input, Se o input nao conter nem um valor. Apareceça o Alert 
    if (!input.value) {
        input.style.border = "1px solid red"
        alert("Digite algo para inserir em sua lista.")

    }else if(tarefaJaExiste(input.value)){
        alert("Tarefa já existe na lista.")

    }
    else {
        input.style.border = ""
        minhaListaDeItens.push({
            tarefa: input.value,
            concluida: false
        })
    }
    input.value = ''
    mostrarTarefas()
    
}

//Mostrar Tarefas
function mostrarTarefas() {

    let novaLi = ''

    minhaListaDeItens.forEach((item, index) => {

        novaLi = novaLi + `
        <li class="task ${item.concluida && "done"}">
            <img src="/img/checked.png" alt="checked" onclick="concluirTarefa(${index})" />
            <p>
            ${item.tarefa}
            </p>
            <img src="/img/trash.png" alt="trash - imagem de licheira "  onclick="deletarItem(${index})"/>
        </li>`
    })

    listaCompleta.innerHTML = novaLi

    localStorage.setItem("lista", JSON.stringify(minhaListaDeItens))
}

//Concluir Tarefa 
function concluirTarefa(index) {
    minhaListaDeItens[index].concluida = !minhaListaDeItens[index].concluida

    mostrarTarefas()
}

function deletarItem(index) {
    if (minhaListaDeItens.splice(index, 1)) {
        alert("deseja excluir")
        mostrarTarefas()
    } else {

    }

}

function recarregarTarefas() {
    if (tarefasDoLocalStorage) {
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
    }
    mostrarTarefas()
}

recarregarTarefas()
button.addEventListener("click", adicionarNovaTarefa)


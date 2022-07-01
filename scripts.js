//Nomeando globais
let nome 
let msg
let logMsg = {
            from: `${nome}`,
            to: "todos",
            text: `${msg}`,
            type: "message" 
}


//FUNCAO PEDE nume
function novoN(){ 
   

    document.querySelector('.textErro').classList.remove('liga')
    document.querySelector('.escrevaLogin').classList.add('desliga')
    document.querySelector('.botaoLogin').classList.add('desliga')
    document.querySelector('.loading').classList.remove('desliga')
    document.querySelector('.textoEntrando').classList.remove('desliga')
    nome = document.querySelector('.escrevaLogin').value
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", {name: nome});
    promise.then(intervaloBusca = setInterval(buscaDados, 3000))
    promise.catch(trataErro);
   
 
}



//TRATA ERROS + funcao pede nome novamente caso o primeiro ja exista

function trataErro (error){
    console.log(error.response.status);
    if(error.response.status === 400){
     console.log('deu400')
     clearInterval(intervaloBusca)  
     document.querySelector('.textErro').classList.add('liga')
     document.querySelector('.botaoLogin').classList.remove('desliga')
     document.querySelector('.loading').classList.add('desliga')
     document.querySelector('.textoEntrando').classList.add('desliga')
     document.querySelector('.escrevaLogin').classList.remove('desliga')
     document.querySelector('.textErro').classList.add('liga')  
     document.querySelector('.botaoLogin').classList.add('loginAbaixo') 
     nome = document.querySelector('.escrevaLogin').value 
     console.log(nome)
     const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",{name: nome});
     promise.then(trataErro)
     promise.catch(trataErro)

     if(error.response.status === 200){
            console.logo('deu200')
            nome = nom2
            setInterval(buscaDados, 3000)
        }
    }
}




//funcao retorna dados da api "https://mock-api.driven.com.br/api/v6/uol/messages"
function buscaDados(){
    console.log('Deu busca')
    document.querySelector('.telaLogin').classList.add('desliga')
    let promessatempo = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    promessatempo.then(renderizarLog)
    promessatempo.catch(reseta)
    
}

//RESETA TUDO CASO DESCONECT
function reseta(){
    window.location.reload()
}


// funcao renderiza separa e renderiza msg e status
function renderizarLog(dados){
    console.log('Deu renderr')
    let dadosRecebidos =[]
    for(let i = 0; i < dados.data.length; i++){
        dadosRecebidos.push(dados.data[i])
        let tempo = dadosRecebidos[i].time
        let remetente = dadosRecebidos[i].from
        let destinatario = dadosRecebidos[i].to
        let textoMsg = dadosRecebidos[i].text
      if (dadosRecebidos[i].type === "status"){
        document.querySelector('.containerLogs').innerHTML +=`<li class="entrou"><h2>(${tempo}) <span> ${remetente}</span>  entrou na sala...</h2></li>`
        }
       if(dadosRecebidos[i].type === "message" ){
       document.querySelector('.containerLogs').innerHTML +=`<li class="msg"><h2>(${tempo}) <span> ${remetente}</span> para  <span> ${destinatario}</span>: ${textoMsg} </h2></li>`
       }
       if(dadosRecebidos[i].type === "private_message" && dadosRecebidos[i].to === nome){
        document.querySelector('.containerLogs').innerHTML +=`<li class="msgPrivada"><h2>(${tempo}) <span> ${remetente}</span> para  <span> ${destinatario}</span>: ${textoMsg} </h2></li>`
       }
    }
    let ultimaLi = document.querySelector('ul')
    let teste = ultimaLi.lastChild
    teste.scrollIntoView()
        
    setInterval(estatus, 5000)
}   

//funcao a cada 5seg atua liza status para servidor 
function estatus(){
    let promessaStatus = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', {name: nome})
    promessaStatus.then(positivo)
    promessaStatus.catch(negativo)
} 

// Funcao testa caminhos e tratar erros
function negativo(){
    console.log('Deu um bagulho ai')
}
// Funcao testa caminhos ACERTOS
function positivo(){
    console.log('Deu BOM demais jr')
}

//funcao recebe click e envia msg
function sendMsg(elemento){
      msg = document.querySelector('.escrevaMsg').value
      if(msg != undefined && msg != "" && msg != null){
        promessaMsg = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', {from: nome,to: "todos",text: msg, type: "message"})
        promessaMsg.then(buscaDados)
        promessaMsg.catch(reseta)
        document.querySelector(".barBottom input").value="" 
      }
}

//ativa enter
function ativaEnter(){
 const evento  =  document.querySelector(".barBottom input");
 evento.addEventListener("keypress", evento1)
    evento1(evento1) 
}

 function evento1(evento1){
    if (evento1.key === "Enter") {
        document.querySelector(".barBottom  ion-icon").click();
        }
 }


ativaEnter()


//ativa enter
function ativaEnterLogin(){
    const evento  =  document.querySelector(".telaLogin input");
    evento.addEventListener("keypress", event2)
       event2(event2) 
 }
   
function event2(event2){
  if (event2.key === "Enter") {
    document.querySelector(".telaLogin .botaoLogin").click();
  }
}
   
ativaEnterLogin()







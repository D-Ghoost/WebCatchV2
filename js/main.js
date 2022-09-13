
// Signo dolar para identificar que es un elemento del DOM
const $form = document.querySelector("#cont-form")
$form.addEventListener("submit", getParams)

// pop-up
const $dial = document.getElementById("pop-up")   
const $dialBtn = document.getElementById("pop-btn")
$dialBtn.addEventListener("click", ev => {
    ev.preventDefault()
    if($dial.open){
        $dial.close("Ok")
    }    
})


async function sendEmail( data ) {
    
    const servID = 'gmail'
    const tempID = 'mails_webC'
    const pubKey = 'iW2zQgorsoppySg6k'
    const url = 'https://api.emailjs.com/api/v1.0/email/send'

    // Obj con los datos
    let userData = {
        from_name: data.get('userName'),
        from_email: data.get('userEmail'),
        subject: data.get('userSubject'),
        message: data.get('userMsm')
    }

    console.log('Estos son los datos')
    console.log(userData)
    
    // Parametros de la API
    const dataBody = {
        service_id: servID,
        template_id: tempID,
        user_id: pubKey,
        template_params: userData
    };

    
    let params = {
        method: 'POST',
        body: JSON.stringify(dataBody),
        headers:{
            'Content-Type': 'application/json'
        }
    }

    const resp = await fetch(url, params )

    if (resp.status != 200) {
        console.log('Papi paila si me entiende? ')
        return false
    }

    console.log('Paso papi, todo vientos')
    return true
    
}

async function getParams(ev) {

    // const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/
    // No recarga la pagina
    ev.preventDefault()
    // FormData trae los elementos del formulario
    // El this hace referencia a $form ya que esta enlanzado el ev
    const form = new FormData(this)

    // if (!reg.test(form.get('userEmail'))) {
    //     const titl = document.createElement('h3') 
    //     const parr = document.createElement('p')
    //     titl.textContent = "Algo falla..."
    //     parr.textContent = "Porfavor revisa que los datos ingresados esten correctamente escritos"
    //     // se agrega hijos al popup     
    //     $dial.appendChild(titl)
    //     $dial.appendChild(parr)
    //     // Muestra el modal
    //     $dial.showModal()
    // }

    const send = await sendEmail( form )

    console.log('send = ', send)

    // debugger

    if (!send) {
        const titl = document.createElement('h3') 
        const parr = document.createElement('p')
        titl.textContent = "Algo falla..."
        parr.textContent = "Intenta realizar nuevamente la acción, si el problema persiste espera unos minutos."
        
        // se agrega hijos al popup      
        $dial.appendChild(titl)
        $dial.appendChild(parr)
        $dial.showModal()
    }

    const titl = document.createElement('h3') 
    const parr = document.createElement('p')
    titl.textContent = "Gracias por tu mensaje!!"
    parr.textContent = "Nos contactaremos muy pronto para ayudarte."
    
    // se agrega hijos al popup      
    $dial.appendChild(titl)
    $dial.appendChild(parr)
    $dial.showModal()


    // Resetear el formulario
    $form.reset()

}
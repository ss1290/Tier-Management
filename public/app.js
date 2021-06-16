const signupForm=document.querySelector('#Signup-form')
const em=signupForm.querySelector('input[name="email"]')
const pw=signupForm.querySelector('input[name="password"]')
const ne=signupForm.querySelector('input[name="name"]')
const message=document.querySelector('#message')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const email=em.value
    const password=pw.value
    const name=ne.value
        fetch('/signup?email='+email+'&password='+password+'&name='+name).then((response)=>{
            response.json().then((data)=>{
                message.textContent=data.user
            })
        })
    })

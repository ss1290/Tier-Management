const mongoose=require('mongoose')
const User=require('./models/user')
const Product=require('./models/products')
const loginForm=document.querySelector('#Login-form')
const email=loginForm.querySelector('input[name="email"]')
const password=loginForm.querySelector('input[name="password"]')
const message=document.querySelector('#message')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const email=email.value
    const password=password.value
        fetch('/users/login').then((response)=>{
            response.json().then((data)=>{
                message.textContent=data.MembershipPoints
            })
        })
    })

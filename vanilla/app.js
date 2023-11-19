const input = document.querySelector('#input')
const btn = document.querySelector('#btn')
const result = document.querySelector('#result')
const total = document.querySelector('#total')
let i=0

//add event добавление события на кнопку
btn.addEventListener('click', (e)=>{
    console.log(input.value)

    //result.innerHTML += '<li>${input.value}<li>'
    if(input.value === '')return
    createDeleteElements(input.value)
    input.value = ''
})

//создание и удаление
function createDeleteElements(value)
{
    //создание активного класса
    i++
    const li = document.createElement('li')
    const btn = document.createElement('button')

    li.className = 'li'
    li.textContent=value
    
    btn.className = 'btn'
    btn.textContent='add'
    li.appendChild(btn)

    //удаление активного класса
    btn.addEventListener('click', (e)=>{
        i--
        total.textContent=i
        result.removeChild(li)
        })

    //переключение активного класса
    li.addEventListener('click', (e)=>{
        li.classList.toggle('li-active')
    })

    total.textContent=i

    result.appendChild(li) 
}
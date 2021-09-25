const main=document.querySelector('main')
const buttonInsertText=document.querySelector('.btn-toggle')
const buttonReadText=document.querySelector('#read')
const divTexBox=document.querySelector('.text-box');
const closeDivTexBox=document.querySelector('.close')
const selectElement=document.querySelector('select');
const textArea=document.querySelector('textarea')

const humanExpressions=[
    {img:'./drink.jpg',text:'Estou com sede!'},
    {img:'./food.jpg',text:'Estou com fome!'},
    {img:'./tired.jpg',text:'Estou cansado!'},
    {img:'./hurt.jpg',text:'Estou machucado!'},
    {img:'./happy.jpg',text:'Estou feliz!'},
    {img:'./angry.jpg',text:'Estou com raiva!'},
    {img:'./ngunga.png',text:'Ngunga Developer'},
    {img:'./estudar.jpg',text:'Estou a estudar!'},
    {img:'./programar.jpg',text:'Estou a programar!'},
    {img:'./sad.jpg',text:'Estou triste!'},
    {img:'./scared.jpg',text:'Estou assustado!'},
    {img:'./outside.jpg',text:'Quero ir la fora!'},
    {img:'./home.jpg',text:'Quero ir para casa!'},
    {img:'./school.jpg',text:'Quero ir para a escola!'},
    {img:'./grandma.jpg',text:'Quero ver a vovo!'}

]

const utterance= new SpeechSynthesisUtterance()

const setTextMessage=text=>{
    utterance.text=text;
}

const speakText=()=>{
    speechSynthesis.speak(utterance);
}
// PARA VERIFICARC

const setVoice= event =>{
   console.log(event.target.value)
   const selectdVoice=voices.find(voice=>voice.name === event.target.value)
   utterance.voice=selectdVoice
};


const addExpressionBoxIntoDOM=()=>{
    main.innerHTML=humanExpressions.map(({img,text})=>`
    <div class="expression-box" data-js="${text}">
    <img src="${img}" alt="${text}" data-js="${text}">
    <p class="info" data-js="${text}">${text}</p>
    </div>
    `).join('');
}

addExpressionBoxIntoDOM();

const setStyleClikedDiv=dataValue=>{

        const div=document.querySelector(`[data-js="${dataValue}"]`)
        div.classList.add('active')
        setTimeout(()=>{
            div.classList.remove('active')
        },1000)
}

main.addEventListener('click',event=>{
    const clickedElement=event.target
    const clickedElementText=clickedElement.dataset.js;
    const clickedElementTextMustBeSpoken=['img','p'].some(elementName=>
        clickedElement.tagName.toLowerCase()===elementName.toLowerCase())

    if(clickedElementTextMustBeSpoken){
       
        setTextMessage(clickedElementText)
        speakText()
        setStyleClikedDiv(clickedElementText);
    }

})

const inserteOptionElementsIntoDOM=voices=>{
selectElement.innerHTML=voices.reduce((accumulator,{name,lang})=>{
        accumulator+=`<option value="${name}">${lang} | ${name}</option>`
        return accumulator;
    },'');

}

const setUtteranceVoice=voice=>{
    utterance.voice=voice
    const voiceOptionElement=selectElement.querySelector(`[value="${voice.name}"]`)
    voiceOptionElement.selected=true;
}

const setPTPTVoices=voices=>{
    const microsoftVoices=voices.find(voice=>
    voice.name==='Microsoft Helia - Portuguese (Portugal)');
    const googleVoices=voices.find(voice=>
    voice.name==='Microsoft Maria - Portuguese (Brazil)');

if(microsoftVoices){
    setUtteranceVoice(microsoftVoices);
}else if(googleVoices){
    setUtteranceVoice(googleVoices);
};

};

let voices=[];

speechSynthesis.addEventListener('voiceschanged',()=>{
    voices=speechSynthesis.getVoices();
    inserteOptionElementsIntoDOM(voices);
    setPTPTVoices(voices);

});

buttonInsertText.addEventListener('click',()=>{
    divTexBox.classList.add('show')
});

closeDivTexBox.addEventListener('click',()=>{
    divTexBox.classList.remove('show')
});
selectElement.addEventListener('change',setVoice);
buttonReadText.addEventListener('click',()=>{
    setTextMessage(textArea.value)
    speakText()
});

let mainDivquize = document.querySelector('.quiz-app');
let quizeinfo = document.querySelector('.quiz-info');
let countspan = document.querySelector(".count span");
let countquistion = document.querySelector('.count span');
let bulletsContainare = document.querySelector('.bullets .spans');
let mainDivBullets = document.querySelector('.bullets');
let quistionarea = document.querySelector('.quiz-app .quiz-area');
let answerDiv = document.querySelector('.quiz-app .answers-area');
let submitButton = document.querySelector('.submit-button');
let theResults1 = document.querySelector('.results h2');
let theResults2 = document.querySelector('.results span');
let countdownDiv = document.querySelector('.countdown');
console.log(countdownDiv);

getQuistion();
//
let currentI = 0;
let rightanswers =0;
let timer;

// ---------------------------------------------------functions
// AJAX
function getQuistion(){
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function (){
        if(this.readyState == 4 && this.status == 200){
            let quistionObject = JSON.parse(this.responseText);
            
            bullets(quistionObject.length);
            addQustion(quistionObject[currentI],quistionObject.length);
            countdown(150,quistionObject.length);
            //----------------submit button
            submitButton.addEventListener('click',()=>{
                if(currentI < quistionObject.length){
                    let theRightAnswer = quistionObject[currentI].right_answer;                                
                    cheackanswer(theRightAnswer,quistionObject.length);
                    currentI++;
                    quistionarea.innerHTML = '';
                    answerDiv.innerHTML = '';
                    addQustion(quistionObject[currentI],quistionObject.length);
                    // Handel bullets class
                    handelBullet();
                    theresulsts(quistionObject.length);
                    clearInterval(timer);
                    countdown(150,quistionObject.length);
                }
            });
            
    }
    
    };
    myRequest.open("GET","html-quistion.json",true);
    myRequest.send();        
}

// function to creat bullets    
function bullets(num){     
    countquistion.innerHTML = num;
    for(let i =0; i<num;i++){
        let bullets = document.createElement('span');
        if(i === 0){
            bullets.classList.add('on');
        }
        
        bulletsContainare.appendChild(bullets);


    }
    
    

}
// add quoistion and answer to quiz area
function addQustion(opj,qCount){
    
    if(currentI < qCount ){
        let quistionhead = document.createElement('h2');
        let quistiontext = document.createTextNode(opj.title)
        quistionhead.appendChild(quistiontext);    
        quistionarea.appendChild(quistionhead);
    //creat answers
    for(let i=1; i<=4; i++){
        let quistionDiv = document.createElement('div');
        quistionDiv.className = 'answer';
        let radiobutton = document.createElement('input');
        radiobutton.name = "question";
        radiobutton.type = "radio";
        radiobutton.id = `answer_${i}`;
        radiobutton.dataset.answer = opj[`answer_${i}`];
        //creat label
        let label = document.createElement('label');
        label.htmlFor= `answer_${i}`;
        let labeltext = document.createTextNode(opj[`answer_${i}`]);
        label.appendChild(labeltext);
        //append label and radiobutton
        quistionDiv.appendChild(radiobutton);
        quistionDiv.appendChild(label);
        //append radiobutton to quiz area
        answerDiv.appendChild(quistionDiv);



    }


   }


}
// function to cheak the right answer
function cheackanswer(Ranswer,qCount){
    let thanswers = document.getElementsByName('question');
    let thechoosanswer ;                
    for(let i=0; i<4; i++){        
        if(thanswers[i].checked){
            thechoosanswer = thanswers[i].dataset.answer; 


        }                

    }
    if(Ranswer === thechoosanswer){
        rightanswers++;
        

    }

}
// function to handel bullets
function handelBullet(){
    let bullets = document.querySelectorAll('.bullets .spans span');
    let bulletArr = Array.from(bullets);
    bulletArr.forEach((bullet,i) => {
        if(currentI === i){
            bullet.className = 'on';
            
        }
    });
    
}
// function to display the results
function theresulsts(count){
    
    if(currentI === count){
        let resultsContainer = document.querySelector('.results-container');       
        mainDivquize.remove();
        // display the results
        if(rightanswers > (count/2) && rightanswers < count){
            theResults1.innerHTML = '"Good"' ;
            theResults2.innerHTML = `'"your answer = " ${rightanswers}'`;            
            resultsContainer.classList.add('good');
        }else if(rightanswers === count){
            theResults1.innerHTML = '"Exlant"' ;
            theResults2.innerHTML = `'"you answer allright"' ${count}`;
            resultsContainer.classList.add('perfect');
            
        }else{
            theResults1.innerHTML = '"Bad"';
            theResults2.innerHTML = `"you answer = " ${rightanswers} `;
            resultsContainer.classList.add('bad');
        }

        

    }


}
// function to countdown
function countdown(duration,count){
    if(currentI < count){
        let minuts,sacound;
        timer = setInterval(() => {
            minuts = Math.floor(duration / 60);
            sacound = Math.floor(duration % 60);
            if(sacound < 10){
                sacound = `0${sacound}`;
                }
                if(minuts < 10){
                    minuts = `0${minuts}`;
                    }
                    countdownDiv.innerHTML = `${minuts} : ${sacound}`;
                    duration--;
                    if(duration < 0){
                        clearInterval(timer);
                        submitButton.click();
                    }
                        

        },1000);

    }
    

}

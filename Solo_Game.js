var rounds = 1
var points = 0
var maxRounds = 0

function SoloGameFunction(){
    if(maxRounds == 0){
        GetMaxRounds()
    }
    var tweets = document.querySelectorAll('[id^="tweet_"]')
    if(IsEmpty(tweets)){
        return 0
    }
    console.log(tweets[0].value)
    if(IsChecked()){
        return 0
    }

    var tweet_likes = document.getElementById("tweet_Like_Num").value
    var tweet_reply = document.getElementById("tweet_Reply_Num").value
    var tweet_retweets = document.getElementById("tweet_Retweet_Num").value
    var tweet_text = document.getElementById("tweet_Tweet").value

    var selection = document.querySelector('input[name="real_fake_tweet"]:checked').value
    console.log(selection)
    
    var xhr = new XMLHttpRequest()
    xhr.open("POST","dataTopython.php",true)
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("likes="+tweet_likes+"&reply="+tweet_reply+"&retweet="+tweet_retweets+"&text="+tweet_text)
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200){ 
            console.log(this.responseText);
            var AIAnswer = this.responseText   
            PointsCounter(selection,AIAnswer)
            Results()
            console.log(rounds)
        } 
    };  
}

function IsEmpty(tweets){
    for(var i = 0 ; i < tweets.length ; i++){
        console.log("den einai empty oi "+i)
        if(tweets[i].value.trim() == ""){
            alert("Fill the empty textareas")
            return true
        }
    }
    return false
}

function PointsCounter(selection,AIAnswer){
    if (AIAnswer.trim().valueOf() != selection.trim().valueOf()){
        points++
    }
}

function Results(){
    if(rounds >= maxRounds){
        let p = document.createElement("p")
        var text
        if (points <= maxRounds/2){
            p.setAttribute('class','pFalse')
            text = document.createTextNode("You lose " + points +"/"+ rounds)    
        }else{
            p.setAttribute('class','pTrue')
            text = document.createTextNode("GJ you tricked the algorith " + points +"/"+ rounds)
        }
        p.appendChild(text)
        let div = document.getElementById("mainDiv_Sologame")
        div.replaceChildren()
        div.appendChild(p)
        let playButtonDiv = document.getElementById("soloGamePlayRoundButton")
        playButtonDiv.parentNode.removeChild(playButtonDiv);
    }else{
        rounds ++
        var roundLabel = document.getElementById("roundLabel")
        roundLabel.innerHTML = "Round " + rounds
        clearTextarea()
    }
}

function IsChecked(){
    var checkBox1 = document.getElementById("real")
    var checkBox2 = document.getElementById("fake")
    if (checkBox1.checked || checkBox2.checked){
        return false
    }else{
        alert("You didn't check it!")
        return true
    }
}

function GetMaxRounds(){
    maxRounds = document.getElementById("maxRoundId").value
    var roundSelectionDiv = document.getElementById("roundSelectionDiv")
    roundSelectionDiv.replaceChildren()
}

function clearTextarea(){
    document.getElementById("tweet_Tweet").value = "";
    document.getElementById("tweet_Reply_Num").value = "";
    document.getElementById("tweet_Retweet_Num").value = "";
    document.getElementById("tweet_Like_Num").value = "";
    document.getElementById("real").checked = false
    document.getElementById("fake").checked = false
}

//--------------------------------type only num in text area

function onlyNumberKey(evt) {
              
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
}
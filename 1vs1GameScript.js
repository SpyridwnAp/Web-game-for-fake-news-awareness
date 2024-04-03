var rounds = 1
var firstPlayerPoints = 0
var secondPlayerPoints = 0
var maxRounds = 0
var playerMakingTweet = 1

function PvPGameFunction(){
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

    var xhr = new XMLHttpRequest()
    xhr.open("POST","dataTopython.php",true)
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("likes="+tweet_likes+"&reply="+tweet_reply+"&retweet="+tweet_retweets+"&text="+tweet_text)
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200){ 
            console.log(this.responseText);
            var AIAnswer = this.responseText   
            console.log(selection)
            PointsCounter(selection,AIAnswer)
            PlayerSwitch()
            Results()
            console.log(rounds)
        } 
    }; 
}

function PlayerSwitch(){
    var labelTweetCreation = document.getElementById("createTweetLabel")
    var labelRealFakePick = document.getElementById("pickRealFakeLabel")
    if(playerMakingTweet == 2){
        playerMakingTweet = 1
        labelTweetCreation.innerHTML = "Player 1 create your Fake Tweet:"
        labelRealFakePick.innerHTML = "Player 2 guess if the tweet is real or fake:"
    }else{
        playerMakingTweet = 2
        labelTweetCreation.innerHTML = "Player 2 create your Fake Tweet:"
        labelRealFakePick.innerHTML = "Player 1 guess if the tweet is real or fake:"
    }
}

function IsEmpty(tweets){
    for(var i = 0 ; i < tweets.length ; i++){
        if(tweets[i].value.trim() == ""){
            alert("Fill the empty textareas")
            return true
        }
    }
    return false
}

function PointsCounter(selection,AIAnswer){
    if(playerMakingTweet == 1){
        if (AIAnswer.trim().valueOf() == selection.trim().valueOf()){
            secondPlayerPoints++
        }else{
            firstPlayerPoints++
        }
    }else{
        if (AIAnswer.trim().valueOf() == selection.trim().valueOf()){
            firstPlayerPoints++
        }else{
            secondPlayerPoints++
        }
    }
    console.log("player1 points "+firstPlayerPoints)
    console.log("player2 points "+secondPlayerPoints)
}

function Results(){
    if(rounds >= maxRounds){
        let p = document.createElement("p")
        var text
        if (firstPlayerPoints < secondPlayerPoints){
            p.setAttribute('class','pTrue')
            text = document.createTextNode("Congratulations Player 2! You won!!! with: " + secondPlayerPoints +" points")    
        }else{
            p.setAttribute('class','pTrue')
            text = document.createTextNode("Congratulations Player 1! You won!!! with: " + firstPlayerPoints +" points")
        }
        p.appendChild(text)
        let div = document.getElementById("mainDiv_1vs1Game")
        div.replaceChildren()
        div.appendChild(p)
        let playButtonDiv = document.getElementById("pvpGamePlayRoundButton")
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
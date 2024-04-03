var ReturnedTweet =""


function TestTweetFunction(){
  
    var tweetLink = document.getElementById('tweet_link').value
    console.log(tweetLink)
    
    

    ReturnedTweet = ReturnedTweet.substring(
        ReturnedTweet.indexOf("{"),
        ReturnedTweet.length
    )

    console.log(ReturnedTweet)

    var DataParser = JSON.parse(ReturnedTweet)
    
    console.log("like: "+DataParser.data[0].public_metrics.like_count)
    console.log("reply: "+DataParser.data[0].public_metrics.reply_count)
    console.log("retweet: "+DataParser.data[0].public_metrics.retweet_count)
    console.log("text: "+DataParser.data[0].text)
    

    var xhr = new XMLHttpRequest()
    xhr.open("POST","dataTopython.php",true)
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("likes="+DataParser.data[0].public_metrics.like_count+"&reply="+DataParser.data[0].public_metrics.reply_count+"&retweet="+DataParser.data[0].public_metrics.retweet_count+"&text="+DataParser.data[0].text)
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200){ 
            console.log(this.responseText);
            var AIAnswer = this.responseText   
            results(AIAnswer)
        } 
    };
 
}




function results(AIAnswer){
    console.log(AIAnswer)
    let p = document.createElement("p")
    var text
    if (AIAnswer.trim().valueOf() == "true".trim().valueOf()){
        p.setAttribute('class','pTrue')
        text = document.createTextNode("Real")    
    }else{
        p.setAttribute('class','pFalse')
        text = document.createTextNode("Fake")
    }
    p.appendChild(text)
    let div = document.getElementById("main_TestTw_div")
    div.replaceChildren()
    div.appendChild(p)
    let TestButtonDiv = document.getElementById("divTestButton")
    TestButtonDiv.remove()
    var retestButton = document.createElement("button")
    retestButton.innerHTML = "Test Tweets"
    retestButton.setAttribute('class','bTest_Tweets')
    retestButton.onclick =function(){
        location.href = "Test_Tweets.html"
    } 
    div.appendChild(retestButton)
}


//************************************* GET TWEET



function SearchTweet(){
    var tweetLink = document.getElementById('tweet_link').value.trim()
    if(ifEmpty(tweetLink)){
        return 0
    }
    document.getElementById("tweet_link").disabled=true
    var SearchdivButton=document.getElementById("divSearchButton")
    SearchdivButton.remove()
    document.getElementById("Test_Tweet_button").disabled = false
    document.getElementById("divTestButton").hidden= false
    
    AjaxPy(tweetLink)
}



function AjaxPy(tweetLink){
    var xhr = new XMLHttpRequest()
    xhr.open("POST","GetTweets.php",true)
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("tweetLink="+tweetLink)
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200){ 
            console.log(this.responseText);
            ReturnedTweet = this.responseText   
        } 
    };
    
}


function ifEmpty(tweetLink){
    if(tweetLink == ""){
        alert("Its empty!")
        return true
    }
    return false
}
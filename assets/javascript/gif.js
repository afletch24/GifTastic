$(document).ready(function(){
    
    var topics = ["happy", "sad", "mind blown", "bored", "confused", "excited", "hungry", "frustrated", "suspicious", "drunk", "surprised", "nervous", "embarrassed"];

   
    // Creats buttons from topics array
    function renderButtons(){
        $(".buttonHome").empty();

        for(var i=0; i < topics.length; i++){
            var a = $("<button>");
            a.addClass("emotion");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);  
            $(".buttonHome").append(a);
        };
    };

    renderButtons();
   
    // New buttons can be made from entered text
    $(".enter").on("click", function(){
        var feelings= $(".form-control").val().trim();
        topics.push(feelings);
        renderButtons();
    });    


    $(".buttonHome").on("click", ".emotion" ,function() {
        console.log("clicked button"); 
        $(".gifPop").empty();
        var search = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=dc6zaTOxFJmzC&limit=10";
            
        // var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=horse";
    
        $.ajax({    
            url: queryURL,
            method: "GET"
            }).done(function(response) {
            var results = response.data;
            
            console.log(results);
                
                for (var i=0 ; i < results.length; i++){
                    var results = response.data;
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);


                    var gifImage = $("<img>");
                    
                    var still_url = results[i].images.fixed_height_still.url = results[i].images.fixed_height_still.url
                    var dynamic_url = results[i].images.fixed_height_still.url = results[i].images.fixed_height.url

                    gifImage.attr("src", still_url);
                    gifImage.attr("data-state", "still");
                    gifImage.attr("data-animate", dynamic_url);
                    gifImage.attr("data-still", still_url)

                    $(".gifPop").prepend(gifImage);

                }
        });

    })

    $(document).on("click", 'img', function() {
    var state = $(this).attr("data-state");        
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
});

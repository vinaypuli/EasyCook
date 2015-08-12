function handleAPILoaded() {
    $('#search-button').attr('disabled', false);
}

function getRecipeJson() {
    var apiKey = "dvxNw30bGvD87e7TBnKb5oK5Dl1DOQu9";
    //var titleKeyword = $('#query').val();
    var titleKeyword = 'Pasta';

    var url = "http://api.bigoven.com/recipes?pg=1&rpp=25&title_kw="
            + titleKeyword + "&api_key=" + apiKey;

    $("#results").html("");

    $.ajax({
        type : "GET",
        dataType : 'json',
        cache : false,
        url : url,

        success : function(data) {
            if (data.ResultCount != 0)
                propertyTest(data);
            else
                alert("Recipe not found");
        }
    });
}

function propertyTest(currentObject) {

    for (j = 0; j <1; j++) {
        $('#og-grid').append(currentObject.Results[j].Title+
                        '<img src="'
                                + currentObject.Results[j].ImageURL
                                + '" alt="W3Schools.com" id="recipeImage" style="width:150px;height:150px" onClick=javascript:recipeImageClick("'
                                + currentObject.Results[j].RecipeID
                                + '")> </img>' + '</a>');
    }
}

function recipeImageClick(recipeId) {

    var apiKey = "dvxNw30bGvD87e7TBnKb5oK5Dl1DOQu9";
    var id = recipeId;
    var url = "http://api.bigoven.com/recipe/" + id + "?" + "&api_key="
            + apiKey;

    $.ajax({
        type : "GET",
        dataType : 'json',
        cache : false,
        url : url,
        success : function(data1) {
            propertyTest1(data1);

        }
    });
}

function propertyTest1(currentObject1) {

    $("#results1").html("");
    $("#og-details").html("");
    $("#og-fulling").html("");
    $("#results4").html("");
    $("#results5").html("");
    $("#results6").html("");

    /*$('#og-grid').append( '<p> '+currentObject1.Title+'</p>' +
                    '<img src="'
                            + currentObject1.ImageURL
                            + '" alt="W3Schools.com" id="recipeImage" style="width:150px;height:150px"> </img>'
                            + '</a><br />');*/

    var arr = currentObject1.Instructions.split(".");
    var text = [];
    var i;

    $('#og-details').append('<p> Directions </p>')

    for (i = 0; i < arr.length - 1; i++) {
        var j = i + 1;
        text[i] = j + '). ' + arr[i] + "<br>"

        $('#results6').append(
            '</a><br />' + text[i] + '</a><br />');
    }

    

    var request = gapi.client.youtube.search.list({
        q : currentObject1.Title,
        part : 'snippet',
        topicId : '/m/0p57p'

    })

    request.execute(function(response) {
                var str = response.result;
                responseData = str.items[0].id.videoId;
                $('#og-loading').append('<p> Video </p>' +
                                '<iframe  id="ytplayer" type="text/html" width="250" height="150"src= "http://www.youtube.com/embed/'
                                        + responseData
                                        + '?paused=1&origin=http://example.com&showinfo=0&theme=light&rel=0&modestbranding=1&autohide=1" frameborder="0"/>'
                                        + '</a><br />');
            })


    $('#og-details').append('<p> Incredients </p>' )

    for (k = 0; k < currentObject1.Ingredients.length; k++) {
        $('#og-details').append(
                '</a><br />' + currentObject1.Ingredients[k].Quantity + ' '
                        + currentObject1.Ingredients[k].Unit + ' '
                        + currentObject1.Ingredients[k].Name + '\n'
                        + '</a><br />');

    }

    var incredientsDis = "";
    var servingsNo = "";

    servingsNo = currentObject1.YieldNumber;

    for (k = 0; k < currentObject1.Ingredients.length; k++) {
        if (k != currentObject1.Ingredients.length - 1)
            incredientsDis += '"' + currentObject1.Ingredients[k].Name + '"\n';
        else
            incredientsDis += '"' + currentObject1.Ingredients[k].Name + '"';
    }

    var incstepsDis = "";
    for (j = 0; j < currentObject1.Ingredients.length; j++) {
        if (j != currentObject1.Ingredients.length - 1)
            incstepsDis += '"' + currentObject1.Ingredients[j].Quantity + ' '
                    + currentObject1.Ingredients[j].Unit + ' '
                    + currentObject1.Ingredients[j].Name + '"\n';
        else
            incstepsDis += '"' + currentObject1.Ingredients[j].Quantity + ' '
                    + currentObject1.Ingredients[j].Unit + ' '
                    + currentObject1.Ingredients[j].Name + '"';

    }

    $.ajax({
                url : 'https://webknox-recipes.p.mashape.com/recipes/visualizeIngredients',
                type : 'POST', // The HTTP Method, can be GET POST PUT DELETE etc
                data : {
                    defaultCss : true,
                    ingredientList : incstepsDis,

                    measure : 'metric',
                    servings : servingsNo,
                    view : 'list'
                }, // Additional parameters here
                datatype : 'json',

                success : function(data) {
                    $("#results4").append('<p> visualize Ingredients </p>' +
                        data);

                    $.ajax({
                                url : 'https://webknox-recipes.p.mashape.com/recipes/visualizeNutrition',
                                type : 'POST', // The HTTP Method, can be GET POST PUT DELETE etc

                                data : {
                                    defaultCss : true,
                                    ingredientList : incstepsDis,
                                    servings : servingsNo,
                                }, // Additional parameters here
                                datatype : 'json',

                                success : function(data) {
                                    $("#results5").append('<p> visualize Nutrition</p>' +
                                        data);

                                    $.ajax({
                                                url : 'https://webknox-recipes.p.mashape.com/recipes/visualizePriceEstimator',
                                                type : 'POST', // The HTTP Method, can be GET POST PUT DELETE etc

                                                data : {
                                                    defaultCss : true,
                                                    ingredientList : incstepsDis,
                                                    mode : 2,
                                                    servings : servingsNo,
                                                }, // Additional parameters here  
                                                datatype : 'json',

                                                success : function(data) {
                                                    $("#results5").append('<p> visualize Price Estimator</p>' +
                                                        data);
                                                },

                                                error : function(err) {
                                                    alert(err);
                                                },

                                                beforeSend : function(xhr) {
                                                    xhr
                                                            .setRequestHeader(
                                                                    "X-Mashape-Authorization",
                                                                    "mq4HeP9U5EmshxETHbObsIWpfEDap1adO4Cjsnn5ValjDdOiCo");
                                                }

                                            });

                                },
                                error : function(err) {
                                    alert(err);
                                },

                                beforeSend : function(xhr) {
                                    xhr
                                            .setRequestHeader(
                                                    "X-Mashape-Authorization",
                                                    "mq4HeP9U5EmshxETHbObsIWpfEDap1adO4Cjsnn5ValjDdOiCo");
                                }
                            });

                },
                error : function(err) {
                    alert(err);
                },

                beforeSend : function(xhr) {
                    xhr
                            .setRequestHeader("X-Mashape-Authorization",
                                    "mq4HeP9U5EmshxETHbObsIWpfEDap1adO4Cjsnn5ValjDdOiCo");
                }

            });

}
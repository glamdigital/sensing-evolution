define(["backbone", "app/collections/TrailsCollection", "app/collections/TopicsCollection", "app/collections/ItemsCollection", "app/collections/QuestionsCollection"],
    function(Backbone, TrailsCollection, TopicsCollection, ItemsCollection, QuestionsCollection) {

    var allTrails = new TrailsCollection();
    var allTopics = new TopicsCollection();
    var allItems = new ItemsCollection();
    var allQuestions = new QuestionsCollection();

    var runDataValidation = {
      validateData: function() {
        allTrails.fetch( {success: function(trailsColl, resp, opt) {
            allTopics.fetch( {success: function(topicsColl, resp, opt) {
              allItems.fetch( {success: function(itemsColl, resp, opt) {
                allQuestions.fetch( {success: function(questionsColl, resp, opt) {

                //check each trail has at least one topic
                console.log(trailsColl.length + " trails in total");
                console.log("Verifying trails have topics");
                trailsColl.forEach( function(trail) {
                  console.log("Trail: " + trail.attributes.name + " (" + trail.attributes.slug + ")");
                  var trailTopics = topicsColl.where({trail: trail.attributes.slug});
                  //Assert length trailTopics > 0
                  if(trailTopics.length <= 0) {
                    console.error("No topics for trail: " + trail.attributes.name);
                  }

                  //check each item
                  _.each(trailTopics, function(topic) {
                      console.log("  Topic: " + topic.attributes.title + "(" + topic.attributes.slug + ")");
                      var topicItems = itemsColl.where({topic: topic.attributes.slug, trail:trail.attributes.slug});
                      //Assert length trailTopics > 0
                      if(topicItems.length <= 0) {
                        console.error("No items for topic: " + topic.attributes.title + " on trail: " + trail.attributes.name);
                      }

                      _.each(topicItems, function(item) {
                        console.log("     Item: " + item.attributes.title + "(" + item.attributes.slug + ")");
                        var itemQuestions = questionsColl.where({item: item.attributes.slug, trail:trail.attributes.slug});
                        //Assert length questions === 1
                        if(itemQuestions.length === 1) {
                          console.log("       1 question found for this item on this trail");
                        } else if(itemQuestions.length === 0) {
                          console.error("       No questions found for this item on this trail");
                        } else {
                          console.error("       Too many questions found for this item on this trail");
                        }
                      }, this);
                  }, this);
                }, this);
                }});
              }});
            }});
        }} );
      },
    };

  return runDataValidation;

});

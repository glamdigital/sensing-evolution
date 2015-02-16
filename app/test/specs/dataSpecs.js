describe("Data validation", function() {

    beforeEach(function(done){
        var TrailsCollection = require('app/collections/TrailsCollection');
        this.allTrails = new TrailsCollection();
        this.allTrails.fetch( {success: function(coll, resp, opt) {
            done();
        }});
    });



    it("Should have a valid set of data", function() {

            //check each trail has at least one topic
            console.log(this.allTrails.length + " trails in total");
            console.log("Verifying trails have topics");
            this.allTrails.forEach( function(trail) {
              console.log("Trail: " + trail.attributes.name + " (" + trail.attributes.slug + ")");

              //Assert topics > 0

              expect(trail.topics.length).toBeGreaterThan(0);

              //check each item
              trail.topics.each( function(topic) {
                  console.log("  Topic: " + topic.attributes.title + "(" + topic.attributes.slug + ")");
                  //Assert length items > 0
                  var trailItems = topic.items.filter( function(item) {
                    return item.attributes.trails.indexOf(trail.attributes.slug) >= 0;
                  }, this);

                  expect(trailItems.length).toBeGreaterThan(0);

                  _.each(trailItems, function(item) {
                    console.log("     Item: " + item.attributes.title + "(" + item.attributes.slug + ")");
                    //Assert length questions === 1
                    //get the questions which are applicable to the current trail.
                    var trailQuestions = _.filter(item.questions, function(question) {
                      return question.attributes.trails.indexOf(trail.attributes.slug) >= 0;
                    }, this);

                    expect(trailQuestions.length).toBe(1);

                  }, this);
              }, this);
            }, this);



    });

    it("should fail this test", function() {
       expect(true).toBe(true);
    });

});
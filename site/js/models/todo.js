var app = app || {};

app.Todo = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false
    },

    toggle: function() {
        this.save({
            completed: !this.get('completed')
        });
    },

    parse: function(response){
        response.id = response._id;
        return response;
    }
});
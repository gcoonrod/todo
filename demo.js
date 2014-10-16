var Todo = Backbone.Model.extend({
    defaults: {
        //title: '',
        completed: false
    },

    validate: function(attribs){
        if(attribs.title === undefined){
            return "Remember to set a title for your todo.";
        }
    },

    initialize: function() {
        console.log("This model has been initialized.");
        this.on("invalid", function(model, error){
            console.log(error);
        });
    }
});

var TodosCollection = Backbone.Collection.extend({
    model: Todo,
    url: '/todos'
});

var myTodo = new Todo({
    title: 'Read the whole book',
    id: 2
});

var todos = new TodosCollection([myTodo]);

var TodoView = Backbone.View.extend({
    tagName: 'li',

    todoTpl: _.template($('#item-template').html()),

    events: {
        'dblclick label': 'edit',
        'keypress .edit': 'updateOnEnter',
        'blur .edit': 'close'
    },

    initialize: function(){
        this.$el = $('#todo');
        console.log("this in the initialize context:", this);
    },

    render: function() {
        this.$el.html( this.todoTpl( this.model.toJSON() ) );
        this.input = this.$('.edit');
        return this;
    },

    edit: function(){

    },

    close: function() {

    },

    updateOnEnter: function(e) {

    }
});

var todoView = new TodoView({model: myTodo});

todoView.render();

//Chapter 3 Routing
var TodoRouter = Backbone.Router.extend({
    routes: {
        "about": "showAbout",
        "todo/:id": "getTodo",
        "search/:query": "searchTodos",
        "search/:query/p:page": "searchTodos",
        "todos/:id/download/*documentPath": "downloadDocument",
        "*other": "defaultRoute",
        "optional(/:item)": "optionalItem",
        "named/optional/(y:z)": "namedOptionalItem"
    },

    showAbout: function(){

    },

    getTodo: function(id){
        console.log("You are trying to reach todo" + id);
    },

    searchTodos: function(query, page){
        var page_number = page || 1;
        console.log("Page number: " + page_number + "of the results for todos containing the word: " + query);
    },

    downloadDocument: function(id, path){

    },

    defaultRoute: function (other) {
        console.log("Invalid. You attempted to reach:" + other);
    }
});

var myTodoRouter = new TodoRouter();

Backbone.history.start();

//Chapter 3 Validation Testing
var invalidTodo = new Todo({id: 1});
invalidTodo.set('completed', true, {validate: true});
console.log('completed: ' + invalidTodo.get('completed'));
todos.add(invalidTodo);
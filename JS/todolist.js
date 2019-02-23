$(document).ready(
    function()
    {
        var model =
        {
            init : function() 
            {
                this.todolist = [];
                this.date = {};
                this.build();
            },

            build : function() //get list from local storage && get date
            {
                this.date.day = octopus.getDay();
                this.date.currentDate = octopus.getDate();
            }
        }

        var view =
        {
            init : function()
            {
                this.templateDate = $('#dateTemplate').html();
                this.$targetDate = $('#target-date');
                this.templateList = $('#todolistTemplate').html();
                this.$targetList = $('#target-list');
                this.render();
            },

            render : function()
            {
                var templateDate = this.templateDate;
                var $targetDate = this.$targetDate;
                Mustache.parse(templateDate);  
                var rendered = Mustache.render(templateDate, octopus.returnDate());
                $targetDate.html(rendered);

                var templateList = this.templateList;
                var $targetList = this.$targetList;
                Mustache.parse(templateList);  
                var rendered = Mustache.render(templateList, octopus.returnToDoList());
                $targetList.html(rendered);
            }
        }

        var octopus =
        {
            init : function()
            {
                model.init();
                view.init();
            },

            returnToDoList : function()
            {
                return model.todolist;
            },

            returnDate : function()
            {
                return model.date;
            },

            getDate : function()
            {
                return new Date().toLocaleDateString("en-EG",{"day":"numeric","month":"short","year":"numeric"}).toString();
            },

            getDay : function()
            {
                return new Date().toLocaleDateString("en-EG",{"weekday" : "long"}).toString();
            },

            
        }
        octopus.init();
    }
)
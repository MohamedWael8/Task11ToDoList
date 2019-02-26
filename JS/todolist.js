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
                this.$input = $('#todolist-input');
                this.$input.keypress(function(e)
                {
                    if(e.which == 13) 
                    {
                       octopus.AddItem($(this).val());
                       $(this).val("")
                    }
                });
                this.$targetList.on('click','.dropbtn',function()
                {
                    if($(this).next().css('display') == 'none')
                    {
                        $(this).next().show();
                    }
                    else
                        $(this).next().hide();
                    
                });

                this.$targetList.on('click','.editButton',function()
                {
                   var $input = $(this).parents(".list-item").find(".list-item-input");
                   $input.prop('disabled',false)
                });

                this.$targetList.on('blur','.list-item-input',function()
                {
                    octopus.EditItem($(this).val(),$(this).index())
                });

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
                var rendered = Mustache.render(templateList, octopus.returnModel());
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
            
            returnModel : function()
            {
                return model;
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

            AddItem : function(ItemName)
            {
                model.todolist.push({Name : ItemName , isPinned : false , isDone : false , TimeStamp : "" , Start : false });
                view.render();
                console.log(model.todolist);
            },

            EditItem : function(NewName , Index)
            {
                model.todolist[Index].Name = NewName;
                console.log(model.todolist);
                view.render();
            }

            
        }
        octopus.init();
    }
)
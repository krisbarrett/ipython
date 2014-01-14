//----------------------------------------------------------------------------
//  Copyright (C) 2013 The IPython Development Team
//
//  Distributed under the terms of the BSD License.  The full license is in
//  the file COPYING, distributed as part of this software.
//----------------------------------------------------------------------------

//============================================================================
// BoolWidget
//============================================================================

/**
 * @module IPython
 * @namespace IPython
 **/

define(["notebook/js/widgets/widget"], function(widget_manager){
    var CheckBoxView = IPython.DOMWidgetView.extend({
      
        // Called when view is rendered.
        render : function(){
            this.$el
                .addClass('widget-hbox-single');
            this.$label = $('<div />')
                .addClass('widget-hlabel')
                .appendTo(this.$el)
                .hide();
            this.$checkbox = $('<input />')
                .attr('type', 'checkbox')
                .appendTo(this.$el)
                .click($.proxy(this.handle_click, this));

            this.$el_to_style = this.$checkbox; // Set default element to style
            this.update(); // Set defaults.
        },

        handle_click: function() {
            // Calling model.set will trigger all of the other views of the 
            // model to update.
            var value = this.model.get('value');
            this.model.set('value', ! value, {updated_view: this});
            this.touch();
        },
        
        update : function(options){
            // Update the contents of this view
            //
            // Called when the model is changed.  The model may have been 
            // changed by another view or by a state update from the back-end.
            this.$checkbox.prop('checked', this.model.get('value'));

            if (options === undefined || options.updated_view != this) {
                var disabled = this.model.get('disabled');
                this.$checkbox.prop('disabled', disabled);

                var description = this.model.get('description');
                if (description.length === 0) {
                    this.$label.hide();
                } else {
                    this.$label.html(description);
                    this.$label.show();
                }
            }
            return CheckBoxView.__super__.update.apply(this);
        },
        
    });

    widget_manager.register_widget_view('CheckBoxView', CheckBoxView);

    var ToggleButtonView = IPython.DOMWidgetView.extend({
      
        // Called when view is rendered.
        render : function() {
            var that = this;
            this.setElement($('<button />')
                .addClass('btn')
                .attr('type', 'button')
                .on('click', function (e) {
                    e.preventDefault();
                    that.handle_click();
                }));

            this.update(); // Set defaults.
        },
        
        update : function(options){
            // Update the contents of this view
            //
            // Called when the model is changed.  The model may have been 
            // changed by another view or by a state update from the back-end.
            if (this.model.get('value')) {
                this.$el.addClass('active');
            } else {
                this.$el.removeClass('active');
            }

            if (options === undefined || options.updated_view != this) {

                var disabled = this.model.get('disabled');
                this.$el.prop('disabled', disabled);

                var description = this.model.get('description');
                if (description.length === 0) {
                    this.$el.html(' '); // Preserve button height
                } else {
                    this.$el.html(description);
                }
            }
            return ToggleButtonView.__super__.update.apply(this);
        },
        
        // Handles and validates user input.
        handle_click: function(e) { 

            // Calling model.set will trigger all of the other views of the 
            // model to update.
            var value = this.model.get('value');
            this.model.set('value', ! value, {updated_view: this});
            this.touch();
        },
    });

    widget_manager.register_widget_view('ToggleButtonView', ToggleButtonView);

});
